// app/qr.svg/route.ts
export const runtime = "nodejs";
import QRCode from "qrcode";

export async function GET() {
  const url = "https://thinkpythonai.com/";
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#111111", light: "#ffffff" },
  });
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
