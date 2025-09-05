"use client";

import Image from "next/image";

type Shot = { src: string; alt?: string };

export default function ScreenshotGallery({ items }: { items: Shot[] }) {
  if (!items?.length) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <a
          key={it.src}
          href={it.src}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border bg-white p-2 hover:shadow transition-shadow block"
          title="Open full screenshot"
        >
          <div className="relative w-full h-64 overflow-hidden rounded-xl">
            <Image
              src={it.src}
              alt={it.alt || "Testimonial screenshot"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>
          {it.alt && (
            <div className="px-2 py-2 text-xs text-slate-500 whitespace-pre-line">
             {it.alt}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}