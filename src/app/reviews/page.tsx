import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { getProductById } from "@/content/products";
import { reviews } from "@/content/reviews";
import styles from "./reviews.module.css";

export const metadata: Metadata = {
  title: "Reviews de power stations FOSSiBOT",
  description:
    "Cinco análisis editoriales de power stations FOSSiBOT para camping, camper, caravana, autocaravana y uso off-grid.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <main className={styles.page}>
        <header className={styles.archiveHero}>
          <div className={styles.content}>
            <p className={styles.kicker}>5 análisis en profundidad</p>
            <h1>Reviews de power stations para elegir con criterio.</h1>
            <p>
              Comparamos capacidad, potencia, conexiones, recarga, peso y
              autonomía para distintos tipos de viaje.
            </p>
          </div>
        </header>
        <div className={`${styles.content} ${styles.reviewGrid}`}>
          {reviews.map((review, index) => {
            const product = getProductById(review.productId);
            if (!product) return null;
            return (
              <article className={styles.card} key={review.id}>
                {product.images[0] ? (
                  <Link
                    href={`/reviews/${review.slug}`}
                    className={styles.cardImageLink}
                    aria-label={`Leer la review de ${product.name}`}
                  >
                    <div className={styles.cardImage}>
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        width={1440}
                        height={1440}
                        sizes="(max-width: 800px) 100vw, 50vw"
                      />
                    </div>
                  </Link>
                ) : (
                  <div
                    className={styles.placeholder}
                    role="img"
                    aria-label={`Imagen autorizada de ${product.name}, pendiente de incorporar`}
                  >
                    <span>{product.model}</span>
                    <b>0{index + 1}</b>
                  </div>
                )}
                <p className={styles.meta}>{review.eyebrow}</p>
                <Link
                  href={`/reviews/${review.slug}`}
                  className={styles.cardTitleLink}
                >
                  <h2>{product.name}</h2>
                </Link>
                <p>{review.excerpt}</p>
                <p>
                  <strong>
                    {new Intl.NumberFormat("es-ES").format(product.capacityWh)}{" "}
                    Wh
                  </strong>{" "}
                  ·{" "}
                  {new Intl.NumberFormat("es-ES").format(
                    product.continuousOutputWatts,
                  )}{" "}
                  W · {product.weightKg} kg
                </p>
                <Link href={`/reviews/${review.slug}`}>
                  Leer la review completa →
                </Link>
              </article>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
