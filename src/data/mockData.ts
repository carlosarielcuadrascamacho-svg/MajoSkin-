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
  comingSoon?: boolean;
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
  description: string;
  image: string;
  price: string;
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
    duration: "90 min",
  },
  {
    id: "depilacion-cera",
    type: "category",
    title: "Depilación con Cera",
    shortDescription:
      "Servicio de depilación que elimina el vello desde la raíz para brindar una piel más suave, limpia y con un acabado uniforme. Se realiza con cuidado y delicadeza para ayudar a minimizar irritación y dejar la piel con una sensación fresca y estética por más tiempo.",
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
  {
    id: "rf-lifting",
    type: "simple",
    title: "RF Lifting Experience",
    shortDescription:
      "Facial reafirmante con radiofrecuencia para mejorar la flacidez y estimular colágeno",
    benefitDescription:
      "Facial reafirmante con radiofrecuencia diseñado para mejorar la apariencia de flacidez, estimular colágeno y brindar un efecto lifting inmediato. Incluye masaje relajante en cuello y hombros, maniobras lifting, activos reafirmantes y mascarilla hidropástica para una piel más firme, luminosa y revitalizada.\n\n🤍 Ideal para:\n* Piel cansada\n* Pérdida de firmeza\n* Rostro inflamado\n* Eventos especiales",
    gradient: "from-brand-200 to-brand-300",
    price: "",
    duration: "",
    comingSoon: true,
  },
];

export const products: Product[] = [
  {
    id: "kit-piel-grasa",
    name: "Kit Piel Grasa",
    description:
      "Controla el exceso de grasa, minimiza poros y matifica la piel. Ideal para pieles con brillo excesivo y tendencia acneica.",
    image: "/images/KitPielGrasa.jpeg",
    price: "$200",
  },
  {
    id: "kit-piel-seca",
    name: "Kit Piel Seca",
    description:
      "Hidratación profunda que restaura la barrera cutánea. Perfecto para pieles deshidratadas, tirantes o con descamación.",
    image: "/images/KitPielSeca.jpeg",
    price: "$159",
  },
  {
    id: "kit-piel-mixta",
    name: "Kit Piel Mixta",
    description:
      "Equilibra las zonas grasas sin resecar las secas. Formulado para pieles con necesidades mixtas.",
    image: "/images/KitPielMixta.jpeg",
    price: "$200",
  },
  {
    id: "kit-antiedad",
    name: "Kit Antiedad",
    description:
      "Previene y combate los signos de la edad. Estimula colágeno, reduce líneas de expresión y reafirma el rostro.",
    image: "/images/KitPielAnti-Edad.jpeg",
    price: "$200",
  },
  {
    id: "kit-acneica",
    name: "Kit Piel Acneica",
    description:
      "Purifica y calma la piel con tendencia acneica. Reduce imperfecciones, controla el sebo y previene brotes.",
    image: "/images/KitPielAcneica.jpeg",
    price: "$159",
  },
  {
    id: "kit-anti-manchas",
    name: "Kit Anti-Manchas",
    description:
      "Atenúa manchas y unifica el tono de la piel. Ideal para hiperpigmentación, melasma y marcas post-acné.",
    image: "/images/KitPielAnti-Manchas.jpeg",
    price: "$200",
  },
  {
    id: "kit-sensible",
    name: "Kit Piel Sensible",
    description:
      "Calma, hidrata y fortalece la barrera cutánea. Libre de fragancias e irritantes. Para pieles reactivas.",
    image: "/images/KitPielSencible.jpeg",
    price: "$159",
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
