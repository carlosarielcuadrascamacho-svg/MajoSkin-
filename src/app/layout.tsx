import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { WHATSAPP_NUMBER, businessInfo } from "@/data/mockData";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://majocskin.com";

export const metadata: Metadata = {
  title: "Majoc Skin | Cuidado Facial y Diseño de Miradas",
  description:
    "Licenciada en Cosmiatría en formación. Tratamientos faciales profesionales en Villa Benito Juárez, Sinaloa. Agenda tu cita hoy.",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }],
    apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Majoc Skin | Cuidado Facial y Diseño de Miradas",
    description:
      "Tratamientos faciales profesionales en Villa Benito Juárez, Sinaloa. Limpieza facial, laminado de cejas, diseño de miradas y más.",
    url: siteUrl,
    siteName: "Majoc Skin",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Majoc Skin | Cuidado Facial y Diseño de Miradas",
    description:
      "Tratamientos faciales profesionales en Villa Benito Juárez, Sinaloa. Agenda tu cita.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Majoc Skin",
  image: `${siteUrl}/og-image.jpg`,
  telephone: `+52${WHATSAPP_NUMBER}`,
  email: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Villa Benito Juárez",
    addressRegion: "Sinaloa",
    addressCountry: "MX",
  },
  url: siteUrl,
  sameAs: [businessInfo.instagramUrl],
  openingHoursSpecification: businessInfo.schedule.map((s) => {
    const [open, close] = s.hours.replace(" - ", "-").split("-");
    const dayMap: Record<string, string> = {
      Lunes: "Monday",
      Martes: "Tuesday",
      Miércoles: "Wednesday",
      Jueves: "Thursday",
      Viernes: "Friday",
      Sábado: "Saturday",
      Domingo: "Sunday",
    };
    const [startDay, endDay] = s.days.split(" a ");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: endDay
        ? [dayMap[startDay], dayMap[endDay]]
        : [dayMap[s.days]],
      opens: open?.trim(),
      closes: close?.trim(),
    };
  }),
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme:dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Majoc Skin" />
        <meta name="theme-color" content="#D4B895" />
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-brand-50 font-sans text-brand-400 antialiased">
        <PwaRegister />
        <ScrollProgress />
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
