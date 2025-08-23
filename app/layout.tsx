// app/layout.tsx
import Link from "next/link";
import "./globals.css"; // if you have it

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{padding:"10px 16px", borderBottom:"1px solid #e5e7eb"}}>
          <nav style={{display:"flex", gap:16, alignItems:"center", flexWrap:"wrap"}}>
            <Link href="/">Home</Link>
            <Link href="/teen-gist">Teen Gist 🎧</Link>
          </nav>
        </header>
        {children}
        <footer style={{padding:"24px 16px", borderTop:"1px solid #e5e7eb", marginTop:24, fontSize:12, color:"#6b7280"}}>
          © {new Date().getFullYear()} ThinkPythonAI — Built for learners.
        </footer>
      </body>
    </html>
  );
}
