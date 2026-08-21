export type ApplianceInput = {
  watts: number;
  hoursPerDay: number;
  quantity: number;
  measuredDailyWh?: number | null;
};

export type CalculatorProduct = {
  id: string;
  name: string;
  model: string;
  capacityWh: number;
  continuousOutputWatts: number;
  image?: string;
  reviewHref?: string;
};

export type FitStatus = "good" | "tight" | "short" | "more";
export type ProductFit = { status: FitStatus; capacityPass: boolean; powerPass: boolean; explanation: string };

const finitePositive = (value: number) => Number.isFinite(value) && value > 0 ? value : 0;

export function applianceDailyWh(appliance: ApplianceInput): number {
  const quantity = finitePositive(appliance.quantity);
  const measured = appliance.measuredDailyWh;
  return measured !== null && measured !== undefined
    ? finitePositive(measured) * quantity
    : finitePositive(appliance.watts) * finitePositive(appliance.hoursPerDay) * quantity;
}

export function dailyWh(appliances: readonly ApplianceInput[]): number {
  return appliances.reduce((total, appliance) => total + applianceDailyWh(appliance), 0);
}

export function simultaneousWatts(appliances: readonly ApplianceInput[]): number {
  return appliances.reduce((total, appliance) => total + finitePositive(appliance.watts) * finitePositive(appliance.quantity), 0);
}

export function tripWh(dailyEnergyWh: number, days: number): number {
  return finitePositive(dailyEnergyWh) * finitePositive(days);
}

export function minimumNominalWh(requiredUsefulWh: number, usableFraction: number): number {
  return usableFraction > 0 && usableFraction <= 1 ? finitePositive(requiredUsefulWh) / usableFraction : 0;
}

export function recommendedWh(minimumWh: number, reserveFraction: number): number {
  return finitePositive(minimumWh) * (1 + Math.max(0, finitePositive(reserveFraction)));
}

export function estimatedDays(capacityWh: number, usableFraction: number, dailyEnergyWh: number): number {
  return dailyEnergyWh > 0 ? finitePositive(capacityWh) * usableFraction / dailyEnergyWh : 0;
}

export function productFit(product: CalculatorProduct, minimumWh: number, targetWh: number, conservativeWatts: number): ProductFit {
  const capacityPass = product.capacityWh >= minimumWh;
  const powerPass = conservativeWatts <= 0 || product.continuousOutputWatts >= conservativeWatts;
  if (!capacityPass || !powerPass) return { status: "short", capacityPass, powerPass, explanation: !powerPass && capacityPass ? "La capacidad alcanza, pero faltaría potencia si todo coincidiera." : !capacityPass && powerPass ? "La potencia alcanza, pero la capacidad queda por debajo del mínimo." : "Queda por debajo tanto en capacidad como en potencia conservadora." };
  if (product.capacityWh < targetWh) return { status: "tight", capacityPass, powerPass, explanation: "Supera el mínimo, pero no alcanza el objetivo con margen." };
  if (product.capacityWh > targetWh * 1.6) return { status: "more", capacityPass, powerPass, explanation: "Ofrece bastante más capacidad; también puede implicar más peso, tamaño y coste." };
  return { status: "good", capacityPass, powerPass, explanation: "Cubre el objetivo de capacidad y el escenario conservador de potencia." };
}

export function sortProductsByFit(products: readonly CalculatorProduct[], minimumWh: number, targetWh: number, watts: number): CalculatorProduct[] {
  const rank: Record<FitStatus, number> = { good: 0, tight: 1, more: 2, short: 3 };
  return [...products].sort((a, b) => {
    const fitA = productFit(a, minimumWh, targetWh, watts);
    const fitB = productFit(b, minimumWh, targetWh, watts);
    return rank[fitA.status] - rank[fitB.status] || Math.abs(a.capacityWh - targetWh) - Math.abs(b.capacityWh - targetWh);
  });
}
