import { definePersona, type Persona } from "@/domain/persona";

export const personas: readonly Persona[] = [
  definePersona({
    id: "juan", name: "Juan", slug: "juan", label: "Camping de fin de semana", age: 32, travelsWith: ["Perro"],
    shortDescription: "Escapadas ligeras de dos o tres días con su perro, sin complicarse con la electricidad.",
    lifestyle: "Con 32 años, aprovecha los fines de semana para salir de camping con su perro.",
    description: "Representa a quien busca energía sencilla para disfrutar de escapadas cortas con su perro sin cargar con más peso ni complejidad de la necesaria.",
    voice: { tone: "Cercano, informal y sencillo", technicalLevel: "low", decisionStyle: "Práctico y orientado a la relación calidad-precio", focusesOn: ["¿Me sirve para un finde?", "Peso", "Precio", "Sencillez"], avoids: ["Tecnicismos innecesarios"] },
    priorities: { price: 0.3, weight: 0.25, autonomy: 0.25, easeOfUse: 0.15, size: 0.05 },
    typicalDevices: ["Móviles", "Luces", "Nevera portátil", "Cámara", "Portátil ocasional"],
    avatar: "/images/home/personas/Juan-playa-v2.png",
    seo: { title: "Juan: power stations para camping de fin de semana", description: "Juan representa a quienes buscan una power station ligera y económica para escapadas de camping de fin de semana con su perro." },
  } satisfies Persona),
  definePersona({
    id: "laura", name: "Laura", slug: "laura", label: "Caravana familiar", travelsWith: ["Pareja", "Hijos"],
    shortDescription: "Más autonomía y potencia para viajar en familia con varios dispositivos.",
    lifestyle: "Viajes en caravana con pareja e hijos.",
    description: "Representa necesidades familiares reales: mantener los equipos del viaje funcionando de forma cómoda y fiable.",
    voice: { tone: "Práctico, organizado y familiar", technicalLevel: "low-medium", decisionStyle: "Prioriza seguridad y tranquilidad", focusesOn: ["Autonomía familiar", "Conectar varios dispositivos"], avoids: ["Especificaciones sin una consecuencia práctica"] },
    priorities: { autonomy: 0.3, power: 0.25, reliability: 0.2, easeOfUse: 0.15, price: 0.1 },
    typicalDevices: ["Nevera", "Móviles", "Tablets", "Luces", "Cafetera", "Televisión", "Pequeños electrodomésticos"],
    avatar: "/images/home/personas/Laura-natural-v2.png",
    seo: { title: "Laura: power stations para viajar en caravana familiar", description: "Laura explica cómo elegir autonomía y potencia para una caravana familiar con varios dispositivos y consumos compartidos." },
  } satisfies Persona),
  definePersona({
    id: "alex", name: "Álex", slug: "alex", label: "Nómada digital", age: 38, occupation: "Informático", travelsWith: ["Pareja"],
    shortDescription: "Trabajo remoto desde una camper con necesidades técnicas y de carga solar.",
    lifestyle: "Trabajo desde una camper durante viajes prolongados.",
    description: "Representa a quien necesita mantener operativo un espacio de trabajo móvil y entiende las especificaciones que afectan a su autonomía.",
    voice: { tone: "Tecnológico pero accesible", technicalLevel: "medium-high", decisionStyle: "Analítico", focusesOn: ["Wh", "USB-C PD", "Eficiencia", "Carga rápida", "Starlink", "Solar"], avoids: ["Marketing vacío"] },
    priorities: { autonomy: 0.25, fastCharging: 0.2, usbC: 0.2, efficiency: 0.15, solarInput: 0.1, connectivity: 0.1 },
    typicalDevices: ["Portátil", "Starlink o router", "Monitor portátil", "Cámara", "Dron", "Smartphone", "Discos externos"],
    avatar: "/images/home/personas/Alex-natural-v2.png",
    seo: { title: "Álex: energía para trabajar desde una camper", description: "Álex analiza la autonomía, USB-C, Starlink y carga rápida que necesita un nómada digital para trabajar desde una camper." },
  } satisfies Persona),
  definePersona({
    id: "sergio", name: "Sergio", slug: "sergio", label: "Off-grid y usuario avanzado", age: 46, occupation: "Técnico de mantenimiento industrial",
    shortDescription: "Potencia, paneles solares y datos reales para consumos exigentes.",
    lifestyle: "Uso off-grid con herramientas, paneles solares y consumos elevados.",
    description: "Representa al usuario que compara rendimiento real, expansión y calidad de construcción más allá del marketing.",
    voice: { tone: "Directo, técnico y escéptico", technicalLevel: "high", decisionStyle: "Basado en rendimiento medible", focusesOn: ["Potencia real", "Picos", "Pérdidas", "Solar", "Expansión", "Construcción"], avoids: ["Aceptar especificaciones del fabricante sin contexto"] },
    priorities: { realWorldPerformance: 0.3, power: 0.2, solarInput: 0.2, expandability: 0.15, buildQuality: 0.1, price: 0.05 },
    typicalDevices: ["Herramientas", "Paneles solares", "Bombas", "Neveras", "Equipamiento de campo"],
    avatar: "/images/home/personas/Sergio-natural.png",
    seo: { title: "Sergio: rendimiento solar y energía off-grid", description: "Sergio evalúa potencia real, carga solar, pérdidas y construcción para usos off-grid y equipos energéticos más exigentes." },
  } satisfies Persona),
  definePersona({
    id: "carmen", name: "Carmen", slug: "carmen", label: "Viajes largos en autocaravana", travelsWith: ["Hijo de 13 años"],
    shortDescription: "Comodidad y fiabilidad para viajar largas temporadas sin cálculos constantes.",
    lifestyle: "Viajes largos en autocaravana con su hijo de 13 años, buscando comodidad y sencillez.",
    description: "Representa a quien quiere conectar sus equipos habituales y confiar en que la energía acompañe el viaje mientras recorre mundo con su hijo.",
    voice: { tone: "Tranquilo, sencillo y orientado a comodidad", technicalLevel: "low", decisionStyle: "Prioriza fiabilidad y facilidad", focusesOn: ["Autonomía", "Tranquilidad", "Garantía", "Facilidad"], avoids: ["Cálculos y jerga técnica innecesaria"] },
    priorities: { reliability: 0.3, autonomy: 0.3, easeOfUse: 0.2, warranty: 0.15, price: 0.05 },
    typicalDevices: ["Nevera", "Cafetera", "Televisión", "Móviles", "Luces", "Pequeños electrodomésticos"],
    avatar: "/images/home/personas/Carmen-hijo-montana.png",
    seo: { title: "Carmen: energía fiable para viajar en autocaravana", description: "Carmen busca una power station fiable, autónoma y fácil de usar durante viajes largos en autocaravana con su hijo." },
  } satisfies Persona),
];

export function getPersonaBySlug(slug: string): Persona | undefined {
  return personas.find((persona) => persona.slug === slug);
}
