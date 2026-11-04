# 02 — Plan SEO técnico (roadmap priorizado)

> Especificaciones listas para ejecutar. Cada tarea indica archivos, pasos y
> criterio de aceptación. **Respetar todas las reglas de `AGENTS.md`** (sin
> TypeScript, sin librerías nuevas, CSS Modules, data-driven, CTA → WhatsApp).
> Al completar una tarea, actualizar el checklist de `agents/README.md`.

Convenciones usadas en este documento:
- Las rutas de código empiezan desde la raíz del repo (ej: `src/app/...`).
- En Next.js 16 **`params` y `searchParams` son Promises** → siempre
  `const { x } = await params;` dentro de `page.jsx` y `generateMetadata`.
- El alias `@/` apunta a `src/` (ver `jsconfig.json`).

---

## ✅ P0 — HECHO (sesión 2026-10-26)

Sitemap, robots, metadata completa, canonical, JSON-LD (`GardenStore` +
`WebSite`), GA4 listo para activar, tracking de WhatsApp, `llms.txt`,
favicon, unificación de datos del negocio en `src/data/sitio.js`.

Detalle de cada archivo creado:

| Archivo | Qué hace |
|---|---|
| `src/data/sitio.js` | Fuente única de verdad del negocio (NAP, horarios, catálogo) + helpers schema.org. **Editar datos aquí, no en los componentes** |
| `src/components/seo/GoogleAnalytics.jsx` | Carga gtag.js solo si `NEXT_PUBLIC_GA_ID` existe |
| `src/components/seo/WhatsAppTracker.jsx` | Evento GA4 `click_whatsapp` por delegación (no requiere tocar otros componentes) |
| `src/components/seo/JsonLd.jsx` | JSON-LD server-rendered |
| `src/app/sitemap.js` | `/sitemap.xml` |
| `src/app/robots.js` | `/robots.txt` |
| `public/llms.txt` | Ficha del negocio para crawlers de IA |

---

## 🔴 P1 — Máximo impacto (hacer en este orden)

### P1.1 — Definir dominio propio ✅ COMPLETADO (2026-10-26)

- Dominio en producción: **https://www.jardincordillera.cl** (conectado en Vercel).
- `NEXT_PUBLIC_SITE_URL` seteado en `.env.local` y en Vercel (Production + Preview).
- Redeploy ejecutado → `/sitemap.xml` sirve URLs con el dominio propio.
- ⚠️ Pendiente humano: verificar en Google Search Console con el prefijo
  `https://www.jardincordillera.cl` (ver `03-analytics-ga4.md`).

### P1.2 — Páginas de categoría `/tienda/[categoria]` (4 URLs indexables) ✅ COMPLETADO (2026-11-01)

**Objetivo**: que "arbustos", "árboles", "trepadoras" y "cubresuelos" sean
páginas reales con texto SEO + catálogo filtrado, en vez de solo un filtro
client-side.

**Archivos nuevos:**
- `src/app/tienda/[categoria]/page.jsx` (Server Component)
- `src/app/tienda/[categoria]/layout.jsx` (metadata dinámica)

**Cambio menor (retrocompatible):** `src/components/tienda/TiendaClient.jsx`
acepta prop opcional `categoriaInicial`:

```jsx
export default function TiendaClient({ productos, categorias, categoriaInicial = 'all' }) {
  const searchParams = useSearchParams();
  const [categoria, setCategoria] = useState(() => {
    const cat = searchParams.get('categoria') || categoriaInicial;
    if (!cat) return 'all';
    const match = Object.entries(categorias).find(
      ([, v]) => v.label.toLowerCase() === cat.toLowerCase()
    );
    return match ? match[0] : 'all';
  });
  // ...resto igual
}
```

**Estructura de `page.jsx`:**

```jsx
import { productos, CATEGORIAS } from '@/data/tienda';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import TiendaClient from '@/components/tienda/TiendaClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return Object.keys(CATEGORIAS)
    .filter((k) => k !== 'all')
    .map((categoria) => ({ categoria }));
}

export async function generateMetadata({ params }) {
  const { categoria } = await params; // Next 16: params es Promise
  const cat = CATEGORIAS[categoria];
  if (!cat) return {};
  return {
    title: `${cat.label} · Venta en vivero Las Condes`,
    description: `${cat.label} cultivados por Jardín Cordillera (vivero productor desde 1966): especies, precios por tamaño y asesoría por WhatsApp. Retiro en Las Condes, Santiago.`,
    alternates: { canonical: `/tienda/${categoria}` },
  };
}

export default async function CategoriaPage({ params }) {
  const { categoria } = await params;
  if (!CATEGORIAS[categoria]) notFound();
  return (
    <>
      <Navbar />
      <main>
        {/* Bloque de texto SEO propio de la categoría (H1 + intro ~80 palabras) */}
        <TiendaClient
          productos={productos.filter((p) => p.categoria === categoria)}
          categorias={CATEGORIAS}
          categoriaInicial={categoria}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
```

**Bloque de texto SEO por categoría** (crear componente
`src/components/tienda/CategoriaIntro.jsx` + su `.module.css`): H1 visible
(`Arbustos para jardín en Santiago`), párrafo con keywords naturales y CTA a
WhatsApp usando el patrón de mensajes de AGENTS.md. NO usar textos genéricos:
cada categoría necesita contenido único (ver ideas en `04-estrategia-contenidos.md`).

**Mantención de datos:** agregar `descripcionSeo` (1-2 frases) a cada categoría
en `CATEGORIAS` de `src/data/tienda.js` para que las intros sean data-driven.

**Sitemap:** agregar entradas en `src/app/sitemap.js`:

```js
Object.keys(CATEGORIAS).filter((k) => k !== 'all').map((k) => ({
  url: `${SITIO_URL}/tienda/${k}`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.8,
}))
```

**Navbar/Footer:** agregar links a las 4 categorías en el array `navLinks`
(menú "Plantas" desplegable o columna del Footer). Respetar regla 3 de
AGENTS.md — probar en desktop y mobile.

**Criterio de aceptación:** build limpio, `/tienda/arbustos` sirve HTML estático
con H1 y metadata únicos, aparece en `/sitemap.xml`, filtros y búsqueda
funcionan igual que en `/tienda`.

---

### P1.3 — Páginas de especie `/planta/[slug]` (119 URLs long-tail) 🚀

**Estado:** especificación detallada preparada; implementación pendiente.

**Objetivo:** convertir cada especie aprobada del catálogo en una página estática
que responda búsquedas específicas (nombre común, nombre científico, atributos y
precio) y lleve a una consulta por WhatsApp. No se agrega e-commerce.

**Plan detallado:** [`agents/07-p1.3-especies.md`](./07-p1.3-especies.md).
Incluye la extracción revisable desde `catalogo-plantas.html`, modelo JSON con
atributos variables, almacenamiento de imágenes en R2, controles de exposición
y costo, rutas estables, enlaces desde las tarjetas, SEO, disponibilidad y QA.

**Decisiones técnicas base:**
- `catalogo-plantas.html` es la entrada de la migración. El agente normalizador
  genera un JSON candidato y un informe de diferencias; el dueño aprueba los
  datos antes de reemplazar la fuente actual del catálogo.
- La ficha guarda `atributos` como una lista genérica de nombre/valor. No se
  obligan todas las especies a tener el mismo esquema agronómico.
- Los IDs actuales de `src/data/tienda.js` se conservan como slugs siempre que
  correspondan a la misma especie. El slug es estable y no depende de la categoría.
- Las imágenes viven en un bucket R2 dedicado a medios públicos, servido por
  dominio propio de Cloudflare y con caché. El catálogo JSON no se hace público
  a través del bucket de imágenes.
- La foto, el nombre y la descripción de cada tarjeta llevan a la ficha; las
  filas de variantes y los CTA explícitos siguen abriendo WhatsApp.
- `/tienda/[categoria]` envía al cliente solo los productos de esa categoría;
  `/tienda` mantiene el catálogo completo para la búsqueda global.

**Criterio de aceptación resumido:** build estático de las especies publicadas,
metadata y canonical únicos, sitemap sin retiradas, rutas antiguas preservadas o
redirigidas, navegación accesible sin enlaces anidados, fotos servidas desde R2,
atributos variables renderizados sin inventar información y CTAs de WhatsApp
correctos en listado y ficha.

---

### P1.4 — Google Business Profile (tarea humana — CRÍTICO)

Es la fuente #1 que usan Google Maps, el panel local de búsqueda y las IA
para recomendar negocios. Sin esto, el SEO local no arranca.

Checklist para el dueño:
1. Crear/claimar el perfil en https://business.google.com con la cuenta Google
   (la misma que se usará para GA4 — ver `03-analytics-ga4.md`).
2. Completar con EXACTAMENTE los mismos datos de `src/data/sitio.js`:
   - Nombre: **Jardín Cordillera**
   - Categoría: **Vivero de plantas** (agregar "Tienda de jardinería" como secundaria)
   - Dirección: Camino La Posada 11.900, Las Condes
   - Horarios: Lun–Jue 9:00–18:00 · Vie 9:00–17:00 · Sáb 9:00–14:00
   - Teléfono: el de WhatsApp + fijo
   - Website: el dominio propio (P1.1)
   - Descripción: vivero productor familiar desde 1966, producción en Ocoa
3. Subir 10+ fotos reales del vivero (mismo material que `public/images/`).
4. Pedir reseñas a clientes históricos (las reseñas son la señal de confianza
   que citan las IA).
5. Publicar 1 post/semana en el perfil (novedades de temporada).

**Validación**: buscar "vivero Las Condes" en Google Maps incógnito.

---

### P1.5 — Sección landing "Por qué hacer un jardín"

El dueño quiere destacar **lo importante de hacer un jardín** y atender a
audiencias profesionales (jardineros, diseñadores de interior/exterior), no
solo dueñas de hogar.

**Spec:** sección `src/components/sections/Beneficios.jsx` + `.module.css`,
misma estructura que `Historia.jsx` (array de datos inline + IntersectionObserver
con `.reveal`, clases globales `.section-tag`/`.section-title`/`.section-intro`).
Insertar en `src/app/page.jsx` **entre Galeria e Historia**.

Contenido propuesto (4-6 tarjetas de beneficio + 1 bloque "para quién"):
- **Bienestar**: reducir estrés, aire más limpio, sombra natural en verano.
- **Valor: un jardín maduro agrega valor a la propiedad** (dato citable —
  GEO).
- **Clima**: la vegetación modera temperatura y ruido en ciudades como Santiago.
- **Biodiversidad**: atraer polinizadores (mariposas, abejas) con especies nativas/florales.
- **Para quién**: hogares · jardineros y paisajistas (venta por especie con
  respaldo de vivero productor) · diseñadores de interior (plantas de interior:
  philodendros, sansevierias, kentias) · diseñadores de exterior (arbustos,
  árboles y trepadoras para proyectos).
- CTA final de sección: asesoría por WhatsApp (mensaje de asesoría ya definido
  en `Contacto.jsx`: `WA_CONSULT`).

**Criterio de aceptación:** contenido único (no reutilizar texto de Historia),
móvil ok, animaciones `.reveal` funcionando, sin estilos inline estáticos.

---

## 🟡 P2 — Mediano plazo

### P2.1 — Blog `/blog` (specs completas en `04-estrategia-contenidos.md`)
Arquitectura data-driven con `src/data/blog.js`, cero dependencias nuevas.

### P2.2 — FAQ + `FAQPage` schema
Sección o página con 6-10 preguntas reales que atienden en WhatsApp
(horario, despacho, venta mayorista, garantía de plantas, temporada).
JSON-LD `FAQPage` desde `src/data/` — es de los formatos que las IA citan
más al responder preguntas. Recolectar preguntas reales de las conversaciones
de WhatsApp del negocio.

### P2.3 — `/nosotros` y `/contacto` dedicadas
- `/nosotros`: expandir Historia (timeline completo, foto del fundador,
  historia de Ocoa) — E-E-A-T para GEO. Redirect suave: mantener la sección
  en la landing y que la página aprofunde.
- `/contacto`: mapa embebido (usar `NEXT_PUBLIC_MAPS_EMBED`), NAP visible como
  texto (no solo imagen/mapa — las IA leen texto), horarios, CTAs WhatsApp.
- Ambas: metadata + canonical + sitemap + navLinks en Navbar y Footer.

### P2.4 — Imagen OpenGraph 1200×630
Crear `/images/og-default.jpg` (1200×630, logo + "Vivero productor desde
1966 · Las Condes") y cambiar `openGraph.images` y `twitter.images` en
`src/app/layout.jsx`. Ideal también un favicon `.svg`/`.png` moderno.

### P2.5 — Coordenadas geo en JSON-LD
En Google Maps: clic derecho sobre el vivero → copiar coordenadas → agregar
a `src/data/sitio.js` como `geo: { lat: -33.xx, lng: -70.xx }` y consumirla
en `JsonLd.jsx` (`'@type': 'GeoCoordinates'`). Mejora coincidencia con
Google Business Profile.

### P2.6 — Búsqueda interna trackeada
`FiltroBar` puede emitir `gtag('event', 'search', { search_term })` con el
mismo patrón de delegación de `WhatsAppTracker.jsx` (listener `onSearch`
prop). Es la fuente #1 de ideas de contenido (ver `04`).

---

## 🟢 P3 — Mantenimiento continuo

- **Core Web Vitals**: auditar con PageSpeed Insights tras cada depósito de
  imágenes nuevas; comprimir a `.webp` antes de subir.
- **Fotos de productos**: la tarea humana de mayor conversión pendiente
  (placeholder emoji hoy). Formato: 640×480, `.jpg`/`.webp`, mismo nombre
  que el `id` del producto.
- **Temporada**: `tienda.js` dice "Temporada 2025" — actualizar el header de
  TiendaHeader y textos al cambiar de temporada (dato visible + citable).
- **Audit trimestral**: releer `01-auditoria-seo.md`, re-correr
  `npm run build && npm run lint`, y verificar en Search Console
  (cobertura de indexación + consultas que ganan impresiones).
