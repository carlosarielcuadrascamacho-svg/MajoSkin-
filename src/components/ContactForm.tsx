"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/data/mockData";
import { Send, Check } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola Majo, soy ${form.name}. ${form.message} (${form.email})`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="bg-brand-50 py-20 md:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
            Escríbeme
          </h2>
          <p className="mx-auto mt-3 max-w-md font-sans text-base text-brand-400/70">
            ¿Tienes alguna duda? Déjame tus datos y te responderé por
            WhatsApp.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Tu nombre"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-2xl border border-brand-500 bg-card px-5 py-3 font-sans text-sm text-brand-400 placeholder:text-brand-400/40 focus:border-brand-200 focus:outline-none dark:bg-brand-100"
          />
          <input
            type="email"
            placeholder="Tu correo (opcional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-2xl border border-brand-500 bg-card px-5 py-3 font-sans text-sm text-brand-400 placeholder:text-brand-400/40 focus:border-brand-200 focus:outline-none dark:bg-brand-100"
          />
          <textarea
            placeholder="¿En qué puedo ayudarte?"
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none rounded-2xl border border-brand-500 bg-card px-5 py-3 font-sans text-sm text-brand-400 placeholder:text-brand-400/40 focus:border-brand-200 focus:outline-none dark:bg-brand-100"
          />

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand-200 font-sans text-sm font-semibold text-white transition-all hover:bg-brand-300"
          >
            {sent ? (
              <>
                <Check className="h-4 w-4" />
                Enviado
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar mensaje
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
