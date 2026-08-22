import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { AutonomyCalculator } from "@/components/tools/autonomy-calculator";
import { getProductById } from "@/content/products";
import { getCalculatorProducts } from "@/lib/calculator-products";
import styles from "../guide.module.css";

const guideSlug = "calcular-autonomia-power-station";
const publishedAt = "2026-08-21";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carganomada.com";
const title = "Cómo calcular la autonomía de una power station";
const seoTitle = "Calcular autonomía de una power station | Carga Nómada";
const description = "Aprende a calcular cuánto dura una power station con Wh, consumo en W, pérdidas y ejemplos de portátil, nevera, Starlink y cafetera.";
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return [{ slug: guideSlug }]; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if ((await params).slug !== guideSlug) return {};
  const canonical = `/guias/${guideSlug}`;
  return { title: { absolute: seoTitle }, description, alternates: { canonical }, openGraph: { type: "article", url: canonical, title: seoTitle, description, siteName: "Carga Nómada", locale: "es_ES", publishedTime: publishedAt, modifiedTime: publishedAt }, twitter: { card: "summary", title: seoTitle, description } };
}

const f1200 = getProductById("fossibot-f1200")!;
const f1800 = getProductById("fossibot-f1800")!;
const f2400 = getProductById("fossibot-f2400")!;
const hours = (capacityWh: number, loadWatts: number) => ((capacityWh * .85) / loadWatts).toFixed(1).replace(".", ",");
const examples = [
  { label: "Portátil", capacity: f1200.capacityWh, watts: 60, result: hours(f1200.capacityWh, 60), note: "Supuesto de trabajo ligero con un consumo constante de 60 W." },
  { label: "Nevera portátil", capacity: f1200.capacityWh, watts: 45, result: hours(f1200.capacityWh, 45), note: "Ejemplo simplificado. El compresor se enciende y se apaga; mide el consumo diario para afinar." },
  { label: "Starlink + portátil", capacity: f1800.capacityWh, watts: 130, result: hours(f1800.capacityWh, 130), note: "Ejemplo combinado de 70 W para Starlink y 60 W para el portátil; ambos pueden variar." },
  { label: "Cafetera", capacity: f2400.capacityWh, watts: 1000, result: hours(f2400.capacityWh, 1000), note: "No suele funcionar una hora seguida: 5 minutos a 1.000 W equivalen a unos 83 Wh antes de pérdidas." },
] as const;
const calculatorProducts = getCalculatorProducts();

export default async function GuidePage({ params }: Props) {
  if ((await params).slug !== guideSlug) notFound();
  const canonical = `${siteUrl}/guias/${guideSlug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Guías", item: `${siteUrl}/guias` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ] },
    { "@type": "Article", "@id": `${canonical}#article`, mainEntityOfPage: canonical, headline: title, description, datePublished: publishedAt, dateModified: publishedAt, inLanguage: "es", isAccessibleForFree: true, author: { "@id": `${siteUrl}#organization` }, publisher: { "@id": `${siteUrl}#organization` }, breadcrumb: { "@id": `${canonical}#breadcrumb` } },
  ] };

  return <><main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className={styles.hero}><div className="container">
      <nav className={styles.breadcrumb} aria-label="Migas de pan"><Link href="/">Inicio</Link><span>/</span><Link href="/guias">Guías</Link><span>/</span><span>Calcular autonomía</span></nav>
      <p className={styles.kicker}>Guía práctica · Autonomía</p>
      <h1>Cómo calcular cuánto dura una power station</h1>
      <p className={styles.lead}>Para estimar la autonomía, divide la energía útil de la power station entre el consumo total de los aparatos. Si una batería tiene 1.024 Wh y supones un 85 % utilizable, dispones de unos 870 Wh: con una carga constante de 60 W, el resultado orientativo es de 14,5 horas.</p>
      <div className={styles.byline}><span>Equipo editorial de Carga Nómada</span><span>Publicado y revisado el 21 de agosto de 2026</span></div>
    </div></header>

    <div className="container">
      <section className={styles.quick} aria-labelledby="en-pocas-palabras"><div><p className={styles.kicker}>En pocas palabras</p><h2 id="en-pocas-palabras">La fórmula que necesitas</h2></div><div className={styles.formula} role="img" aria-label="Energía útil en Wh dividida entre consumo en W es igual a horas aproximadas"><span>Energía útil (Wh)</span><i aria-hidden="true"/><span>Consumo total (W)</span><b>=</b><strong>horas aproximadas</strong></div><p>La fórmula es sencilla. Lo difícil es usar un consumo realista y no confundir la capacidad nominal con la energía que finalmente llega a tus aparatos.</p></section>
      <AutonomyCalculator products={calculatorProducts}/>
      <div className={styles.layout}><article className={styles.article}>
        <section id="desde-cero"><p className={styles.index}>01 · Desde cero</p><h2>Wh disponibles y W consumidos</h2><p>Los <strong>vatios hora (Wh)</strong> indican cuánta energía puede almacenar una power station. Los <strong>vatios (W)</strong> indican a qué ritmo está utilizando energía un aparato en un momento concreto. Una cifra habla del depósito; la otra, de la velocidad a la que lo vacías.</p><p>Una power station de 1.024 Wh no entrega automáticamente 1.024 W durante una hora a cualquier equipo. Podría alimentar, de forma ideal, una carga de 100 W durante unas 10,2 horas o una carga de 500 W durante unas 2 horas. En la práctica durará menos por las pérdidas y porque muchos aparatos no consumen siempre lo mismo.</p><aside className={styles.callout}><strong>La idea clave</strong><p>Más Wh suelen significar más tiempo. Más W de salida significan que puedes conectar aparatos más potentes, pero no que la batería vaya a durar más.</p></aside></section>

        <section id="calculo"><p className={styles.index}>02 · Paso a paso</p><h2>Cómo calcular la autonomía</h2><ol className={styles.steps}><li><strong>Anota la capacidad en Wh.</strong><span>La encontrarás en la ficha del producto. No utilices la potencia máxima en W.</span></li><li><strong>Estima la energía utilizable.</strong><span>Como cálculo editorial sencillo, aquí usamos el 85 %: capacidad × 0,85. No es una eficiencia universal ni una medición del producto.</span></li><li><strong>Suma el consumo de los aparatos.</strong><span>Si funcionan al mismo tiempo, suma sus W. Siempre que puedas, mide el consumo real.</span></li><li><strong>Divide Wh útiles entre W.</strong><span>El resultado son horas aproximadas bajo una carga constante.</span></li></ol><div className={styles.equation}><small>Ejemplo reproducible</small><code>1.024 Wh × 0,85 = 870,4 Wh útiles</code><code>870,4 Wh ÷ 60 W ≈ 14,5 horas</code><p>Es una estimación editorial con 60 W constantes. No demuestra cuánto durará un aparato concreto.</p></div></section>

        <section id="consumos"><p className={styles.index}>03 · Antes de calcular</p><h2>Qué consumo debes utilizar</h2><p>La etiqueta o el cargador suelen indicar una potencia máxima, pero esa cifra no siempre representa el consumo continuo. Un portátil puede pedir más mientras carga y menos cuando la batería está llena. Una nevera arranca el compresor por ciclos. Una cafetera consume mucho, pero normalmente durante pocos minutos.</p><p>Para una primera aproximación puedes usar un rango prudente. Para decidir una compra cara, mide el aparato con un medidor de enchufe o consulta su consumo energético durante el periodo que realmente te importa.</p><div className={styles.tableWrap}><table><thead><tr><th>Aparato</th><th>Consumo para un ejemplo</th><th>Qué debes comprobar</th></tr></thead><tbody><tr><td>Móvil</td><td>10–25 W al cargar</td><td>Potencia del cargador y tiempo de carga</td></tr><tr><td>Portátil</td><td>40–100 W</td><td>Uso real, cargador y USB-C PD</td></tr><tr><td>Nevera portátil</td><td>35–60 W cuando funciona</td><td>Ciclos del compresor y Wh diarios</td></tr><tr><td>Starlink</td><td>50–100 W</td><td>Modelo, clima y modo de uso</td></tr><tr><td>Cafetera</td><td>800–1.500 W</td><td>Potencia continua y minutos de uso</td></tr></tbody></table></div><p className={styles.note}>Los rangos son ejemplos orientativos, no valores universales. Comprueba o mide tus propios equipos.</p></section>

        <section id="ejemplos"><p className={styles.index}>04 · Números aplicados</p><h2>Ejemplos de autonomía</h2><p>Todos los ejemplos siguientes utilizan un 85 % de energía utilizable como supuesto editorial simplificado. Sirven para comparar escenarios con la misma regla, no para prometer una duración exacta.</p><div className={styles.exampleGrid}>{examples.map(example=><article key={example.label}><span>{example.label}</span><strong>≈ {example.result} h</strong><code>{example.capacity} × 0,85 ÷ {example.watts} W</code><p>{example.note}</p></article>)}</div><h3>Varios aparatos a la vez</h3><p>Imagina una F2400 de {f2400.capacityWh.toLocaleString("es-ES")} Wh con una nevera que promedia 45 W, un router de 15 W, luces de 20 W y un portátil a 60 W. La carga conjunta es de 140 W. Aplicando el supuesto: 2.048 × 0,85 ÷ 140 ≈ <strong>{hours(f2400.capacityWh,140)} horas</strong>. Si apagas el portátil, el consumo baja y el conjunto dura más.</p><h3>Un fin de semana no se calcula solo en horas</h3><p>También puedes trabajar con energía diaria. Si estimas 350 Wh de nevera, 120 Wh de portátil, 80 Wh de luces y 60 Wh entre móviles y cámara, tu día suma 610 Wh. Para dos días necesitarías unos 1.220 Wh útiles. Al dividir entre 0,85, obtienes una capacidad nominal orientativa de unos 1.435 Wh. Ese cálculo te sitúa entre los modelos de 1.024 y 2.048 Wh y te obliga a decidir cuánto margen quieres.</p></section>

        <section id="perdidas"><p className={styles.index}>05 · El resultado real</p><h2>Por qué dura menos de lo que parece</h2><p>La energía atraviesa electrónica de control, cables y, cuando utilizas un enchufe AC, un inversor. Parte se pierde como calor. La propia power station también consume algo para mantener sus sistemas activos. Por eso no conviene dividir directamente la capacidad nominal entre el consumo y tratar el resultado como una garantía.</p><p>El 85 % que usamos en esta guía es un supuesto cómodo para aprender y comparar. Un sistema puede quedar por encima o por debajo según carga, temperatura, química, estado de la batería y tipo de salida. Las cargas pequeñas a través del inversor pueden verse especialmente afectadas por su consumo fijo; una salida DC o USB-C compatible puede evitar una conversión innecesaria.</p><ul className={styles.factorList}><li><strong>Temperatura:</strong> el frío y el calor extremos pueden reducir el rendimiento.</li><li><strong>Tipo de salida:</strong> AC, DC y USB no tienen las mismas conversiones.</li><li><strong>Consumo variable:</strong> neveras, bombas y herramientas trabajan por ciclos o tienen picos.</li><li><strong>Estado de carga:</strong> la pantalla muestra una estimación que puede reajustarse.</li><li><strong>Uso simultáneo:</strong> cualquier equipo adicional cambia el denominador de la fórmula.</li></ul></section>

        <section id="errores"><p className={styles.index}>06 · Evita estas trampas</p><h2>Errores frecuentes al calcular</h2><div className={styles.mistakes}><div><strong>Confundir W con Wh</strong><p>Los W te dicen si puedes alimentar el aparato; los Wh ayudan a estimar durante cuánto tiempo.</p></div><div><strong>Usar la potencia del cargador</strong><p>Un cargador de 100 W no implica que el portátil consuma 100 W de forma constante.</p></div><div><strong>Ignorar las pérdidas</strong><p>La capacidad nominal no llega íntegra a la carga. Declara siempre el supuesto utilizado.</p></div><div><strong>Olvidar consumos pequeños</strong><p>Router, luces y móviles pueden sumar bastante cuando permanecen conectados muchas horas.</p></div><div><strong>Tratar la nevera como carga constante</strong><p>Es mejor conocer los Wh consumidos en 24 horas que multiplicar su potencia máxima por todo el día.</p></div><div><strong>Comprar sin margen</strong><p>Si tu cálculo queda justo, cualquier cambio de temperatura, uso o eficiencia puede dejarte corto.</p></div></div></section>

        <section id="antes-de-comprar"><p className={styles.index}>07 · Llevarlo a una decisión</p><h2>Cuántos Wh necesitas antes de comprar</h2><p>Haz una lista de lo que vas a conectar, cuántas horas funcionará y si habrá recarga durante el viaje. Convierte cada consumo a Wh: potencia × horas. Suma el total diario, multiplícalo por los días que quieres cubrir y divide entre la fracción utilizable que decidas emplear.</p><div className={styles.equation}><small>Dimensionar desde tus necesidades</small><code>Wh diarios × días ÷ 0,85</code><p>Añade después un margen razonable para cambios de consumo y degradación, sin comprar capacidad porque sí.</p></div><p>Si tus escapadas rondan 1 kWh nominal, puedes ver cómo encajan esos números en nuestra <Link href="/reviews/fossibot-f1200-review">review de la FOSSiBOT F1200 para camping</Link>. Para trabajo en camper, la <Link href="/reviews/fossibot-f1800-review">review de la FOSSiBOT F1800</Link> explica por qué los USB-C y la recarga solar también importan. Si sumas varios aparatos familiares, la <Link href="/reviews/fossibot-f2400-review">review de la FOSSiBOT F2400 para caravana</Link> aplica 2.048 Wh a ese escenario.</p></section>

        <section id="faq" className={styles.faq}><p className={styles.index}>08 · Preguntas frecuentes</p><h2>Dudas sobre la autonomía de una power station</h2><details><summary>¿Cómo calculo cuánto dura una power station?</summary><p>Multiplica la capacidad en Wh por la fracción utilizable que quieras suponer y divide el resultado entre el consumo total en W. Con 1.024 Wh, un 85 % utilizable y 60 W constantes: 1.024 × 0,85 ÷ 60 ≈ 14,5 horas.</p></details><details><summary>¿Por qué dura menos que los Wh anunciados?</summary><p>Porque hay pérdidas en la electrónica, los cables y el inversor, además del consumo propio del sistema. La temperatura, el tipo de salida y la carga también cambian el resultado.</p></details><details><summary>¿Cuántos Wh necesito para una nevera?</summary><p>No existe una cifra universal. Mide o consulta cuántos Wh consume tu nevera en 24 horas, suma el resto de aparatos y multiplica por los días que quieres cubrir. Las condiciones ambientales cambian los ciclos del compresor.</p></details><details><summary>¿2.000 Wh significan 2.000 W durante una hora?</summary><p>Es la equivalencia ideal antes de pérdidas. También podrían representar 200 W durante 10 horas. En uso real tendrás menos energía disponible y el aparato deberá respetar la potencia continua de salida.</p></details><details><summary>¿La potencia de pico sirve para calcular autonomía?</summary><p>No. El pico indica una capacidad breve para arranques o cargas transitorias. Para autonomía necesitas el consumo energético real y la potencia media durante el periodo calculado.</p></details></section>

        <section id="siguiente"><p className={styles.index}>09 · Siguiente paso</p><h2>Aplica el cálculo a tu caso</h2><div className={styles.nextGrid}><div><h3>Sigue aprendiendo</h3><p>Esta es la primera guía publicada del cluster. Añadiremos aquí las siguientes cuando estén disponibles, sin crear enlaces vacíos.</p><Link href="/guias">Ver todas las guías publicadas →</Link></div><div><h3>Mira cómo se aplica</h3><p>Compara capacidad, potencia y peso en escenarios concretos.</p><Link href="/reviews">Explorar las reviews →</Link></div></div></section>
        <section id="metodologia" className={styles.sources}><p className={styles.index}>10 · Metodología</p><h2>Cómo hemos hecho los cálculos</h2><p>Las capacidades de los ejemplos proceden de las fichas de producto verificadas y enlazadas en cada review. Los consumos son supuestos editoriales orientativos. El 85 % utilizable es una simplificación común a todos los ejemplos, no una prueba de eficiencia ni una característica declarada para cada modelo.</p></section>
      </article><aside className={styles.aside} aria-label="Contenido de la guía"><span>En esta guía</span><a href="#calculo">La fórmula</a><a href="#consumos">Qué consumo usar</a><a href="#ejemplos">Ejemplos</a><a href="#perdidas">Pérdidas</a><a href="#errores">Errores frecuentes</a><a href="#antes-de-comprar">Antes de comprar</a><a href="#faq">Preguntas</a></aside></div>
    </div>
  </main><SiteFooter/></>;
}
