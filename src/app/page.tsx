import Link from "next/link";
import { personas } from "@/content/personas";
import { PersonaCard } from "@/components/persona-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

const fundamentals = [
  { term: "Wh", title: "¿Cuánta energía puedes almacenar?", text: "La capacidad que te acompaña entre recargas.", href: "/guias" },
  { term: "W", title: "¿Qué puedes conectar al mismo tiempo?", text: "La potencia necesaria para que tus equipos funcionen a la vez.", href: "/guias" },
  { term: "Solar", title: "¿Cuánto puedes recuperar con placas?", text: "La recarga que puede alargar tu autonomía cuando estás fuera.", href: "/guias" },
];

export default function HomePage() {
  return <>
    <main>
      <section className="hero" aria-labelledby="hero-title"><div className="container hero__grid"><div className="hero__copy"><p className="eyebrow">Carga Nómada · edición 01</p><h1 id="hero-title">Energía para viajar a tu manera.</h1><p className="hero__lead">Una guía editorial para entender qué power station encaja con tus escapadas, tu vehículo y los equipos que quieres llevar contigo.</p><div className="button-row"><Link className="button button--primary" href="/encontrar-power-station">Encuentra la tuya <span aria-hidden="true">→</span></Link><Link className="button button--quiet" href="/guias">Aprende cómo funcionan</Link></div></div><div className="hero__visual"><div className="hero__image-placeholder"><p>Imagen de portada</p><span>Camper · energía portátil · exterior</span></div><div className="hero__caption"><span>01 / Guía de inicio</span><p>La mejor elección no empieza por los vatios: empieza por tu viaje.</p></div></div></div></section>
      <section className="intro section"><div className="container intro__grid"><p className="eyebrow">La elección correcta</p><div><h2>No necesitas la batería más grande.<br />Necesitas la que encaje con tu viaje.</h2></div><p>Días fuera, dispositivos, potencia, peso, recarga solar y presupuesto cambian por completo qué power station tiene sentido. Empezamos por tu forma de viajar.</p></div></section>
      <section className="section personas" aria-labelledby="personas-title"><div className="container"><SectionHeading eyebrow="Perfiles editoriales" title="¿Cómo viajas tú?" description="Cinco formas de viajar. Cinco maneras de priorizar la energía que llevas contigo." /><div className="persona-grid">{personas.map((persona, index) => <PersonaCard key={persona.id} persona={persona} index={index} />)}</div><p className="editorial-note">Perfiles ficticios que representan necesidades reales de viaje.</p></div></section>
      <section className="section fundamentals"><div className="container"><SectionHeading eyebrow="Sin letra pequeña" title="Antes de comprar, entiende lo básico" description="Tres conceptos para decidir con criterio y sin perderse en especificaciones." /><div className="fundamentals__grid">{fundamentals.map((item) => <Link className="fundamental" href={item.href} key={item.term}><span className="fundamental__term">{item.term}</span><h3>{item.title}</h3><p>{item.text}</p><span className="text-link">Ver guías <span aria-hidden="true">→</span></span></Link>)}</div></div></section>
      <section className="section editorial"><div className="container editorial__layout"><SectionHeading eyebrow="El cuaderno de Carga Nómada" title="Guías y análisis" description="Estamos preparando una biblioteca editorial para entender, comparar y elegir con calma." /><div className="editorial__cards"><article><span>01</span><h3>Reviews</h3><p>Contexto y criterios para leer una ficha de producto con sentido.</p><Link href="/reviews">Explorar reviews <span aria-hidden="true">→</span></Link></article><article><span>02</span><h3>Comparativas</h3><p>Qué cambia de verdad cuando pones dos opciones frente a frente.</p><Link href="/comparativas">Ver comparativas <span aria-hidden="true">→</span></Link></article><article><span>03</span><h3>Guías</h3><p>Las bases para calcular autonomía, potencia y recarga solar.</p><Link href="/guias">Ir a las guías <span aria-hidden="true">→</span></Link></article></div></div></section>
      <section className="closing section"><div className="container closing__content"><p className="eyebrow">Tu viaje es el punto de partida</p><h2>Empieza por cómo viajas,<br />no por la batería.</h2><Link className="button button--light" href="/encontrar-power-station">Encontrar mi power station <span aria-hidden="true">→</span></Link></div></section>
    </main><SiteFooter />
  </>;
}
