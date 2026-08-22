import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import styles from "./use-case.module.css";

export const metadata: Metadata = {
  title: "Power stations por caso de uso",
  description: "Elige una power station según tus aparatos, días de uso, recarga y necesidad de transporte.",
  alternates: { canonical: "/usos" },
};

export default function UsesPage() {
  return <><main className={styles.page}><header className={styles.hubHero}><div className="container"><p className={styles.kicker}>Casos de uso</p><h1>Elige desde tu forma de viajar.</h1><p>Traducimos aparatos, días y opciones de recarga en criterios de capacidad, potencia y peso.</p></div></header><section className={styles.hubList}><div className="container"><article><span>01 · Publicado</span><h2>Camping</h2><p>Desde móvil y luces hasta nevera, portátil y una cafetera puntual.</p><Link href="/usos/camping">Qué power station necesitas para camping →</Link></article><article><span>02 · Publicado</span><h2>Camper</h2><p>Nevera 12 V, trabajo conectado y recarga en carretera, al sol o en red.</p><Link href="/usos/camper">Qué power station necesitas para una camper →</Link></article><article><span>03 · Publicado</span><h2>Caravana / autocaravana</h2><p>Más aparatos, varios usuarios y potencia simultánea, con solar, red o recarga en ruta.</p><Link href="/usos/caravana-autocaravana">Qué power station necesitas para caravaning →</Link></article></div></section></main><SiteFooter /></>;
}
