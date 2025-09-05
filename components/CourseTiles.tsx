import Link from "next/link";

function Tile({
  title, blurb, href, badge,
}: { title: string; blurb: string; href: string; badge?: string; }) {
  return (
    <Link href={href} className="block rounded-2xl border bg-white hover:shadow-md transition-shadow">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        {badge && (
          <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4 text-sm text-slate-700">{blurb}</div>
      <div className="px-4 pb-4 text-sm font-semibold text-slate-900">
        Explore →
      </div>
    </Link>
  );
}

export default function CourseTiles() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Tile
        title="Working Professionals"
        badge="Most popular"
        href="/courses#pro"
        blurb="Level up with real automation & AI skills: Python fast-track, APIs, dashboards, testing frameworks, and job-ready projects."
      />
      <Tile
        title="Freshers / Recent Graduates"
        href="/courses#freshers"
        blurb="Build a solid portfolio: Python basics → data → AI fundamentals, GitHub projects, interview prep, and resume bullets."
      />
      <Tile
        title="Kids & Schools"
        badge="New"
        href="/courses#kids"
        blurb="Start early with fun Python projects—games, digital citizenship, InstaGist. Tailored after-school clubs & school programs."
      />
    </div>
  );
}
