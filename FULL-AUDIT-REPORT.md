# Auditoría SEO de Carga Nómada

Fecha: 20 de agosto de 2026  
Ámbito: compilación local de producción, 11 páginas HTML principales, robots, sitemap, código y recursos.  
Limitación: sin URL pública, Search Console, CrUX, PageSpeed ni datos de ranking. Rendimiento es una estimación técnica, no una medición Lighthouse de campo.

## Resumen ejecutivo

**SEO Health Score: 76/100**

| Área | Nota |
|---|---:|
| SEO técnico | 72 |
| Calidad de contenido | 74 |
| On-page | 86 |
| Schema | 68 |
| Rendimiento (heurístico) | 82 |
| GEO / buscadores con IA | 76 |
| Imágenes | 63 |

Tipo detectado: publicación editorial de reviews y comparativas de power stations, con intención informativa y comercial.

Las cinco reviews son la parte más fuerte del sitio: responden 200, tienen un H1, title y description propios, canonical, JSON-LD, imágenes con alt, enlaces internos y entre 1.222 y 1.326 palabras renderizadas. Su calidad on-page estimada se sitúa aproximadamente entre 87 y 91/100. El 76 global se explica por problemas transversales y páginas incompletas.

## Problemas críticos y altos

1. **Dominio canónico no asegurado.** Sin `NEXT_PUBLIC_SITE_URL`, metadata, robots, sitemap y JSON-LD generan `http://localhost:3000`. La compilación auditada lo confirmó.
2. **Hero roto en portada.** La Home solicita `/images/home/hero/Hero.png`, pero el recurso no existe. Al estar marcado como prioritario, afecta al elemento visual principal y al potencial LCP.
3. **Páginas placeholder indexables.** `/guias` y `/comparativas` tienen aproximadamente 20 palabras. Las rutas dinámicas correspondientes aceptan slugs arbitrarios y pueden comportarse como soft 404. `/encontrar-power-station` también está incompleta.
4. **Product schema no elegible para rich results.** El bloque tiene `name`, pero no `offers`, `review` ni `aggregateRating`. La vía honesta es añadir `Offer` con precio y disponibilidad vigentes; no se deben inventar valoraciones.
5. **Confianza editorial limitada.** Las reviews están firmadas por un equipo genérico, carecen de autor o revisor con credenciales, pruebas físicas propias y fuentes independientes. Además, `/sobre-carga-nomada` todavía explica que Juan, Álex, Laura, Carmen y Sergio son perspectivas editoriales, aunque esa presentación se había retirado de las reviews.

## Fortalezas

- Next.js genera correctamente 21 páginas y las reviews se prerenderizan mediante SSG.
- El contenido principal es accesible en HTML sin depender de JavaScript cliente.
- Titles de las reviews: 45–50 caracteres; descriptions: 125–132 caracteres.
- Un H1 por página auditada y jerarquía amplia de H2/H3.
- Respuesta rápida, tablas, pros/contras, FAQ, cálculos explicados y enlaces entre todos los modelos.
- Organization y WebSite globales; BreadcrumbList, Product y Article en cada review.
- 15 imágenes de producto, con nombres útiles, alt descriptivos, `next/image`, `srcset`, `sizes` y lazy loading.
- Robots permite el rastreo y referencia un sitemap con 16 URLs.
- Buena preparación para citas de IA gracias a respuestas directas, tablas y pasajes autocontenidos.

## Hallazgos por área

### Técnico e indexación

- La Home, `/comparativas`, `/guias` y `/perfiles` no tienen canonical explícito.
- Las secciones placeholder heredan una descripción genérica y no tienen Open Graph específico.
- El sitemap omite `/encontrar-power-station`; conviene decidir si se completa o se excluye/noindexa.
- `lastModified` está fijado globalmente a 2026-08-20 en varias rutas, no ligado a cambios reales.
- No se observaron cabeceras CSP, HSTS, X-Content-Type-Options, frame policy o Referrer-Policy en la configuración de Next; el hosting podría añadirlas, pero no se pudo verificar.

### Contenido, E-E-A-T y SXO

- Las reviews no son contenido fino y diferencian razonablemente cada caso de uso.
- La plantilla se repite mucho entre los cinco modelos: fórmula del 85 %, mismas secciones y cierres similares. No es duplicación severa, pero sí una huella editorial escalada.
- F1200/F1800 y F3600/F7200 tienen riesgo de solapamiento semántico; necesitan comparaciones directas más claras.
- El archivo `/reviews` funciona como hub, pero aún no es una comparativa: le faltan matriz, filtros, “mejor para” y recomendación global.
- La Home promete guías y comparativas que todavía no existen, creando una expectativa rota.
- Faltan páginas legales/contacto y una identidad editorial verificable.

### Schema y GEO

- El JSON-LD es válido en estructura y está renderizado en servidor.
- `Article` debería incorporar `image`; `Organization`, logo y señales verificables como `sameAs` cuando existan.
- No se recomienda añadir puntuaciones o testimonios sin datos reales.
- Falta `/llms.txt`; es una mejora secundaria, no un requisito de Google.
- La citabilidad es buena, pero la autoridad está limitada porque casi todas las fuentes son del fabricante.

### Imágenes y rendimiento

- `camping.jpg` mide 1920×1000, pero el componente declara 1440×1440; deben usarse dimensiones reales para evitar una relación de aspecto incorrecta.
- `caravan.webp` pesa aproximadamente 216 KB, ligeramente por encima del objetivo ideal de 200 KB.
- Hay cuatro PNG de personajes sin uso aparente, de 2,1–2,4 MB cada uno. No afectan a la carga si no se solicitan, pero inflan el despliegue.
- No se pudieron medir LCP, INP o CLS reales. La nota 82/100 es heurística basada en SSR/SSG, ausencia de componentes cliente y uso de `next/image`.

## Conclusión

La base de las reviews es buena y ha mejorado claramente con las imágenes y el enlazado entre modelos. El siguiente salto no está en añadir más texto a esas cinco URLs, sino en cerrar la infraestructura del dominio, retirar o completar páginas vacías, reparar el hero, enriquecer el schema con ofertas reales y reforzar autoridad editorial con fuentes y responsables verificables.
