// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";

// --- SEO metadata ---
const siteUrl = "https://www.thinkpythonai.com"; // update if domain differs
const siteName = "ThinkPythonAI";
const siteTitle = "ThinkPythonAI — Practical Python & AI Training";
const siteDesc =
  "Learn Python that gets you hired. Hands-on projects in automation, AI, and data. Live cohorts, recordings, and school partnerships.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | ThinkPythonAI",
  },
  description: siteDesc,
  keywords: [
    "Python training",
    "AI training",
    "Learn Python",
    "Python for beginners",
    "Automation with Python",
    "Kids coding",
    "Python course India US",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDesc,
    images: [
      {
        url: "/og/thinkpythonai-og.png", 
        width: 1200,
        height: 630,
        alt: "ThinkPythonAI — Practical Python & AI Training",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDesc,
    images: ["/og/thinkpythonai-og.png"],
    creator: "@ThinkPythonAI", // update or remove
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

function SeoJsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // @ts-ignore
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ...inside RootLayout return... */}
<SeoJsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ThinkPythonAI",
    url: "https://www.thinkpythonai.com",
    logo: "https://www.thinkpythonai.com/og/thinkpythonai-og.png",
    sameAs: [
      "https://linktr.ee/thinkpythonAI"
      // add X/LinkedIn/YouTube if applicable
    ],
  }}
/>
<SeoJsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ThinkPythonAI",
    url: "https://www.thinkpythonai.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.thinkpythonai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }}
/>
        {children}

        {/* Organization & Website JSON-LD */}
        <SeoJsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteName,
            url: siteUrl,
            logo: `${siteUrl}/og/thinkpythonai-og.png`,
            sameAs: ["https://linktr.ee/thinkpythonAI"],
          }}
        />
        <SeoJsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: siteUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />

        <footer
          style={{
            padding: "24px 16px",
            borderTop: "1px solid #e5e7eb",
            marginTop: 24,
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          © {new Date().getFullYear()} ThinkPythonAI — Built for learners.
        </footer>
      </body>
    </html>
  );
}