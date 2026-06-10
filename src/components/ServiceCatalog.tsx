"use client";

import { useState } from "react";
import type { CatalogEntry } from "@/data/mockData";
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
  Check,
} from "lucide-react";

const iconMap: Record<string, typeof Sparkles> = {
  "limpieza-facial": Droplets,
  "depilacion-cera": Sparkles,
  "diseno-cejas": Eye,
  "rf-lifting": Zap,
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

function getDesdePrice(entry: CatalogEntry): string | null {
  if (entry.type === "simple") return null;
  if (!entry.items || entry.items.length === 0) return null;
  const prices = entry.items.map((i) =>
    parseInt(i.price.replace(/[^0-9]/g, ""))
  );
  const min = Math.min(...prices);
  return `Desde $${min}`;
}

function getSelectedCount(
  entry: CatalogEntry,
  selected: Record<string, string[]>
): number {
  if (entry.type !== "category" || !entry.items) return 0;
  return (selected[entry.id] || []).length;
}


interface ServiceCatalogProps {
  services: CatalogEntry[];
}

export default function ServiceCatalog({ services }: ServiceCatalogProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [descExpanded, setDescExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
    setDescExpanded(null);
  };

  const toggleDesc = (id: string) => {
    setDescExpanded((prev) => (prev === id ? null : id));
    setExpanded(null);
  };

  const toggleItem = (categoryId: string, itemId: string) => {
    setSelected((prev) => {
      const current = prev[categoryId] || [];
      if (current.includes(itemId)) {
        return {
          ...prev,
          [categoryId]: current.filter((id) => id !== itemId),
        };
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
          {services.map((entry, idx) => {
            const Icon = iconMap[entry.id] || Sparkles;
            const open = expanded === entry.id;
            const isLast = idx === services.length - 1;

            if (entry.type === "simple") {
              const isComingSoon = entry.comingSoon;
              const isNew = entry.isNew;

              return (
                <article
                  key={entry.id}
                  className={`group flex flex-col rounded-3xl bg-card shadow-sm transition-all hover:shadow-md ${
                    isLast ? "md:col-span-2 lg:col-span-1" : ""
                  } ${
                    isComingSoon ? "border-2 border-dashed border-brand-300/40" : ""
                  } ${
                    isNew ? "ring-2 ring-brand-200/50 shadow-lg shadow-brand-200/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-4 p-6 pb-0">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${entry.gradient} text-white`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-semibold leading-snug text-brand-400">
                          {entry.title}
                        </h3>
                        {isNew && (
                          <span className="inline-flex animate-pulse items-center gap-1 rounded-full bg-gradient-to-r from-brand-200 to-brand-300 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-white shadow-sm">
                            <Sparkles className="h-3 w-3" />
                            NUEVO
                          </span>
                        )}
                        {isComingSoon && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                            PRÓXIMAMENTE
                          </span>
                        )}
                      </div>

                      {!isComingSoon && (
                        <div className="mt-1.5 flex flex-wrap items-center gap-3">
                          <span className="font-sans text-sm font-semibold text-brand-200">
                            {entry.price}
                          </span>
                          <span className="flex items-center gap-1 font-sans text-xs text-brand-400/70">
                            <Clock className="h-3 w-3" />
                            {entry.duration}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pt-3">
                    <p className="font-sans text-sm leading-relaxed text-brand-400/90">
                      {entry.shortDescription}
                    </p>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="mt-3 whitespace-pre-line font-sans text-sm leading-relaxed text-brand-400/80">
                        {entry.benefitDescription}
                      </p>
                    </div>
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

                    {!isComingSoon && (
                      <a
                        href={simpleWhatsAppLink(entry.title, entry.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-200 px-4 py-2 font-sans text-xs font-semibold text-white transition-all hover:bg-brand-300"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Agendar
                      </a>
                    )}
                  </div>
                </article>
              );
            }

            const desdePrice = getDesdePrice(entry);
            const selectedCount = getSelectedCount(entry, selected);
            const selectedItems = getSelectedItems(entry);

            return (
              <article
                key={entry.id}
                className={`group flex flex-col rounded-3xl bg-card shadow-sm transition-all hover:shadow-md ${
                  isLast ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-start gap-4 p-6 pb-0">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${entry.gradient} text-white`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-brand-400">
                        {entry.title}
                      </h3>
                      {!open && selectedCount > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-200/20 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-brand-200">
                          <Check className="h-2.5 w-2.5" />
                          {selectedCount} seleccionado{selectedCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {desdePrice && (
                        <span className="font-sans text-sm font-semibold text-brand-200">
                          {desdePrice}
                        </span>
                      )}
                      <span className="inline-flex items-center rounded-full bg-brand-100 px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-brand-300">
                        {entry.id === "diseno-cejas" ? "Elige opción" : "Elige opciones"}
                      </span>
                    </div>

                  </div>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    descExpanded === entry.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-brand-500/40 px-6 py-4">
                    <p className="font-sans text-sm leading-relaxed text-brand-400/80">
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
                              const itemSelected = (
                                selected[entry.id] || []
                              ).includes(item.id);
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => toggleItem(entry.id, item.id)}
                                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-brand-100"
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                                        itemSelected
                                          ? "border-brand-200 bg-brand-200 text-white"
                                          : "border-brand-500"
                                      }`}
                                    >
                                      {itemSelected && (
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

                          {selectedItems.length === 0 && (
                            <p className="mt-3 text-center font-sans text-xs text-brand-400/50">
                              Selecciona las zonas que deseas depilar
                            </p>
                          )}

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
                                {selectedItems.length} seleccionado
                                {selectedItems.length > 1 ? "s" : ""})
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
                    onClick={() => toggleDesc(entry.id)}
                    className="inline-flex items-center gap-1 font-sans text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
                  >
                    {descExpanded === entry.id ? (
                      <>
                        Menos <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        Saber más <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleExpand(entry.id)}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-200 px-4 py-2 font-sans text-xs font-semibold text-white transition-all hover:bg-brand-300"
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
