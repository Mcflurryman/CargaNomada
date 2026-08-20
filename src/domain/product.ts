import type { Brand } from "@/domain/brand";

export type BatteryChemistry = "LiFePO4" | "NMC" | "LCO" | "LMO" | "LTO" | "NiMH";
export type ChargingMethod = "ac" | "solar" | "ac-and-solar" | "vehicle";
export type WarrantyUnit = "months" | "years";
export type Currency = "EUR" | "USD" | "GBP";

export interface ProductDimensions { widthMm: number; heightMm: number; depthMm: number; }
export interface ProductBattery { chemistry?: BatteryChemistry; cycles?: number; retainedCapacityPercentAtCycles?: number; }
export interface ManufacturerDeclaredChargeTime { method: ChargingMethod; fromPercent: number; toPercent: number; durationMinutes: number; inputWatts?: number; conditions?: string; evidence: "manufacturer-declared"; }
export interface VehicleChargingInput { inputVolts: readonly number[]; maxWattsByVoltage?: Readonly<Partial<Record<12 | 24, number>>>; }
export interface ProductCharging { maxAcInputWatts?: number; maxSolarInputWatts?: number; maxCombinedInputWatts?: number; vehicle?: VehicleChargingInput; manufacturerDeclaredTimes?: readonly ManufacturerDeclaredChargeTime[]; }
export interface AcOutputGroup { quantity: number; connection?: "outlet" | "hardwire-terminal"; maxCombinedWatts?: number; socketRegion?: "EU" | "UK" | "US" | "JP" | "universal"; }
export interface UsbOutputGroup { quantity: number; maxWatts: number; protocol?: string; }
export interface DcOutputGroup { type: "car-socket" | "rv" | "dc5521" | "anderson" | "other"; quantity: number; voltage?: number; maxAmps?: number; maxWatts?: number; connectorName?: string; regulated?: boolean; }
export interface ProductOutputs { ac: readonly AcOutputGroup[]; usbA?: readonly UsbOutputGroup[]; usbC?: readonly UsbOutputGroup[]; dc?: readonly DcOutputGroup[]; }
export interface ProductFeatures { wifi?: boolean; bluetooth?: boolean; app?: boolean; ups?: boolean; bms?: boolean; mppt?: boolean; simultaneousChargeAndDischarge?: boolean; pureSineWave?: boolean; expandableBattery?: boolean; ledLight?: boolean; adjustableAcInput?: boolean; }
export interface ProductWarranty { duration: number; unit: WarrantyUnit; conditions?: string; }
export interface ProductPricing { current?: number; original?: number; currency: Currency; checkedAt: string; }
export interface ProductSource { manufacturer: string; url: string; verifiedAt: string; }
export interface ProductImage { src: string; alt: string; kind?: "product" | "detail" | "lifestyle"; ownership: "owned" | "authorized"; }

/** Manufacturer facts only. Editorial judgment and testing belong to Review. */
export interface Product {
  id: string;
  brandId: Brand["id"];
  name: string;
  slug: string;
  model: string;
  capacityWh: number;
  continuousOutputWatts: number;
  peakOutputWatts?: number;
  battery: ProductBattery;
  weightKg?: number;
  dimensions?: ProductDimensions;
  charging?: ProductCharging;
  outputs: ProductOutputs;
  features?: ProductFeatures;
  warranty?: ProductWarranty;
  pricing?: ProductPricing;
  source: ProductSource;
  affiliateUrl?: string;
  images: readonly ProductImage[];
}

/** Preserves literal product IDs and validates every catalogue entry at compile time. */
export function defineProduct<const T extends Product>(product: T): T { return product; }
