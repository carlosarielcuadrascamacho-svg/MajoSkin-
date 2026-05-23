export const WHATSAPP_NUMBER = "526731044855";

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
}

export interface SimpleService {
  id: string;
  type: "simple";
  title: string;
  shortDescription: string;
  benefitDescription: string;
  gradient: string;
  price: string;
  duration: string;
}

export interface ServiceCategory {
  id: string;
  type: "category";
  title: string;
  shortDescription: string;
  gradient: string;
  selectionType: "multi" | "single";
  items: ServiceItem[];
}

export type CatalogEntry = SimpleService | ServiceCategory;

export interface Product {
  id: string;
  name: string;
  includes: string[];
  gradient: string;
}

export interface BusinessInfo {
  address: string;
  addressLink: string;
  coordinates: { lat: number; lng: number };
  instagram: string;
  instagramUrl: string;
  schedule: { days: string; hours: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  gradient: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const services: CatalogEntry[] = [
  {
    id: "limpieza-facial",
    type: "simple",
    title: "Limpieza Facial Profunda",
    shortDescription: "Libera tus poros y devuelve la luminosidad",
    benefitDescription:
      "Tratamiento ideal para eliminar impurezas, exceso de grasa y células muertas mientras se revitaliza la piel profundamente. Ayuda a mejorar la textura, luminosidad y apariencia del rostro mediante una experiencia relajante y personalizada.",
    gradient: "from-brand-200 to-brand-300",
    price: "$300",
    duration: "60 min",
  },
  {
    id: "depilacion-cera",
    type: "category",
    title: "Depilación con Cera",
    shortDescription:
      "Elimina el vello desde la raíz para brindar una piel más suave, limpia y con un acabado uniforme.",
    gradient: "from-brand-300 to-brand-200",
    selectionType: "multi",
    items: [
      { id: "piernas-completas", name: "Piernas completas", price: "$300" },
      { id: "media-piernas", name: "1/2 piernas", price: "$250" },
      { id: "brazos-completos", name: "Brazos completos", price: "$200" },
      { id: "patillas", name: "Patillas", price: "$60" },
      { id: "bozo", name: "Bozo (bigote)", price: "$50" },
      { id: "axilas", name: "Axilas", price: "$150" },
    ],
  },
  {
    id: "diseno-cejas",
    type: "category",
    title: "Diseño de Cejas",
    shortDescription:
      "Tratamiento que ayuda a alinear, definir y estilizar las cejas para lograr un efecto más ordenado, peinado y armonioso según tus facciones.",
    gradient: "from-brand-200 to-brand-100",
    selectionType: "single",
    items: [
      {
        id: "laminado-cera",
        name: "Laminado + diseño con cera",
        price: "$180",
      },
      {
        id: "laminado-pinzas",
        name: "Laminado + diseño con pinzas",
        price: "$150",
      },
      { id: "diseno-pinzas", name: "Diseño de cejas (pinzas)", price: "$80" },
      { id: "diseno-cera", name: "Diseño de cejas (cera)", price: "$100" },
      { id: "laminado", name: "Laminado de cejas", price: "$100" },
    ],
  },
];

export const products: Product[] = [
  {
    id: "kit-piel-grasa",
    name: "Kit Piel Grasa",
    includes: [
      "Limpiador en espuma purificante",
      "Tónico a base de niacinamida",
      "Hidratante oil-free matificante",
      "Mascarilla de arcilla semanal",
    ],
    gradient: "from-emerald-200 to-teal-300",
  },
  {
    id: "kit-piel-seca",
    name: "Kit Piel Seca",
    includes: [
      "Limpiador cremoso sin sulfatos",
      "Tónico hidratante con ácido hialurónico",
      "Crema nutritiva con manteca de karité",
      "Suero reparador nocturno",
    ],
    gradient: "from-amber-200 to-orange-300",
  },
  {
    id: "kit-piel-mixta",
    name: "Kit Piel Mixta",
    includes: [
      "Gel limpiador equilibrante",
      "Tónico bifásico regulador",
      "Emulsión ligera matificante",
      "Contorno de ojos refrescante",
    ],
    gradient: "from-rose-200 to-pink-300",
  },
  {
    id: "kit-antiedad",
    name: "Kit Antiedad",
    includes: [
      "Limpiador con vitamina C",
      "Sero antioxidante con retinol",
      "Crema reafirmante con colágeno",
      "Contorno de ojos antiarrugas",
    ],
    gradient: "from-purple-200 to-violet-300",
  },
  {
    id: "kit-iluminador",
    name: "Kit Iluminador",
    includes: [
      "Exfoliante enzimático suave",
      "Suero iluminador con vitamina C",
      "Hidratante con efectos glossy",
      "Mascarilla flash de luminosidad",
    ],
    gradient: "from-yellow-200 to-amber-300",
  },
];

export const businessInfo: BusinessInfo = {
  address: "Juan Antonio de La Fuente #27",
  addressLink:
    "https://maps.app.goo.gl/FD6rD61hMSZ35eV9A",
  coordinates: { lat: 25.485500512576674, lng: -108.16542858693056 },
  instagram: "@majoc_skin",
  instagramUrl: "https://instagram.com/majoc_skin",
  schedule: [
    { days: "Lunes a Viernes", hours: "2:00 PM - 4:00 PM" },
    { days: "Sábado", hours: "2:00 PM - 4:00 PM" },
    { days: "Domingo", hours: "Cerrado" },
  ],
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "María G.",
    text: "Mi piel cambió por completo después de la limpieza facial. Majo es súper profesional y el ambiente es muy relajante.",
    rating: 5,
    gradient: "from-brand-200 to-brand-300",
  },
  {
    id: "t2",
    name: "Ana L.",
    text: "El laminado de cejas me encantó. Quedaron naturales pero súper definidas. Volveré sin duda.",
    rating: 5,
    gradient: "from-brand-300 to-brand-200",
  },
  {
    id: "t3",
    name: "Sofía R.",
    text: "Las pestañas me quedaron hermosas. Se nota que sabe lo que hace. La recomiendo mucho.",
    rating: 5,
    gradient: "from-brand-200 to-brand-100",
  },
  {
    id: "t4",
    name: "Carmen M.",
    text: "Excelente atención y resultados visibles desde la primera sesión. Mi piel está más luminosa que nunca.",
    rating: 5,
    gradient: "from-brand-100 to-brand-200",
  },
];

export const faqs: FAQ[] = [
  {
    id: "f1",
    question: "¿Duele la limpieza facial profunda?",
    answer:
      "No es dolorosa. Puedes sentir una ligera sensación durante la extracción de impurezas, pero es totalmente tolerable y el resultado vale la pena.",
  },
  {
    id: "f2",
    question: "¿Cada cuánto debo hacerme un tratamiento facial?",
    answer:
      "Depende de tu tipo de piel. En general recomendamos una limpieza profunda cada 4 a 6 semanas. La hidratación facial puede hacerse mensualmente.",
  },
  {
    id: "f3",
    question: "¿Cuánto dura el laminado de cejas?",
    answer:
      "El efecto dura entre 4 y 6 semanas dependiendo del ciclo de crecimiento de tu vello y los cuidados posteriores.",
  },
  {
    id: "f4",
    question: "¿Tengo que llevar algo especial a mi cita?",
    answer:
      "Solo llegar con el rostro limpio y sin maquillaje. Nosotros nos encargamos de todo lo demás.",
  },
  {
    id: "f5",
    question: "¿Hay contraindicaciones?",
    answer:
      "Algunos tratamientos no se recomiendan durante el embarazo, lactancia o si tienes alguna condición dermatológica activa. En tu cita haremos una evaluación personalizada.",
  },
];
