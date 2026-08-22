import Image from "next/image";
import Link from "next/link";
import { comparison } from "@/content/comparisons/fossibot-f1200-vs-f1800";
import styles from "./comparison.module.css";

const fmt = new Intl.NumberFormat("es-ES");

type ComparedProduct = typeof comparison.left | typeof comparison.right;
function ProductCard({ product, side }: { product: ComparedProduct; side: "left" | "right" }) {
  return <article className={`${styles.product} ${styles[side]}`}>
    <span className={styles.eyebrow}>{product.model}</span>
    <Image src={product.images[0].src} alt={product.images[0].alt} width={430} height={330} priority />
    <dl><div><dt>Capacidad</dt><dd>{fmt.format(product.capacityWh)} Wh</dd></div><div><dt>Potencia</dt><dd>{fmt.format(product.continuousOutputWatts)} W</dd></div></dl>
  </article>;
}

export function ComparisonHero() {
  const { left, right } = comparison;
  return <>
    <nav className={styles.crumbs} aria-label="Migas de pan"><Link href="/">Inicio</Link><span>/</span><Link href="/comparativas">Comparativas</Link><span>/</span><span aria-current="page">F1200 vs F1800</span></nav>
    <header className={styles.hero}>
      <div className={styles.heroCopy}><span className={styles.kicker}>Comparativa editorial · datos verificados</span><h1>FOSSiBOT F1200 vs F1800</h1><p>Dos estaciones con la misma batería, pero pensadas para exigencias distintas. La decisión no está en cuántas horas duran, sino en cuánta potencia y recarga necesitas.</p></div>
      <div className={styles.duel}><ProductCard product={left} side="left"/><span className={styles.versus}>VS</span><ProductCard product={right} side="right"/></div>
      <div className={styles.key}><strong>La diferencia clave</strong><span>1.024 Wh en ambas</span><b>+</b><span>F1800: +600 W continuos y +300 W solares</span></div>
    </header>
  </>;
}

function Bar({ label, a, b, unit, lower = false }: { label: string; a: number; b: number; unit: string; lower?: boolean }) {
  const max = Math.max(a,b);
  return <div className={styles.metric} aria-label={`${label}: F1200 ${a} ${unit}; F1800 ${b} ${unit}`}><div className={styles.metricHead}><strong>{label}</strong>{lower && <small>menos es mejor</small>}</div><div className={styles.barRow}><span>F1200</span><i><em style={{width:`${a/max*100}%`}}/></i><b>{fmt.format(a)} {unit}</b></div><div className={styles.barRow}><span>F1800</span><i><em className={styles.barAlt} style={{width:`${b/max*100}%`}}/></i><b>{fmt.format(b)} {unit}</b></div></div>;
}

export function DecisionSections() {
  const { left:a, right:b, scenarios, uses } = comparison;
  const usb = (p: ComparedProduct) => p.outputs.usbC.map(x => `${x.quantity}×${x.maxWatts} W`).join(" + ");
  return <main className={styles.main}>
    <nav className={styles.sectionNav} aria-label="Secciones de la comparativa"><a href="#veredicto">Veredicto</a><a href="#metricas">Métricas</a><a href="#usos">Usos</a><a href="#escenarios">Escenarios</a><a href="#ficha">Ficha</a></nav>
    <section id="veredicto"><div className={styles.heading}><span>01</span><div><p>Decisión rápida</p><h2>¿Cuál encaja contigo?</h2></div></div><div className={styles.verdicts}>
      <article><span>Elige F1200</span><h3>Si tus consumos son contenidos</h3><p>Entrega la misma reserva energética en un cuerpo más corto. Es suficiente si no superas 1.200 W simultáneos y 200 W solares te bastan.</p></article>
      <article className={styles.featured}><span>Elige F1800</span><h3>Si potencia y solar mandan</h3><p>Aporta más margen para aparatos exigentes, 500 W solares y dos USB-C de 140 W, sin aumentar peso ni perder capacidad.</p></article>
      <article><span>Elige otra</span><h3>Si buscas más autonomía</h3><p>Ninguna gana en duración: ambas tienen 1.024 Wh y batería no ampliable. Para varios días, necesitas más capacidad.</p></article>
    </div></section>
    <section id="metricas"><div className={styles.heading}><span>02</span><div><p>Lectura visual</p><h2>Lo que cambia, de un vistazo</h2></div></div><div className={styles.metrics}><Bar label="Capacidad" a={a.capacityWh} b={b.capacityWh} unit="Wh"/><Bar label="Potencia continua" a={a.continuousOutputWatts} b={b.continuousOutputWatts} unit="W"/><Bar label="Entrada solar" a={a.charging.maxSolarInputWatts} b={b.charging.maxSolarInputWatts} unit="W"/><Bar label="Peso" a={a.weightKg} b={b.weightKg} unit="kg" lower/></div>
      <div className={styles.gain}><div><span>Con la F1800 ganas</span><strong>+50% de potencia continua</strong><strong>2,5× entrada solar</strong><strong>USB-C de mayor potencia</strong></div><div><span>No ganas</span><strong>Más Wh</strong><strong>Más autonomía base</strong><strong>Expansión de batería</strong></div></div>
    </section>
    <section id="usos"><div className={styles.heading}><span>03</span><div><p>Matriz de uso</p><h2>La mejor depende de la tarea</h2></div></div><div className={styles.tableWrap}><table><thead><tr><th>Uso</th><th>F1200</th><th>F1800</th><th>Por qué</th></tr></thead><tbody>{uses.map(r=><tr key={r[0]}>{r.map((c,i)=><td key={c} data-label={i===1?"F1200":i===2?"F1800":undefined}>{i===1||i===2?<span className={styles.status}>{c}</span>:c}</td>)}</tr>)}</tbody></table></div></section>
    <section id="escenarios"><div className={styles.heading}><span>04</span><div><p>Cálculo editorial</p><h2>Tres jornadas, con las cuentas visibles</h2></div></div><p className={styles.note}>Sumamos potencia × horas y añadimos un margen editorial del 20%. No son pruebas de laboratorio ni autonomía medida.</p><div className={styles.scenarios}>{scenarios.map(s=><article key={s.name}><span>{s.name}</span><h3>{fmt.format(s.total)} Wh</h3><p>{s.detail}</p><strong>Objetivo con margen: {fmt.format(s.margin)} Wh</strong><small>{s.margin > 1024 ? "Ninguna cubre el margen sin recarga." : "Ambas tienen capacidad nominal suficiente; faltan pérdidas reales."}</small></article>)}</div></section>
    <section id="ficha"><div className={styles.heading}><span>05</span><div><p>Datos de producto</p><h2>Ficha técnica completa</h2></div></div><div className={styles.tableWrap}><table><thead><tr><th>Especificación</th><th>F1200</th><th>F1800</th></tr></thead><tbody>
      {[["Capacidad",`${fmt.format(a.capacityWh)} Wh`,`${fmt.format(b.capacityWh)} Wh`],["Potencia continua",`${fmt.format(a.continuousOutputWatts)} W`,`${fmt.format(b.continuousOutputWatts)} W`],["Pico",`${fmt.format(a.peakOutputWatts)} W`,`${fmt.format(b.peakOutputWatts)} W`],["Batería",`${a.battery.chemistry} · ${fmt.format(a.battery.cycles)} ciclos`,`${b.battery.chemistry} · ${fmt.format(b.battery.cycles)} ciclos`],["Carga AC máxima",`${a.charging.maxAcInputWatts} W`,`${b.charging.maxAcInputWatts} W`],["Carga solar máxima",`${a.charging.maxSolarInputWatts} W`,`${b.charging.maxSolarInputWatts} W`],["USB-C",usb(a),usb(b)],["Tomas AC",`${a.outputs.ac[0].quantity}`,`${b.outputs.ac[0].quantity}`],["Peso",`${a.weightKg} kg`,`${b.weightKg} kg`],["Dimensiones",`${a.dimensions.widthMm} × ${a.dimensions.heightMm} × ${a.dimensions.depthMm} mm`,`${b.dimensions.widthMm} × ${b.dimensions.heightMm} × ${b.dimensions.depthMm} mm`],["Garantía",`${a.warranty.duration} años`,`${b.warranty.duration} años`]].map(r=><tr key={r[0]}>{r.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody></table></div>
      <div className={styles.interpret}><article><h3>Cómo interpretar la igualdad de 1.024 Wh</h3><p>Con la misma carga y pérdidas equivalentes, la duración será parecida. Los 1.800 W de la F1800 permiten conectar más potencia a la vez; no crean energía adicional.</p></article><article><h3>Qué sacrifica cada una</h3><p>La F1200 renuncia a margen AC, carga solar rápida y USB-C más potente. La F1800 ocupa 47 mm más de ancho; su ventaja de peso es solo de 0,25 kg.</p></article></div>
    </section>
    <section className={styles.final}><span>Recomendación editorial</span><h2>F1200 para consumos previsibles; F1800 para una instalación más exigente.</h2><p>Si dudas por autonomía, no elijas entre estas dos: calcula primero tus Wh. Si dudas por una cafetera, herramientas o recarga solar, compara sus W.</p><div><Link href="/encontrar-power-station">Calcular mi power station</Link><Link href="/reviews/fossibot-f1200-review">Leer review F1200</Link><Link href="/reviews/fossibot-f1800-review">Leer review F1800</Link></div><small>Datos de fabricante verificados el 20/08/2026. Interpretaciones y escenarios elaborados por Carga Nómada; sin pruebas inventadas ni precios.</small></section>
  </main>;
}
