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

export type PowerAssessmentStatus = "complete" | "partial" | "unknown";
export type PowerAssessment = {
  status: PowerAssessmentStatus;
  knownSimultaneousWatts: number;
  knownPowerItems: number;
  unknownPowerItems: number;
};

export type FitStatus = "good" | "tight" | "short" | "more";
export type ProductFit = {
  status: FitStatus;
  capacityPass: boolean;
  powerPass: boolean | null;
  powerStatus: PowerAssessmentStatus;
  explanation: string;
};

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

export function powerAssessment(appliances: readonly ApplianceInput[]): PowerAssessment {
  const relevant = appliances.filter((appliance) => applianceDailyWh(appliance) > 0);
  const known = relevant.filter((appliance) => finitePositive(appliance.watts) > 0);
  const unknownPowerItems = relevant.length - known.length;
  const knownSimultaneousWatts = known.reduce(
    (total, appliance) => total + finitePositive(appliance.watts) * finitePositive(appliance.quantity),
    0,
  );

  return {
    status: unknownPowerItems === 0 ? "complete" : known.length === 0 ? "unknown" : "partial",
    knownSimultaneousWatts,
    knownPowerItems: known.length,
    unknownPowerItems,
  };
}

export function simultaneousWatts(appliances: readonly ApplianceInput[]): number {
  return powerAssessment(appliances).knownSimultaneousWatts;
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

export function productFit(product: CalculatorProduct, minimumWh: number, targetWh: number, assessment: PowerAssessment): ProductFit {
  const capacityPass = product.capacityWh >= minimumWh;
  const powerPass = assessment.status === "unknown"
    ? null
    : product.continuousOutputWatts >= assessment.knownSimultaneousWatts;

  if (!capacityPass || powerPass === false) {
    const explanation = powerPass === false && capacityPass
      ? assessment.status === "partial"
        ? "La capacidad alcanza, pero la potencia conocida ya supera el límite; además faltan W por evaluar."
        : "La capacidad alcanza, pero faltaría potencia si todo coincidiera."
      : !capacityPass && powerPass !== false
        ? assessment.status === "complete"
          ? "La potencia alcanza, pero la capacidad queda por debajo del mínimo."
          : "La capacidad queda por debajo del mínimo y falta información para validar toda la potencia."
        : "Queda por debajo tanto en capacidad como en la potencia conocida.";
    return { status: "short", capacityPass, powerPass, powerStatus: assessment.status, explanation };
  }

  const uncertainty = assessment.status === "complete"
    ? ""
    : " Cumple la capacidad calculada. No podemos validar completamente la potencia porque faltan los W de uno o más aparatos.";
  if (product.capacityWh < targetWh) return { status: "tight", capacityPass, powerPass, powerStatus: assessment.status, explanation: `Supera el mínimo, pero no alcanza el objetivo con margen.${uncertainty}` };
  if (product.capacityWh > targetWh * 1.6) return { status: "more", capacityPass, powerPass, powerStatus: assessment.status, explanation: `Ofrece bastante más capacidad; también puede implicar más peso, tamaño y coste.${uncertainty}` };
  return { status: "good", capacityPass, powerPass, powerStatus: assessment.status, explanation: assessment.status === "complete" ? "Cubre el objetivo de capacidad y el escenario conservador de potencia." : "Buen encaje de capacidad. No podemos validar completamente la potencia porque faltan los W de uno o más aparatos." };
}

export function sortProductsByFit(products: readonly CalculatorProduct[], minimumWh: number, targetWh: number, assessment: PowerAssessment): CalculatorProduct[] {
  const rank: Record<FitStatus, number> = { good: 0, tight: 1, more: 2, short: 3 };
  return [...products].sort((a, b) => {
    const fitA = productFit(a, minimumWh, targetWh, assessment);
    const fitB = productFit(b, minimumWh, targetWh, assessment);
    return rank[fitA.status] - rank[fitB.status] || Math.abs(a.capacityWh - targetWh) - Math.abs(b.capacityWh - targetWh);
  });
}
