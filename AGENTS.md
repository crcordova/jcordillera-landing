# AGENTS.md — Jardín Cordillera

> Instrucciones para agentes de IA autónomos (Claude Code, Codex, Cursor, etc.)
> operando sobre este repositorio. Leer en conjunto con `CLAUDE.md`.

---

## Misión del proyecto

Sitio web vitrina de un vivero familiar chileno. **No hay e-commerce real** — cada CTA de compra o consulta abre WhatsApp con un mensaje preescrito. El agente debe preservar esta decisión de negocio en cualquier tarea.

**Datos del negocio** (NAP + hechos — única versión válida): vivero productor **fundado en 1966** por la familia Estay, producción en Ocoa, venta en Camino La Posada 11.900, Las Condes, Santiago. La fuente de verdad es `src/data/sitio.js` — cualquier dato en un componente o artículo debe salir de ahí (consistencia = SEO + recomendación por IA, ver `agents/05-geo-llm.md`).

---

## Reglas absolutas (nunca violar)

| # | Regla |
|---|---|
| 1 | **No agregar e-commerce real** — sin Stripe, sin carrito, sin checkout |
| 2 | **No hardcodear el número de WhatsApp** — usar siempre `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER` |
| 3 | **No romper Navbar ni Footer** — son componentes compartidos que se usan en todas las páginas |
| 4 | **No introducir TypeScript** — el proyecto es JavaScript (JSX) puro |
| 5 | **No instalar librerías de UI** (Tailwind, MUI, shadcn, etc.) sin instrucción explícita |
| 6 | **No crear formularios de contacto** — la política es CTA → WhatsApp exclusivamente |
| 7 | **No usar `<img>` nativo** — siempre `next/image` con `fill` + `sizes` |
| 8 | **No escribir estilos inline estáticos** — usar CSS Modules. Solo inline para valores dinámicos |

---

## Árbol de decisión para tareas comunes

### Agregar un producto al catálogo

```
1. Abrir src/data/tienda.js
2. Agregar objeto al array `productos` con todos los campos requeridos
3. Colocar imagen en public/images/tienda/<id>.jpg  (si la hay)
4. Si la categoría no existe → agregarla en CATEGORIAS con color y textColor
5. NO tocar ningún componente — el sistema es data-driven
```

### Crear una nueva página

```
1. Crear src/app/<nombre>/page.jsx  (Server Component)
2. Crear src/app/<nombre>/layout.jsx  con metadata SEO
3. Importar Navbar, Footer y WhatsAppFloat en page.jsx
4. Si necesita estado → crear src/components/<nombre>/<Nombre>Client.jsx con 'use client'
5. Agregar link en src/components/Navbar.jsx → array navLinks → { href: '/<nombre>', label: '...', isPage: true }
6. Agregar link en src/components/Footer.jsx → array navLinks
7. Crear src/components/<nombre>/ para componentes específicos de esa página
8. Agregar la URL en src/app/sitemap.js (toda página pública debe estar en el sitemap)
```

### Agregar una nueva sección a la landing `/`

```
1. Crear src/components/sections/<NuevaSeccion>.jsx
2. Crear src/components/sections/<NuevaSeccion>.module.css
3. Importar y agregar en src/app/page.jsx en el orden correcto
4. Si tiene animaciones scroll → implementar IntersectionObserver en useEffect
5. Agregar link en Navbar y Footer si corresponde
```

### Cambiar colores o tipografía

```
1. Solo modificar variables en src/app/globals.css (:root)
2. NUNCA cambiar colores hardcodeados en CSS Modules individuales
   (los valores hardcodeados en módulos son excepciones deliberadas)
3. Verificar que el cambio no rompe contraste en fondos oscuros (--verde-profundo)
   ni en fondos claros (--blanco-hueso)
```

### Agregar imagen al carrusel de la galería

```
1. Abrir src/data/galeria.js
2. Agregar objeto con id único (número), nombre, descripcion, imagen, categoria, emoji
3. Colocar imagen en public/images/galeria/<nombre>.jpg
4. NO tocar Galeria.jsx — es data-driven
```

---

## Anatomía de archivos clave

### `src/data/sitio.js` — fuente única de verdad del NEGOCIO (SEO)

```js
SITIO_URL             // URL pública del sitio (env NEXT_PUBLIC_SITE_URL)
NEGOCIO               // nombre, fundado (1966), dirección, horarios, contacto, catálogo
DESCRIPCION_SEO       // meta description principal
KEYWORDS              // keywords objetivo
horariosSchema()      // horarios en formato schema.org
direccionSchema()     // dirección en formato schema.org
redesSociales()       // links oficiales (sameAs)
```

Lo consumen `src/app/layout.jsx` (metadata), `src/app/sitemap.js`,
`src/app/robots.js` y `src/components/seo/JsonLd.jsx`. **Cambiar un dato del
negocio = editarlo aquí** (y en Footer/Contacto para display).

### `src/data/tienda.js` — exports que los agentes pueden usar

```js
CATEGORIAS          // objeto con categorías disponibles y sus colores
productos           // array de todos los productos del catálogo
formatPrecio(n)     // formatea número → "$14.500"
getWhatsAppUrl(producto, variante?)  // genera URL de WhatsApp correcta
getProductosByCategoria(cat)         // filtra productos por categoría
getDestacados()                      // retorna solo los destacados
```

### `src/data/galeria.js` — exports

```js
galeriaItems        // array de items del carrusel
```

### `src/components/seo/` — componentes SEO/analytics (en el layout raíz)

```js
GoogleAnalytics.jsx  // carga GA4 solo si NEXT_PUBLIC_GA_ID existe (gtag.js vía next/script)
WhatsAppTracker.jsx  // evento GA4 'click_whatsapp' por delegación — NO requiere tocar otros componentes
JsonLd.jsx           // JSON-LD server-rendered (GardenStore + WebSite) — datos desde src/data/sitio.js
```

### `src/app/globals.css` — qué hay aquí

- Variables CSS (tokens de diseño)
- Reset básico
- Clases utilitarias globales: `.section-tag`, `.section-title`, `.section-intro`, `.btn-whatsapp`, `.btn-primary`, `.reveal`, `.ornament`
- Keyframes de animación globales: `fadeUp`, `fadeIn`, `sway`, `pulse-ring`, `slideIn`

---

## Convenciones de nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Archivos de componentes | PascalCase | `ProductCard.jsx` |
| Archivos de estilos | `Nombre.module.css` | `ProductCard.module.css` |
| Clases CSS | camelCase | `.cardWrapper`, `.imgPanel` |
| IDs de productos | kebab-case sin tildes | `abelia-enana`, `jazmin-trepador` |
| Variables de entorno | `NEXT_PUBLIC_SCREAMING_SNAKE` | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Páginas | kebab-case | `src/app/mi-pagina/page.jsx` |

---

## Estructura de un componente nuevo (plantilla)

```jsx
// Si necesita estado o efectos → agregar 'use client'
'use client';

import { useState } from 'react';
import styles from './MiComponente.module.css';

export default function MiComponente({ prop1, prop2 }) {
  return (
    <section className={styles.section}>
      {/* contenido */}
    </section>
  );
}
```

```css
/* MiComponente.module.css */
.section {
  padding: 5rem 0;
  background: var(--blanco-hueso);  /* siempre usar tokens */
}
```

---

## Flujo de WhatsApp — cómo funciona

Todo CTA del sitio abre WhatsApp con un mensaje contextual. La URL siempre sigue este patrón:

```
https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}?text={mensaje URL-encoded}
```

**Mensajes por contexto:**

| Contexto | Mensaje generado |
|---|---|
| Navbar / hero | Mensaje genérico de bienvenida |
| Tarjeta de producto (sin variante) | `"Hola, me interesa {nombre}"` (+ `. {whatsappExtra}` si existe) |
| Fila de precio específico | `"Hola, me interesa {nombre} ({tamaño} · {bolsa})"` |
| Sección Contacto — Visitar | Mensaje para coordinar visita |
| Sección Contacto — Asesoría | Mensaje para pedir asesoría de jardín |
| Sección Contacto — Pedido | Mensaje para hacer un pedido |
| Botón flotante global | Mensaje genérico de contacto |

**Tracking**: todos los clicks en links `wa.me` quedan medidos automáticamente
en GA4 (evento `click_whatsapp`) vía `WhatsAppTracker.jsx` — al agregar un CTA
nuevo no hay que hacer nada extra.

**Para construir una nueva URL de WhatsApp**, importar y usar el helper:

```js
import { getWhatsAppUrl } from '@/data/tienda';
// o para mensajes propios:
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56987686499';
const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Mi mensaje 🌿')}`;
```

---

## Estado actual del proyecto

### Páginas implementadas
- [x] `/` — Landing page completa (Hero, Galería, Historia, Contacto)
- [x] `/tienda` — Catálogo con filtros, búsqueda, vista mosaico/lista
- [x] `/sitemap.xml` y `/robots.txt` — generados vía `src/app/sitemap.js` y `src/app/robots.js`

### Componentes globales
- [x] `Navbar` — sticky, scroll-aware, mobile menu, link a Tienda
- [x] `Footer` — 4 columnas, links de navegación y contacto
- [x] `WhatsAppFloat` — botón flotante con pulse rings en todas las páginas
- [x] `seo/GoogleAnalytics` + `seo/WhatsAppTracker` + `seo/JsonLd` — activos en el layout raíz

### Datos cargados
- [x] 119 especies / 161 variantes en 4 categorías (arbusto, arbol, trepadora, cubresuelo) en `src/data/tienda.js` — temporada 2025
- [x] 4 items en el carrusel de `src/data/galeria.js`
- [x] Datos del negocio centralizados en `src/data/sitio.js` (NAP, horarios, fundación 1966)
- [x] Imágenes de galería y logo cargadas; fotos de productos **pendientes** (hay emoji de respaldo)

### SEO / Analytics (implementado 2026-10-26)
- [x] Metadata completa (metadataBase, canonical, OpenGraph, Twitter card) en layout raíz y /tienda
- [x] JSON-LD: `GardenStore` + `WebSite` (`src/components/seo/JsonLd.jsx`)
- [x] GA4 activo en producción — `NEXT_PUBLIC_GA_ID=G-6XJB1J5EQR` (seteado en Vercel 2026-10-26)
- [x] Evento `click_whatsapp` en GA4 para todos los CTAs de WhatsApp
- [x] `public/llms.txt` para crawlers de IA

### Pendiente / roadmap (specs detalladas en `agents/`)
- [x] ~~Definir dominio propio → `NEXT_PUBLIC_SITE_URL` en Vercel~~ → **hecho 2026-10-26**: `https://www.jardincordillera.cl` (env local + Vercel + redeploy)
- [ ] Páginas de categoría `/tienda/[categoria]` y de especie `/planta/[slug]` (P1.2 / P1.3)
- [ ] Google Business Profile (P1.4 — tarea humana crítica)
- [ ] Sección landing "Por qué hacer un jardín" (P1.5)
- [ ] Blog `/blog` data-driven (arquitectura y calendario en `agents/04`)
- [ ] Subir fotos reales a `public/images/tienda/`
- [ ] Páginas `/nosotros` y `/contacto` dedicadas
- [ ] FAQ + `FAQPage` schema · imagen OG 1200×630 · coordenadas geo

---

## Documentación de planes — carpeta `agents/`

Todo el roadmap de SEO, analytics, contenidos y optimización para IA/LLMs
(GEO) está documentado en la carpeta `agents/`:

```
agents/
├── README.md                  ← índice + checklist de estado (mantener actualizado)
├── 01-auditoria-seo.md        ← diagnóstico del sitio (brechas y correcciones)
├── 02-plan-seo-tecnico.md     ← roadmap P0–P3 con specs listas para implementar
├── 03-analytics-ga4.md        ← guía de activación de GA4 + Search Console
├── 04-estrategia-contenidos.md ← blog, audiencias y calendario editorial
├── 05-geo-llm.md              ← cómo lograr que las IA recomienden el vivero
└── 06-google-ads.md           ← primera campaña de Ads + conversión de WhatsApp
```

**Regla**: antes de implementar una tarea del roadmap, leer el doc
correspondiente; al completarla, actualizar el checklist de
`agents/README.md`.

---

## Cómo verificar que nada está roto

```bash
# 1. Build limpio (detecta errores de compilación)
npm run build

# 2. Linter
npm run lint

# 3. Revisión manual mínima
# - / carga con Navbar y todas las secciones
# - /tienda carga, filtra por categoría, busca, cambia vista
# - Todos los botones de WhatsApp abren wa.me con el mensaje correcto
# - Botón flotante de WhatsApp aparece en ambas páginas
# - Navbar y Footer muestran "Tienda" como link
# - /sitemap.xml y /robots.txt responden (y sitemap incluye todas las páginas públicas)
# - Ver código fuente del home: aparece application/ld+json (GardenStore)
```

---

## Variables de entorno para testing local

Crear `.env.local` copiando `.env.local.example` y completar con valores reales:

```bash
cp .env.local.example .env.local
```

Para desarrollo sin valores reales, los componentes tienen fallbacks hardcodeados al número de prueba `56987686499` — los links de WhatsApp funcionarán aunque `.env.local` esté vacío.