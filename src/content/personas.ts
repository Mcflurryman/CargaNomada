import { definePersona, type Persona } from "@/domain/persona";

export const personas: readonly Persona[] = [
  definePersona({
    id: "juan", name: "Juan", slug: "juan", label: "Camping de fin de semana",
    shortDescription: "Escapadas ligeras de dos o tres días, sin complicarse con la electricidad.",
    lifestyle: "Camping de fin de semana, normalmente en escapadas de dos o tres días.",
    description: "Representa a quien busca energía sencilla para disfrutar del camping sin cargar con más peso ni complejidad de la necesaria.",
    voice: { tone: "Cercano, informal y sencillo", technicalLevel: "low", decisionStyle: "Práctico y orientado a la relación calidad-precio", focusesOn: ["¿Me sirve para un finde?", "Peso", "Precio", "Sencillez"], avoids: ["Tecnicismos innecesarios"] },
    priorities: { price: 0.3, weight: 0.25, autonomy: 0.25, easeOfUse: 0.15, size: 0.05 },
    typicalDevices: ["Móviles", "Luces", "Nevera portátil", "Cámara", "Portátil ocasional"],
    seo: { title: "Juan: camping de fin de semana", description: "Perfil editorial para escapadas de camping ligeras." },
  } satisfies Persona),
  definePersona({
    id: "laura", name: "Laura", slug: "laura", label: "Caravana familiar",
    shortDescription: "Más autonomía y potencia para viajar en familia con varios dispositivos.",
    lifestyle: "Viajes en caravana con pareja e hijos.",
    description: "Representa necesidades familiares reales: mantener los equipos del viaje funcionando de forma cómoda y fiable.",
    voice: { tone: "Práctico, organizado y familiar", technicalLevel: "low-medium", decisionStyle: "Prioriza seguridad y tranquilidad", focusesOn: ["Autonomía familiar", "Conectar varios dispositivos"], avoids: ["Especificaciones sin una consecuencia práctica"] },
    priorities: { autonomy: 0.3, power: 0.25, reliability: 0.2, easeOfUse: 0.15, price: 0.1 },
    typicalDevices: ["Nevera", "Móviles", "Tablets", "Luces", "Cafetera", "Televisión", "Pequeños electrodomésticos"],
    seo: { title: "Laura: caravana familiar", description: "Perfil editorial para viajes familiares en caravana." },
  } satisfies Persona),
  definePersona({
    id: "alex", name: "Álex", slug: "alex", label: "Nómada digital",
    shortDescription: "Trabajo remoto desde una camper con necesidades técnicas y de carga solar.",
    lifestyle: "Trabajo desde una camper durante viajes prolongados.",
    description: "Representa a quien necesita mantener operativo un espacio de trabajo móvil y entiende las especificaciones que afectan a su autonomía.",
    voice: { tone: "Tecnológico pero accesible", technicalLevel: "medium-high", decisionStyle: "Analítico", focusesOn: ["Wh", "USB-C PD", "Eficiencia", "Carga rápida", "Starlink", "Solar"], avoids: ["Marketing vacío"] },
    priorities: { autonomy: 0.25, fastCharging: 0.2, usbC: 0.2, efficiency: 0.15, solarInput: 0.1, connectivity: 0.1 },
    typicalDevices: ["Portátil", "Starlink o router", "Monitor portátil", "Cámara", "Dron", "Smartphone", "Discos externos"],
    seo: { title: "Álex: nómada digital", description: "Perfil editorial para trabajo remoto desde una camper." },
  } satisfies Persona),
  definePersona({
    id: "sergio", name: "Sergio", slug: "sergio", label: "Off-grid y usuario avanzado",
    shortDescription: "Potencia, paneles solares y datos reales para consumos exigentes.",
    lifestyle: "Uso off-grid con herramientas, paneles solares y consumos elevados.",
    description: "Representa al usuario que compara rendimiento real, expansión y calidad de construcción más allá del marketing.",
    voice: { tone: "Directo, técnico y escéptico", technicalLevel: "high", decisionStyle: "Basado en rendimiento medible", focusesOn: ["Potencia real", "Picos", "Pérdidas", "Solar", "Expansión", "Construcción"], avoids: ["Aceptar especificaciones del fabricante sin contexto"] },
    priorities: { realWorldPerformance: 0.3, power: 0.2, solarInput: 0.2, expandability: 0.15, buildQuality: 0.1, price: 0.05 },
    typicalDevices: ["Herramientas", "Paneles solares", "Bombas", "Neveras", "Equipamiento de campo"],
    seo: { title: "Sergio: uso off-grid", description: "Perfil editorial para energía portátil off-grid y consumos exigentes." },
  } satisfies Persona),
  definePersona({
    id: "carmen", name: "Carmen", slug: "carmen", label: "Viajes largos en autocaravana",
    shortDescription: "Comodidad y fiabilidad para viajar largas temporadas sin cálculos constantes.",
    lifestyle: "Viajes largos en autocaravana, buscando comodidad y sencillez.",
    description: "Representa a quien quiere conectar sus equipos habituales y confiar en que la energía acompañe el viaje.",
    voice: { tone: "Tranquilo, sencillo y orientado a comodidad", technicalLevel: "low", decisionStyle: "Prioriza fiabilidad y facilidad", focusesOn: ["Autonomía", "Tranquilidad", "Garantía", "Facilidad"], avoids: ["Cálculos y jerga técnica innecesaria"] },
    priorities: { reliability: 0.3, autonomy: 0.3, easeOfUse: 0.2, warranty: 0.15, price: 0.05 },
    typicalDevices: ["Nevera", "Cafetera", "Televisión", "Móviles", "Luces", "Pequeños electrodomésticos"],
    seo: { title: "Carmen: viajes largos en autocaravana", description: "Perfil editorial para viajar largas temporadas en autocaravana." },
  } satisfies Persona),
];

export function getPersonaBySlug(slug: string): Persona | undefined {
  return personas.find((persona) => persona.slug === slug);
}
