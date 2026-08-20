import Link from "next/link";
import { personas } from "@/content/personas";

export const metadata = { title: "Perfiles" };

export default function PersonasPage() {
  return (
    <main>
      <h1>Formas de viajar</h1>
      <p>
        Encuentra recomendaciones adaptadas al uso que quieres dar a tu power
        station.
      </p>
      <ul>
        {personas.map((persona) => (
          <li key={persona.id}>
            <Link href={`/perfiles/${persona.slug}`}>{persona.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
