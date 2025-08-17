// app/layout.tsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "ThinkPythonAI",
  description: "Python, automation & AI learning",
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
