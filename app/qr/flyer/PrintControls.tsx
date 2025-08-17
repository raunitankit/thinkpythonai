// app/qr/flyer/PrintControls.tsx
"use client";

export default function PrintControls() {
  return (
    <div className="flex items-center gap-2">
      <a
        href="/qr.png"
        className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
        title="Download PNG"
      >
        Download PNG
      </a>
      <a
        href="/qr.svg"
        className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
        title="Download SVG"
      >
        Download SVG
      </a>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center rounded-lg bg-slate-900 text-white px-3 py-1.5 text-sm hover:opacity-90"
        title="Print"
      >
        Print
      </button>
    </div>
  );
}
