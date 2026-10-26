# 01 — Auditoría SEO del sitio (estado inicial)

> Análisis realizado el **2026-10-26** sobre el sitio deployado en Vercel
> (repo: `crcordova/jcordillera-landing`).
> Stack: Next.js 16.2.0 (App Router, Turbopack, `src/`), React 19, React Compiler,
> JavaScript puro, CSS Modules. Deploy en Vercel con `@vercel/analytics` activo.

---

## Resumen ejecutivo

**Diagnóstico**: el sitio está técnicamente sano y bien construido (SSR/estático,
rápido, limpio), pero era **invisible para buscadores y para IA generativa**:
no tenía sitemap, robots, datos estructurados, analytics de Google ni una
estrategia de contenido indexable. El catálogo de 119 especies vivía atrapado
en un solo grid client-side filtrable — **cero páginas indexables por planta o
categoría**, que es donde vive el tráfico long-tail de un vivero.

Todo lo marcado como **[CORREGIDO]** se arregló en la sesión de auditoría.

---

## Fortalezas (lo que ya estaba bien)

| Fortaleza | Por qué importa para SEO/GEO |
|---|---|
| Next.js App Router con generación estática | HTML completo en el build → crawlers y LLMs leen todo sin ejecutar JS |
| Textos de calidad (Historia, valores, galería con descripciones educativas) | Contenido único y citable — las IA premian texto original sobre "marketing vacío" |
| Historia real verificable: fundado 1966, 3 generaciones, producción en Ocoa | E-E-A-T (experiencia demostrable) + diferenciador claro vs. revendedores |
| Dirección, horarios y teléfonos consistentes entre Footer y Contacto | Consistencia NAP (Name-Address-Phone) — señal de confianza local |
| `@vercel/analytics` ya activo | Métricas base de tráfico sin configuración |
| Precios visibles por tamaño/bolsa en /tienda | Dato factual citable (las IA citan precios al recomendar) |
| CSS Modules + `next/image` | Core Web Vitals sanos por diseño |

---

## Brechas detectadas y correcciones aplicadas

### Críticas (P0)

| # | Brecha | Impacto | Estado |
|---|---|---|---|
| 1 | Sin `sitemap.xml` | Google descubre páginas más lento y sin prioridades | **[CORREGIDO]** `src/app/sitemap.js` → sirve `/sitemap.xml` |
| 2 | Sin `robots.txt` | Sin directivas ni referencia al sitemap; crawlers de IA (GPTBot, PerplexityBot) sin invitación explícita | **[CORREGIDO]** `src/app/robots.js` |
| 3 | Sin datos estructurados (JSON-LD) | Google no entiende el negocio como entidad (tipo, dirección, horarios); las IA no pueden "citar" datos limpios | **[CORREGIDO]** `GardenStore` + `WebSite` schema en `src/components/seo/JsonLd.jsx` |
| 4 | Sin GA4 / Google tags | Cero medición de adquisición; imposible saber qué genera conversaciones de WhatsApp | **[CORREGIDO scaffold]** `GoogleAnalytics.jsx` + `WhatsAppTracker.jsx` — falta solo crear la cuenta (ver `03-analytics-ga4.md`) |
| 5 | Metadata sin `metadataBase` ni canonical | URLs canónicas sin resolver; riesgo de duplicado www/no-www | **[CORREGIDO]** en `src/app/layout.jsx` + `/tienda` |
| 6 | Favicon roto: metadata apuntaba a `/favicon.ico` pero el archivo es `logo.ico` | 404 + sin branding en pestañas/exports | **[CORREGIDO]** `icons: { icon: '/logo.ico' }` |
| 7 | Inconsistencia factual del año de fundación: Hero "Desde 1966", timeline "1970", CLAUDE.md "70 años" | La inconsistencia de entidad es la anti-señal #1 para SEO y para IA (ver `05-geo-llm.md`) | **[CORREGIDO]** unificado a **1966** (confirmado por el dueño) |

### Estructurales (P1) — las mayores oportunidades de tráfico

| # | Brecha | Impacto |
|---|---|---|
| 8 | **119 especies sin páginas propias**: el catálogo entero se renderiza en `/tienda` como grid client-side filtrable | Se pierde TODO el long-tail: "comprar lavanda santiago", "hortensia chile precio", "trepadoras para pérgola"… Ver spec en `02-plan-seo-tecnico.md` |
| 9 | Sin páginas por categoría (arbustos, árboles, trepadoras, cubresuelos) | Solo 2 URLs indexables en todo el sitio (`/` y `/tienda`) |
| 10 | Sin Google Business Profile configurado | "vivero cerca de mí", Maps y las IA usan el Perfil de Empresa como fuente #1 de recomendación local |
| 11 | Sin contenido educativo/blog | Los viveros compiten por guías ("cómo plantar", "qué trepadora elegir"); hoy el sitio no participa en esas búsquedas |

### Menores (P2)

| # | Detalle | Estado |
|---|---|---|
| 12 | Guiones suaves invisibles (U+00AD) en "Cubresuelo" en `tienda.js` y `galeria.js` (contaminaría keywords, filtros y JSON-LD) | **[CORREGIDO]** eliminados |
| 13 | `<img>` nativo en `Historia.jsx` (violaba la regla 7 de AGENTS.md + warning de LCP) | **[CORREGIDO]** convertido a `next/image` con `fill` + `sizes` y caja `aspect-ratio` |
| 14 | `setState` dentro de `useEffect` en `TiendaClient.jsx` (error de lint React Compiler) + 2 `console.log` de debug en producción | **[CORREGIDO]** inicialización lazy + logs eliminados |
| 15 | `<a href="/">` y `<a href="/tienda">` navegación interna en vez de `next/link` | **[CORREGIDO]** `Link` en TiendaHeader y Hero |
| 16 | Typo "Ver Catalogo" sin tilde en Hero CTA | **[CORREGIDO]** "Ver Catálogo →" |
| 17 | Imagen OpenGraph cuadrada (logo 370×370) en vez de 1200×630 | Pendiente — crear imagen OG dedicada (P2) |
| 18 | Sin coordenadas `geo` en JSON-LD | Pendiente — obtener con clic derecho en Google Maps (P2) |
| 19 | Documentación (`AGENTS.md`/`CLAUDE.md`) desactualizada: decía "16 productos / 6 categorías / app sin `src/`" | **[CORREGIDO]** en la misma sesión |
| 20 | CTA de WhatsApp del Hero comentado en el código | Revisar con el dueño si es intencional (si no lo es, reactivarlo: es el CTA principal de la sección más visible) |

### Pendientes del roadmap original de AGENTS.md

- Fotos reales de productos (`public/images/tienda/`) — siguen siendo placeholder + emoji.
  Las fotos de producto son el multiplier de conversión más grande disponible sin escribir código.
- Páginas `/nosotros` y `/contacto` dedicadas (specs en `02-plan-seo-tecnico.md` P2).

---

## Nota sobre "70 años" vs "60 años"

CLAUDE.md describía el negocio como "más de 70 años", pero el sitio decía
"Desde 1966" (60 años en 2026) y el timeline decía 1970. El dueño confirmó
**1966**. Documentación y sitio quedaron alineados: *fundado en 1966, más de
60 años, tercera generación*.

> ⚠️ Para cualquier texto futuro (blog, Business Profile, redes): usar
> **1966** como único año de fundación. Nunca redondear hacia arriba:
> la consistencia de los hechos es lo que permite que una IA nos recomiende.
