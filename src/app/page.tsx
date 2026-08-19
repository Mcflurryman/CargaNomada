import type { Metadata } from "next";
import Link from "next/link";
import { personas } from "@/content/personas";
import { SiteFooter } from "@/components/site-footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Historias, guías y análisis de energía portátil",
  description: "Cinco formas de viajar y una manera diferente de analizar power stations: según la vida real detrás de cada viaje.",
};

const voices = [
  ["laura", "Con menos capacidad yo no me iría tranquila varios días con toda la familia."],
  ["juan", "Pues yo ni loco cargo con algo tan grande para un fin de semana."],
  ["alex", "Para trabajar me importan más los USB-C y cuánto tarda en recuperar batería."],
  ["sergio", "Vale, pero ¿cuánto acepta realmente por solar? La ficha no cuenta toda la historia."],
  ["carmen", "Decidme si puedo poner la cafetera y olvidarme de hacer cálculos."],
] as const;

const chapters = [
  { slug: "juan", number: "01", kicker: "Dos noches, lo justo", title: "Viajar ligero también es una decisión energética.", text: "Juan nos devuelve siempre a la pregunta más sencilla: cuánto peso y cuánto dinero merece la pena llevar para una escapada corta.", quote: "Si para un finde llevo batería de sobra, también llevo peso de sobra.", link: "Cómo calcular cuántos Wh necesitas", href: "/guias/cuantos-wh-necesito" },
  { slug: "laura", number: "02", kicker: "Cuando viajan cuatro", title: "La tranquilidad se mide en todo lo que sigue funcionando.", text: "Para Laura la autonomía no es una cifra aislada: son móviles, luces, nevera y pequeños rituales familiares compartiendo la misma batería.", quote: "No quiero elegir entre mantener la nevera o cargar los dispositivos.", link: "Qué power station necesita una caravana", href: "/guias/power-station-para-caravana" },
  { slug: "alex", number: "03", kicker: "La oficina cambia de vistas", title: "Trabajar en ruta exige algo más que un enchufe.", text: "Álex mira la entrega USB-C, la eficiencia y el tiempo de carga porque quedarse sin portátil también significa quedarse sin jornada.", quote: "Portátil y Starlink son mi oficina. Necesito saber cuántas horas reales tengo.", link: "Cuánto consume trabajar desde una camper", href: "/guias/consumo-trabajar-desde-camper" },
  { slug: "sergio", number: "04", kicker: "Más allá de la etiqueta", title: "Lo importante empieza donde termina la ficha técnica.", text: "Sergio cuestiona los números bonitos: pérdidas, potencia sostenida, entrada solar útil y comportamiento cuando el uso se vuelve exigente.", quote: "Los vatios impresos importan menos que los que puedes sostener.", link: "Cómo funciona la carga solar", href: "/guias/carga-solar-power-station" },
  { slug: "carmen", number: "05", kicker: "Muchos kilómetros por delante", title: "La tecnología es mejor cuando deja de pedir atención.", text: "Carmen valora una batería que resulte previsible, fácil de usar y fiable durante semanas de viaje.", quote: "Quiero conectarla, hacer café y seguir camino.", link: "Elegir una power station fácil de usar", href: "/guias/power-station-facil-de-usar" },
] as const;

const guides = [
  ["01", "Capacidad", "W no es lo mismo que Wh", "La diferencia que evita comparar potencia con autonomía.", "/guias/diferencia-w-w-h"],
  ["02", "Consumo", "Cuánto gasta una nevera", "Por qué el consumo nominal no cuenta por sí solo toda la noche.", "/guias/consumo-nevera"],
  ["03", "Autonomía", "De la etiqueta a las horas reales", "Un cálculo sencillo con margen para pérdidas y uso real.", "/guias/calcular-autonomia"],
  ["04", "Solar", "Lo que una placa puede recuperar", "Orientación, clima, regulador y límites de entrada explicados sin humo.", "/guias/carga-solar-power-station"],
] as const;

function Portrait({ name, note }: { name: string; note: string }) {
  return <div className={styles.portrait} role="img" aria-label={`Espacio reservado para retrato editorial de ${name}`}><span>Foto pendiente</span><strong>{name[0]}</strong><small>{note}</small></div>;
}

export default function HomePage() {
  const bySlug = Object.fromEntries(personas.map((persona) => [persona.slug, persona]));
  return <><main className={styles.home}>
    <section className={styles.hero} aria-labelledby="hero-title"><div className={`container ${styles.heroGrid}`}>
      <div className={styles.heroCopy}><p className={styles.folio}>Cuaderno de viaje · 01</p><h1 id="hero-title">Nos conocimos <em>viajando.</em></h1><p className={styles.heroStatement}>Carga Nómada nació discutiendo sobre baterías.</p><p className={styles.lead}>Cinco formas de viajar acabaron enseñándonos que una misma power station puede ser perfecta para uno y un error para otro.</p><a className={styles.storyLink} href="#origen">Conoce nuestra historia <span aria-hidden="true">↓</span></a></div>
      <div className={styles.heroImage} role="img" aria-label="Espacio reservado para una fotografía del grupo viajando en camper"><span className={styles.imageLabel}>Fotografía pendiente · grupo, camper y campamento</span><div className={styles.sun} aria-hidden="true" /><p>Algún lugar entre una ruta,<br />una sobremesa y una batería al 12%.</p></div>
    </div></section>

    <section className={styles.origin} id="origen" aria-labelledby="origin-title"><div className={`container ${styles.originGrid}`}><p className={styles.folio}>El origen · muchos kilómetros atrás</p><div><h2 id="origin-title">No llegamos juntos.<br />Nos fue juntando el camino.</h2><div className={styles.prose}><p>Algunos coincidimos en campings. Otros en rutas, áreas de autocaravanas o porque alguien pidió ayuda con una batería en un grupo camper.</p><p>Con los años acumulamos kilómetros, cables, paneles solares y demasiadas conversaciones sobre electricidad.</p></div></div><aside className={styles.marginNote}><span>Notas al margen</span><p>Campings del norte<br />Rutas sin cobertura<br />Café al amanecer<br />Amigos en común</p></aside></div></section>

    <section className={styles.meeting} aria-labelledby="meeting-title"><div className={`container ${styles.meetingIntro}`}><p className={styles.folio}>Una quedada cualquiera</p><h2 id="meeting-title">Alguien dejó una power station nueva junto a la mesa.</h2><p>Y, como casi siempre, empezamos a opinar antes de terminar el café.</p></div><div className={`container ${styles.conversation}`}>{voices.map(([slug, quote], index) => { const persona = bySlug[slug]; return <figure className={styles.voice} key={slug}><Portrait name={persona.name} note={`0${index + 1}`} /><figcaption><Link href={`/perfiles/${persona.slug}`}>{persona.name}</Link><blockquote>“{quote}”</blockquote></figcaption></figure>; })}</div></section>

    <section className={styles.revelation} aria-labelledby="revelation-title"><div className="container"><p>Entonces entendimos que llevábamos años haciendo la pregunta equivocada.</p><h2 id="revelation-title"><del>¿Cuál es la mejor power station?</del><span>No buscamos la mejor.<br />Buscamos para quién es mejor.</span></h2></div></section>

    <section className={styles.method} aria-labelledby="method-title"><div className={`container ${styles.methodGrid}`}><div><p className={styles.folio}>Así nació Carga Nómada</p><h2 id="method-title">De la conversación al cuaderno de campo.</h2></div><div className={styles.prose}><p>Empezamos a ordenar consumos, capacidades, pesos, tiempos de carga y resultados. Lo que nació entre amigos se convirtió en una forma diferente de analizar energía portátil.</p><p>No todos los contenidos parten del mismo grado de experiencia. Por eso distinguimos con claridad entre productos <strong>probados, medidos, analizados o comparados</strong>, según el trabajo realizado.</p><Link href="/sobre-carga-nomada">Cómo trabajamos y evaluamos <span aria-hidden="true">→</span></Link></div></div></section>

    <section className={styles.chapters} aria-labelledby="chapters-title"><div className={`container ${styles.chapterHeading}`}><p className={styles.folio}>Cinco miradas, una historia</p><h2 id="chapters-title">La energía cambia cuando cambia el viaje.</h2></div>{chapters.map((chapter) => { const persona = bySlug[chapter.slug]; return <article className={styles.chapter} key={chapter.slug}><div className={`container ${styles.chapterGrid}`}><div className={styles.chapterVisual}><Portrait name={persona.name} note={chapter.number} /><span>{persona.label}</span></div><div className={styles.chapterCopy}><p className={styles.folio}>{chapter.kicker}</p><h3>{chapter.title}</h3><p>{chapter.text}</p><blockquote>“{chapter.quote}” <cite>— {persona.name}</cite></blockquote><Link href={chapter.href}>{chapter.link} <span aria-hidden="true">→</span></Link></div></div></article>; })}</section>

    <section className={styles.reviews} aria-labelledby="reviews-title"><div className={`container ${styles.reviewsGrid}`}><div><p className={styles.folio}>Mesa de análisis</p><h2 id="reviews-title">Las que pasen por nuestras manos.</h2><p className={styles.sectionLead}>Aquí convivirán conclusiones distintas sobre un mismo modelo, sin inventar pruebas ni productos antes de tiempo.</p><Link className={styles.inverseLink} href="/reviews">Ver todas las reviews <span aria-hidden="true">→</span></Link></div><article className={styles.reviewPlaceholder}><span>Próximamente</span><div aria-hidden="true">CN<br />—</div><h3>Primer análisis editorial</h3><p>Espacio preparado para una review real, con su nivel de evidencia y las opiniones de los perfiles relevantes.</p><small>Sin producto ni puntuación ficticios</small></article></div></section>

    <section className={styles.learning} aria-labelledby="learning-title"><div className="container"><div className={styles.learningHeading}><p className={styles.folio}>El conocimiento que dejó el camino</p><h2 id="learning-title">Todo lo que tuvimos que aprender.</h2><p>Antes de comparar modelos, aprendimos a traducir especificaciones a cenas, jornadas de trabajo y noches con la nevera encendida.</p></div><div className={styles.guideList}>{guides.map(([number, label, title, text, href]) => <Link href={href} className={styles.guide} key={number}><span>{number}</span><small>{label}</small><h3>{title}</h3><p>{text}</p><b aria-hidden="true">↗</b></Link>)}</div></div></section>

    <section className={styles.latest} aria-labelledby="latest-title"><div className="container"><div className={styles.latestHeading}><div><p className={styles.folio}>Continúa leyendo</p><h2 id="latest-title">Desde el cuaderno</h2></div><Link href="/guias">Ver todos los contenidos <span aria-hidden="true">→</span></Link></div><div className={styles.latestGrid}><Link href="/guias"><span>Guías</span><h3>Entender la energía antes de elegir</h3><p>Conceptos y cálculos explicados desde situaciones reales.</p></Link><Link href="/comparativas"><span>Comparativas</span><h3>Dos opciones, cinco formas de mirarlas</h3><p>Las diferencias que importan cambian según quién las use.</p></Link><Link href="/sobre-carga-nomada"><span>Historias</span><h3>Quiénes somos y por qué contamos esto</h3><p>La forma de viajar detrás de cada criterio editorial.</p></Link></div></div></section>

    <aside className={styles.transparency} aria-label="Transparencia editorial"><div className={`container ${styles.transparencyGrid}`}><strong>Una nota de transparencia</strong><p>Carga Nómada puede utilizar enlaces de afiliado. Si compras a través de alguno, podríamos recibir una comisión sin que cambie tu precio. Esa comisión nunca decide qué contamos ni cómo evaluamos.</p></div></aside>
  </main><SiteFooter /></>;
}
