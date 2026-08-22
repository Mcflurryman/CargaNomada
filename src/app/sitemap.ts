import type { MetadataRoute } from "next";
import { personas } from "@/content/personas";
import { reviews } from "@/content/reviews";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-20");
  const staticRoutes = ["", "/reviews", "/comparativas", "/guias", "/perfiles", "/sobre-carga-nomada"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: updated, changeFrequency: "monthly" as const, priority: route === "" ? 1 : route === "/reviews" ? .9 : .6 })),
    { url: `${baseUrl}/encontrar-power-station`, lastModified: new Date("2026-08-21"), changeFrequency: "monthly" as const, priority: .8 },
    { url: `${baseUrl}/usos`, lastModified: new Date("2026-08-22"), changeFrequency: "monthly" as const, priority: .7 },
    { url: `${baseUrl}/usos/camping`, lastModified: new Date("2026-08-22"), changeFrequency: "monthly" as const, priority: .8 },
    { url: `${baseUrl}/usos/camper`, lastModified: new Date("2026-08-22"), changeFrequency: "monthly" as const, priority: .8 },
    { url: `${baseUrl}/usos/caravana-autocaravana`, lastModified: new Date("2026-08-22"), changeFrequency: "monthly" as const, priority: .8 },
    { url: `${baseUrl}/usos/trabajo-remoto`, lastModified: new Date("2026-08-22"), changeFrequency: "monthly" as const, priority: .8 },
    { url: `${baseUrl}/usos/off-grid`, lastModified: new Date("2026-08-22"), changeFrequency: "monthly" as const, priority: .8 },
    { url: `${baseUrl}/guias/que-es-una-power-station`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly" as const, priority: .8 },
    { url: `${baseUrl}/guias/wh-power-station`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly" as const, priority: .8 },
    { url: `${baseUrl}/guias/w-vs-wh`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly" as const, priority: .8 },
    { url: `${baseUrl}/guias/calcular-autonomia-power-station`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly" as const, priority: .8 },
    { url: `${baseUrl}/guias/que-puedo-conectar-power-station`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly" as const, priority: .8 },
    { url: `${baseUrl}/guias/placas-solares-power-station`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly" as const, priority: .8 },
    ...reviews.map((review) => ({ url: `${baseUrl}/reviews/${review.slug}`, lastModified: new Date(review.updatedAt), changeFrequency: "monthly" as const, priority: .8 })),
    ...personas.map((persona) => ({ url: `${baseUrl}/perfiles/${persona.slug}`, lastModified: updated, changeFrequency: "yearly" as const, priority: .4 })),
  ];
}
