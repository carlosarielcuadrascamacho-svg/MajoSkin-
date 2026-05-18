"use client";

import { useState, useEffect } from "react";
import { products, WHATSAPP_NUMBER } from "@/data/mockData";
import {
  Sparkles,
  RotateCcw,
  MessageCircle,
  Check,
  ChevronRight,
  HelpCircle,
  X,
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: Record<string, number>;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Cómo sientes tu rostro unos 20 minutos después de lavarlo?",
    options: [
      { text: "Tirante, rígido o como si me \"apretara\" la piel.", points: { seca: 2 } },
      { text: "Suave y limpio, pero empieza a salir brillo en la frente y nariz.", points: { mixta: 2 } },
      { text: "Grasoso o brillante en casi todo el rostro.", points: { grasa: 2 } },
      { text: "Normal, pero opaco y sin mucho brillo natural.", points: { iluminador: 2 } },
    ],
  },
  {
    id: 2,
    text: "¿Con qué frecuencia te salen imperfecciones (barritos, espinillas o puntos negros)?",
    options: [
      { text: "Casi nunca o nunca. Mi piel es muy lisa pero a veces se descama.", points: { seca: 2 } },
      { text: "Solo en la zona T (frente, nariz y barbilla), el resto está limpio.", points: { mixta: 2 } },
      { text: "Muy seguido y en diferentes zonas de la cara (frente, mejillas, barbilla).", points: { grasa: 2 } },
      { text: "Rara vez, pero noto líneas de expresión, arruguitas o falta de firmeza.", points: { antiedad: 2 } },
    ],
  },
  {
    id: 3,
    text: "Si te miras de cerca en el espejo, ¿cómo se ven tus poros?",
    options: [
      { text: "No se notan para nada, son súper pequeñitos.", points: { seca: 2 } },
      { text: "Se notan abiertos únicamente en la nariz y la frente.", points: { mixta: 2 } },
      { text: "Se ven abiertos y grandes en casi todo el rostro.", points: { grasa: 2 } },
      { text: "De tamaño normal, pero la piel se ve cansada o apagada.", points: { iluminador: 2 } },
    ],
  },
  {
    id: 4,
    text: "¿Cómo reacciona tu piel cuando usas cremas nuevas o te expones al sol o al viento?",
    options: [
      { text: "Se pone roja, me arde o se siente muy sensible con facilidad.", points: { seca: 2 } },
      { text: "En la frente y nariz se pone brillosa, pero mis mejillas se sienten normales.", points: { mixta: 2 } },
      { text: "Resiste casi todo, solo produce más brillo o grasa de lo normal.", points: { grasa: 2 } },
      { text: "Se ve marchita, deshidratada y pierde su color saludable rápidamente.", points: { iluminador: 2 } },
    ],
  },
  {
    id: 5,
    text: "Si pasas un papelito absorbente o un pañuelo por tu rostro a mitad de la tarde, ¿qué pasa?",
    options: [
      { text: "Sale completamente seco, e incluso siento la piel algo acartonada.", points: { seca: 2 } },
      { text: "Sale con grasa en la frente y la nariz, pero seco en las mejillas.", points: { mixta: 2 } },
      { text: "Sale bastante grasoso por cualquier zona del rostro.", points: { grasa: 2 } },
      { text: "Sale seco, pero noto que mi piel se ve apagada y cansada.", points: { iluminador: 2 } },
    ],
  },
  {
    id: 6,
    text: "¿Cuál es el cambio principal que te gustaría ver en tu piel hoy?",
    options: [
      { text: "Sentirla más suave, hidratada y sin esa sensación de resequedad.", points: { seca: 2 } },
      { text: "Equilibrarla: que no brille la frente pero tampoco se sientan secas las mejillas.", points: { mixta: 2 } },
      { text: "Controlar la grasa, los barritos y limpiar los poros obstruidos.", points: { grasa: 2 } },
      { text: "Suavizar arrugas, líneas de expresión y mejorar la firmeza.", points: { antiedad: 2 } },
      { text: "Que se vea radiante, jugosa y con un brillo saludable (quitar lo opaco).", points: { iluminador: 2 } },
    ],
  },
];

const skinTypesInfo: Record<
  string,
  {
    name: string;
    description: string;
    productId: string;
  }
> = {
  seca: {
    name: "Piel Seca",
    description:
      "Tu piel produce menos grasa natural de la necesaria. Esto debilita tu barrera protectora, haciendo que pierda humedad fácilmente. Noto rigidez, deshidratación y tendencia a la descamación o rojez. Necesitas hidratación ultra-profunda y nutrición protectora.",
    productId: "kit-piel-seca",
  },
  grasa: {
    name: "Piel Grasa",
    description:
      "Tus glándulas sebáceas tienen una hiperactividad que produce exceso de grasa. Esto suele manifestarse con brillos constantes, poros abiertos e imperfecciones como barritos o puntos negros. Tu enfoque ideal es el control de sebo y una limpieza purificante profunda.",
    productId: "kit-piel-grasa",
  },
  mixta: {
    name: "Piel Mixta",
    description:
      "¡El tipo de piel más común! Tienes una combinación de dos mundos: exceso de grasa e imperfecciones en la 'Zona T' (frente, nariz y barbilla), mientras que tus mejillas y contorno de ojos son secos o normales. Necesitas equilibrar y regular ambas zonas.",
    productId: "kit-piel-mixta",
  },
  antiedad: {
    name: "Piel con Signos de Edad",
    description:
      "Tu principal enfoque hoy es combatir la pérdida natural de colágeno, elastina y firmeza. Noto líneas finas, arruguitas de expresión o falta de elasticidad. Te beneficiarás enormemente de ingredientes antioxidantes, tensores y estimuladores de renovación celular.",
    productId: "kit-antiedad",
  },
  iluminador: {
    name: "Piel Opaca / Cansada",
    description:
      "Tu piel ha perdido su vitalidad y brillo natural debido a la acumulación de células muertas, estrés o falta de antioxidantes. Se ve cansada, marchita y deshidratada. Necesitas revivirla con luminosidad, exfoliación enzimática suave y vitaminas energizantes.",
    productId: "kit-iluminador",
  },
};

export default function SkinQuiz() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [diagnosedType, setDiagnosedType] = useState<string | null>(null);

  // Escuchar el hash de la URL para activar el test y hacer scroll suave
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#abrir-test-piel") {
        setIsActive(true);
        setTimeout(() => {
          const element = document.getElementById("test-piel");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
        window.history.pushState(
          "",
          document.title,
          window.location.pathname + window.location.search
        );
      }
    };
    window.addEventListener("hashchange", handleHash);
    if (window.location.hash === "#abrir-test-piel") {
      setIsActive(true);
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleSelectOption = (optionText: string) => {
    const nextAnswers = { ...answers, [questions[currentStep].id]: optionText };
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const result = calculateResult(nextAnswers);
      setDiagnosedType(result);
      setShowResult(true);
    }
  };

  const calculateResult = (currentAnswers: Record<number, string>) => {
    const scores: Record<string, number> = {
      seca: 0,
      grasa: 0,
      mixta: 0,
      antiedad: 0,
      iluminador: 0,
    };

    questions.forEach((q) => {
      const selected = currentAnswers[q.id];
      const option = q.options.find((opt) => opt.text === selected);
      if (option && option.points) {
        Object.entries(option.points).forEach(([key, val]) => {
          scores[key] = (scores[key] || 0) + val;
        });
      }
    });

    let bestType = "mixta";
    let maxScore = -1;

    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        bestType = type;
      } else if (score === maxScore) {
        const priority = ["mixta", "grasa", "seca", "antiedad", "iluminador"];
        if (priority.indexOf(type) < priority.indexOf(bestType)) {
          bestType = type;
        }
      }
    });

    return bestType;
  };

  const handleClose = () => {
    setIsActive(false);
    handleReset();
    // Scroll suave de vuelta al banner
    setTimeout(() => {
      const element = document.getElementById("test-piel");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setDiagnosedType(null);
  };

  const getWhatsAppLink = (typeName: string, kitName: string) => {
    const text = `Hola María, realicé el test de diagnóstico en tu página web y mi resultado fue "${typeName}". Me encantaría agendar una cita y adquirir mi "${kitName}"! ✨`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const currentQuestion = questions[currentStep];
  const progressPercent = Math.round((currentStep / questions.length) * 100);

  const diagnosedInfo = diagnosedType ? skinTypesInfo[diagnosedType] : null;
  const recommendedProduct = diagnosedInfo
    ? products.find((p) => p.id === diagnosedInfo.productId)
    : null;

  return (
    <section
      id="test-piel"
      className="bg-brand-100/30 py-20 md:py-28 border-t border-brand-200/10 transition-all duration-500 ease-in-out"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        {!isActive ? (
          /* 1. Banner elegante por defecto */
          <div className="text-center animate-fade-in">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-200/10 px-4 py-1 text-xs font-semibold text-brand-300">
              <Sparkles className="h-3 w-3" />
              Asesoría Virtual
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-brand-400 md:text-4xl">
              ¿No sabes cuál es tu kit ideal?
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-sans text-base text-brand-400/85">
              Descubre las necesidades reales de tu rostro en 1 minuto respondiendo unas sencillas preguntas.
            </p>
            <button
              type="button"
              onClick={() => setIsActive(true)}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-200 px-8 font-sans text-sm font-semibold text-white transition-all hover:bg-brand-300 hover:shadow-sm active:scale-95"
            >
              Iniciar Diagnóstico de Piel →
            </button>
          </div>
        ) : (
          /* 2. Cuestionario en flujo de página (Inline Card) */
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-card p-6 shadow-sm sm:p-10 dark:border-brand-500/10 animate-fade-in">
            {/* Close Cross Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Cerrar diagnóstico"
              className="absolute top-4 right-4 text-brand-400/50 hover:text-brand-400 hover:bg-brand-100 p-2 rounded-xl transition-all dark:hover:bg-brand-500/20"
            >
              <X className="h-5 w-5" />
            </button>

            {!showResult ? (
              <div>
                {/* Header */}
                <div className="flex items-center justify-between text-[10px] font-semibold text-brand-300 tracking-wider pr-14">
                  <span>PREGUNTA {currentStep + 1} DE {questions.length}</span>
                  <span>{progressPercent}% COMPLETADO</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-brand-100 dark:bg-brand-500/20">
                  <div
                    className="h-full rounded-full bg-brand-200 transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Question Area */}
                <div className="mt-6">
                  <h3 className="font-serif text-lg font-medium leading-snug text-brand-400 sm:text-xl flex gap-2">
                    <HelpCircle className="h-5 w-5 text-brand-200 shrink-0 mt-0.5" />
                    {currentQuestion.text}
                  </h3>

                  <div className="mt-6 flex flex-col gap-3">
                    {currentQuestion.options.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(option.text)}
                        className="group flex w-full items-center justify-between rounded-2xl border border-brand-500/20 bg-brand-50/50 p-4 text-left font-sans text-sm text-brand-400 transition-all duration-200 hover:border-brand-200 hover:bg-brand-100/50 hover:shadow-sm active:scale-[0.99]"
                      >
                        <span className="pr-4">{option.text}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-brand-300 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-8 flex items-center justify-between border-t border-brand-500/10 pt-4">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-brand-300 hover:text-brand-200 transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Pregunta anterior
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleClose}
                    className="font-sans text-xs font-semibold text-brand-400/60 hover:text-brand-400 transition-colors"
                  >
                    Cancelar y Salir
                  </button>
                </div>
              </div>
            ) : (
              /* Results Area */
              <div className="animate-fade-in">
                <div className="text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-200/20 text-brand-200">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-brand-400">
                    ¡Diagnóstico Listo!
                  </h3>
                  <p className="mt-1 font-sans text-[10px] text-brand-300 uppercase tracking-widest font-semibold">
                    Tu tipo de piel es:
                  </p>
                  <div className="mt-3 inline-block rounded-2xl bg-gradient-to-br from-brand-200 to-brand-300 px-6 py-2 text-base font-serif font-semibold text-white shadow-sm">
                    {diagnosedInfo?.name}
                  </div>
                </div>

                <div className="mt-6 border-t border-brand-500/10 pt-4">
                  <p className="font-sans text-sm leading-relaxed text-brand-400/90">
                    {diagnosedInfo?.description}
                  </p>
                </div>

                {recommendedProduct && (
                  <div className="mt-6 rounded-3xl border border-brand-500/10 bg-brand-50/50 p-5">
                    <span className="inline-block rounded-lg bg-brand-200/10 px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-wider text-brand-200">
                      Rutina Recomendada
                    </span>
                    <h4 className="mt-2 font-serif text-base font-semibold text-brand-400">
                      {recommendedProduct.name}
                    </h4>

                    <ul className="mt-3 flex flex-col gap-2">
                      {recommendedProduct.includes.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 font-sans text-sm text-brand-400/85"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-200" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row border-t border-brand-500/10 pt-6">
                  {diagnosedInfo && recommendedProduct && (
                    <a
                      href={getWhatsAppLink(
                        diagnosedInfo.name,
                        recommendedProduct.name
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-200 font-sans text-sm font-semibold text-white transition-all hover:bg-brand-300 hover:shadow-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Preguntar por mi Kit con María
                    </a>
                  )}
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 sm:flex-none inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-brand-500/30 bg-transparent px-6 font-sans text-sm font-semibold text-brand-400 transition-all hover:border-brand-200 hover:text-brand-300"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Repetir Test
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 sm:flex-none inline-flex h-12 items-center justify-center rounded-2xl bg-brand-100 hover:bg-brand-200/20 px-6 font-sans text-sm font-semibold text-brand-400 transition-all"
                    >
                      Finalizar y Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
