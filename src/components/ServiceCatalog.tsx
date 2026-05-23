"use client";

import { useState } from "react";
import type { CatalogEntry, ServiceItem } from "@/data/mockData";
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
  ShoppingBag,
  Trash2,
  Info,
  Calendar,
  Grid
} from "lucide-react";

const tabMap = [
  { id: "all", label: "Todos", icon: Grid },
  { id: "limpieza-facial", label: "Faciales ✨", icon: Droplets },
  { id: "diseno-cejas", label: "Cejas 👁️", icon: Eye },
  { id: "depilacion-cera", label: "Depilación 🌿", icon: Sparkles },
];

const iconMap: Record<string, typeof Sparkles> = {
  "limpieza-facial": Droplets,
  "depilacion-cera": Sparkles,
  "diseno-cejas": Eye,
};

// Helper to parse price string like "$300" into a number
const parsePrice = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
};

// Helper to parse duration string like "60 min" into minutes
const parseDuration = (durationStr?: string): number => {
  if (!durationStr) return 0;
  return parseInt(durationStr.replace(/[^0-9]/g, "")) || 0;
};

// Formatting duration back to readable string like "1h 30 min"
const formatTotalDuration = (totalMins: number): string => {
  if (totalMins < 60) return `${totalMins} min`;
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return mins > 0 ? `${hrs}h ${mins} min` : `${hrs}h`;
};

interface SelectedItemDetail {
  id: string;
  name: string;
  price: string;
  duration?: string;
  categoryName: string;
  categoryId: string;
}

interface ServiceCatalogProps {
  services: CatalogEntry[];
}

export default function ServiceCatalog({ services }: ServiceCatalogProps) {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Unified selections state
  const [selectedSimple, setSelectedSimple] = useState<boolean>(false); // Limpieza Facial
  const [selectedCejas, setSelectedCejas] = useState<string | null>(null); // Diseño de cejas option ID
  const [selectedDepilacion, setSelectedDepilacion] = useState<string[]>([]); // Depilación cera options IDs

  // Toggle card details
  const toggleExpand = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  // Toggle facial selection
  const handleToggleFacial = () => {
    setSelectedSimple((prev) => !prev);
  };

  // Toggle/select cejas items (single-selection category)
  const handleSelectCejas = (itemId: string) => {
    setSelectedCejas((prev) => (prev === itemId ? null : itemId));
  };

  // Toggle depilación items (multi-selection category)
  const handleToggleDepilacion = (itemId: string) => {
    setSelectedDepilacion((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  // Clear all selections
  const handleClearAll = () => {
    setSelectedSimple(false);
    setSelectedCejas(null);
    setSelectedDepilacion([]);
  };

  // Calculate detailed items selected
  const getSelectedItemsDetails = (): SelectedItemDetail[] => {
    const details: SelectedItemDetail[] = [];

    // 1. Limpieza Facial
    if (selectedSimple) {
      const facial = services.find((s) => s.id === "limpieza-facial");
      if (facial && facial.type === "simple") {
        details.push({
          id: facial.id,
          name: facial.title,
          price: facial.price,
          duration: facial.duration,
          categoryName: "Limpieza Facial",
          categoryId: facial.id,
        });
      }
    }

    // 2. Diseño de Cejas
    if (selectedCejas) {
      const cejas = services.find((s) => s.id === "diseno-cejas");
      if (cejas && cejas.type === "category") {
        const selectedItem = cejas.items.find((item) => item.id === selectedCejas);
        if (selectedItem) {
          details.push({
            id: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            duration: selectedItem.duration,
            categoryName: "Diseño de Cejas",
            categoryId: cejas.id,
          });
        }
      }
    }

    // 3. Depilación con Cera
    if (selectedDepilacion.length > 0) {
      const depilacion = services.find((s) => s.id === "depilacion-cera");
      if (depilacion && depilacion.type === "category") {
        selectedDepilacion.forEach((itemId) => {
          const item = depilacion.items.find((i) => i.id === itemId);
          if (item) {
            details.push({
              id: item.id,
              name: `Depilación: ${item.name}`,
              price: item.price,
              duration: item.duration,
              categoryName: "Depilación con Cera",
              categoryId: depilacion.id,
            });
          }
        });
      }
    }

    return details;
  };

  const selectedDetails = getSelectedItemsDetails();
  const totalPrice = selectedDetails.reduce((sum, item) => sum + parsePrice(item.price), 0);
  const totalDuration = selectedDetails.reduce((sum, item) => sum + parseDuration(item.duration), 0);

  const hasLimpieza = selectedSimple;
  const hasDepilacion = selectedDepilacion.length > 0;
  const hasBothIncompatible = hasLimpieza && hasDepilacion;

  // Filtered entries according to active tab
  const filteredServices = services.filter((entry) => {
    if (selectedTab === "all") return true;
    return entry.id === selectedTab;
  });

  // Build single formatted WhatsApp message for all selected services
  const buildWhatsAppLink = () => {
    if (selectedDetails.length === 0) return "";

    const depilacionItems = selectedDetails.filter((item) => item.categoryId === "depilacion-cera");
    const cejasItems = selectedDetails.filter((item) => item.categoryId === "diseno-cejas");

    let message = `¡Hola Majo! 🌸✨\n\nMe encantaría agendar una sesión personalizada de bienestar en MajoSkin. He seleccionado los siguientes tratamientos:\n\n`;

    if (hasLimpieza && depilacionItems.length > 0) {
      // Skin safety separate session formatting
      message += `📅 *Propuesta de Sesiones (Cuidado & Sensibilidad de la Piel)*\n\n`;
      message += `🧘‍♀️ *Sesión 1: Cuidado Facial Profundo*\n`;
      message += `• Limpieza Facial Profunda ($300) - 60 min\n\n`;

      message += `🌿 *Sesión 2: Depilación con Cera*\n`;
      depilacionItems.forEach((item) => {
        message += `• ${item.name.replace("Depilación: ", "")} (${item.price}) - ${item.duration || "N/A"}\n`;
      });

      if (cejasItems.length > 0) {
        message += `\n👁️ *Sesión 3: Diseño de Cejas*\n`;
        cejasItems.forEach((item) => {
          message += `• ${item.name} (${item.price}) - ${item.duration || "N/A"}\n`;
        });
      }
    } else {
      // Normal layout
      message += `✨ *Tratamientos Elegidos:*\n`;
      selectedDetails.forEach((item) => {
        message += `• ${item.name} (${item.price}) - ${item.duration || "N/A"}\n`;
      });
    }

    message += `\n📊 *Resumen de la Sesión:*`;
    message += `\n• Total estimado: $${totalPrice} MXN`;
    message += `\n• Duración total aproximada: ${formatTotalDuration(totalDuration)}`;

    if (hasLimpieza && depilacionItems.length > 0) {
      message += `\n\n💡 *Nota:* He seleccionado Limpieza Facial y Depilación. Para proteger mi piel, me gustaría programar las sesiones en fechas o citas distintas coordinando contigo.`;
    }

    message += `\n\n¿Qué días y horarios tienes disponibles para consentirme? ¡Muchas gracias! 💕`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  // Helper to know if a specific service entry has items selected
  const getSelectedCountInCard = (entry: CatalogEntry): number => {
    if (entry.id === "limpieza-facial") return selectedSimple ? 1 : 0;
    if (entry.id === "diseno-cejas") return selectedCejas ? 1 : 0;
    if (entry.id === "depilacion-cera") return selectedDepilacion.length;
    return 0;
  };

  return (
    <section id="servicios" className="relative bg-brand-100/50 py-20 md:py-28 dark:bg-brand-50/10">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-30 dark:opacity-10">
        <div className="absolute -top-40 right-10 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-200/15 px-3 py-1 font-sans text-xs font-semibold tracking-wider text-brand-300 uppercase">
            <Sparkles className="h-3 w-3 animate-pulse" /> Consentimiento y Cuidado
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
            Nuestros Servicios
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-base text-brand-400/80 sm:text-lg">
            Tratamientos de alta gama diseñados para revitalizar tu piel, definir tu mirada y brindarte una experiencia relajante y personalizada.
          </p>
        </div>

        {/* Dynamic Category Tabs Selector */}
        <div className="mt-10 flex justify-center">
          <nav className="flex w-full overflow-x-auto scrollbar-hide shrink-0 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center gap-2">
            {tabMap.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = selectedTab === tab.id;
              
              // Count selected items in this tab's category
              let tabSelections = 0;
              if (tab.id === "all") tabSelections = selectedDetails.length;
              else if (tab.id === "limpieza-facial") tabSelections = selectedSimple ? 1 : 0;
              else if (tab.id === "diseno-cejas") tabSelections = selectedCejas ? 1 : 0;
              else if (tab.id === "depilacion-cera") tabSelections = selectedDepilacion.length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 shrink-0 rounded-full px-5 py-2.5 font-sans text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-brand-400 text-brand-50 shadow-md scale-[1.03] dark:bg-brand-200 dark:text-brand-400"
                      : "bg-white/80 text-brand-400 hover:bg-brand-100 hover:scale-[1.01] border border-brand-200/20 dark:bg-card dark:text-brand-400/80"
                  }`}
                >
                  <TabIcon className={`h-4 w-4 ${isActive ? "text-brand-200 dark:text-brand-400" : "text-brand-300"}`} />
                  <span>{tab.label}</span>
                  {tabSelections > 0 && (
                    <span className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      isActive ? "bg-brand-200 text-brand-400" : "bg-brand-200/20 text-brand-300"
                    }`}>
                      {tabSelections}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((entry, idx) => {
            const Icon = iconMap[entry.id] || Sparkles;
            const open = expandedCard === entry.id;
            const selectedCount = getSelectedCountInCard(entry);
            const isLast = idx === filteredServices.length - 1 && filteredServices.length % 2 !== 0 && filteredServices.length !== 1;

            if (entry.type === "simple") {
              const isSelected = selectedSimple;

              return (
                <article
                  key={entry.id}
                  className={`group flex flex-col rounded-3xl bg-card border border-brand-200/30 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-brand-500/10 ${
                    isLast ? "md:col-span-2 lg:col-span-1" : ""
                  } ${isSelected ? "ring-2 ring-brand-200 ring-offset-2 dark:ring-offset-black" : ""}`}
                >
                  {/* Card Icon & Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${entry.gradient} text-brand-400 shadow-sm transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-5.5 w-5.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-1">
                        <h3 className="font-serif text-lg font-bold leading-snug text-brand-400 md:text-xl">
                          {entry.title}
                        </h3>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                            <Check className="h-3 w-3" />
                            Añadido
                          </span>
                        )}
                      </div>

                      <div className="mt-1.5 flex items-center gap-3">
                        <span className="font-sans text-base font-bold text-brand-200">
                          {entry.price}
                        </span>
                        <span className="flex items-center gap-1 font-sans text-xs text-brand-400/60 dark:text-brand-400/40">
                          <Clock className="h-3.5 w-3.5" />
                          {entry.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Description */}
                  <div className="mt-5 flex-1">
                    <p className="font-sans text-sm leading-relaxed text-brand-400/80">
                      {entry.shortDescription}
                    </p>

                    {/* Accordion Content for Deep description */}
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        open ? "max-h-56 opacity-100 mt-4" : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <div className="rounded-2xl bg-brand-100/30 p-4 border border-brand-200/10 dark:bg-brand-100/5">
                        <h4 className="font-serif text-[12px] font-bold uppercase tracking-wider text-brand-200">
                          Beneficios del Tratamiento:
                        </h4>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-brand-400/75">
                          {entry.benefitDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-6 flex items-center justify-between border-t border-brand-500/30 pt-4 dark:border-brand-500/10">
                    <button
                      type="button"
                      onClick={() => toggleExpand(entry.id)}
                      className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-300 transition-colors hover:text-brand-200"
                    >
                      {open ? (
                        <>
                          Menos <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Saber más <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleFacial}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-bold transition-all duration-300 hover:scale-[1.02] ${
                        isSelected
                          ? "bg-brand-400 text-white hover:bg-brand-400/90 dark:bg-brand-200 dark:text-brand-400"
                          : "bg-brand-200 text-white hover:bg-brand-300"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Trash2 className="h-3.5 w-3.5" /> Quitar
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-3.5 w-3.5" /> Añadir a Sesión
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            }

            // Categories rendering: "depilacion-cera" or "diseno-cejas"
            const isDepilacion = entry.id === "depilacion-cera";
            const isCejas = entry.id === "diseno-cejas";

            return (
              <article
                key={entry.id}
                className={`group flex flex-col rounded-3xl bg-card border border-brand-200/30 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-brand-500/10 ${
                  isLast ? "md:col-span-2 lg:col-span-1" : ""
                } ${selectedCount > 0 ? "ring-2 ring-brand-200 ring-offset-2 dark:ring-offset-black" : ""}`}
              >
                {/* Card Icon & Header */}
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${entry.gradient} text-brand-400 shadow-sm transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-5.5 w-5.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-1">
                      <h3 className="font-serif text-lg font-bold leading-snug text-brand-400 md:text-xl">
                        {entry.title}
                      </h3>
                      {selectedCount > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                          <Check className="h-3 w-3" />
                          {selectedCount} {selectedCount === 1 ? "elegido" : "elegidos"}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-sans text-[11px] font-semibold text-brand-200 uppercase tracking-wide">
                        {isDepilacion ? "Personalizable" : "Elige 1 opción"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Description */}
                <div className="mt-5 flex-1">
                  <p className="font-sans text-sm leading-relaxed text-brand-400/80">
                    {entry.shortDescription}
                  </p>

                  {/* Accordion Content for Category benefits */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      open ? "max-h-56 opacity-100 mt-4" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    {entry.benefitDescription && (
                      <div className="rounded-2xl bg-brand-100/30 p-4 border border-brand-200/10 dark:bg-brand-100/5">
                        <h4 className="font-serif text-[12px] font-bold uppercase tracking-wider text-brand-200">
                          Sobre este servicio:
                        </h4>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-brand-400/75">
                          {entry.benefitDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Options List rendered directly on the card */}
                <div className="mt-6 border-t border-brand-500/30 pt-4 dark:border-brand-500/10">
                  <span className="font-serif text-xs font-bold uppercase tracking-wider text-brand-300 block mb-3">
                    Opciones de Tratamiento:
                  </span>
                  
                  {isDepilacion ? (
                    /* WAXING: MULTI-SELECTION CHECKBOXES */
                    <div className="space-y-2.5">
                      {entry.items.map((item) => {
                        const isItemSelected = selectedDepilacion.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleToggleDepilacion(item.id)}
                            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200 hover:-translate-y-[1px] ${
                              isItemSelected
                                ? "bg-brand-200/10 border-brand-200 shadow-sm dark:bg-brand-200/5"
                                : "bg-brand-100/20 border-brand-200/10 dark:bg-transparent dark:border-brand-500/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
                                  isItemSelected
                                    ? "border-brand-200 bg-brand-200 text-white"
                                    : "border-brand-200/40 bg-white dark:bg-transparent dark:border-brand-500/20"
                                }`}
                              >
                                {isItemSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                              </div>
                              <div className="flex flex-col">
                                <span className={`font-sans text-xs font-semibold text-brand-400`}>
                                  {item.name}
                                </span>
                                {item.duration && (
                                  <span className="font-sans text-[10px] text-brand-400/50 flex items-center gap-0.5 mt-0.5">
                                    <Clock className="h-3 w-3" /> {item.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="font-sans text-xs font-bold text-brand-200">
                              {item.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* EYEBROWS: SINGLE SELECTION RADIOS */
                    <div className="space-y-2.5">
                      {entry.items.map((item) => {
                        const isItemSelected = selectedCejas === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectCejas(item.id)}
                            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200 hover:-translate-y-[1px] ${
                              isItemSelected
                                ? "bg-brand-200/10 border-brand-200 shadow-sm dark:bg-brand-200/5"
                                : "bg-brand-100/20 border-brand-200/10 dark:bg-transparent dark:border-brand-500/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                  isItemSelected
                                    ? "border-brand-200 bg-brand-200 text-white"
                                    : "border-brand-200/40 bg-white dark:bg-transparent dark:border-brand-500/20"
                                }`}
                              >
                                {isItemSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                              </div>
                              <div className="flex flex-col">
                                <span className={`font-sans text-xs font-semibold text-brand-400`}>
                                  {item.name}
                                </span>
                                {item.duration && (
                                  <span className="font-sans text-[10px] text-brand-400/50 flex items-center gap-0.5 mt-0.5">
                                    <Clock className="h-3 w-3" /> {item.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="font-sans text-xs font-bold text-brand-200">
                              {item.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Card Footer actions (Info button only) */}
                <div className="mt-5 flex items-center justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => toggleExpand(entry.id)}
                    className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-300 transition-colors hover:text-brand-200"
                  >
                    {open ? (
                      <>
                        Menos <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Ver más info <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* WELLNESS PLANNER FLOAT BAR (STYLISH RESUMEN COMPACTO) */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out transform ${
          selectedDetails.length > 0 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Shadow Overlay */}
        <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

        {/* Floating Panel Container */}
        <div className="mx-auto max-w-4xl px-4 pb-4 md:pb-6">
          <div className="backdrop-blur-lg bg-white/90 border border-brand-200/35 rounded-3xl p-5 md:p-6 shadow-[0_-12px_40px_rgba(45,45,45,0.15)] dark:bg-card/95 dark:border-brand-500/20">
            
            {/* Skin Care & Timing warning details */}
            {hasBothIncompatible && (
              <div className="mb-4 flex items-start gap-2.5 rounded-2xl bg-amber-50 px-4 py-3 border border-amber-200/40 dark:bg-amber-950/20 dark:border-amber-900/30">
                <Info className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                <div>
                  <h5 className="font-serif text-xs font-bold text-amber-900 dark:text-amber-300">
                    💡 Nota de Cuidado Especial para tu Piel
                  </h5>
                  <p className="mt-1 font-sans text-[11px] leading-relaxed text-amber-800/90 dark:text-amber-400/80">
                    Para proteger la sensibilidad de tu piel, se recomienda realizar la limpieza facial y la depilación con cera en citas separadas. Al hacer clic en agendar, Majo coordinará los mejores horarios y fechas para ti.
                  </p>
                </div>
              </div>
            )}

            {/* Content Row */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Left Side: Summary figures */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-400 text-brand-50 dark:bg-brand-200 dark:text-brand-400">
                  <ShoppingBag className="h-5.5 w-5.5" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl font-black text-brand-400 dark:text-brand-200">
                      ${totalPrice}
                    </span>
                    <span className="font-sans text-xs font-medium text-brand-400/60 dark:text-brand-400/40">
                      MXN estimado
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-brand-400/75 dark:text-brand-400/60">
                      <Clock className="h-3.5 w-3.5" /> {formatTotalDuration(totalDuration)}
                    </span>
                    <span className="inline-block h-1 w-1 rounded-full bg-brand-200" />
                    <span className="font-sans text-xs font-semibold text-brand-300">
                      {selectedDetails.length} {selectedDetails.length === 1 ? "tratamiento" : "tratamientos"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Side: Horizontal scroll of selected tags on larger screens */}
              <div className="hidden lg:flex items-center gap-1.5 max-w-md overflow-x-auto scrollbar-hide py-1">
                {selectedDetails.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1 shrink-0 rounded-lg bg-brand-100 px-2.5 py-1 font-sans text-[10px] font-bold text-brand-400 border border-brand-200/10 dark:bg-brand-500/20 dark:text-brand-400"
                  >
                    {item.name.replace("Depilación: ", "")}
                  </span>
                ))}
              </div>

              {/* Right Side: Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-200/30 text-brand-300 hover:bg-brand-100 hover:text-brand-400 transition-all duration-200 dark:border-brand-500/20 dark:hover:bg-brand-500/20"
                  title="Vaciar sesión"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>

                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-200 px-6 font-sans text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-brand-300 hover:scale-[1.02] shadow-[0_4px_14px_rgba(212,184,149,0.4)]"
                >
                  <MessageCircle className="h-4 w-4 fill-white stroke-none" />
                  <span>Agendar Sesión 💬</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
