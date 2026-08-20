import { defineExpansionBattery, type ExpansionBattery } from "@/domain/expansion-battery";

export const expansionBatteries = [
  defineExpansionBattery({
    id: "fossibot-fb3840",
    brandId: "fossibot",
    name: "FOSSiBOT FB3840",
    slug: "fossibot-fb3840",
    model: "FB3840",
    capacityWh: 3840,
    battery: { chemistry: "LiFePO4", cycles: 6500, retainedCapacityPercentAtCycles: 50 },
    compatibleProductIds: ["fossibot-f3600-pro"],
    maxUnitsPerProduct: 2,
    weightKg: 37.8,
    dimensions: { widthMm: 609, heightMm: 475.5, depthMm: 321 },
    standaloneCharging: { maxSolarInputWatts: 200 },
    standaloneOutputs: {
      usbA: [{ quantity: 1, maxWatts: 18, protocol: "QC 3.0" }],
      usbC: [{ quantity: 1, maxWatts: 100 }],
    },
    hasBms: true,
    warranty: { duration: 5, unit: "years" },
    pricing: { current: 1199, original: 2299, currency: "EUR", checkedAt: "2026-08-20" },
    source: { manufacturer: "FOSSiBOT", url: "https://eu.fossibot.com/products/fossibot-fb3840", verifiedAt: "2026-08-20" },
    images: [],
  }),
  defineExpansionBattery({
    id: "fossibot-fb5222",
    brandId: "fossibot",
    name: "FOSSiBOT FB5222",
    slug: "fossibot-fb5222",
    model: "FB5222",
    capacityWh: 5222.4,
    battery: { chemistry: "LiFePO4", cycles: 6500, retainedCapacityPercentAtCycles: 80 },
    compatibleProductIds: ["fossibot-f7200"],
    maxUnitsPerProduct: 2,
    weightKg: 55,
    dimensions: { widthMm: 658, heightMm: 410, depthMm: 450 },
    hasBms: true,
    warranty: { duration: 5, unit: "years" },
    pricing: { current: 1999, original: 2699, currency: "EUR", checkedAt: "2026-08-20" },
    source: { manufacturer: "FOSSiBOT", url: "https://eu.fossibot.com/products/fossibot-fb5222", verifiedAt: "2026-08-20" },
    images: [],
  }),
] as const satisfies readonly ExpansionBattery[];

export function getExpansionBatteryById(id: ExpansionBattery["id"]): ExpansionBattery | undefined { return expansionBatteries.find((battery) => battery.id === id); }
export function getExpansionBatteriesForProduct(productId: string): readonly ExpansionBattery[] { return expansionBatteries.filter((battery) => battery.compatibleProductIds.some((compatibleId) => compatibleId === productId)); }
