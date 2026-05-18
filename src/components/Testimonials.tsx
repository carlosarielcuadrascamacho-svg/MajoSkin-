import type { Testimonial } from "@/data/mockData";
import { Star } from "lucide-react";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="bg-brand-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
            Lo que dicen mis clientas
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-base text-brand-400/85">
            La satisfacción de quienes confían en mi trabajo habla por sí sola.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="flex flex-col rounded-3xl bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-semibold text-white`}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-brand-400">
                    {t.name}
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-brand-200 text-brand-200"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-4 font-sans text-sm leading-relaxed text-brand-400/90">
                &ldquo;{t.text}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
