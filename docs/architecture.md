# Arquitectura de Carga Nómada

## Decisión base

El proyecto usa Next.js 16 (Active LTS), React 19 y TypeScript estricto. Requiere Node.js 20.9 o posterior. El App Router aporta rutas basadas en archivos, renderizado en servidor para contenido indexable y metadata por página sin infraestructura innecesaria.

## Estructura

```text
src/
  app/          Rutas y composición de páginas
  components/   Componentes de interfaz reutilizables, sin datos de dominio incrustados
  content/      Datos editoriales estructurados y selectores
  domain/       Tipos y modelos independientes de UI y almacenamiento
docs/           Decisiones y documentación técnica
```

## Rutas

`app` prepara `/`, `/encontrar-power-station`, `/perfiles`, `/perfiles/[slug]`, `/reviews`, `/reviews/[slug]`, `/comparativas`, `/comparativas/[slug]`, `/guias`, `/guias/[slug]` y `/sobre-carga-nomada`.

## Dominio y relaciones

`Persona`, `Brand`, `Product`, `Review`, `Comparison` y `Guide` viven en `src/domain`. Las relaciones usan identificadores: `Product` guarda `brandId`, `Review` guarda `productId` y `personaIds`, y `Comparison` guarda `productIds`. Las páginas o selectores resolverán estas referencias posteriormente, con una única fuente de verdad por entidad.

`Persona` conserva sus prioridades como un mapa tipado de pesos. `definePersona` valida en la fuente editorial que sean no negativos y sumen 1. `voice` es un objeto de dominio con tono, nivel técnico, estilo de decisión, focos y aspectos a evitar; no pertenece a la UI.

Estas decisiones preparan recomendaciones diferenciadas por perfil, comparativas y el cuestionario futuro sin acoplar perfiles a productos ni implementar un algoritmo. También permiten incorporar URLs de afiliación y metadata SEO de forma centralizada cuando existan datos reales.

## Flujo conceptual

```text
Datos editoriales / futura fuente de contenido
              ↓
     Modelos de dominio tipados
              ↓
 Selección en contenido o servicios futuros
              ↓
     Rutas y componentes de interfaz
```

En esta fase no hay productos, reviews, afiliación, cuestionario, CMS ni algoritmo de recomendaciones.
