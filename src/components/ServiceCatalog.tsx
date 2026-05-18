"use client";

import { useState } from "react";
import type { Service } from "@/data/mockData";
import { WHATSAPP_NUMBER } from "@/data/mockData";
import {
  Sparkles,
  Eye,
  Droplets,
  Zap,
  ChevronDown,
  ChevronUp,
  Clock,
  MessageCircle,
} from "lucide-react";

const iconMap: Record<string, typeof Sparkles> = {
  "limpieza-facial": Droplets,
  "laminado-cejas": Eye,
  "diseno-mirada": Eye,
  dermoplanning: Sparkles,
  "hidratacion-facial": Droplets,
  "skin-boosters": Zap,
};

function serviceWhatsAppLink(title: string): string {
  const msg = `Hola Majo, quiero agendar una cita de ${title}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

interface ServiceCatalogProps {
  services: Service[];
}

export default function ServiceCatalog({ services }: ServiceCatalogProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="servicios" className="bg-brand-100/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
            Servicios
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-base text-brand-400/85 sm:text-lg">
            Tratamientos diseñados para que tu piel luzca y se sienta
            increíble.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.id] || Sparkles;
            const isOpen = expanded === service.id;

            return (
              <article
                key={service.id}
                className="group flex flex-col rounded-3xl bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4 p-6 pb-0">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-semibold leading-snug text-brand-400">
                      {service.title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <span className="font-sans text-sm font-semibold text-brand-200">
                        {service.price}
                      </span>
                      <span className="flex items-center gap-1 font-sans text-xs text-brand-400/70">
                        <Clock className="h-3 w-3" />
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pt-3">
                  <p className="font-sans text-sm leading-relaxed text-brand-400/90">
                    {service.shortDescription}
                  </p>

                  {isOpen && (
                    <p className="mt-3 font-sans text-sm leading-relaxed text-brand-400/80">
                      {service.benefitDescription}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between px-6 pb-5 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded(isOpen ? null : service.id)
                    }
                    className="inline-flex items-center gap-1 font-sans text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
                  >
                    {isOpen ? (
                      <>
                        Menos <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        Saber más <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                  <a
                    href={serviceWhatsAppLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-200 px-4 py-2 font-sans text-xs font-semibold text-white transition-all hover:bg-brand-300"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Agendar
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
