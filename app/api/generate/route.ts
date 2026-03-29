import { v2 as cloudinary } from 'cloudinary';
import Anthropic from '@anthropic-ai/sdk';
import { config, getSystemPrompt } from '@/lib/config';
import fs from 'fs';
import path from 'path';

const debugLogPath = path.join(process.cwd(), 'debug.log');
function logToFile(msg: string) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(debugLogPath, `[${timestamp}] ${msg}\n`);
}

function initCloudinary() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  
  if (!cloud_name || !api_key || !api_secret) {
    logToFile(`[CONFIG_ERR] Missing env: Name=${cloud_name}, Key=${api_key}, Secret=${!!api_secret}`);
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true
  });
}

/**
 * Uploads a base64 image to Cloudinary using a Buffer stream.
 * @param imageBase64 The base64 string (without data: prefix)
 * @param mimeType The mime type (e.g. image/jpeg)
 * @returns The secure URL of the uploaded image
 */
async function uploadToCloudinary(imageBase64: string, mimeType: string): Promise<string> {
  console.log(`[Cloudinary] Starting upload. MimeType: ${mimeType}, Base64 length: ${imageBase64.length}`);
  const startTime = Date.now();
  
  try {
    const buffer = Buffer.from(imageBase64, 'base64');
    
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'suitepic_uploads',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            const e = error as any;
            logToFile(`[CLOUDINARY_ERR] Code: ${e.http_code}, Msg: ${e.message}, Name: ${e.name}`);
            reject(new Error('Cloudinary upload failed'));
          } else {
            logToFile(`[CLOUDINARY_OK] Time: ${Date.now() - startTime}ms, URL: ${result?.secure_url}`);
            resolve(result?.secure_url || '');
          }
        }
      );
      
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('[Cloudinary] Catch error:', error);
    throw new Error('Cloudinary upload failed');
  }
}

/**
 * Generates an image prompt using Claude.
 * @param imageBase64 The base64 string
 * @param mimeType The mime type
 * @param systemPrompt The system prompt content
 * @returns The generated prompt string
 */
async function generatePromptWithClaude(imageBase64: string, mimeType: string, systemPrompt: string): Promise<string> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const keyPrefix = process.env.ANTHROPIC_API_KEY?.substring(0, 10) || 'MISSING';
  logToFile(`[CLAUDE_START] Model: claude-sonnet-4-6, KeyPrefix: ${keyPrefix}, SystemPrompt len: ${systemPrompt.length}`);
  
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType as any,
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: "Generate the image prompt for this outfit.",
            },
          ],
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      logToFile(`[CLAUDE_OK] Prompt generated: ${content.text.substring(0, 80)}...`);
      return content.text;
    }
    throw new Error('Unexpected content type from Claude');
  } catch (error: any) {
    logToFile(`[CLAUDE_ERR] Status: ${error?.status}, Error: ${error}`);
    console.error('Claude API error:', error);
    throw new Error(`Could not analyze outfit: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Generates a model image via Nano Banana API.
 * @param prompt Claude's generated prompt
 * @param clothImageUrl The Cloudinary URL of the raw cloth
 * @returns The output image URL
 */
async function pollNanaBananaTask(taskId: string): Promise<string> {
  const maxAttempts = 30; // up to ~60 seconds
  const delayMs = 2000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise(r => setTimeout(r, delayMs));
    
    const res = await fetch(
      `https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=${taskId}`,
      {
        headers: {
          "Authorization": `Bearer ${process.env.NANO_BANANA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    logToFile(`[POLL_${attempt}] TaskId: ${taskId}, Raw: ${JSON.stringify(data).substring(0, 400)}`);

    const successFlag = data?.data?.successFlag;

    if (successFlag === 1) {
      const url = data?.data?.response?.resultImageUrl;
      if (url) {
        logToFile(`[POLL_OK] Got image URL: ${url}`);
        return url;
      }
      throw new Error('successFlag=1 but no resultImageUrl found');
    }

    if (successFlag === 2) throw new Error('Task failed: CREATE_TASK_FAILED');
    if (successFlag === 3) throw new Error('Task failed: GENERATE_FAILED');
    // successFlag === 0 means still generating — keep polling
  }

  throw new Error(`Task ${taskId} timed out after ${maxAttempts} polls`);
}

async function generateModelImage(prompt: string, clothImageUrl: string): Promise<string> {
  try {
    const payload = {
      type: "IMAGETOIAMGE",
      prompt: prompt,
      selectedModel: config.nanaBananaModel,
      imageUrls: [
        clothImageUrl,
        config.referenceImageUrl
      ]
    };
    logToFile(`[NANOBANANA_REQ] Payload: ${JSON.stringify(payload)}`);
    
    const response = await fetch("https://api.nanobananaapi.ai/api/v1/nanobanana/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NANO_BANANA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      logToFile(`[NANOBANANA_ERR] Status: ${response.status}, Data: ${JSON.stringify(errorData)}`);
      throw new Error(`Nano Banana failure: ${response.statusText}`);
    }

    const result = await response.json();
    logToFile(`[NANOBANANA_RESULT_RAW] ${JSON.stringify(result).substring(0, 300)}`);

    // Check if it's an async task response
    const taskId = result?.data?.taskId || result?.taskId;
    if (taskId) {
      logToFile(`[NANOBANANA_ASYNC] Got taskId: ${taskId}, polling...`);
      return await pollNanaBananaTask(taskId);
    }

    // Check for immediate URL in response
    const url =
      result?.data?.outputImageUrls?.[0] ||
      result?.data?.output_image_url ||
      result?.data?.imageUrl ||
      result?.data?.url ||
      result?.outputImageUrls?.[0] ||
      result?.imageUrl ||
      result?.url;

    if (!url) {
      logToFile(`[NANOBANANA_ERR] No taskId or URL in: ${JSON.stringify(result).substring(0, 200)}`);
      throw new Error('No image URL in response');
    }

    logToFile(`[NANOBANANA_OK_URL] ${url}`);
    return url;
  } catch (error: any) {
    logToFile(`[NANOBANANA_CATCH] Error: ${error.message}`);
    throw new Error('Generation failed');
  }
}

export async function POST(req: Request) {
  try {
    initCloudinary();
    const { imageBase64, mimeType } = await req.json();
    logToFile(`[API_POST] Mime: ${mimeType}, Size: ${imageBase64?.length}`);

    // Ping Check to verify credentials
    try {
      const pingRes = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg", {
        public_id: "test_ping",
        overwrite: true
      });
      logToFile(`[PING_OK] Cloudinary Reachable. Test URL: ${pingRes.secure_url}`);
    } catch (pingErr: any) {
      logToFile(`[PING_ERR] Credentials/Connection Fail: Code: ${pingErr.http_code}, Msg: ${pingErr.message}`);
      return Response.json({ success: false, error: "Cloudinary Auth Failed", details: pingErr.message }, { status: 500 });
    }

    if (!imageBase64 || !mimeType) {
      return Response.json({ success: false, error: "Missing image data" }, { status: 400 });
    }

    // Step 1: Cloudinary
    let cloudinaryUrl: string;
    try {
      cloudinaryUrl = await uploadToCloudinary(imageBase64, mimeType);
    } catch (e) {
      return Response.json({ success: false, error: "Upload failed", step: "cloudinary" }, { status: 500 });
    }

    // Step 2: Claude Prompt Generation
    const systemPrompt = getSystemPrompt();
    let generatedPrompt: string;
    try {
      generatedPrompt = await generatePromptWithClaude(imageBase64, mimeType, systemPrompt);
    } catch (e) {
      return Response.json({ success: false, error: "Could not analyze outfit", step: "claude" }, { status: 500 });
    }

    // Step 3: Nano Banana Image Generation
    let outputImageUrl: string;
    try {
      outputImageUrl = await generateModelImage(generatedPrompt, cloudinaryUrl);
    } catch (e) {
      return Response.json({ success: false, error: "Generation failed", step: "nanbanana" }, { status: 500 });
    }

    return Response.json({
      success: true,
      outputImageUrl,
      generatedPrompt
    });

  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
