import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { getProductById } from "@/content/products";
import { reviews } from "@/content/reviews";
import styles from "./reviews.module.css";

export const metadata: Metadata = { title: "Reviews de power stations FOSSiBOT", description: "Cinco análisis editoriales de power stations FOSSiBOT para camping, camper, caravana, autocaravana y uso off-grid.", alternates: { canonical: "/reviews" } };

export default function ReviewsPage() {
  return <><main className={styles.page}><header className={styles.archiveHero}><div className={styles.content}><p className={styles.kicker}>Archivo editorial · 5 análisis</p><h1>Reviews de power stations, con la evidencia a la vista.</h1><p>Datos oficiales separados de estimaciones y criterio editorial. Ninguna puntuación inventada, ninguna experiencia de laboratorio que no haya ocurrido.</p></div></header><div className={`${styles.content} ${styles.reviewGrid}`}>{reviews.map((review, index) => { const product = getProductById(review.productId); if (!product) return null; return <article className={styles.card} key={review.id}><div className={styles.placeholder} role="img" aria-label={`Imagen autorizada de ${product.name}, pendiente de incorporar`}><span>Imagen autorizada pendiente</span><b>0{index + 1}</b></div><p className={styles.meta}>{review.eyebrow}</p><h2>{product.name}</h2><p>{review.excerpt}</p><p><strong>{new Intl.NumberFormat("es-ES").format(product.capacityWh)} Wh</strong> · {new Intl.NumberFormat("es-ES").format(product.continuousOutputWatts)} W · {product.weightKg} kg</p><Link href={`/reviews/${review.slug}`}>Leer la review completa →</Link></article>; })}</div></main><SiteFooter /></>;
}
