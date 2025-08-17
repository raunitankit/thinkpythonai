// app/layout.tsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://thinkpythonai.com"),
  title: "ThinkPythonAI — Python, Automation & AI",
  description: "Hands-on Python + AI with real projects. First 2 classes free.",
  openGraph: { url: "/", images: ["/og.png"], siteName: "ThinkPythonAI" },
  alternates: { canonical: "/" },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-[88px] md:scroll-pt-[104px]">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
