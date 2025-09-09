// app/AnnouncementBanner.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show again after 7 days (time-based reappear)
    const raw = localStorage.getItem("tpai_hideBanner_until");
    if (!raw) return;
    const until = Number(raw);
    if (Number.isFinite(until) && Date.now() < until) {
      setVisible(false);
    } else {
      localStorage.removeItem("tpai_hideBanner_until");
    }
  }, []);

  const dismiss = () => {
    // Hide for 7 days
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("tpai_hideBanner_until", String(Date.now() + sevenDaysMs));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-500
                    text-white text-center px-4 py-2 text-sm font-medium
                    flex items-center justify-center gap-3">
      ✨ New:&nbsp;
      <Link href="/browser" className="underline hover:text-yellow-200">
        Open ThinkPythonAI IDE – Code for fun!
      </Link>
      <button
        onClick={dismiss}
        aria-label="Close announcement"
        className="ml-2 text-white/80 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}