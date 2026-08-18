import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPersonaBySlug, personas } from "@/content/personas";

interface PersonaPageProps { params: Promise<{ slug: string }>; }

export function generateStaticParams() { return personas.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PersonaPageProps): Promise<Metadata> {
  const persona = getPersonaBySlug((await params).slug);
  return persona ? { title: persona.seo.title, description: persona.seo.description } : {};
}

export default async function PersonaPage({ params }: PersonaPageProps) {
  const persona = getPersonaBySlug((await params).slug);
  if (!persona) notFound();
  return <main><h1>{persona.name}: {persona.label}</h1><p>{persona.description}</p><h2>Dispositivos habituales</h2><ul>{persona.typicalDevices.map((device) => <li key={device}>{device}</li>)}</ul></main>;
}
