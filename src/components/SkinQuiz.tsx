"use client";

import { useState } from "react";
import { products, WHATSAPP_NUMBER } from "@/data/mockData";
import {
  Sparkles,
  RotateCcw,
  MessageCircle,
  Check,
  ChevronRight,
  BookOpen,
  HelpCircle,
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
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [diagnosedType, setDiagnosedType] = useState<string | null>(null);

  const handleSelectOption = (optionText: string) => {
    const nextAnswers = { ...answers, [questions[currentStep].id]: optionText };
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
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
  const progressPercent = Math.round(((currentStep) / questions.length) * 100);

  // Find product details from mockData based on diagnostic result
  const diagnosedInfo = diagnosedType ? skinTypesInfo[diagnosedType] : null;
  const recommendedProduct = diagnosedInfo
    ? products.find((p) => p.id === diagnosedInfo.productId)
    : null;

  return (
    <section id="test-piel" className="bg-brand-100/30 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-200/10 px-4 py-1 text-xs font-semibold text-brand-300">
            <Sparkles className="h-3 w-3" />
            Asesoría Personalizada
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
            Test de Diagnóstico de Piel
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-base text-brand-400/85">
            Descubre las necesidades reales de tu rostro en 1 minuto. Responde
            estas sencillas preguntas cotidianas sin tecnicismos.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-brand-500/10 bg-card p-6 shadow-sm backdrop-blur-md sm:p-10 transition-all dark:border-brand-500/5">
          {!showResult ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs font-semibold text-brand-300">
                <span>PREGUNTA {currentStep + 1} DE {questions.length}</span>
                <span>{progressPercent}% COMPLETADO</span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-brand-100 dark:bg-brand-500/20">
                <div
                  className="h-full rounded-full bg-brand-200 transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Question card */}
              <div className="mt-8">
                <h3 className="font-serif text-xl font-medium leading-snug text-brand-400 sm:text-2xl flex gap-2">
                  <HelpCircle className="h-6 w-6 text-brand-200 shrink-0 mt-0.5" />
                  {currentQuestion.text}
                </h3>

                <div className="mt-8 flex flex-col gap-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(option.text)}
                      className="group flex w-full items-center justify-between rounded-2xl border border-brand-500/20 bg-brand-50/50 p-4 text-left font-sans text-sm text-brand-400 transition-all duration-200 hover:border-brand-200 hover:bg-brand-100/50 hover:shadow-sm"
                    >
                      <span className="pr-4">{option.text}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-brand-300 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>

              {currentStep > 0 && (
                <div className="mt-8 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-brand-300 hover:text-brand-200 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Regresar a la pregunta anterior
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-200/20 text-brand-200">
                  <Check className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-400">
                  ¡Diagnóstico Listo!
                </h3>
                <p className="mt-1 font-sans text-xs text-brand-300 uppercase tracking-widest font-semibold">
                  Tu tipo de piel es:
                </p>
                <div className="mt-3 inline-block rounded-2xl bg-gradient-to-br from-brand-200 to-brand-300 px-6 py-2 text-lg font-serif font-semibold text-white shadow-sm">
                  {diagnosedInfo?.name}
                </div>
              </div>

              <div className="mt-8 border-t border-brand-500/10 pt-6">
                <p className="font-sans text-sm leading-relaxed text-brand-400/90">
                  {diagnosedInfo?.description}
                </p>
              </div>

              {recommendedProduct && (
                <div className="mt-8 rounded-3xl border border-brand-500/10 bg-brand-50/50 p-5 sm:p-6">
                  <span className="inline-block rounded-lg bg-brand-200/10 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-brand-200">
                    Rutina Recomendada
                  </span>
                  <h4 className="mt-2 font-serif text-lg font-semibold text-brand-400 sm:text-xl">
                    {recommendedProduct.name}
                  </h4>

                  <ul className="mt-4 flex flex-col gap-2">
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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-brand-500/30 bg-transparent px-6 font-sans text-sm font-semibold text-brand-400 transition-all hover:border-brand-200 hover:text-brand-300"
                >
                  <RotateCcw className="h-4 w-4" />
                  Repetir Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
