"use client";

import { Check, Briefcase, FileText, PhoneCall, UserCheck, Calendar, Mail, Rocket, Video } from "lucide-react";

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-fuchsia-50 text-slate-900">
      {/* Top bar back link */}
      <div className="container pt-6">
        <a
          href="/"
          className="inline-block bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          🔙 Back to ThinkPythonAI
        </a>
      </div>

      {/* Hero */}
      <section className="container pt-8 pb-10 md:pt-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Get hired faster with guidance from an{" "}
              <span className="bg-gradient-to-r from-yellow-200 via-rose-200 to-sky-200 px-2 rounded">
                ex-Amazon recruiter
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Resume & LinkedIn makeovers, mock interviews, and job-search strategy tailored to FAANG/Fortune-500 and high-growth startups.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#packages" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white shadow hover:opacity-90">
                <Rocket className="w-4 h-4" /> View Packages
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50">
                <Briefcase className="w-4 h-4" /> What we do
              </a>
            </div>
            <div className="mt-4 text-sm text-slate-600">Led hiring for L5–L7 roles • 10,000+ resumes reviewed • Hundreds coached</div>
          </div>
          <div className="md:pl-8">
            <div className="rounded-2xl overflow-hidden shadow bg-white">
              <div className="p-4 border-b">
                <div className="text-base font-semibold flex items-center gap-2"><UserCheck className="w-5 h-5" /> Recruiter’s advantage</div>
              </div>
              <div className="p-4 text-sm text-slate-700 space-y-2">
                <p>Get insider feedback on how recruiters screen, how hiring managers decide, and how to tailor your story for the role.</p>
                <ul className="space-y-2">
                  <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> ATS-friendly resume + LinkedIn headline that converts</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> STAR-driven mock interviews (behavioral + role-specific)</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> Target company mapping & outreach scripts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container py-12">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Services</h2>
        <p className="text-center mt-2 text-slate-600">Choose a focused session or bundle for end-to-end support.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card hover:shadow-md transition-shadow">
            <div className="p-4 border-b font-semibold flex items-center gap-2"><FileText className="w-5 h-5" /> Resume & LinkedIn Review</div>
            <div className="p-4 text-sm text-slate-700 space-y-2">
              <p>Line-by-line edits + keyword optimization. Align bullets to impact & metrics. Includes template + examples.</p>
              <ul className="space-y-1">
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> 45-min live review</li>
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> Editable doc with tracked changes</li>
              </ul>
            </div>
          </div>
          <div className="card hover:shadow-md transition-shadow">
            <div className="p-4 border-b font-semibold flex items-center gap-2"><Video className="w-5 h-5" /> Mock Interview + Feedback</div>
            <div className="p-4 text-sm text-slate-700 space-y-2">
              <p>Behavioral + role-specific drills with a scoring rubric and action notes. STAR storytelling + follow-ups.</p>
              <ul className="space-y-1">
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> 60-min live session</li>
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> Personalized prep doc</li>
              </ul>
            </div>
          </div>
          <div className="card hover:shadow-md transition-shadow">
            <div className="p-4 border-b font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5" /> Job Search Strategy</div>
            <div className="p-4 text-sm text-slate-700 space-y-2">
              <p>Target list, outreach scripts, and weekly plan. Learn how recruiters search and how to show up in results.</p>
              <ul className="space-y-1">
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> 45-min strategy call</li>
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5" /> Company/role mapping template</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages / Pricing */}
      <section id="packages" className="container py-12">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Packages</h2>
        <p className="text-center mt-2 text-slate-600">Simple bundles to meet you where you are.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { name: "Resume Boost", price: "$99", bullets: ["ATS-friendly resume", "LinkedIn headline + summary", "Templates & examples"], cta: "Book Resume Review" },
            { name: "Interview Ready", price: "$199", bullets: ["60-min mock interview", "Scored rubric + notes", "Follow-up prep plan"], cta: "Book Mock Interview", highlight: true },
            { name: "Career Accelerator", price: "$399", bullets: ["Resume + LinkedIn overhaul", "Mock interview + feedback", "Job search strategy call"], cta: "Start Coaching" },
          ].map((t) => (
            <div key={t.name} className={`rounded-2xl bg-white/90 backdrop-blur border ${t.highlight ? "border-slate-900 shadow-lg" : "border-slate-200"}`}>
              <div className="p-4 border-b flex items-center justify-between">
                <span className="font-semibold">{t.name}</span>
                <span className="text-slate-500 text-sm">{t.price}</span>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-slate-700 text-sm">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5" />{b}</li>
                  ))}
                </ul>
                <div className="mt-5 grid gap-2">
                  <a href="https://calendly.com/thinkpythonai" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:opacity-90">
                    <Calendar className="w-4 h-4" />{t.cta}
                  </a>
                  <a href="mailto:thinkpythonai@gmail.com" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border bg-white hover:bg-slate-50">
                    <Mail className="w-4 h-4" />Email us
                  </a>
                </div>
                <div className="mt-2 text-xs text-slate-500">Prefer Zelle? Pay <strong>+1 (603) 417-0825</strong> and email your receipt to <a className="underline" href="mailto:thinkpythonai@gmail.com">thinkpythonai@gmail.com</a>.</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who we help */}
      <section className="container py-12">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Who we help</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Working Professionals", desc: "Level up for internal moves or big-tech jumps (L4–L7)." },
            { title: "Career Switchers", desc: "Translate past wins into tech-friendly impact bullets." },
            { title: "Students & New Grads", desc: "Internship hunting, portfolio polish, and confident interviews." },
          ].map((x) => (
            <div key={x.title} className="rounded-2xl border bg-white/90 backdrop-blur p-5 shadow-sm">
              <div className="text-base font-semibold">{x.title}</div>
              <div className="mt-2 text-slate-700 text-sm">{x.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-12">
        <h2 className="text-2xl md:text-4xl font-bold text-center">What clients say</h2>
        <p className="text-center mt-2 text-slate-600">Real words from real candidates.</p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-white/90 backdrop-blur p-5 shadow-sm">
            <div className="text-slate-800 text-base leading-relaxed">
              <span className="font-serif text-xl mr-1">“</span>
              Clear, actionable feedback. My resume finally started getting responses and the mock interview prep was spot-on for Amazon’s style.
              <span className="font-serif text-xl ml-1">”</span>
            </div>
            <div className="mt-3 text-right text-sm text-slate-600">— Software Engineer, Boston</div>
          </div>
          <div className="rounded-2xl border bg-white/90 backdrop-blur p-5 shadow-sm">
            <div className="text-slate-800 text-base leading-relaxed">
              <span className="font-serif text-xl mr-1">“</span>
              The recruiter coaching gave me confidence. I walked into my final round knowing exactly how to structure answers—and landed the offer.
              <span className="font-serif text-xl ml-1">”</span>
            </div>
            <div className="mt-3 text-right text-sm text-slate-600">— Data Analyst, Seattle</div>
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="container pt-4 pb-12">
        <div className="rounded-2xl shadow text-white p-6 md:p-8" style={{ background: "linear-gradient(135deg,#4f46e5,#db2777,#06b6d4)" }}>
          <h3 className="text-2xl font-bold">Ready to accelerate your job search?</h3>
          <p className="mt-2 text-white/95">Book a session or email us your resume, and we’ll suggest the best track for you.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="https://calendly.com/thinkpythonai" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900">
              <Calendar className="w-4 h-4" /> Book a Session
            </a>
            <a href="mailto:thinkpythonai@gmail.com" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white">
              <Mail className="w-4 h-4" /> Email Resume
            </a>
            <a href="tel:+16034170825" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white">
              <PhoneCall className="w-4 h-4" /> Call: +1 (603) 417-0825
            </a>
          </div>
        </div>
      </section>

      {/* Bottom back link */}
      <div className="container pb-10 pt-4">
        <a
          href="/"
          className="inline-block bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          🔙 Back to ThinkPythonAI
        </a>
      </div>
    </div>
  );
}

/*
Utility classes used:
- container: Tailwind container (ensure your globals.css has container styles or swap to max-w-7xl mx-auto px-4)
- card: if not defined, add in globals.css:

.card { @apply rounded-2xl border bg-white/90 backdrop-blur shadow-sm; }
*/