import type { Brand } from "@/domain/brand";
import type { Product, ProductBattery, ProductCharging, ProductDimensions, ProductImage, ProductOutputs, ProductPricing, ProductSource, ProductWarranty } from "@/domain/product";

/** Capacity modules that extend compatible power stations; they are not full AC power stations. */
export interface ExpansionBattery {
  id: string;
  brandId: Brand["id"];
  name: string;
  slug: string;
  model: string;
  capacityWh: number;
  battery: ProductBattery;
  compatibleProductIds: readonly Product["id"][];
  maxUnitsPerProduct?: number;
  weightKg?: number;
  dimensions?: ProductDimensions;
  standaloneCharging?: ProductCharging;
  standaloneOutputs?: Partial<ProductOutputs>;
  hasBms?: boolean;
  warranty?: ProductWarranty;
  pricing?: ProductPricing;
  source: ProductSource;
  affiliateUrl?: string;
  images: readonly ProductImage[];
}

export function defineExpansionBattery<const T extends ExpansionBattery>(battery: T): T { return battery; }
