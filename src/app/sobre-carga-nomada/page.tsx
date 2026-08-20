import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Metodología editorial",
  description: "Conoce cómo Carga Nómada verifica especificaciones, identifica estimaciones, corrige sus contenidos y analiza power stations.",
  alternates: { canonical: "/sobre-carga-nomada" },
};

export default function AboutPage() {
  return <><main className="placeholder-page"><article className="placeholder-card"><p className="eyebrow">Metodología · Transparencia</p><h1>Cómo trabaja Carga Nómada</h1><p className="lede">Carga Nómada es una publicación especializada en energía portátil para camping, camper, caravana y uso off-grid. Nuestro objetivo es convertir especificaciones difíciles de comparar en decisiones comprensibles, sin presentar análisis editoriales como pruebas físicas.</p>
    <section><h2>Quién firma las reviews</h2><p>Las reviews están firmadas por el equipo editorial de Carga Nómada. Los nombres Juan, Álex, Laura, Carmen y Sergio son perspectivas editoriales: representan necesidades y prioridades distintas, pero no se presentan como clientes ni como autores que hayan probado los productos.</p><p>Cuando incorporemos colaboradores o revisores técnicos identificados, su nombre, función y experiencia aparecerán expresamente en la página correspondiente.</p></section>
    <section><h2>Cómo verificamos los datos</h2><p>Capacidad, potencia, peso, dimensiones, conexiones, química, ciclos, carga y compatibilidad se registran en un catálogo estructurado. Cada dato debe conservar su fuente oficial y fecha de verificación para que las cinco reviews utilicen la misma base.</p><p>Los tiempos de carga y cifras de rendimiento publicados por una marca se atribuyen al fabricante. No los convertimos en resultados propios.</p></section>
    <section><h2>Cómo hacemos las estimaciones</h2><p>Los cálculos de autonomía muestran la fórmula y sus supuestos. Como orientación inicial aplicamos un 85 % de energía utilizable, pero no lo presentamos como eficiencia medida: temperatura, inversor, consumo en reposo y aparato conectado pueden cambiar el resultado.</p><p>Una estimación ayuda a comparar escenarios. Una prueba real exige una unidad física, instrumentos, condiciones documentadas y resultados reproducibles.</p></section>
    <section><h2>Niveles de evidencia</h2><ul><li><strong>Dato oficial:</strong> especificación contrastada con la documentación enlazada.</li><li><strong>Estimación:</strong> cálculo editorial con fórmula y supuestos visibles.</li><li><strong>Análisis editorial:</strong> interpretación aplicada a un caso de uso.</li><li><strong>Prueba física:</strong> solo se utiliza cuando existe una medición documentada.</li></ul></section>
    <section><h2>Independencia, afiliación y correcciones</h2><p>Un posible enlace de afiliación no cambia qué datos mostramos, qué límites señalamos ni qué alternativa recomendamos. No publicamos valoraciones numéricas, estrellas o testimonios que no procedan de evidencia real.</p><p>Revisamos una ficha cuando cambia la documentación del fabricante o detectamos un error. La fecha visible de actualización indica cuándo se comprobó el contenido. Las correcciones materiales deben reflejarse tanto en el texto como en el catálogo estructurado.</p></section>
    <section><h2>Qué falta por demostrar</h2><p>Hasta disponer de unidades y material propio, no calificamos ruido, acabados, eficiencia, comportamiento térmico, UPS o rendimiento solar como resultados de Carga Nómada. Estas limitaciones no impiden comparar especificaciones, pero sí marcan la frontera de nuestras conclusiones.</p><p><Link href="/reviews">Consulta el archivo de reviews</Link> para ver cómo aplicamos este método a cada modelo.</p></section>
  </article></main><SiteFooter /></>;
}
