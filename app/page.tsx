export const dynamic = "force-static";
import Button from "@/components/ui/button";
import Subscribe from "@/components/Subscribe";
import {
  Check,
  Code,
  Cpu,
  GraduationCap,
  MessageCircle,
  MessageSquare,
  Rocket,
  Youtube,
} from "lucide-react";

// FIX: compute the year once on the server (no client-only differences)
const YEAR = new Date().getFullYear();

const features = [
  { icon: <Code className="w-6 h-6" aria-hidden />, title: "Beginner → Advanced Python", desc: "From basics to OOP, automation, APIs, and best practices." },
  { icon: <Cpu className="w-6 h-6" aria-hidden />, title: "AI & Automation", desc: "Hands-on intro to LLMs, agents, data pipelines, and task bots." },
  { icon: <Rocket className="w-6 h-6" aria-hidden />, title: "Real Projects", desc: "Portfolio-ready apps: web scrapers, dashboards, email bots, trading tools." },
  { icon: <GraduationCap className="w-6 h-6" aria-hidden />, title: "Career Support", desc: "Interview prep, GitHub polishing, resume bullet rewrites, and referrals." },
];

const tiers = [
  { name: "Starter", price: "$199", caption: "Self-paced + community", bullets: ["Full Python basics curriculum","Weekly live Q&A","Templates & cheat sheets","Community support"], cta: "Join Starter" },
  { name: "Pro", price: "$399", caption: "Live cohort + projects", bullets: ["Everything in Starter","Live classes + recordings","3 real-world projects","Certificate of completion"], cta: "Join Pro", highlight: true },
  { name: "Elite", price: "$799", caption: "1:1 mentorship + placement", bullets: ["Everything in Pro","1:1 mentorship (4 sessions)","Career projects & review","Job & freelance roadmap"], cta: "Apply for Elite" },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-fuchsia-50 text-slate-900">
      {/* Header */}
      <header className="header">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500 text-white">
              <svg viewBox="0 0 48 48" className="w-7 h-7" aria-hidden>
                <path d="M10 12h28v6H28v18h-8V18H10z M30 24h8v6h-8z" fill="#fff" />
              </svg>
            </div>
            <span className="font-semibold">ThinkPythonAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-slate-700">Features</a>
            <a href="#curriculum" className="hover:text-slate-700">Curriculum</a>
            <a href="#sample" className="hover:text-slate-700">Sample Class</a>
            <a href="#schools" className="hover:text-slate-700">For Schools</a>
            <a href="#pricing" className="hover:text-slate-700">Pricing</a>
            <a href="#faq" className="hover:text-slate-700">FAQ</a>
            <a href="/assistant" className="hover:text-slate-700">Assistant</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button href="https://forms.gle/D8W6ePzfzeszgPFr6">Join Live Demo</Button>
            <Button variant="secondary" href="/assistant" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Chat with us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container pt-12 pb-16 md:pt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Learn Python that gets you{" "}
              <span className="bg-gradient-to-r from-yellow-200 via-rose-200 to-sky-200 px-2 rounded">hired</span>.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Hands-on coding for real outcomes—automation, AI basics, and portfolio projects. Built for busy students, professionals, and schools.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="https://forms.gle/D8W6ePzfzeszgPFr6" className="px-5 py-2.5 text-base">Join the Next Live Demo</Button>
              <Button variant="secondary" href="#sample" className="px-5 py-2.5 text-base flex items-center gap-2"><Youtube className="w-4 h-4"/> Watch a Sample Class</Button>
              <Button variant="outline" href="/assistant" className="px-5 py-2.5 text-base flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Chat with us</Button>
              <a href="https://wa.me/16034170825" target="_blank" rel="noreferrer" className="text-sm underline flex items-center gap-2"><MessageCircle className="w-4 h-4"/> WhatsApp: +1 (603) 417-0825</a>
            </div>
            <div className="mt-2">
              <span className="badge">First 2 classes free*</span>
            </div>
            <div className="mt-3 text-sm text-slate-600">Email: <a className="underline" href="mailto:thinkpythonai@gmail.com">thinkpythonai@gmail.com</a> · Zelle accepted: <strong>+1 (603) 417-0825</strong></div>
            <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
             {/* Left: No fluff… */}
             <div className="text-xs text-slate-600">
               No fluff. Practical skills. Friendly community.
               <span className="badge ml-2">Now booking school partnerships</span>
             </div>
             {/* Right: Subscribe (compact) */}
             <div className="md:w-[380px]">
                <Subscribe compact label="Email" />
                <div className="mt-1 text-[11px] text-slate-500">
                  We’ll occasionally email demo dates and updates. Unsubscribe anytime.
                </div>
             </div>
            </div>
        </div>
          {/* Hero code card */}
          <div className="md:pl-8">
            <div className="card shadow">
              <div className="p-4 border-b">
                <div className="text-base font-semibold flex items-center gap-2"><Code className="w-5 h-5"/> Demo Preview</div>
              </div>
              <div className="p-4">
                <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-auto">
                  <pre>{`$ python hello.py
Hello, ThinkPythonAI!

# Mini automation example
import webbrowser
urls = ["https://thinkpythonai.com", "https://github.com", "https://python.org"]
for u in urls:
    webbrowser.open(u)
`}</pre>
                </div>
                <p className="mt-3 text-slate-600 text-sm">Real code, real outcomes. Build tools you can actually use at work or school.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-y">
        <div className="container py-8 grid md:grid-cols-3 gap-4 text-center text-sm text-slate-500">
          <div>Trusted by working professionals</div>
          <div>Built with real industry projects</div>
          <div>Recordings + community support</div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-16 scroll-mt-24">
        <h2 className="text-2xl md:text-4xl font-bold text-center">What you get</h2>
        <p className="text-center mt-2 text-slate-600">A tight curriculum that turns effort into results.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card hover:shadow-md transition-shadow">
              <div className="p-4 border-b">
                <div className="text-base font-semibold flex items-center gap-2">
                  <span className="inline-flex w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 via-fuchsia-100 to-cyan-100 items-center justify-center">{f.icon}</span>
                  {f.title}
                </div>
              </div>
              <div className="p-4 text-sm text-slate-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample video */}
      <section id="sample" className="container py-16 scroll-mt-24">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Watch a Sample Class</h2>
        <p className="text-center mt-2 text-slate-600">Get a feel for the pace, teaching style, and project-first approach.</p>
        <div className="mt-8 aspect-video w-full rounded-2xl overflow-hidden shadow bg-slate-900">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/T-bV1kp7oeo?si=S8Y7MmWI93Fzo5u4" title="ThinkPythonAI Sample Class" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
      </section>

      {/* Schools */}
      <section id="schools" className="container py-16 scroll-mt-24">
        <h2 className="text-2xl md:text-4xl font-bold text-center">For Schools & Districts</h2>
        <p className="text-center mt-2 text-slate-700">Flexible delivery for public & private schools: after-school clubs, semester electives, or teacher PD.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="card"><div className="p-4 border-b font-semibold">Standards-Aligned</div><div className="p-4 text-slate-600">Projects map to ISTE & CSTA guidelines with clear rubrics and outcomes.</div></div>
          <div className="card"><div className="p-4 border-b font-semibold">Teacher-Friendly</div><div className="p-4 text-slate-600">Slide decks, exercises, solutions, and LMS-ready content (Google Classroom).</div></div>
          <div className="card"><div className="p-4 border-b font-semibold">Flexible Delivery</div><div className="p-4 text-slate-600">Live virtual, hybrid, or on-site workshops—custom pacing and assessment.</div></div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="container py-16 scroll-mt-24">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Curriculum at a glance</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {[
            { week: "Week 1", title: "Python Foundations", items: ["Setup, VS Code, Git", "Data types & control flow", "Functions & modules"] },
            { week: "Week 2", title: "Automation Basics", items: ["File ops & CSV/Excel", "Web requests & APIs", "Email/SMS automations"] },
            { week: "Week 3", title: "Data & Dashboards", items: ["Pandas 101", "Matplotlib plots", "Streamlit dashboard"] },
            { week: "Week 4", title: "AI & Agents", items: ["LLM prompts & tools", "Simple agents", "Mini capstone"] },
          ].map((c) => (
            <div key={c.week} className="card">
              <div className="p-4 border-b font-semibold">{c.week}: {c.title}</div>
              <div className="p-4">
                <ul className="space-y-2 text-slate-600">
                  {c.items.map((i) => (<li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5"/>{i}</li>))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* FAQ */}
<section id="faq" className="container py-16 scroll-mt-24">
  <h2 className="text-2xl md:text-4xl font-bold text-center">Frequently Asked Questions</h2>
  <p className="text-center mt-2 text-slate-600">
    Quick answers. If you need more details, just <a href="/assistant" className="underline">chat with us</a>.
  </p>

  <div className="mt-8 grid md:grid-cols-2 gap-5 md:gap-6">
    {/* Audience */}
    <div className="card">
      <div className="p-5">
        <details className="group" open>
          <summary className="cursor-pointer font-semibold list-none">Who is this for?</summary>
          <div className="mt-2 text-slate-600 text-sm">
            Anyone who wants practical Python + AI skills: working professionals, non-working moms returning to work,
            career switchers (incl. AI/data roles), high-school students, kids preparing for college, and teachers/schools.
          </div>
        </details>
      </div>
    </div>

    {/* Trial / Refund policy */}
    <div className="card scroll-mt-28" id="refund-policy">
      <div className="p-5">
        <details className="group" open>
          <summary className="cursor-pointer font-semibold list-none">What’s your trial / refund policy?</summary>
          <div className="mt-2 text-slate-600 text-sm">
          You can attend the first two live classes and, if it’s not a fit, request a <strong>full refund before the third class begins</strong>—no questions asked.
  Refunds apply only to the program you enrolled in and <strong>can’t be transferred or credited to another program</strong>.
  (Policy may evolve; email us for the most current terms.)
          </div>
        </details>
      </div>
    </div>

    {/* Recordings */}
    <div className="card">
      <div className="p-5">
        <details className="group" >
          <summary className="cursor-pointer font-semibold list-none">Are classes recorded? What if I miss a session?</summary>
          <div className="mt-2 text-slate-600 text-sm">
            Yes—<strong>all sessions are recorded and shared daily</strong> so you can review or catch up anytime.
            Recordings remain available for <strong>90 days</strong>.
          </div>
        </details>
      </div>
    </div>

    {/* Time commitment */}
    <div className="card"><div className="p-5">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">How much time should I plan for each week?</summary>
        <div className="mt-2 text-slate-600 text-sm">About <strong>3–5 hours/week</strong> (live class + practice). Go faster or slower—everything is recorded.</div>
      </details>
    </div></div>

    {/* Prereqs / Tools */}
    <div className="card"><div className="p-5">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">Do I need prior coding experience or special tools?</summary>
        <div className="mt-2 text-slate-600 text-sm">No prior coding required. You’ll need a laptop, Chrome/Edge, and we’ll help you install Python and VS Code in Week 1.</div>
      </details>
    </div></div>

    {/* Payments */}
    <div className="card"><div className="p-5">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">How do payments work?</summary>
        <div className="mt-2 text-slate-600 text-sm">
          We currently accept <strong>Zelle: +1 (603) 417-0825</strong>. Email your receipt to <a className="underline" href="mailto:thinkpythonai@gmail.com">thinkpythonai@gmail.com</a>.
          Stripe cards will be added soon.
        </div>
      </details>
    </div></div>

    {/* Certificate & portfolio */}
    <div className="card"><div className="p-5">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">Do I get a certificate and portfolio projects?</summary>
        <div className="mt-2 text-slate-600 text-sm">Yes - In Progress!! — Pro/Elite tracks include a certificate and <strong>3 portfolio-ready projects</strong>, plus a mini-capstone in Week 4.</div>
      </details>
    </div></div>

    {/* Formats */}
    <div className="card"><div className="p-5">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">What formats do you offer?</summary>
        <div className="mt-2 text-slate-600 text-sm">Live cohorts with recordings, self-paced access, and school/district options (after-school, electives, PD).</div>
      </details>
    </div></div>

    {/* Schools / POs */}
    <div className="card"><div className="p-5">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">Can schools use invoices/POs and align to standards?</summary>
        <div className="mt-2 text-slate-600 text-sm">Yes—we support POs/invoices and align projects to <strong>ISTE</strong> & <strong>CSTA</strong> with clear rubrics and outcomes.</div>
      </details>
    </div></div>

    {/* Support */}
    <div className="card"><div className="p-5">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">What support do I get between classes?</summary>
        <div className="mt-2 text-slate-600 text-sm">
          Community Q&A, code reviews, and office-hours style help. You can also message us on{" "}
          <a className="underline" href="https://wa.me/16034170825" target="_blank" rel="noreferrer">WhatsApp</a>.
        </div>
      </details>
    </div></div>

    {/* Join demo */}
    <div className="card"><div className="p-5">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">How do I join the next live demo?</summary>
        <div className="mt-2 text-slate-600 text-sm">
          Use the form: <a className="underline" href="https://forms.gle/D8W6ePzfzeszgPFr6" target="_blank" rel="noreferrer">Join Live Demo</a>. We’ll send calendar details by email.
        </div>
      </details>
    </div></div>

    {/* Privacy / data */}
    <div className="card"><div className="p-4">
      <details className="group">
        <summary className="cursor-pointer font-semibold list-none">How do you handle privacy and my data?</summary>
        <div className="mt-2 text-slate-600 text-sm">
          We store only what’s needed for classes and support. You can request data removal anytime via{" "}
          <a className="underline" href="mailto:thinkpythonai@gmail.com">thinkpythonai@gmail.com</a>.
        </div>
      </details>
    </div></div>
  </div>
</section>

      {/* Pricing */}
      <section id="pricing" className="container py-16 scroll-mt-24">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Simple, transparent pricing</h2>
        <p className="text-center mt-2 text-slate-600">Pick a track and get started today. Scholarships available.</p>
        <div className="mt-3 text-center">
        <a href="#refund-policy" className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
        First 2 classes free*
        </a>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div key={t.name} className={`card ${t.highlight ? "border-slate-900 shadow-lg" : ""}`}>
              <div className="p-4 border-b flex items-center justify-between">
                <span className="font-semibold">{t.name}</span>
                <span className="text-slate-500 text-sm">{t.caption}</span>
              </div>
              <div className="p-4">
                <div className="text-4xl font-extrabold">{t.price}</div>
                <ul className="mt-4 space-y-2 text-slate-600">
                  {t.bullets.map((b) => (<li key={b} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5"/>{b}</li>))}
                </ul>
                <Button href="https://forms.gle/D8W6ePzfzeszgPFr6" className="w-full mt-6">{t.cta}</Button>
                <div className="mt-2 text-xs text-slate-600">Prefer Zelle? Pay <strong>+1 (603) 417-0825</strong> and email receipt to <a className="underline" href="mailto:thinkpythonai@gmail.com">thinkpythonai@gmail.com</a>.</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA row */}
      <section className="container pt-10 md:pt-14 pb-6">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div className="p-6 rounded-2xl shadow text-white" style={{ background: "linear-gradient(135deg,#4f46e5,#db2777,#06b6d4)" }}>
            <h3 className="text-2xl font-bold">Join the next live demo</h3>
            <p className="mt-2 text-white/90">See how we teach, what you’ll build, and how we help you land opportunities.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="brand" href="https://forms.gle/D8W6ePzfzeszgPFr6">Book a Seat</Button>
              <Button variant="outline" href="#sample">Watch Samples</Button>
              <Button variant="outline" href="/assistant" className="flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Chat with us</Button>
            </div>
            <div className="mt-4 bg-white/10 backdrop-blur rounded-xl p-3 max-w-md">
              <Subscribe compact label="Email" />
            </div>
          </div>
          <div className="card">
            <div className="p-4 border-b font-semibold">Have questions?</div>
            <div className="p-4">
              <p className="text-slate-600">Message us and we’ll get back in a few hours.</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border" href="mailto:thinkpythonai@gmail.com">thinkpythonai@gmail.com</a>
                <a className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border" href="https://wa.me/16034170825" target="_blank" rel="noreferrer">+1 (603) 417-0825</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating chat button */}
      <a href="/assistant" className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full shadow-lg px-5 py-3 bg-slate-900 text-white hover:opacity-90">
        <MessageSquare className="w-5 h-5" /> Chat with us
      </a>

      {/* Footer */}
      <footer className="mt-12 border-t">
        <div className="container py-10 grid md:grid-cols-3 gap-6 items-center">
          <div className="text-sm text-slate-600">© {YEAR} ThinkPythonAI · Payments accepted: <strong>Zelle +1 (603) 417-0825</strong>. All rights reserved.</div>
          <div className="text-sm text-slate-600 flex flex-wrap gap-4 justify-center">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <a href="https://linktr.ee/thinkpythonAI" target="_blank" rel="noreferrer" className="hover:underline">Linktree</a>
          </div>
          <div className="justify-self-end">
            <Button variant="secondary" href="https://forms.gle/D8W6ePzfzeszgPFr6">Join Live Demo</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
