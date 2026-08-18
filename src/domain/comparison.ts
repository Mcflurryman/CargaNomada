import type { Product } from "@/domain/product";

export interface Comparison {
  id: string;
  slug: string;
  title: string;
  description: string;
  productIds: Product["id"][];
}
