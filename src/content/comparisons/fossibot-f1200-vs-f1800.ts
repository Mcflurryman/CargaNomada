import { products } from "@/content/products";

export const comparison = {
  slug: "fossibot-f1200-vs-f1800",
  title: "FOSSiBOT F1200 vs F1800",
  description: "Comparamos capacidad, potencia, carga solar, conexiones y escenarios reales para decidir entre la FOSSiBOT F1200 y la F1800.",
  updatedAt: "2026-08-22",
  left: products[0],
  right: products[1],
  scenarios: [
    { name: "Oficina ligera", detail: "Portátil 40 W × 6 h + móvil 15 Wh + luces 8 W × 4 h", total: 287, margin: 344 },
    { name: "Trabajo conectado", detail: "Portátil 65 W × 6 h + monitor 30 W × 6 h + router 12 W × 8 h", total: 666, margin: 799 },
    { name: "Starlink y portátil", detail: "Starlink 60 W × 8 h + portátil 65 W × 6 h + luces 8 W × 4 h", total: 902, margin: 1082 },
  ],
  uses: [
    ["Camping ligero", "Ideal", "Buena", "La potencia extra de la F1800 suele quedar sin usar."],
    ["Camper sencilla", "Buena", "Buena", "Misma energía disponible; decide por los aparatos simultáneos."],
    ["Trabajo remoto", "Buena", "Ideal", "La F1800 ofrece dos USB-C de 140 W frente a un USB-C de 100 W."],
    ["Starlink + portátil", "Ajustada", "Buena", "La autonomía base es igual, pero la F1800 admite más solar."],
    ["Cafetera ocasional", "Ajustada", "Buena", "Comprueba el consumo real: 1.200 W frente a 1.800 W continuos."],
    ["Varios días sin recarga", "No ideal", "No ideal", "Ambas comparten 1.024 Wh y no admiten batería de expansión."],
    ["Recarga solar frecuente", "Ajustada", "Ideal", "200 W máximos frente a 500 W máximos de entrada solar."],
  ],
} as const;
