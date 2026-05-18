"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#", label: "Inicio" },
  { href: "#acerca", label: "Conóceme" },
  { href: "#servicios", label: "Servicios" },
  { href: "#productos", label: "Kits" },
  { href: "#ubicacion", label: "Ubicación" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-brand-50/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8 md:px-16 lg:px-24">
        <a
          href="#"
          className="font-serif text-xl font-semibold tracking-tight text-brand-400"
        >
          Majoc Skin
        </a>

          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-xl px-4 py-2 font-sans text-sm font-medium text-brand-400/70 transition-colors hover:bg-brand-100 hover:text-brand-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-brand-400 transition-colors hover:bg-brand-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-brand-500 bg-brand-50 md:hidden">
          <div className="flex items-center justify-between px-4 pb-2 pt-2">
            <ThemeToggle />
          </div>
          <ul className="flex flex-col px-4 pb-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-sans text-sm font-medium text-brand-400/70 transition-colors hover:bg-brand-100 hover:text-brand-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
