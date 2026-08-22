import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import styles from "./use-case.module.css";

export const metadata: Metadata = {
  title: "Power stations por caso de uso",
  description: "Elige una power station según tus aparatos, horas de uso, autonomía, potencia y opciones de recarga.",
  alternates: { canonical: "/usos" },
};

export default function UsesPage() {
  return <><main className={styles.page}><header className={styles.hubHero}><div className="container"><p className={styles.kicker}>Casos de uso</p><h1>Elige según cómo vas a usar la energía.</h1><p>Traducimos aparatos, horas, días y opciones de recarga en criterios de capacidad, potencia y autonomía.</p></div></header><section className={styles.hubList}><div className="container"><article><span>01 · Publicado</span><h2>Camping</h2><p>Desde móvil y luces hasta nevera, portátil y una cafetera puntual.</p><Link href="/usos/camping">Qué power station necesitas para camping →</Link></article><article><span>02 · Publicado</span><h2>Camper</h2><p>Nevera 12 V, trabajo conectado y recarga en carretera, al sol o en red.</p><Link href="/usos/camper">Qué power station necesitas para una camper →</Link></article><article><span>03 · Publicado</span><h2>Caravana / autocaravana</h2><p>Más aparatos, varios usuarios y potencia simultánea, con solar, red o recarga en ruta.</p><Link href="/usos/caravana-autocaravana">Qué power station necesitas para caravana y autocaravana →</Link></article><article><span>04 · Publicado</span><h2>Trabajo remoto</h2><p>Calcula portátil, monitor, conexión y accesorios por jornada laboral y días entre recargas.</p><Link href="/usos/trabajo-remoto">Qué power station necesitas para trabajar en remoto →</Link></article><article><span>05 · Publicado</span><h2>Off-grid</h2><p>Equilibra consumo diario, recuperación, capacidad almacenada y días de reserva sin red.</p><Link href="/usos/off-grid">Qué power station necesitas para varios días off-grid →</Link></article></div></section></main><SiteFooter /></>;
}
