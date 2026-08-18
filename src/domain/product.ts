import type { Brand } from "@/domain/brand";

export interface ProductPorts {
  ac?: number;
  usbA?: number;
  usbC?: number;
  car12v?: number;
  dc5521?: number;
}

export interface ProductDimensions {
  widthMm: number;
  heightMm: number;
  depthMm: number;
}

/** Structured product data. Content components must consume this, never duplicate specifications. */
export interface Product {
  id: string;
  name: string;
  slug: string;
  brandId: Brand["id"];
  capacityWh: number;
  outputWatts: number;
  peakWatts?: number;
  weightKg?: number;
  batteryChemistry?: string;
  cycles?: number;
  solarInputWatts?: number;
  acChargeWatts?: number;
  chargeTime?: string;
  ports: ProductPorts;
  dimensions?: ProductDimensions;
  price?: number;
  affiliateUrl?: string;
  images: string[];
}
