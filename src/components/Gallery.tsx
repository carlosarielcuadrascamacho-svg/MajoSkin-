import AnimatedSection from "@/components/AnimatedSection";
import { Sparkles } from "lucide-react";

const results = [
  {
    title: "Limpieza Facial Profunda",
    desc: "Antes y después. Poros liberados, luminosidad recuperada.",
    gradient: "from-brand-200 to-brand-300",
  },
  {
    title: "Laminado de Cejas",
    desc: "Cejas definidas con movimiento natural y simetría perfecta.",
    gradient: "from-brand-300 to-brand-200",
  },
  {
    title: "Diseño de Miradas",
    desc: "Pestañas elevadas, mirada abierta y sin necesidad de rímel.",
    gradient: "from-brand-200 to-brand-100",
  },
  {
    title: "Hidratación Facial",
    desc: "Piel nutrida, tersa y con elasticidad visible desde la primera sesión.",
    gradient: "from-brand-100 to-brand-200",
  },
];

export default function Gallery() {
  return (
    <section className="bg-brand-100/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
              Resultados Reales
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-sans text-base text-brand-400/85 sm:text-lg">
              El compromiso con tu piel se ve en los resultados.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {results.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 100}>
              <article className="group overflow-hidden rounded-3xl bg-card shadow-sm transition-all hover:shadow-md">
                <div
                  className={`flex h-56 items-center justify-center bg-gradient-to-br ${item.gradient}`}
                >
                  <Sparkles className="h-12 w-12 text-white/60" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-brand-400">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-brand-400/90">
                    {item.desc}
                  </p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
