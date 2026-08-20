import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { getExpansionBatteryById } from "@/content/expansion-batteries";
import { personas } from "@/content/personas";
import { getProductById } from "@/content/products";
import { getReviewBySlug, reviews } from "@/content/reviews";
import type { Product } from "@/domain/product";
import styles from "../reviews.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
type Props = { params: Promise<{ slug: string }> };
const nf = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });
const fmt = (value: number) => nf.format(value);
const mins = (value: number) => value < 120 ? `${value} min` : `${fmt(value / 60)} h`;
const labels = { ac: "Red AC", solar: "Solar", "ac-and-solar": "AC + solar", vehicle: "Vehículo" } as const;

export function generateStaticParams() { return reviews.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const review = getReviewBySlug((await params).slug);
  if (!review) return {};
  const canonical = `/reviews/${review.slug}`;
  return { title: review.seo.title, description: review.seo.description, alternates: { canonical }, openGraph: { type: "article", url: canonical, title: review.seo.title, description: review.seo.description, publishedTime: review.publishedAt, modifiedTime: review.updatedAt, siteName: "Carga Nómada", locale: "es_ES" }, twitter: { card: "summary", title: review.seo.title, description: review.seo.description } };
}

function outputRows(product: Product) {
  const rows: [string, string][] = [];
  product.outputs.ac.forEach((o) => rows.push(["AC", `${o.quantity} ${o.connection === "hardwire-terminal" ? "terminal cableado" : "tomas"} · ${fmt(o.maxCombinedWatts ?? product.continuousOutputWatts)} W compartidos`]));
  product.outputs.usbA?.forEach((o) => rows.push(["USB-A", `${o.quantity} × hasta ${o.maxWatts} W${o.protocol ? ` · ${o.protocol}` : ""}`]));
  product.outputs.usbC?.forEach((o) => rows.push(["USB-C", `${o.quantity} × hasta ${o.maxWatts} W${o.protocol ? ` · ${o.protocol}` : ""}`]));
  product.outputs.dc?.forEach((o) => rows.push(["DC", `${o.quantity} × ${o.type} · ${o.voltage ?? "—"} V${o.maxAmps ? ` / ${o.maxAmps} A` : ""}`]));
  return rows;
}

export default async function ReviewPage({ params }: Props) {
  const review = getReviewBySlug((await params).slug);
  if (!review) notFound();
  const product = getProductById(review.productId);
  const persona = personas.find((item) => item.id === review.personaId);
  if (!product || !persona) notFound();
  const expansions = (review.expansionBatteryIds ?? []).map(getExpansionBatteryById).filter((item) => item !== undefined);
  const usableWh = product.capacityWh * .85;
  const hours = usableWh / review.estimateLoadWatts;
  const canonical = `${siteUrl}/reviews/${review.slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Reviews", item: `${siteUrl}/reviews` }, { "@type": "ListItem", position: 3, name: product.name, item: canonical }] },
    { "@type": "Product", "@id": `${canonical}#product`, name: product.name, brand: { "@type": "Brand", name: "FOSSiBOT" }, model: product.model, sku: product.id, description: review.excerpt, additionalProperty: [{ "@type": "PropertyValue", name: "Capacidad", value: `${product.capacityWh} Wh` }, { "@type": "PropertyValue", name: "Potencia continua", value: `${product.continuousOutputWatts} W` }, { "@type": "PropertyValue", name: "Química", value: product.battery.chemistry }, { "@type": "PropertyValue", name: "Peso", value: `${product.weightKg} kg` }] },
    { "@type": "Article", "@id": `${canonical}#article`, mainEntityOfPage: canonical, headline: review.h1, description: review.seo.description, datePublished: review.publishedAt, dateModified: review.updatedAt, inLanguage: "es", author: { "@type": "Organization", name: "Carga Nómada", url: siteUrl }, publisher: { "@type": "Organization", name: "Carga Nómada", url: siteUrl }, about: { "@id": `${canonical}#product` }, breadcrumb: { "@id": `${canonical}#breadcrumb` } }
  ] };

  return <><main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className={styles.reviewHero}><div className={styles.content}>
      <nav className={styles.breadcrumb} aria-label="Migas de pan"><Link href="/">Inicio</Link><span>/</span><Link href="/reviews">Reviews</Link><span>/</span><span>{product.model}</span></nav>
      <p className={styles.kicker}>{review.eyebrow}</p><h1>{review.h1}</h1><p className={styles.dek}>{review.excerpt}</p>
      <dl className={styles.heroStats}><div><dt>Capacidad</dt><dd>{fmt(product.capacityWh)} Wh</dd></div><div><dt>Potencia</dt><dd>{fmt(product.continuousOutputWatts)} W</dd></div><div><dt>Peso</dt><dd>{fmt(product.weightKg ?? 0)} kg</dd></div><div><dt>Actualizado</dt><dd>20·08·26</dd></div></dl>
    </div></header>
    <div className={styles.content}>
      <div className={styles.evidenceBar} aria-label="Niveles de evidencia"><div><b>Dato verificado</b><small>Transcrito y comprobado en la fuente oficial.</small></div><div><b>Declara fabricante</b><small>Cifra sujeta a sus condiciones de ensayo.</small></div><div><b>Análisis editorial</b><small>Interpretación de Carga Nómada.</small></div><div><b>Estimación</b><small>Cálculo con supuestos visibles; no es una prueba.</small></div></div>
      <section className={styles.quick} aria-labelledby="respuesta-rapida"><div><p className={styles.index}>Respuesta rápida</p><h2 id="respuesta-rapida">¿Merece la pena?</h2><p>{review.quickAnswer.summary}</p></div><div><h3>Ventaja principal</h3><p>{review.quickAnswer.advantage}</p></div><div><h3>Límite principal</h3><p>{review.quickAnswer.limitation}</p></div></section>
      <div className={styles.bodyGrid}><article className={styles.article}>
        <section id="perspectiva"><p className={styles.index}>01 · Perspectiva editorial</p><h2>Lo que busco en esta power station</h2>{review.intro.map((p) => <p key={p}>{p}</p>)}</section>
        <section id="ficha"><p className={styles.index}>02 · Datos verificados</p><h2>Ficha técnica de {product.model}</h2><table><tbody><tr><th>Capacidad</th><td>{fmt(product.capacityWh)} Wh</td></tr><tr><th>Salida continua / pico</th><td>{fmt(product.continuousOutputWatts)} W / {fmt(product.peakOutputWatts ?? 0)} W</td></tr><tr><th>Batería</th><td>{product.battery.chemistry} · {fmt(product.battery.cycles ?? 0)} ciclos declarados hasta {product.battery.retainedCapacityPercentAtCycles}%</td></tr><tr><th>Peso y tamaño</th><td>{fmt(product.weightKg ?? 0)} kg · {product.dimensions ? `${product.dimensions.widthMm} × ${product.dimensions.heightMm} × ${product.dimensions.depthMm} mm` : "No indicado"}</td></tr><tr><th>Garantía</th><td>{product.warranty?.duration} {product.warranty?.unit === "years" ? "años" : "meses"} declarados</td></tr></tbody></table></section>
        <section id="claves"><p className={styles.index}>03 · Lectura clave</p><h2>Lo importante para este uso</h2>{review.focus.map((item) => <div className={styles.focus} key={item.title}><span className={styles.evidenceTag}>{item.evidence === "verified-fact" ? "Dato verificado" : item.evidence === "estimate" ? "Estimación" : "Análisis editorial"}</span><h3>{item.title}</h3><p>{item.body}</p></div>)}</section>
        <section id="autonomia"><p className={styles.index}>04 · Capacidad y cálculo</p><h2>¿Qué autonomía puedo esperar?</h2>{review.autonomy.map((p) => <p key={p}>{p}</p>)}<div className={styles.estimate}><span className={styles.evidenceTag}>Estimación, no prueba</span><strong>≈ {fmt(hours)} horas</strong><p>{fmt(product.capacityWh)} Wh × 0,85 ÷ {review.estimateLoadWatts} W. Supone una carga constante de {review.estimateLoadWatts} W y un 85 % utilizable; el resultado real puede ser menor.</p></div></section>
        <section id="potencia"><p className={styles.index}>05 · Potencia</p><h2>Qué puedo conectar y qué vigilar</h2>{review.power.map((p) => <p key={p}>{p}</p>)}</section>
        <section id="puertos"><p className={styles.index}>06 · Conexiones generadas</p><h2>Puertos y salidas</h2><table><thead><tr><th>Grupo</th><th>Configuración oficial</th></tr></thead><tbody>{outputRows(product).map(([name, value], i) => <tr key={`${name}-${i}`}><td>{name}</td><td>{value}</td></tr>)}</tbody></table></section>
        <section id="carga"><p className={styles.index}>07 · Declaración del fabricante</p><h2>Cómo se recarga</h2><p>Los siguientes tiempos son declaraciones de FOSSiBOT bajo sus condiciones; no los hemos reproducido. El sol, la temperatura, el tramo de carga y la fuente pueden alterar el resultado.</p><table><thead><tr><th>Método</th><th>Tramo</th><th>Tiempo declarado</th></tr></thead><tbody>{product.charging?.manufacturerDeclaredTimes?.map((t, i) => <tr key={i}><td>{labels[t.method]}</td><td>{t.fromPercent}–{t.toPercent}%{t.inputWatts ? ` · ${t.inputWatts} W` : ""}</td><td>{mins(t.durationMinutes)}{t.conditions ? ` · ${t.conditions}` : ""}</td></tr>)}</tbody></table></section>
        <section id="transporte"><p className={styles.index}>08 · Uso cotidiano</p><h2>Peso, volumen y transporte</h2>{review.transport.map((p) => <p key={p}>{p}</p>)}</section>
        {review.expansion && <section id="expansion"><p className={styles.index}>09 · Sistema ampliable</p><h2>Batería de expansión</h2>{review.expansion.map((p) => <p key={p}>{p}</p>)}{expansions.map((battery) => <div className={styles.focus} key={battery.id}><span className={styles.evidenceTag}>Dato verificado</span><h3>{battery.name}</h3><p>{fmt(battery.capacityWh)} Wh · {fmt(battery.weightKg ?? 0)} kg · hasta {battery.maxUnitsPerProduct} módulos compatibles.</p></div>)}</section>}
        <section id="balance"><p className={styles.index}>10 · Balance editorial</p><h2>Pros y contras</h2><div className={styles.split}><div className={styles.panel}><h3>A favor</h3><ul>{review.pros.map((x) => <li key={x}>{x}</li>)}</ul></div><div className={styles.panel}><h3>En contra</h3><ul>{review.cons.map((x) => <li key={x}>{x}</li>)}</ul></div></div></section>
        <section id="encaje"><p className={styles.index}>11 · Decisión</p><h2>Para quién sí y para quién no</h2><div className={styles.split}><div className={styles.panel}><h3>Sí encaja</h3><ul>{review.forWhom.map((x) => <li key={x}>{x}</li>)}</ul></div><div className={styles.panel}><h3>Buscaría otra opción</h3><ul>{review.notForWhom.map((x) => <li key={x}>{x}</li>)}</ul></div></div></section>
        <section id="visuales"><p className={styles.index}>12 · Archivo visual</p><h2>Fotos pendientes de autorización</h2><p>No mostramos imágenes de terceros sin permiso. Estos huecos están preparados para archivos propios o autorizados, con dimensiones reservadas para evitar saltos de diseño.</p><div className={styles.visualGrid}>{review.imagePaths.map((path, i) => <div className={styles.placeholder} role="img" aria-label={`Fotografía pendiente de ${product.name}: vista ${i + 1}`} key={path}><span>{path}</span><b>0{i + 1}</b></div>)}</div></section>
        <section id="conclusion"><p className={styles.index}>13 · Conclusión</p><h2>Mi veredicto, con los límites a la vista</h2>{review.conclusion.map((p) => <p key={p}>{p}</p>)}</section>
        <section id="faq" className={styles.faq}><p className={styles.index}>14 · Preguntas frecuentes</p><h2>Dudas sobre {product.model}</h2>{review.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
        <section id="fuentes"><p className={styles.index}>15 · Transparencia</p><h2>Fuentes y metodología</h2><div className={styles.disclosure}><p><strong>No es un test físico.</strong> La ficha se verificó el 20 de agosto de 2026. Precio, disponibilidad y especificaciones pueden cambiar; consulta siempre el manual vigente.</p><p>El texto en primera persona es una técnica editorial para explicar el caso de uso de {persona.name} ({persona.label}). El perfil es ficticio y no constituye una opinión de cliente.</p></div><ul className={styles.sourceList}><li><a href={product.source.url} rel="nofollow">Ficha oficial de {product.name}</a></li>{expansions.map((b) => <li key={b.id}><a href={b.source.url} rel="nofollow">Ficha oficial de {b.name}</a></li>)}</ul></section>
        <section><p className={styles.index}>Sigue comparando</p><h2>Alternativas dentro del archivo</h2><div className={styles.related}>{review.relatedReviewSlugs.map((slug) => { const alt = getReviewBySlug(slug); return alt ? <Link key={slug} href={`/reviews/${slug}`}>{alt.h1} →</Link> : null; })}</div></section>
      </article><aside className={styles.aside}><p className={styles.meta}>En esta review</p>{[["perspectiva","Perspectiva"],["ficha","Ficha técnica"],["autonomia","Autonomía"],["potencia","Potencia"],["puertos","Puertos"],["carga","Carga"],["transporte","Transporte"],...(review.expansion ? [["expansion","Expansión"]] : []),["balance","Pros y contras"],["faq","Preguntas"],["fuentes","Fuentes"]].map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><div className={styles.footerSpace} />
    </div>
  </main><SiteFooter /></>;
}
