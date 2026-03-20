@AGENTS.md
# CLAUDE.md — Jardín Cordillera

> Instrucciones para Claude Code y agentes de IA trabajando en este proyecto.
> Lee este archivo completo antes de realizar cualquier modificación.

---

## Contexto del proyecto

**Jardín Cordillera** es el sitio web oficial de un vivero familiar con más de 70 años de historia ubicado en Las Condes, Santiago, Chile. El negocio **no tiene e-commerce** — todo el proceso de venta y consulta ocurre por **WhatsApp**. El sitio cumple función de vitrina, portafolio y generador de leads hacia WhatsApp.

### Stack técnico
- **Framework**: Next.js 14 — App Router
- **Lenguaje**: JavaScript (JSX, sin TypeScript)
- **Estilos**: CSS Modules por componente (sin Tailwind, sin styled-components)
- **Imágenes**: `next/image` con `fill` + `sizes` para optimización
- **Fuentes**: Google Fonts — `Playfair Display`, `Lato`, `Cormorant Garamond`
- **Variables de entorno**: prefijadas con `NEXT_PUBLIC_` (ver `.env.local.example`)
- **Sin testing framework** — proyecto en etapa inicial

---

## Comandos esenciales

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo local → http://localhost:3000
npm run build      # build de producción
npm run lint       # linter ESLint
```

---

## Arquitectura de carpetas

```
jardin-cordillera/
├── app/                          # Next.js App Router
│   ├── globals.css               # tokens de diseño + reset global
│   ├── layout.jsx                # root layout con <html>, <body>, metadata
│   ├── page.jsx                  # landing page (/)
│   └── tienda/
│       ├── layout.jsx            # metadata SEO de /tienda
│       └── page.jsx              # página tienda (server component)
│
├── components/
│   ├── Navbar.jsx                # navbar global — reutilizable en todas las páginas
│   ├── Navbar.module.css
│   ├── Footer.jsx                # footer global — reutilizable en todas las páginas
│   ├── Footer.module.css
│   │
│   ├── sections/                 # secciones de la landing page (/)
│   │   ├── Hero.jsx              # hero con parallax y stats
│   │   ├── Historia.jsx          # historia + timeline + valores
│   │   ├── Galeria.jsx           # carrusel de imágenes
│   │   └── Contacto.jsx          # contacto con CTAs de WhatsApp
│   │
│   ├── tienda/                   # componentes exclusivos de /tienda
│   │   ├── TiendaClient.jsx      # orquestador de estado (filtros, vista, búsqueda)
│   │   ├── TiendaHeader.jsx      # hero oscuro de la tienda
│   │   ├── FiltroBar.jsx         # barra sticky de filtros y búsqueda
│   │   ├── ProductGrid.jsx       # layout mosaico
│   │   ├── ProductCard.jsx       # tarjeta individual (vista mosaico)
│   │   └── ProductList.jsx       # tabla compacta (vista lista)
│   │
│   └── ui/
│       └── WhatsAppFloat.jsx     # botón flotante de WhatsApp (presente en todas las páginas)
│
├── data/
│   ├── galeria.js                # datos del carrusel de la landing
│   └── tienda.js                 # catálogo de productos con helpers de precio y WA
│
└── public/
    └── images/
        ├── galeria/              # fotos para el carrusel → galeria.js
        └── tienda/               # fotos de productos → tienda.js
```

---

## Variables de entorno

Todas las variables de entorno están en `.env.local` (gitignored). Consultar `.env.local.example` para la lista completa.

| Variable | Propósito | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WA sin `+` ni espacios | `56987686499` |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | Mensaje default URL-encoded | `Hola%2C%20me...` |
| `NEXT_PUBLIC_EMAIL` | Email de contacto | `contacto@jardincordillera.cl` |
| `NEXT_PUBLIC_PHONE_FIJO` | Teléfono fijo (display) | `+562 2217 8386` |
| `NEXT_PUBLIC_INSTAGRAM` | Usuario IG sin `@` | `jardincordillera` |
| `NEXT_PUBLIC_MAPS_EMBED` | URL del iframe de Google Maps | `https://maps.google.com/...` |
| `NEXT_PUBLIC_MAPS_LINK` | Link directo de Google Maps | `https://maps.google.com/...` |

> **Nunca hardcodear** el número de WhatsApp directamente en los componentes. Siempre usar `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER` con fallback.

---

## Sistema de diseño

### Tokens CSS (definidos en `app/globals.css`)

```css
--verde-profundo:  #2d4a2e   /* color dominante, fondos oscuros */
--verde-musgo:     #4a6741   /* hover states, elementos secundarios */
--verde-salvia:    #7a9e6e   /* acentos verdes, bordes */
--verde-claro:     #a8c49a   /* links sobre fondo oscuro */
--tierra:          #8b6347   /* acentos cálidos */
--tierra-claro:    #c4956a   /* badges, highlights */
--tierra-palido:   #ddb88a   /* hover sobre tierra-claro */
--crema:           #f5f0e8   /* texto sobre fondo oscuro */
--crema-oscuro:    #e8dfd0   /* bordes, separadores */
--blanco-hueso:    #faf7f2   /* background del body */
--texto:           #2c2416   /* texto principal */
--texto-suave:     #6b5e4e   /* texto secundario, descripciones */

--font-serif:   'Playfair Display', Georgia, serif
--font-display: 'Cormorant Garamond', Georgia, serif
--font-sans:    'Lato', 'Helvetica Neue', sans-serif
```

### Clases utilitarias globales (usables en cualquier componente)

```css
.section-tag      /* label de sección: "Nuestra Historia", "Galería"... */
.section-title    /* h2 serif grande */
.section-intro    /* párrafo introductorio claro */
.btn-whatsapp     /* botón verde WhatsApp estándar */
.btn-primary      /* botón verde oscuro */
.reveal           /* elemento que anima al entrar en viewport (requiere JS observer) */
```

### Fuentes tipográficas por uso

| Contexto | Fuente |
|---|---|
| Títulos de sección, nombres de plantas | `var(--font-serif)` — Playfair Display |
| Precios, contadores | `var(--font-serif)` — peso 700 |
| Cuerpo, labels, botones | `var(--font-sans)` — Lato |
| Nombres científicos, subtítulos | `var(--font-display)` — Cormorant Garamond italic |

---

## Patrones de componentes

### Server vs Client components

- Los **page.jsx** son Server Components que pasan datos a hijos Client.
- Todo componente con `useState`, `useEffect` o event handlers lleva `'use client'` al tope.
- Los datos en `data/*.js` se importan en el Server Component y se pasan como props — nunca se llaman desde el cliente directamente en producción.

```jsx
// ✅ Patrón correcto — page.jsx (server)
import { productos } from '@/data/tienda';
import TiendaClient from '@/components/tienda/TiendaClient';

export default function TiendaPage() {
  return <TiendaClient productos={productos} />;
}
```

### CSS Modules

Cada componente tiene su archivo `Nombre.module.css` al lado. Usar `styles.nombreClase`. No escribir estilos inline salvo para valores dinámicos (ej: colores de badges desde datos).

```jsx
// ✅ Correcto
import styles from './MiComponente.module.css';
<div className={styles.card}>

// ✅ Correcto — valor dinámico
<span style={{ background: cat.color, color: cat.textColor }}>

// ❌ Incorrecto — estilos inline estáticos
<div style={{ padding: '1rem', background: '#2d4a2e' }}>
```

### WhatsApp URLs

**Siempre usar el helper `getWhatsAppUrl(producto, variante?)` de `data/tienda.js`** para generar URLs de WhatsApp. No construir las URLs manualmente en los componentes.

```js
import { getWhatsAppUrl } from '@/data/tienda';

// Mensaje genérico del producto
const url = getWhatsAppUrl(producto);
// → "https://wa.me/56987686499?text=Hola%2C%20estoy%20interesado%2Fa%20en%20Lavanda%20%F0%9F%8C%BF"

// Mensaje específico de una variante
const url = getWhatsAppUrl(producto, variante);
// → "...en%20Lavanda%20(B-30%20%C2%B7%20bolsa%2030%20cm)%20%F0%9F%8C%BF"
```

### Scroll reveal animation

Para animar elementos al hacer scroll, agregar la clase `reveal` y registrarlos con un `IntersectionObserver` en `useEffect`:

```jsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  );
  ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}, []);
```

---

## Datos — cómo modificarlos

### Agregar un producto a la tienda (`data/tienda.js`)

```js
{
  id: 'nombre-slug',                     // único, sin espacios ni tildes
  nombre: 'Nombre Visible',
  nombreCientifico: 'Genus species',
  categoria: 'arbusto',                  // key de CATEGORIAS
  descripcion: 'Texto ~80-130 chars.',
  emoji: '🌿',                           // fallback sin imagen
  imagen: '/images/tienda/slug.jpg',     // '' si no hay foto aún
  destacado: false,                      // true → badge + aparece primero
  variantes: [
    { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4900 },
  ],
  whatsappExtra: 'Texto adicional opcional al mensaje WA.',
}
```

### Agregar una categoría nueva (`data/tienda.js`)

```js
export const CATEGORIAS = {
  // ...existentes...
  nueva: { label: 'Nueva Categoría', color: '#f0e8d8', textColor: '#5a3a10' },
};
```

### Agregar una imagen al carrusel (`data/galeria.js`)

```js
{
  id: 7,
  nombre: 'Nueva categoría',
  descripcion: 'Descripción máx ~120 chars.',
  imagen: '/images/galeria/nueva.jpg',
  categoria: 'Nueva',
  emoji: '🌸',
}
```

---

## Páginas existentes

| Ruta | Archivo | Descripción |
|---|---|---|
| `/` | `app/page.jsx` | Landing page — Hero, Historia, Galería, Contacto |
| `/tienda` | `app/tienda/page.jsx` | Catálogo de productos con filtros |

### Crear una nueva página

1. Crear `app/nueva-pagina/page.jsx`
2. Importar `Navbar`, `Footer` y `WhatsAppFloat` (son reutilizables)
3. Agregar el link en `Navbar.jsx` y `Footer.jsx` (array `navLinks`)
4. Si es una página interna (no sección del home), usar `href: '/nueva-pagina'` con `isPage: true` en el Navbar

---

## Imágenes

- Colocar en `public/images/galeria/` o `public/images/tienda/` según corresponda
- Formato recomendado: `.jpg` o `.webp`
- Tamaño recomendado: 800×600 px para galería, 640×480 px para tienda
- Todos los `<Image>` usan `fill` + `sizes` — no usar `width`/`height` fijos
- Siempre hay un emoji como fallback si la imagen no carga o no existe

---

## Lo que NO hacer

- ❌ No usar Tailwind, styled-components ni CSS-in-JS
- ❌ No usar TypeScript — el proyecto es JavaScript puro
- ❌ No hardcodear el número de WhatsApp fuera de `.env.local`
- ❌ No crear formularios de contacto — la política del proyecto es CTA → WhatsApp solamente
- ❌ No agregar dependencias de UI externas (shadcn, MUI, Radix, etc.) sin consultarlo
- ❌ No romper la reutilización de `Navbar` y `Footer` — deben funcionar en cualquier página
- ❌ No usar `<img>` nativo — siempre `next/image`
- ❌ No escribir estilos en `globals.css` que no sean tokens o utilidades globales