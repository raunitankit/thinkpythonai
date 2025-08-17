// app/layout.tsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "ThinkPythonAI",
  description: "Python, automation & AI learning",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

