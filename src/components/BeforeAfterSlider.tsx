"use client";

import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  description,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <article className="group flex flex-col rounded-3xl bg-card p-4 shadow-sm transition-all hover:shadow-md">
      {/* Slider Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-100 select-none cursor-ew-resize touch-none border border-brand-500/10 dark:border-brand-500/5"
        style={{ pointerEvents: "auto" }}
      >
        {/* After Image (Base) */}
        <img
          src={afterImage}
          alt={`Después - ${title}`}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          draggable="false"
        />

        {/* Before Image (Overlay clipped by width) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={`Antes - ${title}`}
            className="absolute inset-y-0 left-0 h-full object-cover pointer-events-none max-w-none"
            style={{
              width: containerRef.current
                ? `${containerRef.current.getBoundingClientRect().width}px`
                : "100%",
            }}
            draggable="false"
          />
        </div>

        {/* Divider Line & Handle */}
        <div
          className="absolute inset-y-0 w-[3px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-colors group-hover:bg-brand-200"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-400 shadow-md border border-brand-200/50 text-base font-semibold transition-all hover:scale-105 select-none active:scale-95 active:bg-brand-100">
            <span className="text-brand-300 font-sans tracking-tight text-sm select-none">
              ↔
            </span>
          </div>
        </div>

        {/* Floating Badges */}
        <span className="absolute bottom-4 left-4 rounded-xl bg-black/65 px-3 py-1 font-sans text-xs font-semibold text-white tracking-wide uppercase text-[10px]">
          Antes
        </span>
        <span className="absolute bottom-4 right-4 rounded-xl bg-brand-200/90 px-3 py-1 font-sans text-xs font-semibold text-white tracking-wide uppercase text-[10px] shadow-sm">
          Después
        </span>
      </div>

      {/* Description Info */}
      <div className="mt-4 px-1 pb-1">
        <h3 className="font-serif text-lg font-semibold text-brand-400">
          {title}
        </h3>
        <p className="mt-1 font-sans text-sm leading-relaxed text-brand-400/90">
          {description}
        </p>
      </div>
    </article>
  );
}
