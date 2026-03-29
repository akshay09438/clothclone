import fs from 'fs';
import path from 'path';

export const config = {
  referenceImageUrl: process.env.REFERENCE_IMAGE_URL!,
  nanaBananaModel: "nano-banana",
  claudeModel: "claude-haiku-4-5-20251001",
  maxImageSizeMB: 10,
};

let systemPromptCache: string | null = null;

export function getSystemPrompt() {
  if (systemPromptCache) return systemPromptCache;

  const promptPath = path.join(process.cwd(), 'lib', 'systemPrompt.md');
  try {
    systemPromptCache = fs.readFileSync(promptPath, 'utf8');
    return systemPromptCache;
  } catch (error) {
    console.error('Failed to read system prompt:', error);
    return "";
  }
}
