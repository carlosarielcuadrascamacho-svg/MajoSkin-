"use client";

import { useState } from "react";
import type { FAQ } from "@/data/mockData";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="bg-brand-100/50 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
            Preguntas Frecuentes
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-base text-brand-400/70">
            Todo lo que necesitas saber antes de tu primera cita.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = open === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl bg-card shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left font-sans text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
                >
                  {faq.question}
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-brand-300" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-brand-300" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="border-t border-brand-500 px-6 pb-4 pt-3 font-sans text-sm leading-relaxed text-brand-400/70">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
