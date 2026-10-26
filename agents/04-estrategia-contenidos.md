# 04 — Estrategia de contenidos (blog + secciones)

> Objetivo: convertir el sitio en una fuente consultable de conocimiento de
> jardinería para Chile central, atendiendo a las **4 audiencias reales** del
> vivero. Cada artículo es una puerta de entrada SEO/GEO que termina en un
> CTA de WhatsApp (nunca en un formulario ni checkout — regla de negocio).

---

## Las 4 audiencias (definidas por el dueño)

| Audiencia | Qué busca | Qué les sirve | Tono |
|---|---|---|---|
| **Dueños/as de hogar** | Plantas bonitas, soluciones concretas ("algo que florezca todo el verano", "que no se me muera") | Guías simples, listas "top N", cuidados básicos, qué plantar por estación | Cercano, sin tecnicismos |
| **Jardineros** | Especies específicas, calidad de planta, respaldo del vivero | Fichas técnicas de especie, comparativas (Ej: lavanda francesa vs. inglesa), densidades, temporadas de plantación | Profesional, directo |
| **Diseñadores de interior** | Plantas de interior para proyectos: luz, porte, mantenimiento bajo | Selecciones por condición lumínica y tamaño, plantas esculturales (philodendros, sansevierias, kentias) | Visual, catálogo vivo |
| **Diseñadores de exterior / paisajistas** | Paletas de plantación, arbustos/árboles/trepadoras para proyectos, disponibilidad y precios | Combinaciones por uso (setos, sombra, cobertura vertical), precios por tamaño de bolsa, volumen | Técnico, con datos |

> Principio editorial: **cada artículo parte de una pregunta real** que un
> cliente le haría al vivero por WhatsApp. Si la IA de Google responde esa
> pregunta citándonos, ganamos la recomendación (ver `05-geo-llm.md`).

---

## Arquitectura del blog (data-driven, sin librerías nuevas)

Decisión recomendada: **contenido como datos estructurados en
`src/data/blog.js`** — consistente con el patrón del proyecto (tienda/galería),
cero dependencias, HTML estático server-rendered (perfecto para SEO/GEO).

> Alternativa descartada por ahora: MDX (`@next/mdx`) — requeriría instalar
> dependencias (regla 5 de AGENTS.md pide instrucción explícita del dueño)
> y un flujo de build más complejo, sin ventaja real para ~2-4 artículos/mes.

### Estructura de datos propuesta

```js
// src/data/blog.js
export const articulos = [
  {
    slug: 'trepadoras-para-pergola-santiago',   // kebab-case sin tildes
    titulo: 'Las 8 mejores trepadoras para pérgolas y muros en Santiago',
    descripcion: '...',        // meta description ~150 chars
    categoria: 'guias',        // 'guias' | 'comparativas' | 'estacional' | 'proyectos'
    audiencias: ['hogar', 'disenadores-exterior'],  // claves de AUDIENCIAS
    plantas: ['bougainvillea', 'jazmin-del-cabo', 'ficus-repens'],  // ids reales de tienda.js
    publicado: '2026-11-10',
    autor: 'Familia Estay — Jardín Cordillera',     // E-E-A-T: 60 años cultivando
    // Bloques de contenido — el renderer los convierte en HTML semántico:
    contenido: [
      { tipo: 'intro',  texto: '...' },                    // <p> lead
      { tipo: 'h2',    texto: '...' },                    // <h2>
      { tipo: 'p',     texto: '...' },
      { tipo: 'lista', items: ['...', '...'] },            // <ul>
      { tipo: 'planta', id: 'bougainvillea' },             // card inline de especie (link a /planta/[slug])
      { tipo: 'tabla', encabezados: ['Especie','Floración','Luz'], filas: [[...],[...]], idTabla: 'comparativa' },
      { tipo: 'nota',  texto: '...' },                     // aside con dato citable (GEO)
      { tipo: 'cta',   mensaje: 'Hola, quiero asesoría para elegir trepadoras para mi pérgola' }, // CTA WhatsApp contextual
    ],
  },
];
```

### Rutas y componentes

- `src/app/blog/page.jsx` — índice (tarjetas con título, categoría, audiencia, fecha) + metadata
- `src/app/blog/[slug]/page.jsx` — artículo (generateStaticParams sobre `articulos`, `generateMetadata`, JSON-LD `Article`)
- `src/components/blog/ArticuloBody.jsx` + `.module.css` — renderer de bloques (switch sobre `tipo`)
- `src/components/blog/ArticuloCard.jsx` + `.module.css` — tarjeta del índice
- `src/components/blog/PlantaInline.jsx` — mini-card de especie con `<Link>` a `/planta/[id]` (malla de enlaces internos)

### JSON-LD `Article` (en el layout de `/blog/[slug]`)

```js
{
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: articulo.titulo,
  description: articulo.descripcion,
  datePublished: articulo.publicado,
  author: { '@type': 'Organization', name: 'Jardín Cordillera' },
  publisher: { '@id': `${SITIO_URL}/#negocio` },
  inLanguage: 'es-CL',
}
```

### Reglas del blog

1. `contenido` = array de bloques → nunca HTML crudo en data (mantener data-driven y seguro).
2. Cada artículo DEBE referenciar 2+ plantas reales del catálogo (`plantas`) → links internos a `/planta/[slug]`.
3. Terminar siempre con bloque `cta` con mensaje WhatsApp contextual redactado para ese artículo.
4. `publicado` en el futuro = borrador (el índice y `generateStaticParams` filtran `publicado <= hoy`).
5. Agregar cada artículo al `src/app/sitemap.js` (`priority: 0.6`, `changeFrequency: 'yearly'`).
6. Fotos: `public/images/blog/<slug>-1.jpg` con `next/image` `fill` + `sizes`; bloque `{ tipo: 'imagen', src, alt }`.

---

## Checklist SEO on-page por artículo

- [ ] `slug` corto, con keyword, sin tildes
- [ ] Title ≤ 60 chars · description ≤ 160 chars, ambas con la keyword
- [ ] Un solo `<h1>` = título del artículo; `<h2>` por sección (nunca saltar niveles)
- [ ] Keyword natural en las primeras 100 palabras (sin stuffing)
- [ ] ≥ 2 enlaces internos (plantas del catálogo u otro artículo)
- [ ] ≥ 1 dato factual citable (tabla comparativa, cifra, estacionalidad) — es lo que extraen las IA
- [ ] CTA WhatsApp contextual + firma del autor (Familia Estay / 1966)
- [ ] Alt descriptivo en cada imagen (las IA y Google Images leen `alt`)

---

## Calendario editorial inicial (12 artículos priorizados)

> Prioridad = volumen de búsqueda estimado × relación con catálogo actual.
> Todas las plantas citadas existen en `src/data/tienda.js` (temporada 2025).

| # | Título propuesto | Audiencia | Keyword objetivo | Plantas relacionadas |
|---|---|---|---|---|
| 1 | Las 8 mejores trepadoras para pérgolas y muros en Santiago | Hogar + diseñ. exterior | "trepadoras para pérgola" | bougainvillea, jazmin-del-cabo, ficus-repens, ampelopsis |
| 2 | Lavanda francesa, inglesa o stoechas: cuál elegir para tu jardín | Hogar | "tipos de lavanda" | lavanda-francesa, lavanda-inglesa, lavanda-stoecha |
| 3 | Cómo hacer un seto vivo: arbustos ideales para clima de Santiago | Jardineros + diseñ. exterior | "arbustos para seto" | photinia, ligustro-compacto, laurel-enano, pitosporo-enano |
| 4 | Plantas de interior que sobreviven con poca luz (y purifican) | Diseñ. interior | "plantas interior poca luz" | philodendro-monstera, sansevieria, palmera-kentia, schefflera |
| 5 | Cubresuelos: la alfombra natural que elimina malezas y riego | Hogar + paisajistas | "plantas cubresuelo" | cotula, hipericum, vinca-minor, vitadineas |
| 6 | Hortensias en Chile: suelo, riego y por qué cambian de color | Hogar | "cuidado hortensias" | hortensia, hortensia-quercifolia |
| 7 | Árboles de sombra para jardines pequeños | Hogar | "árboles sombra jardín chico" | acer-japonico, quillay, tulipero |
| 8 | Setos de invierno y otoño: qué plantar fuera de temporada | Jardineros | "plantar en otoño chile" | laurel-flor, abelia-arbustiva |
| 9 | Guía de riego por estación para jardines en Santiago | Todas | "riego plantas verano" | — (educativo) |
| 10 | 6 plantas perfumadas para acercar al living o la terraza | Diseñ. interior + hogar | "plantas aromáticas jardín" | jazmin-helice, sarcococa, rosa-iceberg |
| 11 | Salvia de jardín: comparativa de las 6 que vendemos | Jardineros | "salvia leucantha chile" | salvia-blue, salvia-leucantha, salvia-microphylla-roja, salvia-nemorosa, salvia-love-and-wish |
| 12 | Qué plantas regalar (y cuáles evitar) según la ocasión | Hogar | "plantas para regalar" | cala, violeta-de-persia, zephyrantes |

**Cadencia**: 2 artículos/mes el primer trimestre; evaluar con Search Console
qué formatos ganan impresiones y ajustar (ver `03-analytics-ga4.md` § rutina).

**Fuente de ideas futuras**: preguntas reales de WhatsApp + términos de
búsqueda interna del sitio (ver P2.6 de `02-plan-seo-tecnico.md`) + consultas
en Search Console con impresiones pero sin clicks (oportunidades).

---

## Sección "Por qué hacer un jardín" (landing)

Spec técnica en `02-plan-seo-tecnico.md` § P1.5. Contenido editorial sugerido:

1. **Bienestar comprobable**: jardinear reduce estrés y mejora el ánimo;
   el contacto cotidiano con plantas es pausa mental en la ciudad.
2. **Sombra y clima**: en verano santiaguino, un árbol bien ubicado baja
   varios grados la temperatura del patio y de la casa (menos aire
   acondicionado).
3. **Valor de la propiedad**: un jardín maduro y ordenado es de los pocos
   mejoramientos que se aprecia con los años.
4. **Biodiversidad urbana**: flores de temporada alimentan polinizadores;
   un jardín vivo atrae mariposas y pájaros.
5. **Herencia**: un jardín se planta una vez y se disfruta por generaciones
   — así empezó este vivero en 1966.
6. **Para quién escondemos nada**: atendemos hogares, jardineros y
   diseñadores de interior y exterior — con las mismas plantas y precios
   transparentes.

> Dato de estilo: cifras y afirmaciones deben ser prudentes y sin
> promedios inventados ("reduce el estrés" sí; "reduce el cortisol 37%"
> sin fuente, NO). Ver regla anti-inflado en `05-geo-llm.md`.

---

## Gobernanza editorial

- **Quién escribe**: borradores por agente IA o redactor → **revisión del
  dueño** antes de publicar (los datos agronómicos deben quedar validados
  por el vivero).
- **Dato maestro**: cualquier cifra de historia, fundación (1966), especies
  (119) o categorías (4) sale de `src/data/sitio.js` — no se escribe a mano
  en artículos.
- **Temporalidad**: revisar 1 artículo antiguo/mes (estaciones, precios,
  disponibilidad cambian).
