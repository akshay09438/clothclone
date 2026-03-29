"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type State = "EMPTY" | "SELECTED" | "LOADING" | "RESULT";

export default function FashionStudio() {
  const [state, setState] = useState<State>("EMPTY");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState("Analyzing outfit...");
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image must be under 10MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setState("SELECTED");
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image must be under 10MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setState("SELECTED");
      setError(null);
    }
  };

  const generateModelShot = async () => {
    if (!selectedFile) return;

    setState("LOADING");
    setLoadingText("Analyzing outfit...");
    setError(null);

    try {
      // Step 1: File to Base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.readAsDataURL(selectedFile);
      });

      const imageBase64 = await base64Promise;
      const mimeType = selectedFile.type;

      // Update loading text halfway
      setTimeout(() => setLoadingText("Composing the shot..."), 3000);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, mimeType }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Generation failed");
      }

      setOutputImageUrl(data.outputImageUrl);
      setState("RESULT");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
      setState("SELECTED");
    }
  };

  const reset = () => {
    setState("EMPTY");
    setSelectedFile(null);
    setPreviewUrl(null);
    setOutputImageUrl(null);
    setError(null);
  };

  const downloadImage = async () => {
    if (!outputImageUrl) return;
    try {
      const response = await fetch(outputImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "drape-model-shot.jpg";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 max-w-[1000px] mx-auto">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl tracking-[0.2em] font-light text-[#F5F0E8] mb-2 uppercase">
          DRAPE
        </h1>
        <p className="text-[#8A8580] font-sans tracking-wide uppercase text-sm">
          AI Fashion Studio
        </p>
      </header>

      <div className="w-full">
        {state === "EMPTY" || state === "SELECTED" || state === "LOADING" ? (
          <div className="flex flex-col items-center gap-8">
            {/* Upload Zone */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => state !== "LOADING" && fileInputRef.current?.click()}
              className={`
                relative w-full aspect-[4/5] md:max-w-md bg-[#1A1A1A] rounded-2xl border-2 border-dashed 
                transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden
                ${state === "LOADING" ? "border-[#C9A84C]/30 pointer-events-none" : "border-[#2A2A2A] hover:border-[#C9A84C]/50"}
              `}
            >
              {state === "EMPTY" && (
                <div className="text-center p-8">
                  <div className="w-16 h-16 mb-4 mx-auto opacity-20 border-2 border-[#F5F0E8] rounded-full flex items-center justify-center">
                    <span className="text-2xl mt-1">+</span>
                  </div>
                  <p className="text-[#F5F0E8] font-sans text-lg mb-1">Drop your outfit photo here</p>
                  <p className="text-[#8A8580] font-sans text-sm">JPG, PNG, WEBP up to 10MB</p>
                </div>
              )}

              <input
                id="file-input"
                type="file"
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleFileChange}
              />

              {(state === "SELECTED" || state === "LOADING") && previewUrl && (
                <>
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className={`object-cover transition-opacity duration-700 ${state === "LOADING" ? "opacity-40 animate-pulse-custom" : "opacity-100"}`}
                  />
                  {state === "LOADING" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      <div className="w-48 h-[2px] bg-[#2A2A2A] mb-4 overflow-hidden relative">
                         <div className="absolute inset-0 bg-[#C9A84C] animate-[progress_2s_ease-in-out_infinite]" />
                      </div>
                      <p className="text-[#C9A84C] font-sans tracking-widest uppercase text-xs animate-pulse">
                        {loadingText}
                      </p>
                    </div>
                  )}
                </>
              )}
              
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 font-sans text-sm mt-[-1rem]">{error}</p>
            )}

            {/* CTA Button */}
            {state === "SELECTED" && (
              <button
                onClick={generateModelShot}
                disabled={state === "LOADING"}
                className="w-full md:max-w-md bg-[#C9A84C] text-black font-sans font-bold py-4 rounded-xl tracking-widest uppercase hover:bg-[#D4B86D] transition-colors"
              >
                Generate Model Shot
              </button>
            )}
          </div>
        ) : (
          /* RESULT STATE */
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-auto">
              {/* Original Panel */}
              <div className="relative aspect-[4/5] bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#2A2A2A]">
                {previewUrl && <Image src={previewUrl} alt="Original Cloth" fill className="object-cover" />}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-[10px] uppercase tracking-widest text-[#8A8580]">
                  Original
                </div>
              </div>

              {/* Generated Panel */}
              <div className="relative aspect-[4/5] bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#C9A84C]/30 shadow-[0_0_30px_rgba(201,168,76,0.1)]">
                {outputImageUrl && (
                  <Image 
                    src={outputImageUrl} 
                    alt="Generated Model" 
                    fill 
                    className="object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 bg-[#C9A84C]/20 backdrop-blur px-3 py-1 rounded text-[10px] uppercase tracking-widest text-[#C9A84C] border border-[#C9A84C]/30">
                  Model Shot
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
              <button
                onClick={downloadImage}
                className="w-full bg-[#F5F0E8] text-black font-sans font-bold py-3 rounded-lg tracking-widest uppercase hover:bg-white transition-colors text-sm"
              >
                Download
              </button>
              <button
                onClick={reset}
                className="w-full border border-[#2A2A2A] text-[#8A8580] font-sans py-3 rounded-lg tracking-widest uppercase hover:border-[#8A8580] hover:text-[#F5F0E8] transition-all text-sm"
              >
                Generate Another
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  );
}
