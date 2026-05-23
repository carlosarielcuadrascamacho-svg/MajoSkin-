"use client";

import { useState } from "react";
import type { CatalogEntry } from "@/data/mockData";
import { WHATSAPP_NUMBER } from "@/data/mockData";
import {
  Sparkles,
  Eye,
  Droplets,
  ChevronDown,
  ChevronUp,
  Clock,
  MessageCircle,
  Check,
} from "lucide-react";

const iconMap: Record<string, typeof Sparkles> = {
  "limpieza-facial": Droplets,
  "depilacion-cera": Sparkles,
  "diseno-cejas": Eye,
};

function simpleWhatsAppLink(title: string, price: string): string {
  const msg = `¡Hola Majo! Quiero agendar una cita de ${title} (${price})`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function itemWhatsAppLink(name: string, price: string): string {
  const msg = `¡Hola Majo! Quiero agendar una cita de ${name} (${price})`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function multiWhatsAppLink(
  items: { name: string; price: string }[]
): string {
  const lines = items.map((i) => `• ${i.name} (${i.price})`);
  const msg = `¡Hola Majo! Quiero agendar una cita para:\n${lines.join("\n")}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

interface ServiceCatalogProps {
  services: CatalogEntry[];
}

export default function ServiceCatalog({ services }: ServiceCatalogProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const toggleItem = (categoryId: string, itemId: string) => {
    setSelected((prev) => {
      const current = prev[categoryId] || [];
      if (current.includes(itemId)) {
        return { ...prev, [categoryId]: current.filter((id) => id !== itemId) };
      }
      return { ...prev, [categoryId]: [...current, itemId] };
    });
  };

  const getSelectedItems = (entry: CatalogEntry) => {
    if (entry.type !== "category" || !entry.items) return [];
    const selectedIds = selected[entry.id] || [];
    return entry.items.filter((item) => selectedIds.includes(item.id));
  };

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
          {services.map((entry) => {
            const Icon = iconMap[entry.id] || Sparkles;
            const open = expanded === entry.id;

            if (entry.type === "simple") {
              return (
                <article
                  key={entry.id}
                  className="group flex flex-col rounded-3xl bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-4 p-6 pb-0">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${entry.gradient} text-white`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-brand-400">
                        {entry.title}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap items-center gap-3">
                        <span className="font-sans text-sm font-semibold text-brand-200">
                          {entry.price}
                        </span>
                        <span className="flex items-center gap-1 font-sans text-xs text-brand-400/70">
                          <Clock className="h-3 w-3" />
                          {entry.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pt-3">
                    <p className="font-sans text-sm leading-relaxed text-brand-400/90">
                      {entry.shortDescription}
                    </p>

                    {open && (
                      <p className="mt-3 font-sans text-sm leading-relaxed text-brand-400/80">
                        {entry.benefitDescription}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between px-6 pb-5 pt-5">
                    <button
                      type="button"
                      onClick={() => toggleExpand(entry.id)}
                      className="inline-flex items-center gap-1 font-sans text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
                    >
                      {open ? (
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
                      href={simpleWhatsAppLink(entry.title, entry.price)}
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
            }

            const selectedItems = getSelectedItems(entry);

            return (
              <article
                key={entry.id}
                className="group flex flex-col rounded-3xl bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4 p-6 pb-0">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${entry.gradient} text-white`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-semibold leading-snug text-brand-400">
                      {entry.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-brand-400/90">
                      {entry.shortDescription}
                    </p>
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  {entry.items && (
                    <div className="border-t border-brand-500/40 px-6 py-4">
                      {entry.selectionType === "multi" ? (
                        <>
                          <div className="space-y-1">
                            {entry.items.map((item) => {
                              const isSelected = (
                                selected[entry.id] || []
                              ).includes(item.id);
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() =>
                                    toggleItem(entry.id, item.id)
                                  }
                                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-brand-100"
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                                        isSelected
                                          ? "border-brand-200 bg-brand-200 text-white"
                                          : "border-brand-500"
                                      }`}
                                    >
                                      {isSelected && (
                                        <Check className="h-3 w-3" />
                                      )}
                                    </div>
                                    <span className="font-sans text-sm text-brand-400">
                                      {item.name}
                                    </span>
                                  </div>
                                  <span className="font-sans text-sm font-semibold text-brand-200">
                                    {item.price}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {selectedItems.length > 0 && (
                            <div className="mt-4">
                              <a
                                href={multiWhatsAppLink(selectedItems)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-brand-200 px-4 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:bg-brand-300"
                              >
                                <MessageCircle className="h-4 w-4" />
                                Enviar a WhatsApp (
                                {selectedItems.length} seleccionados)
                              </a>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="space-y-2">
                          {entry.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between rounded-xl px-3 py-2.5"
                            >
                              <div className="flex flex-col gap-1">
                                <span className="font-sans text-sm text-brand-400">
                                  {item.name}
                                </span>
                                <span className="font-sans text-sm font-semibold text-brand-200">
                                  {item.price}
                                </span>
                              </div>
                              <a
                                href={itemWhatsAppLink(item.name, item.price)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-200 px-3.5 py-1.5 font-sans text-xs font-semibold text-white transition-all hover:bg-brand-300"
                              >
                                <MessageCircle className="h-3 w-3" />
                                Agendar
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between px-6 pb-5 pt-5">
                  <button
                    type="button"
                    onClick={() => toggleExpand(entry.id)}
                    className="inline-flex items-center gap-1 font-sans text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
                  >
                    {open ? (
                      <>
                        Cerrar <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        Ver opciones <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
