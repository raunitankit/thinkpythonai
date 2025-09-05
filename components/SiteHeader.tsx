"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// normalize path (strip trailing slash) — accept null/undefined safely
const normalize = (p?: string | null) => (p ?? "").replace(/\/$/, "");

// base styling shared by all nav links
const baseLink =
  "px-2 py-1 rounded-md text-sm font-medium whitespace-nowrap hover:text-slate-900 hover:bg-slate-100";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  const pathname = normalize(usePathname());

  // active checker for full routes (not for hash anchors)
  const isActive = (href: string, { includeChildren = false } = {}) => {
    const h = normalize(href);
    return includeChildren ? pathname === h || pathname.startsWith(h + "/") : pathname === h;
  };

  // route-aware class helper
  const linkClass = (href: string, opts?: { includeChildren?: boolean; extra?: string }) =>
    `${baseLink} ${
      isActive(href, opts) ? "text-indigo-700 font-semibold bg-indigo-50" : "text-slate-800"
    } ${opts?.extra ?? ""}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
      <div className="container mx-auto px-4 h-14 flex items-center gap-3">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl grid place-items-center text-white"
            style={{ background: "linear-gradient(135deg,#6366f1,#db2777,#06b6d4)" }}
          >
            <span className="font-black">T</span>
          </div>
          <span className="font-semibold">ThinkPythonAI</span>
        </Link>

        {/* Center: Desktop nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          {/* Hash anchors use baseLink (pathname doesn't change on hashes) */}
          <a href="#features" className={`${baseLink} text-slate-800`}>Features</a>
          <a href="#curriculum" className={`${baseLink} text-slate-800`}>Curriculum</a>
          <a href="#sample" className={`${baseLink} text-slate-800`}>Sample&nbsp;Class</a>

          {/* Courses dropdown */}
          <div className="relative group">
            <button
              className={`${baseLink} text-slate-800 inline-flex items-center gap-1`}
              aria-haspopup="menu"
              aria-expanded="false"
            >
              Courses
              <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-70">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <div
              className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-150
                         absolute left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl border bg-white shadow-lg p-2"
              role="menu"
            >
              <Link href="/courses#pros" className="block px-3 py-2 rounded-md hover:bg-slate-50" role="menuitem">
                Working Professionals
              </Link>
              <Link href="/courses#freshers" className="block px-3 py-2 rounded-md hover:bg-slate-50" role="menuitem">
                Freshers / Recent Graduates
              </Link>
              <Link
                href="/courses#kids"
                className="block px-3 py-2 rounded-md hover:bg-green-50 text-green-700 font-semibold"
                role="menuitem"
              >
                Kids &amp; Schools
              </Link>
              <div className="my-1 h-px bg-slate-200" />
              <Link href="/courses" className="block px-3 py-2 rounded-md hover:bg-slate-50 font-semibold" role="menuitem">
                View All Courses →
              </Link>
            </div>
          </div>

          {/* Real routes use linkClass (active state) */}
          <a href="#pricing" className={`${baseLink} text-slate-800`}>Pricing</a>
          <a href="#faq" className={`${baseLink} text-slate-800`}>FAQ</a>
          <Link href="/testimonials" className={linkClass("/testimonials")}>Testimonials</Link>
          <Link href="/assistant" className={linkClass("/assistant")}>Assistant</Link>
          <Link href="/teen-gist" className={linkClass("/teen-gist", { includeChildren: true })}>
            InstaGist 🚀
          </Link>
          <a href="#projects" className={`${baseLink} text-slate-800`}>Fun&nbsp;Projects</a>
        </nav>

        {/* Right: CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="https://forms.gle/D8W6ePzfzeszgPFr6"
            className="inline-flex items-center px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90"
          >
            Join Live Demo
          </a>
          <a
            href="/assistant"
            className="inline-flex items-center px-3 py-2 rounded-xl border text-sm font-semibold hover:bg-slate-50"
          >
            Chat with us
          </a>
        </div>

        {/* Mobile: hamburger */}
        <button
          aria-label="Menu"
          className="lg:hidden ml-auto inline-flex items-center justify-center w-9 h-9 rounded-md border hover:bg-slate-50"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-3 grid gap-2">
            {/* Hash anchors */}
            <a href="#features" className={`${baseLink} text-slate-800`} onClick={() => setOpen(false)}>Features</a>
            <a href="#curriculum" className={`${baseLink} text-slate-800`} onClick={() => setOpen(false)}>Curriculum</a>
            <a href="#sample" className={`${baseLink} text-slate-800`} onClick={() => setOpen(false)}>Sample Class</a>

            {/* Mobile Courses collapsible */}
            <button
              className={`${baseLink} text-slate-800 flex items-center justify-between`}
              onClick={() => setMobileCoursesOpen((v) => !v)}
              aria-expanded={mobileCoursesOpen}
            >
              <span>Courses</span>
              <svg width="16" height="16" viewBox="0 0 24 24" className={`transition-transform ${mobileCoursesOpen ? "rotate-180" : ""}`}>
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            {mobileCoursesOpen && (
              <div className="ml-2 grid">
                <Link href="/courses#pros" className={`${baseLink} text-slate-800`} onClick={() => setOpen(false)}>
                  • Working Professionals
                </Link>
                <Link href="/courses#freshers" className={`${baseLink} text-slate-800`} onClick={() => setOpen(false)}>
                  • Freshers / Graduates
                </Link>
                <Link
                  href="/courses#kids"
                  className="px-2 py-1 rounded-md text-sm font-semibold text-green-700 hover:bg-green-50"
                  onClick={() => setOpen(false)}
                >
                  • Kids &amp; Schools
                </Link>
                <Link href="/courses" className={`${baseLink} text-slate-800 font-semibold`} onClick={() => setOpen(false)}>
                  View All Courses →
                </Link>
              </div>
            )}

            {/* Real routes */}
            <Link href="/testimonials" className={linkClass("/testimonials")} onClick={() => setOpen(false)}>
              Testimonials
            </Link>
            <Link href="/assistant" className={linkClass("/assistant")} onClick={() => setOpen(false)}>
              Assistant
            </Link>
            <Link
              href="/teen-gist"
              className={linkClass("/teen-gist", { includeChildren: true })}
              onClick={() => setOpen(false)}
            >
              InstaGist 🚀
            </Link>

            {/* Hash anchor */}
            <a href="#projects" className={`${baseLink} text-slate-800`} onClick={() => setOpen(false)}>
              Fun Projects
            </a>

            {/* CTAs */}
            <div className="mt-2 flex gap-2">
              <a
                href="https://forms.gle/D8W6ePzfzeszgPFr6"
                className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
              >
                Join Live Demo
              </a>
              <a
                href="/assistant"
                className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-xl border text-sm font-semibold"
              >
                Chat with us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}