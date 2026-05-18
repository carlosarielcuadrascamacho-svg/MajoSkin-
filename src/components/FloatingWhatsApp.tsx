import { WHATSAPP_NUMBER } from "@/data/mockData";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Hola Majo, tengo una consulta sobre tus servicios"
  );
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-200 text-white shadow-lg transition-all hover:bg-brand-300 hover:shadow-xl active:scale-95"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </Link>
  );
}
