# agents/ — Plan de crecimiento SEO, Analytics y Contenidos

> Carpeta de planeamiento para agentes de IA y para el dueño del proyecto.
> Los documentos de aquí COMPLEMENTAN a `AGENTS.md` (reglas de construcción)
> y `CLAUDE.md` (referencia técnica). Ningún documento de esta carpeta
> puede contradecir las reglas absolutas de `AGENTS.md`.

---

## Objetivo general

**Hacer que Jardín Cordillera sea encontrable en Google y recomendable por IA/LLMs**
(Gemini, ChatGPT, Perplexity, AI Overviews de Google), capturando las
conversaciones que hoy se pierden, sin agregar e-commerce: todo lead sigue
cayendo a **WhatsApp**.

---

## Mapa de documentos (orden de lectura)

| Doc | Qué contiene | Para quién |
|---|---|---|
| [`01-auditoria-seo.md`](./01-auditoria-seo.md) | Estado del sitio al momento del análisis: fortalezas, brechas y bugs detectados | Contexto para cualquier agente |
| [`02-plan-seo-tecnico.md`](./02-plan-seo-tecnico.md) | Roadmap priorizado P0–P3 con especificaciones de implementación listas para ejecutar | Agentes que escriben código |
| [`03-analytics-ga4.md`](./03-analytics-ga4.md) | Guía completa de Google Analytics 4 + Search Console (el dueño aún no configura su cuenta Google) | Dueño + agentes |
| [`04-estrategia-contenidos.md`](./04-estrategia-contenidos.md) | Blog data-driven, audiencias (hogar, jardineros, diseñadores int/ext), calendario editorial, sección "Por qué hacer un jardín" | Dueño + agentes + redactor |
| [`05-geo-llm.md`](./05-geo-llm.md) | Cómo lograr que las IA generativas recomienden el vivero (GEO) | Estrategia — leer antes de crear contenidos |
| [`06-google-ads.md`](./06-google-ads.md) | Primera campaña de Google Ads con conversión de WhatsApp (vinculación GA4↔Ads, keywords locales) | Dueño (montar la campaña) |

---

## Estado de implementación (mantener actualizado)

> ⚠️ **Regla de esta carpeta**: cualquier agente que complete o avance una
> tarea de estos planes DEBE actualizar este checklist y la fecha.

Última actualización: **2026-10-26**

### ✅ P0 — Implementado (sesión inicial de SEO/Analytics)

- [x] `src/app/sitemap.js` → `/sitemap.xml` (home + /tienda)
- [x] `src/app/robots.js` → `/robots.txt` (permite todos los crawlers, incl. IA)
- [x] Metadata SEO completa en `src/app/layout.jsx` (metadataBase, canonical, OpenGraph, Twitter card, title template)
- [x] Metadata propia de `/tienda` con canonical
- [x] Datos estructurados JSON-LD: `GardenStore` + `WebSite` (`src/components/seo/JsonLd.jsx`)
- [x] Fuente única de verdad del negocio: `src/data/sitio.js`
- [x] GA4 listo para activar: `src/components/seo/GoogleAnalytics.jsx` (solo falta `NEXT_PUBLIC_GA_ID`)
- [x] Tracking de clicks a WhatsApp: `src/components/seo/WhatsAppTracker.jsx` (evento `click_whatsapp`)
- [x] `public/llms.txt` para crawlers de IA (GEO)
- [x] Favicon corregido (`/logo.ico` — antes apuntaba a `/favicon.ico` inexistente)
- [x] Inconsistencia factual corregida: fundación **1966** en todo el sitio (el timeline decía 1970)
- [x] Bug de datos: guiones suaves invisibles (U+00AD) eliminados de "Cubresuelo" (tienda.js, galeria.js)
- [x] Lint 100% limpio (setState en effect, `<a>` por `<Link>`, `<img>` nativo → `next/image`)

### ⬜ P1 — Próximas tareas de mayor impacto (ver `02`)

- [ ] Páginas de categoría: `/tienda/[categoria]` (4 páginas indexables)
- [ ] Páginas de especie: `/planta/[slug]` (119 páginas long-tail)
- [ ] Google Business Profile (tarea humana — CRÍTICO para local SEO y GEO)
- [ ] Sección landing "Por qué hacer un jardín"
- [x] ~~Definir dominio propio y setear `NEXT_PUBLIC_SITE_URL`~~ → **hecho 2026-10-26**: `https://www.jardincordillera.cl` (env local + Vercel + redeploy)
- [ ] Search Console: verificación + envío de sitemap (ver `03`) — requiere la cuenta Google que el dueño está creando
- [ ] Campaña Google Ads — el dueño la está configurando ahora (guía completa en `06-google-ads.md`; lanzar solo después de activar GA4 en producción)

### ⬜ P2 — Mediano plazo

- [ ] Blog `/blog` (ver `04-estrategia-contenidos.md`)
- [ ] FAQ con `FAQPage` schema
- [ ] Página `/nosotros` y `/contacto` dedicadas
- [ ] Imagen OpenGraph 1200×630 (hoy usa el logo cuadrado)
- [ ] Coordenadas geo en `JsonLd.jsx`

---

## Reglas del proyecto que aplican a TODO lo de esta carpeta

1. **Sin e-commerce real** — sin carrito, sin checkout, sin pasarelas de pago.
   Los precios se muestran y la venta se conversa por WhatsApp.
2. **Sin formularios de contacto** — todo CTA lleva a WhatsApp.
3. **JavaScript/JSX puro, CSS Modules, `next/image` con `fill` + `sizes`**.
4. **Sistema data-driven**: agregar contenido = editar `src/data/*.js`, no tocar componentes.
5. **No hardcodear el número de WhatsApp** — siempre `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER` (helper `getWhatsAppUrl`).
6. **No instalar librerías nuevas** sin instrucción explícita del dueño.
7. Todo dato del negocio (NAP: nombre, dirección, teléfono) debe coincidir con
   `src/data/sitio.js`, el Footer, Contacto y Google Business Profile.
