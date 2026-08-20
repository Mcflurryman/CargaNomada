import type { MetadataRoute } from "next";
import { personas } from "@/content/personas";
import { reviews } from "@/content/reviews";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-20");
  const staticRoutes = ["", "/reviews", "/comparativas", "/guias", "/perfiles", "/sobre-carga-nomada"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: updated, changeFrequency: "monthly" as const, priority: route === "" ? 1 : route === "/reviews" ? .9 : .6 })),
    ...reviews.map((review) => ({ url: `${baseUrl}/reviews/${review.slug}`, lastModified: new Date(review.updatedAt), changeFrequency: "monthly" as const, priority: .8 })),
    ...personas.map((persona) => ({ url: `${baseUrl}/perfiles/${persona.slug}`, lastModified: updated, changeFrequency: "yearly" as const, priority: .4 })),
  ];
}
