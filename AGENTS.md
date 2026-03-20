# AGENTS.md — Jardín Cordillera

> Instrucciones para agentes de IA autónomos (Claude Code, Codex, Cursor, etc.)
> operando sobre este repositorio. Leer en conjunto con `CLAUDE.md`.

---

## Misión del proyecto

Sitio web vitrina de un vivero familiar chileno. **No hay e-commerce real** — cada CTA de compra o consulta abre WhatsApp con un mensaje preescrito. El agente debe preservar esta decisión de negocio en cualquier tarea.

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
1. Abrir data/tienda.js
2. Agregar objeto al array `productos` con todos los campos requeridos
3. Colocar imagen en public/images/tienda/<id>.jpg  (si la hay)
4. Si la categoría no existe → agregarla en CATEGORIAS con color y textColor
5. NO tocar ningún componente — el sistema es data-driven
```

### Crear una nueva página

```
1. Crear app/<nombre>/page.jsx  (Server Component)
2. Crear app/<nombre>/layout.jsx  con metadata SEO
3. Importar Navbar, Footer y WhatsAppFloat en page.jsx
4. Si necesita estado → crear components/<nombre>/<Nombre>Client.jsx con 'use client'
5. Agregar link en components/Navbar.jsx → array navLinks → { href: '/<nombre>', label: '...', isPage: true }
6. Agregar link en components/Footer.jsx → array navLinks
7. Crear components/<nombre>/ para componentes específicos de esa página
```

### Agregar una nueva sección a la landing `/`

```
1. Crear components/sections/<NuevaSeccion>.jsx
2. Crear components/sections/<NuevaSeccion>.module.css
3. Importar y agregar en app/page.jsx en el orden correcto
4. Si tiene animaciones scroll → implementar IntersectionObserver en useEffect
5. Agregar link en Navbar y Footer si corresponde
```

### Cambiar colores o tipografía

```
1. Solo modificar variables en app/globals.css (:root)
2. NUNCA cambiar colores hardcodeados en CSS Modules individuales
   (los valores hardcodeados en módulos son excepciones deliberadas)
3. Verificar que el cambio no rompe contraste en fondos oscuros (--verde-profundo)
   ni en fondos claros (--blanco-hueso)
```

### Agregar imagen al carrusel de la galería

```
1. Abrir data/galeria.js
2. Agregar objeto con id único (número), nombre, descripcion, imagen, categoria, emoji
3. Colocar imagen en public/images/galeria/<nombre>.jpg
4. NO tocar Galeria.jsx — es data-driven
```

---

## Anatomía de archivos clave

### `data/tienda.js` — exports que los agentes pueden usar

```js
CATEGORIAS          // objeto con categorías disponibles y sus colores
productos           // array de todos los productos del catálogo
formatPrecio(n)     // formatea número → "$14.500"
getWhatsAppUrl(producto, variante?)  // genera URL de WhatsApp correcta
getProductosByCategoria(cat)         // filtra productos por categoría
getDestacados()                      // retorna solo los destacados
```

### `data/galeria.js` — exports

```js
galeriaItems        // array de items del carrusel
```

### `app/globals.css` — qué hay aquí

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
| Páginas | kebab-case | `app/mi-pagina/page.jsx` |

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
| Tarjeta de producto (sin variante) | `"Hola, estoy interesado/a en {nombre} 🌿"` |
| Fila de precio específico | `"Hola, estoy interesado/a en {nombre} ({tamaño} · {bolsa}) 🌿"` |
| Sección Contacto — Visitar | Mensaje para coordinar visita |
| Sección Contacto — Asesoría | Mensaje para pedir asesoría de jardín |
| Sección Contacto — Pedido | Mensaje para hacer un pedido |
| Botón flotante global | Mensaje genérico de contacto |

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
- [x] `/` — Landing page completa (Hero, Historia, Galería, Contacto)
- [x] `/tienda` — Catálogo con filtros, búsqueda, vista mosaico/lista

### Componentes globales
- [x] `Navbar` — sticky, scroll-aware, mobile menu, link a Tienda
- [x] `Footer` — 4 columnas, links de navegación y contacto
- [x] `WhatsAppFloat` — botón flotante con pulse rings en todas las páginas

### Datos cargados
- [x] 16 productos en 6 categorías en `data/tienda.js`
- [x] 6 items en el carrusel de `data/galeria.js`
- [x] Imágenes: **pendientes** — están las rutas definidas, faltan los archivos `.jpg` reales en `public/images/`

### Pendiente / roadmap sugerido
- [ ] Subir fotos reales a `public/images/galeria/` y `public/images/tienda/`
- [ ] Página `/nosotros` dedicada (separar de la landing)
- [ ] Página `/contacto` dedicada con mapa embebido
- [ ] SEO: `sitemap.xml` y `robots.txt`
- [ ] Dominio + deploy en Vercel
- [ ] Google Analytics / Meta Pixel (si se requiere)

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
```

---

## Variables de entorno para testing local

Crear `.env.local` copiando `.env.local.example` y completar con valores reales:

```bash
cp .env.local.example .env.local
```

Para desarrollo sin valores reales, los componentes tienen fallbacks hardcodeados al número de prueba `56987686499` — los links de WhatsApp funcionarán aunque `.env.local` esté vacío.