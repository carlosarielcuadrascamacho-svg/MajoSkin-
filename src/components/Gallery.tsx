"use client";

import AnimatedSection from "@/components/AnimatedSection";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { Camera } from "lucide-react";

const interactiveResults = [
  {
    title: "Limpieza Facial Profunda",
    desc: "Eliminación completa de impurezas, barritos y puntos negros. La piel recupera su textura natural, los poros se minimizan y el rostro luce más limpio y uniforme.",
    before: "/images/LimpiezaFacialAntes1.jpeg",
    after: "/images/LimpiezaFacialDespues1.jpeg",
  },
  {
    title: "Limpieza Facial Profunda",
    desc: "Extracción profunda de puntos negros y células muertas. Se libera la piel de impurezas acumuladas, dejando un cutis fresco, respirable y con luminosidad natural.",
    before: "/images/LimpiezaFacialAntes2.jpeg",
    after: "/images/LimpiezaFacialDespues2.jpeg",
  },
  {
    title: "Limpieza Facial Profunda",
    desc: "Tratamiento completo de limpieza que elimina impurezas, renueva la textura y devuelve el brillo natural. Ideal para pieles congestionadas o con tendencia acneica.",
    before: "/images/LimpiezaFacialAntes3.jpeg",
    after: "/images/LimpiezaFacialDespues3.jpeg",
  },
];

const staticResults = [
  {
    title: "Laminado de Ceja",
    desc: "Cejas alineadas, peinadas y con movimiento natural. Un acabado limpio que realza la mirada sin perder la esencia natural.",
    image: "/images/LaminadoDeCeja.jpeg",
  },
  {
    title: "Diseño de Cejas",
    desc: "Cejas perfectamente definidas según la anatomía facial. Resultado simétrico, armonioso y con una forma que enmarca el rostro.",
    image: "/images/DisenoDeCejas.jpeg",
  },
  {
    title: "Laminado + Diseño (Pinzas)",
    desc: "Técnica de laminado que domina la dirección del vello, combinada con diseño preciso con pinzas para una ceja impecable y definida.",
    image: "/images/LaminadoDisenoPinzas.jpeg",
  },
  {
    title: "Laminado + Diseño (Cera)",
    desc: "Laminado con acabado sedoso y diseño con cera para cejas definidas, limpias y con un contorno suave y prolijo.",
    image: "/images/LaminadoDisenoCera.jpeg",
  },
];

export default function Gallery() {
  return (
    <section id="resultados" className="bg-brand-100/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
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

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {interactiveResults.map((item, i) => (
            <AnimatedSection key={`slider-${i}`} delay={i * 100}>
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
                title={item.title}
                description={item.desc}
              />
            </AnimatedSection>
          ))}

          {staticResults.map((item, i) => (
            <AnimatedSection key={`static-${i}`} delay={(i + interactiveResults.length) * 100}>
              <article className="group overflow-hidden rounded-3xl bg-card p-4 shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-brand-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable="false"
                  />
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
    </section>
  );
}
