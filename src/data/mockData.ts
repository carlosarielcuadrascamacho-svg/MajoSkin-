export const WHATSAPP_NUMBER = "526731044855";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  benefitDescription: string;
  gradient: string;
  price: string;
  duration: string;
}

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

export const services: Service[] = [
  {
    id: "limpieza-facial",
    title: "Limpieza Facial Profunda",
    shortDescription: "Libera tus poros y devuelve la luminosidad",
    benefitDescription:
      "Eliminación de impurezas, células muertas y exceso de sebo. Tu piel respira y recupera su brillo natural al instante.",
    gradient: "from-brand-200 to-brand-300",
    price: "$250",
    duration: "60 min",
  },
  {
    id: "laminado-cejas",
    title: "Laminado de Cejas",
    shortDescription: "Cejas perfectamente definidas y con movimiento",
    benefitDescription:
      "Domina la dirección natural de tus cejas. Lucen más pobladas, simétricas y con un acabado sedoso por semanas.",
    gradient: "from-brand-300 to-brand-200",
    price: "$250",
    duration: "45 min",
  },
  {
    id: "diseno-mirada",
    title: "Diseño de Miradas",
    shortDescription: "Pestañas que hablan por sí solas",
    benefitDescription:
      "Realzamos tu mirada con técnicas de lifting y permanente que abren tus ojos sin necesidad de máscara.",
    gradient: "from-brand-200 to-brand-100",
    price: "$250",
    duration: "60 min",
  },
  {
    id: "dermoplanning",
    title: "Dermoplanning",
    shortDescription: "Renovación total con resultados inmediatos",
    benefitDescription:
      "Exfoliación profunda que elimina vello facial y células muertas. Tu maquillaje se verá impecable por más tiempo.",
    gradient: "from-brand-100 to-brand-200",
    price: "$250",
    duration: "45 min",
  },
  {
    id: "hidratacion-facial",
    title: "Hidratación Facial",
    shortDescription: "Recupera la barrera natural de tu piel",
    benefitDescription:
      "Cóctel de activos hidratantes que devuelven la elasticidad, firmeza y confort. Ideal para pieles deshidratadas.",
    gradient: "from-brand-300 to-brand-100",
    price: "$250",
    duration: "50 min",
  },
  {
    id: "skin-boosters",
    title: "Skin Boosters",
    shortDescription: "Luminosidad desde el interior",
    benefitDescription:
      "Ácido hialurónico y vitaminas que hidratan en profundidad. Resultado: piel jugosa, tersa y radiante.",
    gradient: "from-brand-200 to-brand-300",
    price: "$250",
    duration: "45 min",
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
