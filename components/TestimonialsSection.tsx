export default function TestimonialsSection() {
    const items = [
      {
        quote:
          "As a fresher I struggled to figure out how to actually apply Python beyond basic tutorials.\nAnkit’s sessions at ThinkPythonAI gave me real projects to put on my resume — from small apps to AI-powered tools.\nI feel so much more confident in interviews now because I can talk about what I built.",
        by: "R.K.",
        role: "Computer Science Graduate",
      },
      {
        quote:
          "I’d learned bits of Python before, but I never connected it to my daily work in QA and automation.\nAnkit’s ThinkPythonAI course changed that — we built frameworks, APIs, and even AI mini-projects that map to real team needs.\nHe always explains the why, not just the how.",
        by: "S.M.",
        role: "QA Engineer",
      },
      {
        quote:
          "My child finally enjoyed coding — small Python apps and how to use AI responsibly.\nIt’s rare to find a program that mixes coding with values like safe, respectful AI use.",
        by: "Parent",
        role: "Middle Schooler in Nashua",
      },
    ];
  
    return (
      <section id="testimonials" className="pt-2 pb-12 pl-3 md:pl-5">
        <p className="text-center text-slate-600 italic mt-2 mb-4">
          Feedback from freshers, professionals, and parents
        </p>

      <div className="grid md:grid-cols-3 gap-4">
          {items.map((t) => (
            <figure
              key={t.quote.slice(0, 30)}
              className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col justify-between"
            >
              <blockquote className="italic text-slate-700 space-y-3">
                {t.quote.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.by}</span>
                <span className="ml-2 text-slate-500">— {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
  
        <div className="text-center mt-6">
        <a href="/testimonials" className="text-indigo-700 font-semibold hover:underline">            
          See all testimonials →
        </a>
        </div>
      </section>
    );
  }