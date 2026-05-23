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
  AlertCircle,
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

function limpiezaWhatsAppLink(): string {
  const msg = `¡Hola Majo! Quiero agendar una cita de Limpieza Facial Profunda ($300)`;
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

const WARNING_TEXT =
  "Por límite de tiempo, agendar por separado de la limpieza facial.";

interface ServiceCatalogProps {
  services: CatalogEntry[];
}

export default function ServiceCatalog({ services }: ServiceCatalogProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [selectedSimple, setSelectedSimple] = useState<string | null>(null);

  const hasDepilacion = (selected["depilacion-cera"]?.length ?? 0) > 0;
  const hasLimpieza = selectedSimple === "limpieza-facial";

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const toggleSimpleSelection = (id: string) => {
    if (id === "limpieza-facial" && hasDepilacion) return;
    setSelectedSimple((prev) => (prev === id ? null : id));
  };

  const toggleItem = (categoryId: string, itemId: string) => {
    if (categoryId === "depilacion-cera" && hasLimpieza) return;
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

  const limpiezaBlocked = hasDepilacion;

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
              const isSelected = selectedSimple === entry.id;

              return (
                <article
                  key={entry.id}
                  className={`group flex flex-col rounded-3xl bg-card shadow-sm transition-all hover:shadow-md ${
                    isLast ? "md:col-span-2 lg:col-span-1" : ""
                  } ${limpiezaBlocked ? "opacity-50" : ""}`}
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
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-200/20 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-brand-200">
                            <Check className="h-2.5 w-2.5" />
                            Seleccionado
                          </span>
                        )}
                      </div>

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

                  {limpiezaBlocked && !isSelected && (
                    <div className="px-6 pt-3">
                      <div className="flex items-start gap-1.5 rounded-xl bg-red-50 px-3 py-2 dark:bg-red-950/20">
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                        <p className="font-sans text-[12px] leading-tight text-red-500">
                          {WARNING_TEXT}
                        </p>
                      </div>
                    </div>
                  )}

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

                    {isSelected ? (
                      <a
                        href={limpiezaWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setSelectedSimple(null)}
                        className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-200 px-4 py-2 font-sans text-xs font-semibold text-white transition-all hover:bg-brand-300"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Enviar a WhatsApp
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleSimpleSelection(entry.id)}
                        disabled={limpiezaBlocked}
                        className={`inline-flex items-center gap-1.5 rounded-2xl px-4 py-2 font-sans text-xs font-semibold transition-all ${
                          limpiezaBlocked
                            ? "cursor-not-allowed bg-brand-500/50 text-brand-400/50"
                            : "bg-brand-200 text-white hover:bg-brand-300"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        {limpiezaBlocked ? "No disponible" : "Seleccionar"}
                      </button>
                    )}
                  </div>
                </article>
              );
            }

            const desdePrice = getDesdePrice(entry);
            const selectedCount = getSelectedCount(entry, selected);
            const selectedItems = getSelectedItems(entry);
            const isDepilacion = entry.id === "depilacion-cera";
            const isBlocked = isDepilacion && hasLimpieza;

            return (
              <article
                key={entry.id}
                className={`group flex flex-col rounded-3xl bg-card shadow-sm transition-all hover:shadow-md ${
                  isLast ? "md:col-span-2 lg:col-span-1" : ""
                } ${isBlocked ? "opacity-50" : ""}`}
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
                        Elige opciones
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  {entry.items && (
                    <div className="border-t border-brand-500/40 px-6 py-4">
                      {isBlocked && (
                        <div className="mb-3 flex items-start gap-1.5 rounded-xl bg-red-50 px-3 py-2 dark:bg-red-950/20">
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                          <p className="font-sans text-[12px] leading-tight text-red-500">
                            {WARNING_TEXT}
                          </p>
                        </div>
                      )}

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
                                    !isBlocked && toggleItem(entry.id, item.id)
                                  }
                                  disabled={isBlocked}
                                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                                    isBlocked
                                      ? "cursor-not-allowed"
                                      : "hover:bg-brand-100"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                                        isSelected
                                          ? "border-brand-200 bg-brand-200 text-white"
                                          : isBlocked
                                          ? "border-brand-500/30"
                                          : "border-brand-500"
                                      }`}
                                    >
                                      {isSelected && (
                                        <Check className="h-3 w-3" />
                                      )}
                                    </div>
                                    <span
                                      className={`font-sans text-sm ${
                                        isBlocked
                                          ? "text-brand-400/50"
                                          : "text-brand-400"
                                      }`}
                                    >
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

                          {!isBlocked && selectedItems.length === 0 && (
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
