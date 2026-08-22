import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { getProductById } from "@/content/products";
import styles from "../guide.module.css";
import flowStyles from "./page.module.css";

const slug = "que-puedo-conectar-power-station";
const publishedAt = "2026-08-21";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carganomada.com";
const title = "Qué puedes conectar a una power station";
const seoTitle = "Qué conectar a una power station | Carga Nómada";
const description = "Descubre qué aparatos puedes conectar a una power station según su potencia continua, pico de arranque, puertos y consumo simultáneo.";

export const metadata: Metadata = {
  title: { absolute: seoTitle }, description,
  alternates: { canonical: `/guias/${slug}` },
  openGraph: { type: "article", url: `/guias/${slug}`, title: seoTitle, description, siteName: "Carga Nómada", locale: "es_ES", publishedTime: publishedAt, modifiedTime: publishedAt },
  twitter: { card: "summary", title: seoTitle, description },
};

const f1200 = getProductById("fossibot-f1200")!;
const f1800 = getProductById("fossibot-f1800")!;
const f2400 = getProductById("fossibot-f2400")!;
const peak = (watts: number | undefined) => watts?.toLocaleString("es-ES") ?? "no declarado";

export default function WhatCanIConnectGuide() {
  const canonical = `${siteUrl}/guias/${slug}`;
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
      <nav className={styles.breadcrumb} aria-label="Migas de pan"><Link href="/">Inicio</Link><span>/</span><Link href="/guias">Guías</Link><span>/</span><span>Qué puedes conectar</span></nav>
      <p className={styles.kicker}>Guía práctica · Compatibilidad</p>
      <h1>Qué puedes conectar a una power station</h1>
      <p className={styles.lead}>Puedes conectar un aparato si la salida elegida es compatible, su consumo no supera la potencia continua de la estación y su arranque cabe dentro del pico admitido. Después queda otra pregunta distinta: cuánto tiempo podrá mantenerlo encendido.</p>
      <div className={styles.byline}><span>Equipo editorial de Carga Nómada</span><span>Publicado y revisado el 21 de agosto de 2026</span></div>
    </div></header>

    <div className="container">
      <section className={styles.quick} aria-labelledby="respuesta-rapida"><div><p className={styles.kicker}>En pocas palabras</p><h2 id="respuesta-rapida">Comprueba tu aparato en este orden</h2></div><ol className={flowStyles.decisionFlow} aria-label="Pasos para comprobar si un aparato es compatible"><li><span>01</span>Salida compatible</li><li><span>02</span>W continuos suficientes</li><li><span>03</span>Pico de arranque admisible</li><li><span>04</span>Consumo simultáneo dentro del límite</li><li><span>05</span>Wh suficientes para el tiempo deseado</li></ol><p>Que un aparato pueda encenderse no garantiza una autonomía suficiente. Compatibilidad y duración son dos filtros diferentes, y conviene superarlos en ese orden.</p></section>
      <div className={styles.layout}><article className={styles.article}>
        <section id="compatibilidad"><p className={styles.index}>01 · La respuesta correcta</p><h2>No depende solo de los vatios</h2><p>Una power station puede alimentar desde móviles y portátiles hasta neveras, cafeteras, herramientas o ciertos electrodomésticos. La lista exacta no la decide el nombre del aparato, sino sus datos eléctricos y la forma en que va a utilizarse. Dos cafeteras visualmente parecidas pueden consumir 900 W y 1.500 W; dos neveras pueden tener arranques muy distintos.</p><p>Comprueba primero la etiqueta, el manual o una medición del equipo. Necesitas conocer su potencia mientras funciona, cualquier pico breve al arrancar, la tensión y el conector. Si vas a usar varias cosas a la vez, también debes sumar sus consumos. Una estación de 1.200 W no reserva 1.200 W para cada enchufe: normalmente esa cifra es el máximo combinado de sus salidas AC.</p><aside className={styles.callout}><strong>Regla rápida</strong><p>El consumo continuo conjunto debe quedar por debajo de la salida continua, y el mayor arranque debe caber en el pico sin sumar a ciegas cifras comerciales. Deja margen: diseñar justo al límite vuelve el sistema frágil.</p></aside></section>

        <section id="potencia"><p className={styles.index}>02 · Dos cifras distintas</p><h2>Potencia continua y potencia de pico</h2><p>La <strong>potencia continua</strong> es la carga que el inversor puede sostener. Es la referencia para resistencias de calor, electrónica y aparatos que trabajan durante minutos u horas. Si una cafetera indica 1.400 W y tu estación entrega 1.200 W continuos, no debes contar con que funcione aunque el producto anuncie un pico de 2.400 W.</p><p>La <strong>potencia de pico</strong> cubre demandas breves, típicas al arrancar un compresor, una bomba o un motor. No convierte una estación de 1.200 W en una de 2.400 W continuos. Además, duración y comportamiento del pico varían entre fabricantes; valida cargas sensibles o exigentes con el manual y, si es posible, con una prueba controlada.</p><h3>Qué ocurre al conectar varios aparatos</h3><p>La simultaneidad obliga a comparar la suma de lo que funciona a la vez con la potencia continua disponible. Por ejemplo, un portátil de 60 W, una nevera de 80 W y unas luces de 20 W sumarían unos 160 W mientras coincidan. Es una cuenta orientativa: el consumo real puede variar y el arranque de la nevera puede elevar brevemente la demanda.</p><div className={styles.equation}><small>Comprobación de simultaneidad</small><code>W de aparato A + B + C &lt; W continuos de la estación</code><code>arranque más carga activa &lt; capacidad de pico admisible</code><p>No uses el pico para justificar un consumo sostenido. Conserva margen para variaciones, temperatura y futuras cargas.</p></div></section>

        <section id="puertos"><p className={styles.index}>03 · La conexión importa</p><h2>AC, USB-C, USB-A y 12 V no son intercambiables</h2><p>Un enchufe AC ofrece una experiencia familiar, pero obliga a convertir la energía de la batería. USB-C PD puede cargar directamente un portátil compatible con menos adaptadores. USB-A suele reservarse para electrónica ligera. La salida de 12 V resulta útil para neveras portátiles y accesorios de vehículo, siempre que coincidan tensión, conector, polaridad y corriente máxima.</p><ul className={styles.factorList}><li><strong>AC:</strong> comprueba tensión regional, frecuencia, potencia combinada y onda senoidal pura si el equipo lo requiere.</li><li><strong>USB-C PD:</strong> tanto el puerto como el cable deben admitir el perfil que pide el dispositivo; un puerto de 20 W no sustituye a uno de 100 o 140 W.</li><li><strong>USB-A:</strong> adecuado para móviles, luces y accesorios, pero su protocolo puede limitar la velocidad.</li><li><strong>12 V DC:</strong> valida voltaje, amperaje y conector. No des por hecho que todo accesorio de coche es compatible.</li></ul><p>Por ejemplo, la F1200 verificada en el proyecto dispone de un USB-C de hasta 100 W y otro de 20 W; la F1800 sube a dos USB-C de hasta 140 W. La elección del puerto puede ser tan relevante como la potencia total para un puesto de trabajo móvil.</p></section>

        <section id="tabla"><p className={styles.index}>04 · Aparato por aparato</p><h2>Qué suele poder alimentar una power station</h2><p>Como orientación práctica, móviles, luces y pequeños dispositivos USB suelen ser cargas ligeras; portátiles, televisores, Starlink y algunas neveras portátiles ocupan una zona media; cafeteras, microondas, secadores y calefactores exigen más potencia. Neveras, bombas, compresores y herramientas con motor merecen una categoría aparte por su arranque o consumo variable. Estas agrupaciones no son reglas: el modelo concreto siempre manda.</p><p>Esta tabla sirve para hacer una primera criba. Los rangos son ejemplos editoriales, no consumos universales: usa siempre el valor de tu aparato. El clima, el modo de trabajo y la eficiencia pueden cambiar mucho el resultado.</p><div className={styles.tableWrap}><table><thead><tr><th>Aparato</th><th>Rango orientativo</th><th>Qué debes comprobar</th></tr></thead><tbody>
          <tr><td>Móvil, cámara o dron</td><td>5–100 W</td><td>Protocolo USB, cable y energía por carga</td></tr>
          <tr><td>Portátil</td><td>40–140 W</td><td>USB-C PD o cargador AC; demanda bajo carga</td></tr>
          <tr><td>Router y Starlink</td><td>10–120 W</td><td>Modelo, fuente, clima y consumo continuo</td></tr>
          <tr><td>Nevera portátil</td><td>35–80 W en marcha</td><td>Pico del compresor y Wh consumidos en 24 h</td></tr>
          <tr><td>Televisor o monitor</td><td>30–150 W</td><td>Tamaño, brillo y consumo real</td></tr>
          <tr><td>Cafetera</td><td>800–1.500 W</td><td>Potencia sostenida y minutos de uso</td></tr>
          <tr><td>Microondas</td><td>1.000–1.800 W de entrada</td><td>Consumo de entrada, no solo potencia de cocción</td></tr>
          <tr><td>Secador o calefactor</td><td>1.000–2.500 W</td><td>Modo seleccionado y gran coste energético</td></tr>
          <tr><td>Bomba o herramienta</td><td>300–2.000 W</td><td>Arranque del motor y carga durante el trabajo</td></tr>
        </tbody></table></div><p className={styles.note}>Una etiqueta de 700 W en un microondas puede describir la potencia útil de cocción; su consumo eléctrico de entrada suele ser superior. Busca “input”, “entrada” o consulta el manual.</p></section>

        <section id="ejemplos"><p className={styles.index}>05 · Casos reales de decisión</p><h2>Seis ejemplos para entender el límite</h2><div className={styles.exampleGrid}>
          <article><span>Electrónica ligera</span><strong>≈ 145 W</strong><code>portátil 100 + monitor 35 + móvil 10</code><p>La potencia es modesta; aquí mandan los puertos adecuados y la autonomía.</p></article>
          <article><span>Trabajo conectado</span><strong>≈ 220 W</strong><code>Starlink 90 + portátil 100 + monitor 30</code><p>Una F1800 ofrece margen de potencia y USB-C de 140 W, pero debes calcular horas.</p></article>
          <article><span>Nevera con compresor</span><strong>60 W + pico</strong><code>marcha continua ≠ arranque</code><p>Sesenta vatios parecen pocos; el dato decisivo puede ser el pico al arrancar.</p></article>
          <article><span>Café en camping</span><strong>1.000 W</strong><code>1.000 W × 5 min ≈ 83 Wh</code><p>Puede exigir mucha potencia y, por funcionar pocos minutos, relativamente poca energía.</p></article>
          <article><span>Uso familiar</span><strong>≈ 1.175 W</strong><code>cafetera 1.000 + nevera 60 + TV 80 + luces 35</code><p>Queda demasiado cerca de 1.200 W; una estación de 2.400 W aporta margen más sensato.</p></article>
          <article><span>Calor eléctrico</span><strong>2.000 W</strong><code>calefactor durante 1 h = 2.000 Wh ideales</code><p>Aunque la estación soporte la potencia, una resistencia puede vaciar rápidamente la batería.</p></article>
        </div><p>Los ejemplos muestran por qué “puede conectarse” no significa “conviene conectarlo”. Un secador de 2.000 W puede entrar dentro de una estación potente, pero consume en diez minutos aproximadamente 333 Wh antes de pérdidas. Una nevera pequeña demanda menos potencia y, al permanecer todo el día, puede gastar más energía acumulada.</p></section>

        <section id="modelos"><p className={styles.index}>06 · Aplicado a tres tamaños</p><h2>Qué cambia al pasar de 1.200 a 2.400 W</h2><p>La F1200 tiene {f1200.continuousOutputWatts.toLocaleString("es-ES")} W continuos y {peak(f1200.peakOutputWatts)} W de pico. Encaja bien con electrónica, neveras portátiles y aparatos moderados, pero una cafetera potente puede dejarla al límite o superarla. Consulta la <Link href="/reviews/fossibot-f1200-review">review de la FOSSiBOT F1200</Link> para ver el escenario de camping.</p><p>La F1800 conserva {f1800.capacityWh.toLocaleString("es-ES")} Wh de capacidad, pero eleva la salida a {f1800.continuousOutputWatts.toLocaleString("es-ES")} W continuos y {peak(f1800.peakOutputWatts)} W de pico. Permite más aparatos exigentes y más simultaneidad, aunque esa potencia adicional no amplía por sí sola la duración.</p><p>La F2400 combina {f2400.capacityWh.toLocaleString("es-ES")} Wh con {f2400.continuousOutputWatts.toLocaleString("es-ES")} W continuos y {peak(f2400.peakOutputWatts)} W de pico. Da margen para una rutina familiar con varios consumos, pero sigue siendo necesario decidir qué funciona a la vez. Puedes verlo aplicado en la <Link href="/reviews/fossibot-f2400-review">review de la FOSSiBOT F2400</Link>.</p></section>

        <section id="autonomia"><p className={styles.index}>07 · El segundo filtro</p><h2>Después de la potencia, calcula la autonomía</h2><p>Superar el filtro de potencia solo confirma que el sistema puede alimentar la carga. Para saber cuánto durará necesitas los Wh de la batería, el consumo acumulado y un supuesto razonable de pérdidas. Una estación de 1.024 Wh y 1.800 W puede encender una cafetera de 1.200 W, pero no mantenerla durante muchas horas.</p><p>Para cargas continuas, una aproximación consiste en dividir la energía utilizable entre los vatios consumidos. Para aparatos de uso breve, calcula Wh: vatios multiplicados por horas. Para neveras y equipos por ciclos, una medición de 24 horas suele ser más representativa. Sigue el método completo en la guía sobre <Link href="/guias/calcular-autonomia-power-station">cómo calcular la autonomía de una power station</Link>.</p></section>

        <section id="errores"><p className={styles.index}>08 · Evita estas trampas</p><h2>Errores frecuentes al conectar aparatos</h2><div className={styles.mistakes}>
          <div><strong>Mirar solo el pico</strong><p>El pico no sirve para sostener una cafetera, placa o secador por encima de la potencia continua.</p></div>
          <div><strong>Sumar enchufes, no consumos</strong><p>Tener tres tomas AC no significa disponer de la potencia máxima tres veces.</p></div>
          <div><strong>Ignorar el arranque</strong><p>Compresores, bombas y motores pueden activar la protección aunque consuman poco después.</p></div>
          <div><strong>Confundir salida con autonomía</strong><p>Más W permiten cargas mayores; más Wh aportan duración. Si dudas con las unidades, repasa la <Link href="/guias/w-vs-wh">diferencia entre W y Wh</Link>.</p></div>
          <div><strong>Usar un cable cualquiera</strong><p>Un cable USB-C o adaptador inadecuado puede limitar potencia o crear una conexión insegura.</p></div>
          <div><strong>Trabajar siempre al límite</strong><p>Dejar margen reduce desconexiones por variaciones y facilita añadir otra carga pequeña.</p></div>
        </div></section>

        <section id="seguridad"><p className={styles.index}>09 · Uso responsable</p><h2>Compatibilidad también significa seguridad</h2><p>Utiliza la estación en un lugar seco, estable y ventilado; respeta temperaturas y distancias indicadas por el fabricante. No tapes ventiladores ni uses adaptadores dañados. Si conectas una regleta, esta no aumenta la potencia disponible: solo multiplica los puntos de conexión.</p><p>Una salida de onda senoidal pura suele ser la opción adecuada para electrónica y motores compatibles, pero no garantiza por sí sola el funcionamiento de cualquier dispositivo. Equipos médicos, instalaciones fijas, conmutaciones de vivienda y terminales cableados requieren una validación profesional y el cumplimiento de la normativa aplicable. Una función UPS tampoco sustituye automáticamente a un SAI certificado para cualquier carga crítica.</p></section>

        <section id="elegir"><p className={styles.index}>10 · Antes de comprar</p><h2>Cómo elegir potencia sin sobredimensionar</h2><ol className={styles.steps}><li><strong>Haz un inventario real.</strong><span>Anota modelo, entrada eléctrica, horas de uso y cuáles funcionarán a la vez.</span></li><li><strong>Separa cargas normales y arranques.</strong><span>Consulta manuales para compresores, motores, bombas y herramientas.</span></li><li><strong>Suma el peor escenario razonable.</strong><span>No sumes todo si nunca va a funcionar junto, pero tampoco ignores hábitos reales.</span></li><li><strong>Deja margen de potencia.</strong><span>Evita que tu rutina habitual dependa de trabajar pegado al máximo continuo.</span></li><li><strong>Calcula los Wh necesarios.</strong><span>La potencia abre la puerta; la capacidad decide durante cuánto tiempo permanece abierta.</span></li></ol></section>

        <section id="faq" className={styles.faq}><p className={styles.index}>11 · Preguntas frecuentes</p><h2>Dudas sobre qué conectar a una power station</h2>
          <details><summary>¿Puedo conectar una nevera?</summary><p>Sí, si la potencia continua y el pico de arranque del compresor quedan dentro de los límites y la salida es compatible. Para la duración, mide o consulta sus Wh en 24 horas.</p></details>
          <details><summary>¿Puedo usar una cafetera o un microondas?</summary><p>Depende de la potencia eléctrica de entrada. Comprueba el consumo sostenido, no solo la potencia de cocción, y suma cualquier otra carga activa. Son aparatos potentes aunque se usen poco tiempo.</p></details>
          <details><summary>¿Una estación de 2.000 W puede alimentar cualquier aparato de menos de 2.000 W?</summary><p>No necesariamente. También importan el arranque, tensión, frecuencia, forma de onda, conexión y límites por salida. Además, conviene dejar margen en vez de operar de forma habitual al máximo.</p></details>
          <details><summary>¿Puedo conectar varios aparatos a la vez?</summary><p>Sí, siempre que la suma de consumos y los picos simultáneos respeten los límites de la estación y de cada salida. Una regleta no aumenta la potencia disponible.</p></details>
          <details><summary>¿Qué diferencia hay entre W y Wh?</summary><p>Los W expresan potencia y ayudan a saber qué cargas puede sostener la estación. Los Wh expresan energía almacenada y ayudan a estimar cuánto tiempo podrá alimentarlas. La guía de <Link href="/guias/w-vs-wh">W frente a Wh</Link> explica ambas magnitudes con ejemplos.</p></details>
        </section>

        <section id="siguiente"><p className={styles.index}>12 · Siguiente paso</p><h2>Pasa de “funciona” a “me sirve”</h2><div className={styles.nextGrid}><div><h3>Calcula cuánto durará</h3><p>Una vez validada la potencia, convierte tu rutina en Wh y horas.</p><Link href="/guias/calcular-autonomia-power-station">Calcular la autonomía →</Link></div><div><h3>Contrasta escenarios</h3><p>Las reviews aplican las especificaciones a camping, camper y caravana.</p><Link href="/reviews">Explorar las reviews →</Link></div></div></section>
        <section id="metodologia" className={styles.sources}><p className={styles.index}>13 · Metodología</p><h2>Cómo hemos preparado esta guía</h2><p>Las capacidades, potencias y salidas de los modelos citados proceden de las fichas oficiales de la <a href={f1200.source.url}>FOSSiBOT F1200</a>, la <a href={f1800.source.url}>FOSSiBOT F1800</a> y la <a href={f2400.source.url}>FOSSiBOT F2400</a>, verificadas en el proyecto el 20 de agosto de 2026. Los consumos de aparatos son rangos editoriales orientativos: no sustituyen la etiqueta, el manual ni una medición del equipo concreto. No hemos utilizado datos de volumen de búsqueda ni resultados SERP en tiempo real.</p></section>
      </article><aside className={styles.aside} aria-label="Contenido de la guía"><span>En esta guía</span><a href="#compatibilidad">Compatibilidad</a><a href="#potencia">Potencia y pico</a><a href="#puertos">Puertos</a><a href="#tabla">Aparatos</a><a href="#ejemplos">Ejemplos</a><a href="#autonomia">Autonomía</a><a href="#errores">Errores</a><a href="#faq">Preguntas</a></aside></div>
    </div>
  </main><SiteFooter/></>;
}
