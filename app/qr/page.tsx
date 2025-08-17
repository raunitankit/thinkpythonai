// app/qr/page.tsx
export const dynamic = "force-static";

import QRCode from "qrcode";
import Button from "@/components/ui/button";

// app/qr/page.tsx
const TARGET = "https://thinkpythonai.com/"; // was the vercel.app URL

export default async function QRPage() {
  // big, print-friendly PNG; margin 1, scale 12 ≈ 1200px
  const dataUrl = await QRCode.toDataURL(TARGET, {
    margin: 1,
    scale: 12,
    color: { dark: "#111111", light: "#ffffff" },
  });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="header">
        <div className="container py-3 flex items-center justify-between">
          <div className="font-semibold">ThinkPythonAI — QR</div>
          <div className="flex gap-2">
            <Button href="/">Back to Home</Button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <h1 className="text-2xl md:text-4xl font-bold">Flyer QR Code</h1>
        <p className="mt-2 text-slate-600">
          Scan to visit <span className="font-mono">{TARGET}</span>
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
          <div className="p-6 rounded-2xl border bg-white shadow-sm">
            <img
              src={dataUrl}
              alt="ThinkPythonAI QR"
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-4">
            <a
              href={dataUrl}
              download="thinkpythonai-qr.png"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-slate-900 text-white hover:opacity-90"
            >
              Download PNG
            </a>
            <div className="text-sm text-slate-600">
              Tip: PNG works well for most flyers. If you need SVG (infinite
              scaling), tell me and I’ll add an SVG route too.
            </div>
            <div className="text-sm">
              <span className="inline-block rounded-full px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200">
                First 2 classes free*
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
