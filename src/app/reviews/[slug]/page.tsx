import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { getExpansionBatteryById } from "@/content/expansion-batteries";
import { personas } from "@/content/personas";
import { getProductById } from "@/content/products";
import { getReviewBySlug, reviews } from "@/content/reviews";
import type { Product } from "@/domain/product";
import styles from "../reviews.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carganomada.com";
type Props = { params: Promise<{ slug: string }> };
const nf = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });
const fmt = (value: number) => nf.format(value);
const mins = (value: number) =>
  value < 120 ? `${value} min` : `${fmt(value / 60)} h`;
const labels = {
  ac: "Red AC",
  solar: "Solar",
  "ac-and-solar": "AC + solar",
  vehicle: "Vehículo",
} as const;
const sectionHeadings = {
  juan: [
    "Lo primero que miraría",
    "¿Me da para un fin de semana?",
    "Lo que puedo enchufar",
    "Cómo la cargaría",
    "El peso: aquí sí importa",
    "¿Para quién la veo?",
    "¿La elegiría para mis escapadas?",
  ],
  alex: [
    "Lo primero que miro para trabajar",
    "¿Termino una jornada y empiezo la siguiente?",
    "Potencia para trabajar y algo más",
    "Cómo recuperaría energía",
    "Moverla dentro y fuera de la camper",
    "¿Para qué puesto de trabajo encaja?",
    "¿La elegiría para mi camper?",
  ],
  laura: [
    "Lo que cambia cuando viajamos cuatro",
    "¿Nos da margen a todos?",
    "Todo lo que conectamos en familia",
    "Cómo la cargaría durante el viaje",
    "22 kg necesitan un sitio",
    "¿Para qué familia la veo?",
    "¿Es la que elegiría para mi caravana?",
  ],
  carmen: [
    "Lo que me daría tranquilidad",
    "Viajar sin mirar el porcentaje todo el día",
    "Comodidad sin hacer malabares",
    "Cargar menos veces",
    "Un equipo para dejar instalado",
    "¿Cuándo merece la pena este tamaño?",
    "¿La elegiría para viajar varias semanas?",
  ],
  sergio: [
    "Las cifras que sí quiero entender",
    "Primero calculo mis Wh diarios",
    "7.200 W no bastan para decidir",
    "La parte solar del sistema",
    "Con 70 kg ya hablamos de instalación",
    "¿Quién puede aprovechar este sistema?",
    "¿La instalaría en un sistema off-grid?",
  ],
} as const;

const chargingIntros = {
  juan: "Yo miraría estos tiempos para saber si puedo dejarla lista antes de salir o recuperar carga durante una parada. Con solar contaría siempre con margen: en el camping rara vez tengo las condiciones perfectas de una ficha.",
  alex: "Para mí la recarga forma parte de la jornada. Los 500 W solares de la F1800 me permiten plantear una recuperación seria mientras trabajo, aunque dimensionaría los paneles por tensión y corriente, no solo por vatios.",
  laura: "Yo organizaría la recarga alrededor del viaje, no a la familia alrededor de la batería. La red me sirve para salir al 100 % y el solar o el vehículo para recuperar energía durante la ruta.",
  carmen: "Prefiero una recarga sencilla y poco frecuente. Estos tiempos me orientan para aprovechar una parada con red o un buen día de sol sin pasar el viaje pendiente del porcentaje.",
  sergio: "No dimensionaría la parte solar con un tiempo promocional. Primero comprobaría ventanas MPPT, tensión, corriente, protecciones y producción en el peor periodo razonable; después usaría estos tiempos como referencia.",
} as const;

export function generateStaticParams() {
  return reviews.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const review = getReviewBySlug((await params).slug);
  if (!review) return {};
  const product = getProductById(review.productId);
  const canonical = `/reviews/${review.slug}`;
  const socialImages = product?.images[0]
    ? [{ url: product.images[0].src, alt: product.images[0].alt }]
    : undefined;
  return {
    title: review.seo.title,
    description: review.seo.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: review.seo.title,
      description: review.seo.description,
      publishedTime: review.publishedAt,
      modifiedTime: review.updatedAt,
      siteName: "Carga Nómada",
      locale: "es_ES",
      images: socialImages,
    },
    twitter: {
      card: socialImages ? "summary_large_image" : "summary",
      title: review.seo.title,
      description: review.seo.description,
      images: socialImages,
    },
  };
}

function outputRows(product: Product) {
  const rows: [string, string][] = [];
  product.outputs.ac.forEach((o) =>
    rows.push([
      "AC",
      `${o.quantity} ${o.connection === "hardwire-terminal" ? "terminal cableado" : "tomas"} · ${fmt(o.maxCombinedWatts ?? product.continuousOutputWatts)} W compartidos`,
    ]),
  );
  product.outputs.usbA?.forEach((o) =>
    rows.push([
      "USB-A",
      `${o.quantity} × hasta ${o.maxWatts} W${o.protocol ? ` · ${o.protocol}` : ""}`,
    ]),
  );
  product.outputs.usbC?.forEach((o) =>
    rows.push([
      "USB-C",
      `${o.quantity} × hasta ${o.maxWatts} W${o.protocol ? ` · ${o.protocol}` : ""}`,
    ]),
  );
  product.outputs.dc?.forEach((o) =>
    rows.push([
      "DC",
      `${o.quantity} × ${o.type} · ${o.voltage ?? "—"} V${o.maxAmps ? ` / ${o.maxAmps} A` : ""}`,
    ]),
  );
  return rows;
}

export default async function ReviewPage({ params }: Props) {
  const review = getReviewBySlug((await params).slug);
  if (!review) notFound();
  const product = getProductById(review.productId);
  const persona = personas.find((item) => item.id === review.personaId);
  if (!product || !persona) notFound();
  const expansions = (review.expansionBatteryIds ?? [])
    .map(getExpansionBatteryById)
    .filter((item) => item !== undefined);
  const usableWh = product.capacityWh * 0.85;
  const hours = usableWh / review.estimateLoadWatts;
  const headings =
    sectionHeadings[review.personaId as keyof typeof sectionHeadings];
  const canonical = `${siteUrl}/reviews/${review.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Reviews",
            item: `${siteUrl}/reviews`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: canonical,
          },
        ],
      },
      {
        "@type": "Product",
        "@id": `${canonical}#product`,
        name: product.name,
        image: product.images.map((item) => `${siteUrl}${item.src}`),
        brand: { "@type": "Brand", name: "FOSSiBOT" },
        manufacturer: { "@type": "Organization", name: "FOSSiBOT" },
        model: product.model,
        sku: product.id,
        url: canonical,
        sameAs: product.source.url,
        description: review.excerpt,
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Capacidad",
            value: `${product.capacityWh} Wh`,
          },
          {
            "@type": "PropertyValue",
            name: "Potencia continua",
            value: `${product.continuousOutputWatts} W`,
          },
          {
            "@type": "PropertyValue",
            name: "Química",
            value: product.battery.chemistry,
          },
          {
            "@type": "PropertyValue",
            name: "Peso",
            value: `${product.weightKg} kg`,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        mainEntityOfPage: canonical,
        headline: review.h1,
        description: review.seo.description,
        datePublished: review.publishedAt,
        dateModified: review.updatedAt,
        inLanguage: "es",
        isAccessibleForFree: true,
        author: { "@id": `${siteUrl}#organization` },
        publisher: { "@id": `${siteUrl}#organization` },
        about: { "@id": `${canonical}#product` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        citation: [
          product.source.url,
          ...expansions.map((battery) => battery.source.url),
        ],
      },
    ],
  };

  return (
    <>
      <main className={styles.page}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <header className={styles.reviewHero}>
          <div className={styles.content}>
            <nav className={styles.breadcrumb} aria-label="Migas de pan">
              <Link href="/">Inicio</Link>
              <span>/</span>
              <Link href="/reviews">Reviews</Link>
              <span>/</span>
              <span>{product.model}</span>
            </nav>
            <p className={styles.kicker}>{review.eyebrow}</p>
            <h1>{review.h1}</h1>
            <p className={styles.dek}>{review.excerpt}</p>
            <div className={styles.perspectiveNote}>
              <strong>
                Perspectiva editorial: {persona.name} · {persona.label}
              </strong>
              <span>
                Análisis basado en especificaciones verificadas y estimaciones.
                Las pruebas físicas se identifican siempre como tales.
              </span>
            </div>
            <p className={styles.byline}>
              Por{" "}
              <Link href="/sobre-carga-nomada">
                Equipo editorial de Carga Nómada
              </Link>{" "}
              · Publicado el 20 de agosto de 2026 · Revisado el 21 de agosto de
              2026
            </p>
            {product.images[0] && (
              <figure className={styles.heroMedia}>
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={1440}
                  height={1440}
                  sizes="(max-width: 800px) 100vw, 46vw"
                  priority
                />
              </figure>
            )}
            <dl className={styles.heroStats}>
              <div>
                <dt>Capacidad</dt>
                <dd>{fmt(product.capacityWh)} Wh</dd>
              </div>
              <div>
                <dt>Potencia</dt>
                <dd>{fmt(product.continuousOutputWatts)} W</dd>
              </div>
              <div>
                <dt>Peso</dt>
                <dd>{fmt(product.weightKg ?? 0)} kg</dd>
              </div>
              <div>
                <dt>Actualizado</dt>
                <dd>20·08·26</dd>
              </div>
            </dl>
          </div>
        </header>
        <div className={styles.content}>
          <section className={styles.quick} aria-labelledby="respuesta-rapida">
            <div>
              <p className={styles.index}>Respuesta rápida</p>
              <h2 id="respuesta-rapida">¿La tendría en cuenta?</h2>
              <p>{review.quickAnswer.summary}</p>
            </div>
            <div>
              <h3>Lo mejor para mí</h3>
              <p>{review.quickAnswer.advantage}</p>
            </div>
            <div>
              <h3>Lo que me frena</h3>
              <p>{review.quickAnswer.limitation}</p>
            </div>
          </section>
          <div className={styles.bodyGrid}>
            <article className={styles.article}>
              <section id="perspectiva">
                <p className={styles.index}>01 · Perspectiva editorial</p>
                <h2>Lo que busco en esta power station</h2>
                {review.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
              <section id="ficha">
                <p className={styles.index}>02 · Datos verificados</p>
                <h2>Ficha técnica de {product.model}</h2>
                <table>
                  <tbody>
                    <tr>
                      <th>Capacidad</th>
                      <td>{fmt(product.capacityWh)} Wh</td>
                    </tr>
                    <tr>
                      <th>Salida continua / pico</th>
                      <td>
                        {fmt(product.continuousOutputWatts)} W /{" "}
                        {fmt(product.peakOutputWatts ?? 0)} W
                      </td>
                    </tr>
                    <tr>
                      <th>Batería</th>
                      <td>
                        {product.battery.chemistry} ·{" "}
                        {fmt(product.battery.cycles ?? 0)} ciclos declarados
                        hasta {product.battery.retainedCapacityPercentAtCycles}%
                      </td>
                    </tr>
                    <tr>
                      <th>Peso y tamaño</th>
                      <td>
                        {fmt(product.weightKg ?? 0)} kg ·{" "}
                        {product.dimensions
                          ? `${product.dimensions.widthMm} × ${product.dimensions.heightMm} × ${product.dimensions.depthMm} mm`
                          : "No indicado"}
                      </td>
                    </tr>
                    <tr>
                      <th>Garantía</th>
                      <td>
                        {product.warranty?.duration}{" "}
                        {product.warranty?.unit === "years" ? "años" : "meses"}{" "}
                        declarados
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section id="claves">
                <p className={styles.index}>03 · Mi lectura</p>
                <h2>{headings[0]}</h2>
                {review.focus.map((item) => (
                  <div className={styles.focus} key={item.title}>
                    <span className={styles.evidenceTag}>
                      {item.evidence === "verified-fact"
                        ? "Dato oficial"
                        : item.evidence === "estimate"
                          ? "Estimación"
                          : "Análisis editorial"}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                ))}
              </section>
              <section id="autonomia">
                <p className={styles.index}>04 · Autonomía</p>
                <h2>{headings[1]}</h2>
                {review.autonomy.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <div className={styles.estimate}>
                  <span className={styles.evidenceTag}>Estimación</span>
                  <strong>≈ {fmt(hours)} horas</strong>
                  <p>
                    {fmt(product.capacityWh)} Wh × 0,85 ÷{" "}
                    {review.estimateLoadWatts} W. Supone una carga constante de{" "}
                    {review.estimateLoadWatts} W y un 85 % utilizable; el
                    resultado real puede ser menor.
                  </p>
                </div>
              </section>
              <section id="potencia">
                <p className={styles.index}>05 · Potencia en contexto</p>
                <h2>{headings[2]}</h2>
                {review.power.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
              <section id="puertos">
                <p className={styles.index}>06 · Consulta rápida</p>
                <h2>Los puertos que tengo disponibles</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Grupo</th>
                      <th>Configuración oficial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outputRows(product).map(([name, value], i) => (
                      <tr key={`${name}-${i}`}>
                        <td>{name}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <section id="carga">
                <p className={styles.index}>07 · Recarga</p>
                <h2>{headings[3]}</h2>
                <p>
                  {
                    chargingIntros[
                      review.personaId as keyof typeof chargingIntros
                    ]
                  }
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Método</th>
                      <th>Tramo</th>
                      <th>Tiempo oficial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.charging?.manufacturerDeclaredTimes?.map(
                      (t, i) => (
                        <tr key={i}>
                          <td>{labels[t.method]}</td>
                          <td>
                            {t.fromPercent}–{t.toPercent}%
                            {t.inputWatts ? ` · ${t.inputWatts} W` : ""}
                          </td>
                          <td>
                            {mins(t.durationMinutes)}
                            {t.conditions ? ` · ${t.conditions}` : ""}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </section>
              <section id="transporte">
                <p className={styles.index}>08 · En ruta</p>
                <h2>{headings[4]}</h2>
                {review.transport.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
              {review.expansion && (
                <section id="expansion">
                  <p className={styles.index}>09 · Sistema ampliable</p>
                  <h2>Batería de expansión</h2>
                  {review.expansion.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {expansions.map((battery) => (
                    <div className={styles.focus} key={battery.id}>
                      <span className={styles.evidenceTag}>
                        Dato verificado
                      </span>
                      <h3>{battery.name}</h3>
                      <p>
                        {fmt(battery.capacityWh)} Wh ·{" "}
                        {fmt(battery.weightKg ?? 0)} kg · hasta{" "}
                        {battery.maxUnitsPerProduct} módulos compatibles.
                      </p>
                    </div>
                  ))}
                </section>
              )}
              <section id="balance">
                <p className={styles.index}>10 · Mi balance</p>
                <h2>Lo que me convence y lo que me hace dudar</h2>
                <div className={styles.split}>
                  <div className={styles.panel}>
                    <h3>Lo que me convence</h3>
                    <ul>
                      {review.pros.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.panel}>
                    <h3>Lo que me hace dudar</h3>
                    <ul>
                      {review.cons.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
              <section id="encaje">
                <p className={styles.index}>11 · Decisión</p>
                <h2>{headings[5]}</h2>
                <div className={styles.split}>
                  <div className={styles.panel}>
                    <h3>Sí la tendría en cuenta</h3>
                    <ul>
                      {review.forWhom.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.panel}>
                    <h3>Yo miraría otra</h3>
                    <ul>
                      {review.notForWhom.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
              <section id="visuales">
                <p className={styles.index}>12 · Archivo visual</p>
                <h2>{product.name}, en detalle</h2>
                <div className={styles.visualGrid}>
                  {review.imagePaths.map((path, i) => {
                    const image = product.images.find(
                      (item) => item.src === path,
                    );
                    return image ? (
                      <figure className={styles.productFigure} key={path}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={1440}
                          height={1440}
                          sizes="(max-width: 800px) 100vw, 50vw"
                          loading="lazy"
                        />
                        <figcaption>{image.alt}</figcaption>
                      </figure>
                    ) : (
                      <div
                        className={styles.placeholder}
                        role="img"
                        aria-label={`Vista ${i + 1} de ${product.name}`}
                        key={path}
                      >
                        <b>0{i + 1}</b>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section id="conclusion">
                <p className={styles.index}>13 · Mi decisión</p>
                <h2>{headings[6]}</h2>
                {review.conclusion.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
              <section id="faq" className={styles.faq}>
                <p className={styles.index}>14 · Preguntas frecuentes</p>
                <h2>Dudas sobre {product.model}</h2>
                {review.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </section>
              <section id="fuentes">
                <p className={styles.index}>15 · Información</p>
                <h2>Datos del producto</h2>
                <div className={styles.disclosure}>
                  <p>
                    Los perfiles de Carga Nómada representan distintos tipos de
                    usuario. Los datos técnicos proceden de fuentes verificadas;
                    las estimaciones se identifican y las pruebas físicas solo se
                    publican cuando existen.
                  </p>
                  <p>
                    Ficha revisada el 21 de agosto de 2026. El precio y las
                    especificaciones pueden cambiar; comprueba la documentación
                    vigente antes de comprar.
                  </p>
                </div>
                <ul className={styles.sourceList}>
                  <li>
                    <a href={product.source.url} rel="nofollow">
                      Ver ficha de {product.name}
                    </a>
                  </li>
                  {expansions.map((b) => (
                    <li key={b.id}>
                      <a href={b.source.url} rel="nofollow">
                        Ver ficha de {b.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <p className={styles.index}>Sigue comparando</p>
                <h2>Todos los modelos</h2>
                <div className={styles.related}>
                  {reviews.map((item) => {
                    const relatedProduct = getProductById(item.productId);
                    if (!relatedProduct) return null;
                    const image = relatedProduct.images[0];
                    return (
                      <Link
                        key={item.slug}
                        href={`/reviews/${item.slug}`}
                        className={styles.relatedCard}
                        aria-current={item.slug === review.slug ? "page" : undefined}
                      >
                        {image && (
                          <span className={styles.relatedImage}>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={1440}
                              height={1440}
                              sizes="(max-width: 800px) 76vw, 19rem"
                              loading="lazy"
                            />
                          </span>
                        )}
                        <span className={styles.relatedCopy}>
                          <strong>{relatedProduct.name}</strong>
                          <small>
                            {fmt(relatedProduct.capacityWh)} Wh ·{" "}
                            {fmt(relatedProduct.continuousOutputWatts)} W ·{" "}
                            {fmt(relatedProduct.weightKg ?? 0)} kg
                          </small>
                          <span>Ver review →</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </article>
            <aside className={styles.aside}>
              <p className={styles.meta}>En esta review</p>
              {[
                ["perspectiva", "Perspectiva"],
                ["ficha", "Ficha técnica"],
                ["autonomia", "Autonomía"],
                ["potencia", "Potencia"],
                ["puertos", "Puertos"],
                ["carga", "Carga"],
                ["transporte", "Transporte"],
                ...(review.expansion ? [["expansion", "Expansión"]] : []),
                ["balance", "Pros y contras"],
                ["faq", "Preguntas"],
                ["fuentes", "Fuentes"],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </aside>
          </div>
          <div className={styles.footerSpace} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
