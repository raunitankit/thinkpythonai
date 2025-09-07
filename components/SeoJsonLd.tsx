"use client";
export default function SeoJsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // @ts-ignore
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}