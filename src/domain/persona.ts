export type PersonaPriority =
  | "price"
  | "weight"
  | "autonomy"
  | "easeOfUse"
  | "size"
  | "power"
  | "reliability"
  | "fastCharging"
  | "usbC"
  | "efficiency"
  | "solarInput"
  | "connectivity"
  | "realWorldPerformance"
  | "expandability"
  | "buildQuality"
  | "warranty";

/** Only criteria relevant to a profile are stored. Their weights must sum to 1. */
export type PersonaPriorities = Readonly<Partial<Record<PersonaPriority, number>>>;

export type PersonaTechnicalLevel = "low" | "low-medium" | "medium-high" | "high";

export interface PersonaVoice {
  tone: string;
  technicalLevel: PersonaTechnicalLevel;
  decisionStyle: string;
  focusesOn: string[];
  avoids: string[];
}

export interface PersonaSeo {
  title: string;
  description: string;
}

/** Editorial profile based on real needs; it is not a real product reviewer. */
export interface Persona {
  id: string;
  name: string;
  slug: string;
  label: string;
  age?: number;
  occupation?: string;
  travelsWith?: string[];
  shortDescription: string;
  lifestyle: string;
  description: string;
  voice: PersonaVoice;
  priorities: PersonaPriorities;
  typicalDevices: string[];
  avatar?: string;
  seo: PersonaSeo;
}

/** Validates the editorial source of truth when a profile is defined. */
export function definePersona<T extends Persona>(persona: T): T {
  const weights = Object.values(persona.priorities);
  const total = weights.reduce((sum, weight) => sum + weight, 0);

  if (
    weights.length === 0 ||
    weights.some((weight) => !Number.isFinite(weight) || weight < 0) ||
    Math.abs(total - 1) > Number.EPSILON * 10
  ) {
    throw new Error(`Las prioridades de ${persona.slug} deben ser pesos no negativos que sumen 1.`);
  }

  return persona;
}
