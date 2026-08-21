import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/content/products";
import { reviews } from "@/content/reviews";
import { personas } from "@/content/personas";
import { SiteFooter } from "@/components/site-footer";
import styles from "./page.module.css";
import finderStyles from "./finder.module.css";
import reviewImageStyles from "./review-images.module.css";

export const metadata: Metadata = {
  title: "Power Stations para Camper, Camping y Caravana | Carga Nómada",
  description:
    "Reviews, comparativas y guías sobre power stations para camper, camping, caravana, autocaravana y uso off-grid.",
};

const energyPaths = [
  { number: "01", title: "Camping ligero", range: "300–700 Wh", description: "Móviles, luces, cámara y una nevera portátil para una escapada corta.", href: "/reviews/fossibot-f1200-review" },
  { number: "02", title: "Camper y trabajo", range: "700–1.500 Wh", description: "Portátil, conectividad, nevera y carga diaria durante un fin de semana.", href: "/reviews/fossibot-f1800-review" },
  { number: "03", title: "Caravana familiar", range: "1.500–2.500 Wh", description: "Varios dispositivos y pequeños electrodomésticos funcionando con margen.", href: "/reviews/fossibot-f2400-review" },
  { number: "04", title: "Viaje largo u off-grid", range: "+2.500 Wh", description: "Consumos exigentes, estancias largas, expansión y apoyo de carga solar.", href: "/reviews/fossibot-f7200-review" },
] as const;

const reviewCutoutByProductId: Record<string, string> = {
  "fossibot-f1200": "/images/products/fossibot-f1200/cutout.png",
  "fossibot-f1800": "/images/products/fossibot-f1800/cutout.png",
  "fossibot-f2400": "/images/products/fossibot-f2400/cutout.png",
};

const basics = [
  [
    "Fundamentos",
    "Qué es una power station",
    "Qué integra, para qué sirve y en qué se diferencia de una batería externa.",
  ],
  [
    "Capacidad",
    "Qué son los Wh",
    "La cifra que ayuda a estimar cuánta energía puedes almacenar.",
  ],
  [
    "Potencia",
    "W vs Wh: no son lo mismo",
    "Cómo distinguir potencia instantánea y capacidad antes de comparar modelos.",
  ],
  [
    "Cálculo",
    "Cómo calcular la autonomía",
    "Una forma práctica de pasar de consumos y capacidad a horas de uso.",
  ],
  [
    "Compatibilidad",
    "Qué puedes conectar",
    "Comprueba potencia continua, picos y conexiones antes de enchufar un equipo.",
  ],
  [
    "Energía solar",
    "Cómo funciona la carga solar",
    "Paneles, condiciones reales y límites de entrada explicados con claridad.",
  ],
] as const;

const comparisons = [
  "FOSSiBOT F1200 vs F2400",
  "Mejor power station para camping",
  "Mejor power station para caravana",
  "Power station para Starlink",
] as const;

const latestGuides = [
  [
    "Conceptos básicos",
    "Cómo leer la ficha técnica de una power station",
    "Una guía para separar capacidad, potencia, puertos y tiempos de carga.",
  ],
  [
    "Autonomía",
    "Cómo estimar cuántas horas tendrás de energía",
    "Los datos que necesitas antes de hacer un cálculo útil.",
  ],
  [
    "Carga solar",
    "Qué debes mirar antes de elegir un panel solar",
    "Compatibilidad, potencia y condiciones que afectan a la recarga.",
  ],
] as const;

export default function HomePage() {
  return (
    <>
      <main className={styles.home}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image
            className={styles.heroImage}
            src="/images/home/hero/Hero.png"
            alt="Camper junto al mar con una power station en una mesa exterior"
            fill
            priority
            sizes="100vw"
          />
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.kicker}>
              Energía portátil · Guías y análisis independientes
            </p>
            <h1 id="hero-title">
              Power stations para <em>camper, camping y caravana</em>
            </h1>
            <p className={styles.heroLead}>
              Analizamos, comparamos y explicamos estaciones de energía
              portátiles para ayudarte a elegir según cómo viajas y qué
              necesitas alimentar.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/reviews">
                Ver reviews
              </Link>
              <a className={styles.secondaryButton} href="#antes-de-comprar">
                Aprende lo básico
              </a>
            </div>
          </div>
          <p className={styles.heroNote}>
            Información clara para decidir
            <br />
            sin convertir los vatios en humo.
          </p>
        </section>

        <section className={`${styles.section} ${finderStyles.finder}`} aria-labelledby="finder-title">
          <div className="container">
            <div className={finderStyles.finderHeading}>
              <div>
                <p className={styles.kicker}>Punto de partida · Orientación rápida</p>
                <h2 id="finder-title">Encuentra la energía que necesitas</h2>
              </div>
              <p className={styles.sectionIntro}>
                Empieza por tu forma de viajar. Estos rangos son una referencia
                inicial: el consumo y las horas de uso afinan la elección final.
              </p>
            </div>
            <div className={finderStyles.energyScale}>
              {energyPaths.map((path) => (
                <article key={path.number} className={finderStyles.energyPath}>
                  <div className={finderStyles.pathTopline}>
                    <span>{path.number}</span>
                    <span className={finderStyles.range}>{path.range}</span>
                  </div>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <Link href={path.href}>Ver review <span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
            <div className={finderStyles.finderFooter}>
              <p><strong>¿No sabes cuánto consumes?</strong> Te ayudamos a pasar de aparatos y horas a una capacidad útil.</p>
              <Link href="/encontrar-power-station">Calcular mi necesidad <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="reviews-title">
          <div className="container">
            <div className={styles.headingRow}>
              <div>
                <p className={styles.kicker}>Archivo · Publicadas</p>
                <h2 id="reviews-title">Últimas reviews</h2>
              </div>
              <Link href="/reviews">
                Ver todas las reviews <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={styles.reviewGrid}>
              {reviews.slice(0, 3).map((review) => {
                const product = getProductById(review.productId);
                const persona = personas.find(({ id }) => id === review.personaId);
                return (
                  <article className={styles.reviewCard} key={review.id}>
                    <div className={reviewImageStyles.reviewImage}>
                      {product?.images[0] && (
                        <Image
                          src={reviewCutoutByProductId[product.id] ?? product.images[0].src}
                          alt={product.images[0].alt}
                          fill
                          sizes="(max-width: 719px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    {persona?.avatar && (
                      <div className={reviewImageStyles.reviewAuthor}>
                        <Image
                          src={persona.avatar}
                          alt={`Retrato del perfil editorial de ${persona.name}`}
                          width={48}
                          height={48}
                        />
                        <div>
                          <span>Review de</span>
                          <strong>{persona.name}</strong>
                          <small>{persona.label}</small>
                        </div>
                      </div>
                    )}
                    <p className={styles.meta}>
                      {product?.name} · Análisis editorial
                    </p>
                    <h3>{review.h1}</h3>
                    <p>{review.excerpt}</p>
                    <Link href={`/reviews/${review.slug}`}>
                      Leer la review <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.basics}`}
          id="antes-de-comprar"
          aria-labelledby="basics-title"
        >
          <div className="container">
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Guías esenciales</p>
              <h2 id="basics-title">Antes de comprar, entiende lo básico</h2>
              <p className={styles.sectionIntro}>
                Seis conceptos para interpretar especificaciones, calcular
                consumos y evitar comprar por una cifra aislada.
              </p>
            </div>
            <div className={styles.guideList}>
              {basics.map(([category, title, description], index) => (
                <Link href="/guias" className={styles.guideRow} key={title}>
                  <span>0{index + 1}</span>
                  <small>{category}</small>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <b aria-hidden="true">→</b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="comparisons-title">
          <div className="container">
            <div className={styles.headingRow}>
              <div>
                <p className={styles.kicker}>Cara a cara · Próximamente</p>
                <h2 id="comparisons-title">Comparativas</h2>
              </div>
              <Link href="/comparativas">
                Ver comparativas <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={styles.comparisonList}>
              {comparisons.map((title, index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <p className={styles.meta}>
                      Contenido planificado · Sin publicar
                    </p>
                    <h3>{title}</h3>
                  </div>
                  <Link
                    href="/comparativas"
                    aria-label={`Consultar comparativas: ${title}`}
                  >
                    Archivo <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.latest}`}
          aria-labelledby="guides-title"
        >
          <div className="container">
            <div className={styles.headingRow}>
              <div>
                <p className={styles.kicker}>Biblioteca · En preparación</p>
                <h2 id="guides-title">Últimas guías</h2>
              </div>
              <Link href="/guias">
                Explorar todas las guías <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={styles.latestGrid}>
              {latestGuides.map(([category, title, description]) => (
                <article key={title}>
                  <p className={styles.meta}>{category} · Fecha pendiente</p>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link href="/guias">
                    Leer contenidos de {category.toLowerCase()}{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.about}`}
          aria-labelledby="about-title"
        >
          <div className={`container ${styles.aboutGrid}`}>
            <div>
              <p className={styles.kicker}>Sobre el proyecto</p>
              <h2 id="about-title">Carga Nómada</h2>
            </div>
            <div>
              <p>
                Carga Nómada es una publicación especializada en energía
                portátil para viajar. Analizamos power stations, explicamos sus
                especificaciones y comparamos cómo encajan en distintos tipos de
                viaje y consumo.
              </p>
              <p className={styles.disclosure}>
                Algunos enlaces pueden ser de afiliado. Esto no altera nuestros
                criterios editoriales.
              </p>
              <Link href="/sobre-carga-nomada">
                Conoce el proyecto y su metodología{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
