// app/qr/page.tsx
export const dynamic = "force-static";

import QRCode from "qrcode";
import Button from "@/components/ui/button";

const TARGET = "https://thinkpythonai.com/"; // NEW

export default async function QRPage() {
  const dataUrl = await QRCode.toDataURL(TARGET, {
    margin: 1,
    scale: 12,
    color: { dark: "#111111", light: "#ffffff" },
  });

  return (
    // ...
          <div className="space-y-4">
            <a
              href={dataUrl}
              download="thinkpythonai-qr.png"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-slate-900 text-white hover:opacity-90"
            >
              Download PNG (local)
            </a>
            <div className="flex gap-3">
              <a className="underline text-sm" href="/qr.png">/qr.png</a>
              <a className="underline text-sm" href="/qr.svg">/qr.svg</a>
            </div>
            <div className="text-sm text-slate-600">
              PNG works for most flyers; SVG is infinite-scale for designers.
            </div>
            <div className="text-sm">
              <span className="inline-block rounded-full px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200">
                First 2 classes free*
              </span>
            </div>
          </div>
    // ...
  );
}
