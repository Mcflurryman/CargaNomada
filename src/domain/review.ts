import type { ExpansionBattery } from "@/domain/expansion-battery";
import type { Persona } from "@/domain/persona";
import type { Product } from "@/domain/product";

export type EvidenceKind = "verified-fact" | "manufacturer-claim" | "editorial-analysis" | "estimate" | "real-test";

export interface ReviewSeo {
  title: string;
  description: string;
  primaryKeyword: string;
  semanticVariants: readonly string[];
  searchIntent: "commercial-investigation" | "informational-commercial";
}

export interface ReviewFaq { question: string; answer: string; }
export interface ReviewFocus { title: string; body: string; evidence: Exclude<EvidenceKind, "real-test">; }

/** Editorial relationship and judgment live here; Product remains manufacturer facts only. */
export interface Review {
  id: string;
  slug: string;
  productId: Product["id"];
  personaId: Persona["id"];
  expansionBatteryIds?: readonly ExpansionBattery["id"][];
  status: "draft" | "published";
  publishedAt: string;
  updatedAt: string;
  h1: string;
  eyebrow: string;
  excerpt: string;
  seo: ReviewSeo;
  quickAnswer: { summary: string; advantage: string; limitation: string };
  intro: readonly string[];
  focus: readonly ReviewFocus[];
  autonomy: readonly string[];
  power: readonly string[];
  transport: readonly string[];
  expansion?: readonly string[];
  pros: readonly string[];
  cons: readonly string[];
  forWhom: readonly string[];
  notForWhom: readonly string[];
  conclusion: readonly string[];
  faqs: readonly ReviewFaq[];
  relatedReviewSlugs: readonly string[];
  estimateLoadWatts: number;
  imagePaths: readonly string[];
}

export function defineReview<const T extends Review>(review: T): T { return review; }
