# Plan de acción SEO

## Crítico — antes del siguiente despliegue

1. Configurar `NEXT_PUBLIC_SITE_URL` con el dominio HTTPS real y eliminar el fallback a localhost en producción.
2. Añadir el archivo correcto del hero de Home o cambiar la referencia a una imagen existente.
3. Hacer que slugs inexistentes de guías y comparativas devuelvan 404; aplicar `noindex` a hubs vacíos o retirarlos hasta que tengan contenido.
4. Añadir `Offer` verificable al Product JSON-LD usando precio, moneda, URL y disponibilidad actualizados.

## Alta — siguiente iteración

1. Convertir `/reviews` en comparativa real: tabla de los cinco modelos, “mejor para”, filtros por Wh/W/kg y recomendación por uso.
2. Publicar o retirar de Home los bloques y enlaces de guías/comparativas todavía vacíos.
3. Añadir canonical, description y Open Graph propios a todas las páginas indexables.
4. Revisar la estrategia editorial: eliminar completamente las perspectivas ficticias de contenido/metodología o sustituirlas por autores/revisores reales con bio y credenciales.
5. Añadir fuentes independientes por modelo: manual, pruebas técnicas, garantía/soporte e incidencias contrastadas.
6. Incorporar `image` en Article y `logo` en Organization.

## Media — durante el próximo mes

1. Crear comparaciones F1200 vs F1800 y F3600 Pro vs F7200 para reducir solapamiento.
2. Corregir dimensiones intrínsecas de imágenes y optimizar `caravan.webp`.
3. Eliminar o convertir los cuatro PNG grandes sin uso.
4. Añadir contacto, aviso legal, privacidad y responsable editorial.
5. Configurar cabeceras de seguridad en Next o en el proveedor de hosting.
6. Generar `lastModified` desde cambios reales; ignorar `priority` y `changeFrequency` como señales de ranking.

## Después de publicar

1. Ejecutar PageSpeed Insights móvil/escritorio y comprobar LCP, INP y CLS.
2. Validar las cinco reviews en Rich Results Test y Schema Markup Validator.
3. Enviar sitemap y comprobar canonicals/indexación en Search Console.
4. Revisar cobertura, consultas, CTR y canibalización tras 4–8 semanas.
