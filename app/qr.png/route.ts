// app/qr.png/route.ts
export const runtime = "nodejs";
import QRCode from "qrcode";

export async function GET() {
  const url = "https://thinkpythonai.com/";
  const buf = await QRCode.toBuffer(url, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 1,
    scale: 12, // ~1200px — great for print
    color: { dark: "#111111", light: "#ffffff" },
  });
  return new Response(buf, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
