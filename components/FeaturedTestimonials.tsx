// components/FeaturedTestimonials.tsx
export default function FeaturedTestimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Satya card */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-indigo-700 text-sm font-semibold mb-2 uppercase tracking-wide">
          From Classroom to LinkedIn 🚀
        </p>
        <p className="italic text-slate-700">
          “Happy Teacher’s Day to the most special teacher in my life — your guidance has been a light in my journey…
          I am sure you will be happy to know that I am now working at LinkedIn, sir.”
        </p>
        <div className="mt-3 text-right">
          <span className="font-semibold text-slate-900">— Satya</span>
          <span className="text-slate-600 italic ml-2">Engineer, LinkedIn</span>
        </div>
      </div>

      {/* Sachin card */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-indigo-700 text-sm font-semibold mb-2 uppercase tracking-wide">
          Confidence Through Real Projects 💪
        </p>
        <p className="italic text-slate-700">
          “Before joining, I felt Python was only for hardcore devs. Within a few classes and real projects,
          I started enjoying coding and building my own automations!”
        </p>
        <div className="mt-3 text-right">
          <span className="font-semibold text-slate-900">— Sachin</span>
          <span className="text-slate-600 italic ml-2">Software Engineer, Pharma</span>
        </div>
      </div>
    </div>
  );
}