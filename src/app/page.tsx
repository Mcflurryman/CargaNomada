import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { personas } from "@/content/personas";
import { fossibotF2400 } from "@/content/products";
import { SiteFooter } from "@/components/site-footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Power Stations para Camper, Camping y Caravana | Carga Nómada",
  description: "Reviews, comparativas y guías sobre power stations para camper, camping, caravana, autocaravana y uso off-grid.",
};

const uses = [
  ["01", "Camping", "Energía ligera para escapadas y tiendas de campaña."],
  ["02", "Camper", "Autonomía para viajar, cocinar y cargar tus equipos."],
  ["03", "Caravana", "Capacidad y potencia para consumos compartidos."],
  ["04", "Autocaravana", "Energía fiable para rutas y estancias largas."],
  ["05", "Trabajo remoto", "Portátil, conectividad y carga solar en ruta."],
  ["06", "Off-grid", "Paneles, herramientas y consumos más exigentes."],
] as const;

const basics = [
  ["Fundamentos", "Qué es una power station", "Qué integra, para qué sirve y en qué se diferencia de una batería externa."],
  ["Capacidad", "Qué son los Wh", "La cifra que ayuda a estimar cuánta energía puedes almacenar."],
  ["Potencia", "W vs Wh: no son lo mismo", "Cómo distinguir potencia instantánea y capacidad antes de comparar modelos."],
  ["Cálculo", "Cómo calcular la autonomía", "Una forma práctica de pasar de consumos y capacidad a horas de uso."],
  ["Compatibilidad", "Qué puedes conectar", "Comprueba potencia continua, picos y conexiones antes de enchufar un equipo."],
  ["Energía solar", "Cómo funciona la carga solar", "Paneles, condiciones reales y límites de entrada explicados con claridad."],
] as const;

const pendingReviews = [
  ["Review 01", "Primer análisis de power station", "Publicaremos modelo, conclusiones y nivel de evidencia cuando el contenido esté verificado."],
  ["Review 02", "Próxima review en preparación", "Espacio reservado para un análisis editorial, sin puntuaciones ni experiencia inventada."],
  ["Review 03", "Nuevo modelo por confirmar", "La ficha se completará únicamente cuando exista información editorial suficiente."],
] as const;

const comparisons = ["FOSSiBOT F1200 vs F2400", "Mejor power station para camping", "Mejor power station para caravana", "Power station para Starlink"] as const;

const latestGuides = [
  ["Conceptos básicos", "Cómo leer la ficha técnica de una power station", "Una guía para separar capacidad, potencia, puertos y tiempos de carga."],
  ["Autonomía", "Cómo estimar cuántas horas tendrás de energía", "Los datos que necesitas antes de hacer un cálculo útil."],
  ["Carga solar", "Qué debes mirar antes de elegir un panel solar", "Compatibilidad, potencia y condiciones que afectan a la recarga."],
] as const;

export default function HomePage() {
  const featuredProduct = fossibotF2400;
  return <><main className={styles.home}>
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image className={styles.heroImage} src="/images/home/hero/Hero.png" alt="Camper junto al mar con una power station en una mesa exterior" fill priority sizes="100vw" />
      <div className={`container ${styles.heroInner}`}><p className={styles.kicker}>Energía portátil · Guías y análisis independientes</p><h1 id="hero-title">Power stations para <em>camper, camping y caravana</em></h1><p className={styles.heroLead}>Analizamos, comparamos y explicamos estaciones de energía portátiles para ayudarte a elegir según cómo viajas y qué necesitas alimentar.</p><div className={styles.actions}><Link className={styles.primaryButton} href="/reviews">Ver reviews</Link><a className={styles.secondaryButton} href="#antes-de-comprar">Aprende lo básico</a></div></div>
      <p className={styles.heroNote}>Información clara para decidir<br />sin convertir los vatios en humo.</p>
    </section>

    <section className={`${styles.section} ${styles.featured}`} aria-labelledby="featured-title"><div className={`container ${styles.featuredGrid}`}><div><p className={styles.kicker}>En portada · Ficha verificada</p><h2 id="featured-title">Análisis destacado</h2><p className={styles.sectionIntro}>Primer producto documentado en nuestro catálogo. La ficha recoge datos del fabricante; la review todavía no está publicada.</p></div><article className={styles.featuredCard}><div className={styles.mediaPlaceholder} role="img" aria-label={`Imagen propia o autorizada de ${featuredProduct.name}, pendiente de incorporar`}><span>Imagen autorizada pendiente</span><b>{featuredProduct.model}<br />—</b></div><div className={styles.featuredCopy}><p className={styles.meta}>Power station · Análisis en preparación</p><h3>{featuredProduct.name}</h3><dl className={styles.specList}><div><dt>Capacidad</dt><dd>{featuredProduct.capacityWh} Wh</dd></div><div><dt>Potencia continua</dt><dd>{featuredProduct.continuousOutputWatts} W</dd></div><div><dt>Batería</dt><dd>{featuredProduct.battery.chemistry}</dd></div><div><dt>Peso</dt><dd>{featuredProduct.weightKg} kg</dd></div></dl><p>Ficha técnica normalizada desde la información oficial de FOSSiBOT. Aún no implica prueba, puntuación ni veredicto editorial.</p><Link href="/reviews">Análisis en preparación <span aria-hidden="true">→</span></Link></div></article></div></section>

    <section className={styles.section} aria-labelledby="reviews-title"><div className="container"><div className={styles.headingRow}><div><p className={styles.kicker}>Archivo · Actualizaciones</p><h2 id="reviews-title">Últimas reviews</h2></div><Link href="/reviews">Ver todas las reviews <span aria-hidden="true">→</span></Link></div><div className={styles.reviewGrid}>{pendingReviews.map(([label, title, description], index) => <article className={styles.reviewCard} key={label}><div className={styles.thumb} aria-hidden="true"><span>0{index + 1}</span></div><p className={styles.meta}>{label} · Publicación pendiente</p><h3>{title}</h3><p>{description}</p><Link href="/reviews">Estado del contenido <span aria-hidden="true">→</span></Link></article>)}</div></div></section>

    <section className={`${styles.section} ${styles.uses}`} aria-labelledby="uses-title"><div className="container"><div className={styles.sectionHeading}><p className={styles.kicker}>Rutas de lectura</p><h2 id="uses-title">Elige según cómo la vas a usar</h2><p className={styles.sectionIntro}>Cada escenario cambia la capacidad, la potencia y las conexiones que conviene priorizar.</p></div><div className={styles.useGrid}>{uses.map(([number, title, description]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p><Link href="/guias" aria-label={`Ver guías para ${title.toLowerCase()}`}>Guías para {title.toLowerCase()} <b aria-hidden="true">↗</b></Link></article>)}</div><p className={styles.architectureNote}>Próximas rutas especializadas: <code>/usos/camping</code>, <code>/usos/camper</code>, <code>/usos/caravana</code> y más.</p></div></section>

    <section className={`${styles.section} ${styles.basics}`} id="antes-de-comprar" aria-labelledby="basics-title"><div className="container"><div className={styles.sectionHeading}><p className={styles.kicker}>Guías esenciales</p><h2 id="basics-title">Antes de comprar, entiende lo básico</h2><p className={styles.sectionIntro}>Seis conceptos para interpretar especificaciones, calcular consumos y evitar comprar por una cifra aislada.</p></div><div className={styles.guideList}>{basics.map(([category, title, description], index) => <Link href="/guias" className={styles.guideRow} key={title}><span>0{index + 1}</span><small>{category}</small><h3>{title}</h3><p>{description}</p><b aria-hidden="true">→</b></Link>)}</div></div></section>

    <section className={`${styles.section} ${styles.method}`} aria-labelledby="method-title"><div className={`container ${styles.methodGrid}`}><div><p className={styles.kicker}>Criterio editorial</p><h2 id="method-title">Una misma power station no sirve igual para todos</h2></div><div><p>Para valorar cada modelo usamos perfiles editoriales basados en necesidades reales: escapadas de camping, viajes familiares, trabajo remoto, uso off-grid y viajes largos.</p><p>Son marcos de análisis, no personas reales que necesariamente hayan probado físicamente cada producto.</p><div className={styles.profileLine} aria-label="Perfiles editoriales">{personas.map((persona) => <span key={persona.id}>{persona.name}<small>{persona.label}</small></span>)}</div><Link href="/sobre-carga-nomada">Cómo evaluamos las power stations <span aria-hidden="true">→</span></Link></div></div></section>

    <section className={styles.section} aria-labelledby="comparisons-title"><div className="container"><div className={styles.headingRow}><div><p className={styles.kicker}>Cara a cara · Próximamente</p><h2 id="comparisons-title">Comparativas</h2></div><Link href="/comparativas">Ver comparativas <span aria-hidden="true">→</span></Link></div><div className={styles.comparisonList}>{comparisons.map((title, index) => <article key={title}><span>0{index + 1}</span><div><p className={styles.meta}>Contenido planificado · Sin publicar</p><h3>{title}</h3></div><Link href="/comparativas" aria-label={`Consultar comparativas: ${title}`}>Archivo <span aria-hidden="true">→</span></Link></article>)}</div></div></section>

    <section className={`${styles.section} ${styles.latest}`} aria-labelledby="guides-title"><div className="container"><div className={styles.headingRow}><div><p className={styles.kicker}>Biblioteca · En preparación</p><h2 id="guides-title">Últimas guías</h2></div><Link href="/guias">Explorar todas las guías <span aria-hidden="true">→</span></Link></div><div className={styles.latestGrid}>{latestGuides.map(([category, title, description]) => <article key={title}><p className={styles.meta}>{category} · Fecha pendiente</p><h3>{title}</h3><p>{description}</p><Link href="/guias">Leer contenidos de {category.toLowerCase()} <span aria-hidden="true">→</span></Link></article>)}</div></div></section>

    <section className={`${styles.section} ${styles.about}`} aria-labelledby="about-title"><div className={`container ${styles.aboutGrid}`}><div><p className={styles.kicker}>Sobre el proyecto</p><h2 id="about-title">Carga Nómada</h2></div><div><p>Carga Nómada es una publicación especializada en energía portátil para viajar. Analizamos power stations, explicamos sus especificaciones y comparamos cómo encajan en distintos tipos de viaje y consumo.</p><p className={styles.disclosure}>Algunos enlaces pueden ser de afiliado. Esto no altera nuestros criterios editoriales.</p><Link href="/sobre-carga-nomada">Conoce el proyecto y su metodología <span aria-hidden="true">→</span></Link></div></div></section>
  </main><SiteFooter /></>;
}
