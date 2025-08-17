// app/assistant/Embed.tsx
"use client";

export default function Embed({ src }: { src: string }) {
  return (
    <div className="aspect-[16/9] w-full bg-slate-100">
      <iframe
        title="ThinkPythonAI Assistant"
        src={src}
        className="w-full h-full"
        allow="clipboard-write"
      />
    </div>
  );
}
