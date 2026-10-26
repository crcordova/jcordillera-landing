# 05 — GEO: que una IA (Google/Gemini/ChatGPT/Perplexity) nos recomiende

> **GEO** = *Generative Engine Optimization* — la evolución del SEO para la
> era de las respuestas generadas por IA (AI Overviews de Google, Gemini,
> ChatGPT, Perplexity). El objetivo declarado del dueño: **"que un LLM como
> Google nos recomiende"**.

---

## Cómo una IA elige a quién recomendar

Cuando alguien pregunta *"¿qué vivero me recomiendan en Las Condes?"*,
el motor generativo:

1. **Recupera** (retrieval) un puñado de candidatos desde su índice:
   Google Maps/Business Profile, páginas con datos estructurados, guías,
   reseñas, directorios.
2. **Evalúa** consistencia de la entidad: ¿el nombre, dirección, teléfono y
   hechos (desde 1966, vivero productor) dicen lo mismo en todas las fuentes?
3. **Cita** 3-6 fuentes en la respuesta: premia datos concretos, listas,
   tablas y texto claro por sobre marketing genérico.

⇒ Nuestras palancas: **(a) ser recuperable** (indexable + Business Profile),
**(b) ser consistentes** (NAP + hechos idénticos en todos lados) y
**(c) ser citables** (datos duros y guías útiles).

---

## Los 7 pilares GEO — estado y acciones

| # | Pilar | Estado | Qué falta |
|---|---|---|---|
| 1 | **Consistencia de entidad (NAP + hechos)** | ✅ Sitio unificado: fundación 1966, dirección, horarios, 119 especies — fuente única en `src/data/sitio.js` | Replicar EXACTO en Business Profile, Instagram, respuestas de WhatsApp |
| 2 | **Datos estructurados (JSON-LD)** | ✅ `GardenStore` + `WebSite` server-rendered | P2: `geo` + `FAQPage` + opcional `Product` (ver `02`) |
| 3 | **llms.txt** | ✅ `public/llms.txt` — ficha factual del negocio para crawlers de IA (robots.txt permite todos) | Mantener al día con catálogo/temporada |
| 4 | **Google Business Profile** | ⬜ **CRÍTICO — tarea humana** | Crearlo (spec completa en `02` § P1.4). Es la fuente #1 que citan Maps y las IA |
| 5 | **Contenido citable** | ✅ Precios visibles en /tienda (dato raro y valioso en viveros) | Blog con tablas/listas/datos (ver `04`) + fichas de especie |
| 6 | **Preguntas respondidas (FAQ)** | ⬜ | Sección FAQ + `FAQPage` schema (P2.2) — formato de los que más citan las IA |
| 7 | **Señales externas** | ⬜ | Reseñas Google (pedir a clientes históricos), Instagram activo con link al sitio, menciones en notas/guías de jardinería local |

---

## Qué ya hicimos que las IA valoran

- Texto original y verificable (historia familiar desde 1966, producción en Ocoa).
- Horarios/dirección como texto HTML (no solo dentro de un mapa iframe).
- Precios por tamaño de bolsa publicados — cuando una IA recomienda, cita precios.
- robots.txt sin bloqueos: GPTBot, PerplexityBot, ClaudeBot y Google-Extended
  pueden leer el sitio completo.
- HTML estático en el build (nada de contenido que solo existe tras ejecutar JS).

---

## Rutina de verificación (mensual, 10 min, registrar resultados)

Hacer estas preguntas en **modo incógnito / cuenta nueva** y anotar si
aparecemos y con qué cita:

| Prompt de prueba | Dónde | Resultado esperado a 3-6 meses |
|---|---|---|
| "Recomiéndame un vivero en Las Condes, Santiago" | Google (AI Overview), Gemini, ChatGPT, Perplexity | Cita a Jardín Cordillera con dirección u horario (schema) |
| "¿Dónde compro lavanda en Santiago?" | Perplexity / Google | Cita `/planta/lavanda-francesa` o `/tienda` (precio) |
| "Vivero productor cerca de mí" (desde Santiago) | Google Maps / Gemini | Panel del Business Profile |
| "¿Qué trepadora uso para cubrir una pérgola?" | IA cualquiera | Cita el artículo del blog #1 del calendario |
| "vivero camino la posada" | Google | Serp local con horarios (Business Profile) |

> Crear tabla de registro en `agents/` (o Notion) con: fecha, motor, prompt,
> ¿aparecimos?, ¿qué citaron? El delta mes a mes es el KPI del plan GEO.

---

## KPIs del plan (revisar trimestral)

1. **GEO**: apariciones en respuestas de IA (rutina de arriba) — objetivo: citados en ≥ 2 de 4 motores a los 6 meses.
2. **SEO**: impresiones y clicks en Search Console — objetivo: ×5 impresiones a los 6 meses de publicar las páginas P1.
3. **Negocio**: eventos `click_whatsapp` en GA4 por semana, y % desde `/planta/*` y `/blog/*` (contenido → conversación).
4. **Local**: llamadas/direcciones desde el Business Profile (aparece en su panel).

---

## Anti-patrones (lo que NO hay que hacer)

- ❌ **Inventar o inflar datos** ("reduce el estrés un 40%") — las IA desconfían de fuentes inconsistentes; una mentira detectada descalifica la recomendación.
- ❌ **Cambiar los hechos entre fuentes** (1966 en el sitio, 1970 en Instagram) — matamos este bug; que no reaparezca.
- ❌ **Texto autogenerado masivo** sin revisión del vivero — los datos agronómicos (riego, luz, floración) los valida el dueño.
- ❌ **Keyword stuffing / listas de ciudades artificiales** — penalización clásica que además contagia la confianza de la IA.
- ❌ **Bloquear crawlers de IA en robots.txt** (algunos sitios lo hacen para proteger contenido) — para nosotros es al revés: queremos ser recuperables.
- ❌ **Duplicar** descripciones de categorías/plantas entre páginas — cada página necesita texto único mínimo (~80+ palabras propias).

---

## Hoja de ruta resumida (todo GEO)

```
YA      → JSON-LD + llms.txt + consistencia interna + robots abierto + GA4
P1      → Business Profile + dominio propio + páginas de especie/categoría
        (119 fichas = materia prima que citan las IA)
P2      → blog (guías citables) + FAQ schema + reseñas Google
CONTINUO→ verificación mensual de prompts + registro + ajuste de calendario
```
