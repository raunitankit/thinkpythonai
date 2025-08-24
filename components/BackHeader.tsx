// components/BackHeader.tsx
export default function BackHeader() {
    return (
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "linear-gradient(180deg,#f8f0ff,#f5f3ff)",
          padding: "10px 16px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* Left: small back link */}
          <a
            href="/"
            aria-label="Back"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#0f172a",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            <span aria-hidden style={{ fontSize: 18 }}>←</span>
            <span style={{ fontSize: 12, color: "#334155" }}>BACK</span>
          </a>
  
          {/* Right: big purple home button */}
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#4F46E5",
              color: "#fff",
              textDecoration: "none",
              padding: "12px 18px",
              borderRadius: 16,
              fontWeight: 800,
              boxShadow: "0 8px 24px rgba(79,70,229,0.25)",
            }}
          >
            <span aria-hidden style={{ fontSize: 18 }}>🏠</span>
            <span>Back to ThinkPythonAI</span>
          </a>
        </div>
      </div>
    );
  }
  