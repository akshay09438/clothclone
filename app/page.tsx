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
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setError("Image must be under 20MB");
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Use FileReader → data URL for universal mobile compatibility
    // (blob: URLs from URL.createObjectURL can fail on iOS Safari)
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreviewUrl(dataUrl);
      setState("SELECTED");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 20 * 1024 * 1024) {
        setError("Image must be under 20MB");
        return;
      }
      setSelectedFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setPreviewUrl(dataUrl);
        setState("SELECTED");
      };
      reader.readAsDataURL(file);
    }
  };

  const generateModelShot = async () => {
    if (!selectedFile) return;

    setState("LOADING");
    setLoadingText("Analyzing outfit...");
    setError(null);

    try {
      // previewUrl is already a data URL — extract base64 directly
      const dataUrl = previewUrl!;
      const base64Index = dataUrl.indexOf(",") + 1;
      const imageBase64 = dataUrl.substring(base64Index);
      const mimeType = selectedFile.type || "image/jpeg";

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
      a.download = "fashion-studio-result.jpg";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-12 max-w-[1200px] mx-auto overflow-x-hidden font-sans">
      {/* Header */}
      <header className="mb-12 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-2 tracking-tight font-montserrat flex items-center justify-center gap-2">
           <span className="bg-[#1273EB] text-white px-2 py-1 rounded-lg text-2xl">AI</span>
           Fashion Studio
        </h1>
        <p className="text-[#4B5563] font-medium tracking-normal text-sm md:text-base opacity-70">
          Professional Model Shot Generator
        </p>
      </header>

      <div className="w-full">
        {state === "EMPTY" || state === "SELECTED" || state === "LOADING" ? (
          <div className="flex flex-col items-center gap-8">
            {/* Upload Zone — label wraps input for reliable mobile tap handling */}
            <label
              htmlFor="file-input"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`
                relative w-full aspect-[3/4] max-w-[280px] md:max-w-sm bg-white rounded-3xl border border-[#E5E7EB] shadow-sm
                transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                ${state === "LOADING" ? "pointer-events-none ring-2 ring-[#1273EB]/20" : "cursor-pointer hover:border-[#1273EB] hover:shadow-md"}
              `}
            >
              {/* Hidden file input — label click/tap redirects here natively on all browsers */}
              <input
                id="file-input"
                type="file"
                ref={fileInputRef}
                className="sr-only"
                accept="image/*"
                disabled={state === "LOADING"}
                onChange={handleFileChange}
              />

              {state === "EMPTY" && (
                <div className="text-center p-8 flex flex-col items-center pointer-events-none">
                  <div className="w-12 h-12 mb-4 bg-[#F3F4F6] rounded-2xl flex items-center justify-center text-[#1273EB]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-[#111827] font-semibold text-lg mb-1 font-montserrat">Tap to upload</p>
                  <p className="text-[#6B7280] text-xs font-medium">JPEG, PNG · camera or gallery</p>
                </div>
              )}

              {(state === "SELECTED" || state === "LOADING") && previewUrl && (
                <>
                  {state === "LOADING" ? (
                    <div className="absolute inset-0 bg-[#F3F4F6] overflow-hidden">
                      {/* Atmospheric Layer */}
                      <div className="absolute inset-0 opacity-40 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#1273EB]/10 rounded-full blur-[60px] animate-pulse" />
                      </div>

                      {/* The Glide - Animated Model */}
                      <div className="absolute inset-x-[-20%] inset-y-0 opacity-80 animate-glide">
                         <div className="relative w-full h-full">
                            <Image
                              src="/assets/loading-model.jpg"
                              alt="Processing..."
                              fill
                              className="object-cover object-top"
                            />
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6] via-transparent to-[#F3F4F6]" />
                         </div>
                      </div>

                      {/* The Piki Blue Laser Scan */}
                      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1273EB] to-transparent shadow-[0_0_15px_#1273EB] z-20 animate-scan" />

                      {/* Loading Text Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 z-30">
                        <p className="text-[#111827] font-bold text-lg mb-4 animate-fade-in-out font-montserrat">
                          {loadingText}
                        </p>
                        <div className="w-24 h-[3px] bg-[#E5E7EB] rounded-full overflow-hidden">
                           <div className="h-full bg-[#1273EB] animate-progress-fast" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  )}
                </>
              )}
            </label>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 font-medium text-sm mt-[-1rem]">{error}</p>
            )}

            {/* CTA Button */}
            {state === "SELECTED" && (
              <button
                onClick={generateModelShot}
                className="w-full max-w-[280px] md:max-w-sm bg-[#1273EB] text-white font-bold py-4 rounded-2xl tracking-tight hover:bg-[#0D59B7] transition-all shadow-lg shadow-[#1273EB]/20 font-montserrat text-lg"
              >
                Generate Shot
              </button>
            )}
          </div>
        ) : (
          /* RESULT STATE */
          <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-700">
            <div className="w-full flex justify-center h-auto px-4">
              {/* Generated Panel */}
              <div className="relative w-full aspect-[3/4] max-w-[280px] md:max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/[0.05] transition-all duration-700">
                {outputImageUrl && (
                  <Image 
                    src={outputImageUrl} 
                    alt="Generated Model" 
                    fill 
                    className="object-cover object-top"
                  />
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] uppercase font-black text-[#1273EB] border border-[#1273EB]/10 tracking-widest">
                  Result
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full max-w-[280px] mx-auto">
              <button
                onClick={downloadImage}
                className="w-full bg-[#111827] text-white font-bold py-4 rounded-2xl tracking-tight hover:bg-black transition-all font-montserrat shadow-lg"
              >
                Download Image
              </button>
              <button
                onClick={reset}
                className="w-full bg-white border border-[#E5E7EB] text-[#4B5563] font-bold py-4 rounded-2xl tracking-tight hover:bg-[#F9FAFB] hover:text-[#111827] transition-all font-montserrat shadow-sm"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes progress-fast {
          0% { width: 0%; transform: translateX(-100%); }
          100% { width: 100%; transform: translateX(100%); }
        }
        @keyframes glide {
          0% { transform: translateX(-8%); }
          100% { transform: translateX(8%); }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animate-glide {
          animation: glide 8s ease-in-out infinite alternate;
        }
        .animate-scan {
          animation: scan 2.5s linear infinite;
        }
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out infinite;
        }
        .animate-progress-fast {
          animation: progress-fast 2s linear infinite;
        }
      `}</style>
    </main>
  );
}
