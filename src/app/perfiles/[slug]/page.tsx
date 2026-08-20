import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { personaEditorial } from "@/content/persona-editorial";
import { personaStories } from "@/content/persona-stories";
import { getPersonaBySlug, personas } from "@/content/personas";
import type { PersonaPriority } from "@/domain/persona";
import styles from "./page.module.css";

interface PersonaPageProps { params: Promise<{ slug: string }>; }

const priorityLabels: Record<PersonaPriority, string> = {
  price: "Precio", weight: "Peso", autonomy: "Autonomía", easeOfUse: "Facilidad", size: "Tamaño",
  power: "Potencia", reliability: "Fiabilidad", fastCharging: "Carga rápida", usbC: "USB-C",
  efficiency: "Eficiencia", solarInput: "Entrada solar", connectivity: "Conectividad",
  realWorldPerformance: "Rendimiento real", expandability: "Expansión", buildQuality: "Construcción", warranty: "Garantía",
};

export function generateStaticParams() { return personas.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PersonaPageProps): Promise<Metadata> {
  const persona = getPersonaBySlug((await params).slug);
  if (!persona) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonical = siteUrl ? new URL(`/perfiles/${persona.slug}`, siteUrl).toString() : undefined;
  const socialImage = siteUrl && persona.avatar ? new URL(persona.avatar, siteUrl).toString() : undefined;
  return {
    title: persona.seo.title,
    description: persona.seo.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: { title: persona.seo.title, description: persona.seo.description, type: "article", url: canonical, images: socialImage ? [{ url: socialImage, alt: `Retrato editorial de ${persona.name}` }] : [] },
  };
}

export default async function PersonaPage({ params }: PersonaPageProps) {
  const persona = getPersonaBySlug((await params).slug);
  if (!persona) notFound();
  const editorial = personaEditorial[persona.slug];
  if (!editorial) notFound();
  const longStory = personaStories[persona.slug];
  const priorities = Object.entries(persona.priorities).sort(([, a], [, b]) => b - a);
  const others = personas.filter(({ slug }) => slug !== persona.slug);
  const facts = [persona.age ? `${persona.age} años` : null, persona.occupation, ...persona.travelsWith ?? []].filter(Boolean) as string[];

  return <>
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="persona-title"><div className="container">
        <nav className={styles.crumbs} aria-label="Migas de pan"><Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/perfiles">Perfiles</Link><span aria-hidden="true">/</span><span aria-current="page">{persona.name}</span></nav>
        <div className={styles.heroGrid}>
          <figure className={styles.portrait}><Image src={persona.avatar!} alt={`Retrato editorial de ${persona.name}: ${persona.label.toLowerCase()}`} fill priority quality={95} sizes="(min-width: 760px) 38vw, calc(100vw - 40px)" /><figcaption>Perfil editorial · ficción</figcaption></figure>
          <div className={styles.heroCopy}><p className={styles.eyebrow}>Una forma de viajar · {persona.label}</p><h1 id="persona-title">{persona.name}<span>{persona.label}</span></h1><p className={styles.standfirst}>{longStory?.dek ?? editorial.standfirst}</p>{facts.length > 0 && <ul className={styles.facts} aria-label="Datos del perfil">{facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}</div>
        </div>
      </div></section>

      {!longStory && <section className={styles.story} aria-labelledby="story-title"><div className={`container ${styles.storyGrid}`}><div><p className={styles.sectionLabel}>Su manera de viajar</p><h2 id="story-title">El viaje antes que la batería.</h2></div><div className={styles.prose}>{editorial.scene.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><aside className={styles.margin}><strong>Fuera de los enchufes</strong><ul>{editorial.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}</ul></aside></div></section>}

      {longStory && <article className={styles.journal} aria-labelledby="journal-title"><div className="container"><header className={styles.journalHeader}><div><p className={styles.sectionLabel}>Por {persona.name} · {longStory.readingTime}</p><h2 id="journal-title">{longStory.title}</h2></div><aside><strong>Nota editorial</strong><p>Relato en primera persona de un perfil ficticio, construido a partir de necesidades reales de camping. No describe una persona, viaje o prueba de producto reales.</p></aside></header><div className={styles.journalBody}>{longStory.sections.map((section, index) => <section className={styles.journalSection} key={section.heading} aria-labelledby={`chapter-${index}`}><p className={styles.chapterNumber}>0{index + 1}</p><h3 id={`chapter-${index}`}>{section.heading}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.link && <Link className={styles.journalLink} href={section.link.href}>{section.link.label} <span aria-hidden="true">→</span></Link>}{section.image && <figure className={styles.journalImage}><div><Image src={section.image.src} alt={section.image.alt} fill quality={95} sizes="(min-width: 900px) 820px, calc(100vw - 40px)" /></div><figcaption>{section.image.caption}</figcaption></figure>}</section>)}</div></div></article>}

      <section className={styles.quote} aria-label={`Una frase de ${persona.name}`}><div className="container"><blockquote>“{editorial.quote}”<cite>— {persona.name}</cite></blockquote></div></section>

      <section className={styles.lens} aria-labelledby="lens-title"><div className={`container ${styles.lensGrid}`}><div><p className={styles.sectionLabel}>Su criterio energético</p><h2 id="lens-title">Lo que mira cuando los números llegan a la mesa.</h2><div className={styles.prose}><p>{editorial.perspective}</p></div><ul className={styles.priorityList} aria-label="Prioridades por orden">{priorities.map(([key]) => <li key={key}>{priorityLabels[key as PersonaPriority]}</li>)}</ul></div><div><div className={styles.criterion}><span>Puede sacrificar</span><strong>{editorial.givesUp}</strong></div><div className={styles.criterion}><span>No quiere sacrificar</span><strong>{editorial.protects}</strong></div><div className={styles.criterion}><span>Forma de decidir</span><strong>{persona.voice.decisionStyle}</strong></div><div className={styles.criterion}><span>Nivel técnico</span><strong>{persona.voice.technicalLevel}</strong></div></div></div></section>

      <section className={styles.devices} aria-labelledby="devices-title"><div className={`container ${styles.devicesGrid}`}><div><p className={styles.sectionLabel}>En su equipaje</p><h2 id="devices-title">Los consumos que cambian su decisión.</h2></div><ul className={styles.deviceList}>{persona.typicalDevices.map((device) => <li key={device}>{device}</li>)}</ul></div></section>

      <section className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.relatedHeader}><p className={styles.sectionLabel}>Para viajar como {persona.name}</p><h2 id="related-title">Dos lugares por donde seguir.</h2><p>Guías relacionadas con sus necesidades. Los enlaces forman parte de su contexto, no de una recomendación comercial.</p></div><div className={styles.relatedGrid}>{editorial.related.map((item) => <Link className={styles.relatedCard} href={item.href} key={item.href}><small>{item.label}</small><h3>{item.title}</h3><p>{item.description}</p><b>Leer la guía <span aria-hidden="true">→</span></b></Link>)}</div><p className={styles.disclaimer}>{persona.name} es un perfil editorial ficticio que representa necesidades reales. Sus opiniones ayudan a explicar criterios de uso; no prueban que un producto haya sido probado físicamente.</p></div></section>

      <section className={styles.more} aria-labelledby="more-title"><div className="container"><div className={styles.moreHeader}><div><p className={styles.sectionLabel}>Otras formas de viajar</p><h2 id="more-title">La misma batería, otras preguntas.</h2></div><Link href="/perfiles">Ver los cinco perfiles <span aria-hidden="true">→</span></Link></div><div className={styles.moreList}>{others.map((other, index) => <Link className={styles.moreLink} href={`/perfiles/${other.slug}`} key={other.slug}><span>0{index + 1}</span><strong>{other.name}</strong><small>{other.label}</small><b aria-hidden="true">↗</b></Link>)}</div></div></section>
    </main>
    <SiteFooter />
  </>;
}
