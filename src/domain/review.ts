import type { Persona } from "@/domain/persona";
import type { Product } from "@/domain/product";

export interface PersonaScore {
  personaId: Persona["id"];
  score: number;
}

export interface Review {
  id: string;
  slug: string;
  productId: Product["id"];
  scores: PersonaScore[];
  pros: string[];
  cons: string[];
  content: string;
  verdict: string;
}
