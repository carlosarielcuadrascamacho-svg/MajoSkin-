"use client";

import AnimatedSection from "@/components/AnimatedSection";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { Sparkles, Camera } from "lucide-react";

const interactiveResults = [
  {
    title: "Limpieza Facial Profunda",
    desc: "Eliminación completa de impurezas, barritos y puntos negros. Minimiza el tamaño de los poros y devuelve una textura lisa y uniforme a la piel.",
    before: "/images/facial-antes.png",
    after: "/images/facial-despues.png",
  },
  {
    title: "Hidratación & Luminosidad",
    desc: "Nutrición celular profunda para pieles apagadas o secas. Restaura el brillo natural y la elasticidad, logrando un efecto de jugosidad inmediato.",
    before: "/images/hidratacion-antes.png",
    after: "/images/hidratacion-despues.png",
  },
];

const staticResults = [
  {
    title: "Laminado de Cejas",
    desc: "Cejas perfectamente peinadas, definidas con movimiento natural y una simetría impecable que realza tu rostro.",
    gradient: "from-brand-200 to-brand-300",
  },
  {
    title: "Diseño de Miradas",
    desc: "Pestañas elevadas, mirada descansada y abierta sin necesidad de rímel, con un acabado limpio y profesional.",
    gradient: "from-brand-300 to-brand-200",
  },
];

export default function Gallery() {
  return (
    <section id="resultados" className="bg-brand-100/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-200/10 px-4 py-1 text-xs font-semibold text-brand-300">
              <Camera className="h-3 w-3" />
              Casos de Éxito
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
              Resultados Reales
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-sans text-base text-brand-400/85 sm:text-lg">
              Desliza el control interactivo para ver el cambio de la piel antes
              y después de mis tratamientos.
            </p>
          </div>
        </AnimatedSection>

        {/* Results Grid */}
        <div className="mt-12 flex flex-col gap-8">
          {/* Interactive Sliders (Facial Care) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {interactiveResults.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <BeforeAfterSlider
                  beforeImage={item.before}
                  afterImage={item.after}
                  title={item.title}
                  description={item.desc}
                />
              </AnimatedSection>
            ))}
          </div>

          {/* Static Showcase Cards (Brows & Lashes) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {staticResults.map((item, i) => (
              <AnimatedSection key={item.title} delay={(i + 2) * 100}>
                <article className="group overflow-hidden rounded-3xl bg-card p-4 shadow-sm transition-all hover:shadow-md">
                  <div
                    className={`flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} select-none`}
                  >
                    <Sparkles className="h-12 w-12 text-white/50 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                  <div className="mt-4 px-1 pb-1">
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
      </div>
    </section>
  );
}
