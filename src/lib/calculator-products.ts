import { products } from "@/content/products";
import { getReviewsForProduct } from "@/content/reviews";
import type { CalculatorProduct } from "@/lib/autonomy-calculator";

export function getCalculatorProducts(): CalculatorProduct[] {
  return products.map((product) => {
    const review = getReviewsForProduct(product.id)[0];
    return {
      id: product.id,
      name: product.name,
      model: product.model,
      capacityWh: product.capacityWh,
      continuousOutputWatts: product.continuousOutputWatts,
      image: product.images[0]?.src,
      reviewHref: review ? `/reviews/${review.slug}` : undefined,
    };
  });
}
