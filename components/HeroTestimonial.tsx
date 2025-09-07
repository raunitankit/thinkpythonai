// components/HeroTestimonial.tsx
export default function HeroTestimonial({
    text,
    author,
    role,
    label,
  }: {
    text: string;
    author: string;
    role?: string;
    label?: string; // e.g. "💡 From Classroom to LinkedIn 🚀"
  }) {
    return (
      <section className="mb-10">
        <div className="bg-gradient-to-r from-indigo-50 to-fuchsia-50 p-8 rounded-2xl shadow-md border">
          <blockquote className="italic text-slate-800 whitespace-pre-line text-lg leading-relaxed">
            {text}
          </blockquote>
          <div className="mt-4 text-right">
            <p className="font-semibold text-slate-900">— {author}</p>
            {role ? <p className="text-slate-600 italic">{role}</p> : null}
          </div>
        </div>
      </section>
    );
  }