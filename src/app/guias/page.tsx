import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import styles from "./guide.module.css";

export const metadata:Metadata={title:"Guías sobre power stations",description:"Guías claras para entender capacidad, potencia, autonomía y carga solar antes de elegir una power station.",alternates:{canonical:"/guias"}};
const guides=[
  {title:"Qué es una power station",body:"Entiende qué lleva dentro, para qué sirve y qué cifras debes mirar antes de elegir.",href:"/guias/que-es-una-power-station"},
  {title:"Entiende los Wh",body:"Aprende qué mide la capacidad y cómo convertirla en energía útil para tus aparatos.",href:"/guias/wh-power-station"},
  {title:"Diferencia W y Wh",body:"Separa potencia y energía para saber qué puedes encender y durante cuánto tiempo.",href:"/guias/w-vs-wh"},
  {title:"Calcula tu autonomía",body:"Convierte Wh y consumo en horas aproximadas, incluyendo pérdidas y varios aparatos.",href:"/guias/calcular-autonomia-power-station"},
  {title:"Comprueba qué puedes conectar",body:"Valida potencia continua, pico de arranque, puertos y consumo simultáneo.",href:"/guias/que-puedo-conectar-power-station"},
  {title:"Elige placas solares compatibles",body:"Comprueba voltaje, corriente, potencia y conectores, y estima la carga diaria.",href:"/guias/placas-solares-power-station"},
] as const;
export default function GuidesPage(){return <><main className={styles.page}><header className={styles.hero}><div className="container"><p className={styles.kicker}>Aprender antes de comprar</p><h1>Guías sobre power stations</h1><p className={styles.lead}>Conceptos eléctricos explicados con ejemplos para elegir capacidad, potencia y recarga con criterio.</p></div></header><div className="container"><div className={styles.layout}><article className={styles.article}>{guides.map((guide,index)=><section key={guide.href}><p className={styles.index}>{String(index+1).padStart(2,"0")} · Guía publicada</p><h2>{guide.title}</h2><p>{guide.body}</p><Link href={guide.href}>{guide.title} →</Link></section>)}</article></div></div></main><SiteFooter/></>}
