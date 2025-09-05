export const metadata = { title: "Courses | ThinkPythonAI" };

export default function CoursesPage() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-extrabold">Courses</h1>
      <p className="text-slate-600 mt-2">Pick a path that fits your goals. For detailed outlines please send us a message.</p>

      <section id="pro" className="mt-8">
        <div className="card">
          <div className="p-4 border-b font-semibold">Working Professionals</div>
          <div className="p-4 text-slate-700 space-y-2 text-sm">
            <p>Python for automation, testing frameworks (Robot/PyTest), APIs, CI/CD, data tools, and AI integrations.</p>
            <ul className="list-disc ml-5">
              <li>Ship an internal tool / test automation suite</li>
              <li>Dashboards & alerts for business or SRE use‑cases</li>
              <li>AI copilots & productivity scripts</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="freshers" className="mt-6">
        <div className="card">
          <div className="p-4 border-b font-semibold">Freshers / Recent Graduates</div>
          <div className="p-4 text-slate-700 space-y-2 text-sm">
            <p>Foundations to portfolio: Python → data → web/API → AI basics. Build 3 showcase projects for your resume.</p>
            <ul className="list-disc ml-5">
              <li>Clean GitHub repos with READMEs</li>
              <li>Interview‑oriented coding practice</li>
              <li>Career guidance & resume bullet rewrites</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="kids" className="mt-6">
        <div className="card">
          <div className="p-4 border-b font-semibold">Kids & Schools</div>
          <div className="p-4 text-slate-700 space-y-2 text-sm">
            <p>
              Early exposure to Python builds confidence and creativity. Kids
              learn coding with games, digital tools, and safe AI practices.
            </p>
            <ul className="list-disc ml-5">
              <li>Fun projects: chatbots, InstaGist, digital citizenship detector</li>
              <li>School-friendly delivery: after-school clubs, electives, or workshops</li>
              <li>Focus on responsible AI & teamwork</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
