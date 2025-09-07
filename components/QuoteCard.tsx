"use client";

import { useRef, useState } from "react";

type Props = {
  text: string;
  author?: string;
  role?: string;
  aspect?: "square" | "story"; // 1080x1080 or 1080x1920
  theme?: "indigo" | "emerald" | "rose" | "slate";
};

const themes: Record<NonNullable<Props["theme"]>, string> = {
  indigo: "from-indigo-600 via-fuchsia-500 to-cyan-500",
  emerald: "from-emerald-600 via-teal-500 to-cyan-500",
  rose: "from-rose-600 via-fuchsia-500 to-amber-400",
  slate: "from-slate-900 via-slate-700 to-slate-500",
};

export default function QuoteCard({
  text,
  author,
  role,
  aspect = "square",
  theme = "indigo",
}: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n\n— ${author ?? ""}${role ? `, ${role}` : ""}`);
      alert("Copied to clipboard ✅");
    } catch {
      alert("Couldn’t copy (browser blocked).");
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // lazy-load so it doesn’t bloat your main bundle
      const htmlToImage = await import("html-to-image");
      const fileSaver = await import("file-saver");

      const dataUrl = await htmlToImage.toPng(nodeRef.current as HTMLElement, {
        pixelRatio: 2, // crisp export
      });
      const filename =
        `thinkpythonai-quote-${aspect}-${new Date().toISOString().slice(0,10)}.png`;
      fileSaver.saveAs(dataUrl, filename);
    } catch (e) {
      console.error(e);
      alert("Download failed. Check console for details.");
    } finally {
      setDownloading(false);
    }
  };

  const sizeClass =
    aspect === "square"
      ? "w-[1080px] h-[1080px] max-w-full"
      : "w-[1080px] h-[1920px] max-w-full";

  return (
    <div className="grid gap-3">
      <div
        ref={nodeRef}
        className={`relative ${sizeClass} rounded-3xl overflow-hidden shadow-xl mx-auto`}
      >
        {/* background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${themes[theme]} opacity-95`} />
        {/* subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.25))]" />
        {/* content */}
        <div className="relative z-10 flex h-full items-center justify-center p-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-10 max-w-[80%]">
            <blockquote className="text-slate-900 leading-relaxed whitespace-pre-line">
              <span className="text-2xl md:text-3xl font-semibold">“</span>
              <span className="align-middle text-xl md:text-2xl">{text}</span>
              <span className="text-2xl md:text-3xl font-semibold">”</span>
            </blockquote>
            {(author || role) && (
              <div className="mt-5 text-right">
                <div className="font-semibold text-slate-800">{author}</div>
                {role && <div className="text-slate-600 italic text-sm">{role}</div>}
              </div>
            )}
            <div className="mt-4 text-[11px] text-slate-500">thinkpythonai.com · @ThinkPythonAI</div>
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={handleCopy}
          className="px-3 py-2 rounded-xl border text-sm font-semibold hover:bg-slate-50"
        >
          Copy text
        </button>
        <button
          onClick={handleDownload}
          className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
          disabled={downloading}
        >
          {downloading ? "Preparing PNG…" : "Download PNG"}
        </button>
      </div>
    </div>
  );
}