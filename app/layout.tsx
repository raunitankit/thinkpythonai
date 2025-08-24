// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* (no global header) */}
        {children}
        <footer style={{ padding: "24px 16px", borderTop: "1px solid #e5e7eb", marginTop: 24, fontSize: 12, color: "#6b7280" }}>
          © {new Date().getFullYear()} ThinkPythonAI — Built for learners.
        </footer>
      </body>
    </html>
  );
}
