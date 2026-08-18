import Link from "next/link";
import { personas } from "@/content/personas";

export const metadata = { title: "Perfiles" };

export default function PersonasPage() {
  return <main><h1>Perfiles editoriales</h1><p>Perfiles ficticios que representan necesidades reales; no son personas que hayan probado productos.</p><ul>{personas.map((persona) => <li key={persona.id}><Link href={`/perfiles/${persona.slug}`}>{persona.name}: {persona.label}</Link></li>)}</ul></main>;
}
