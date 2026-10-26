# 03 — Google Analytics 4 + Search Console (guía de activación)

> **Estado**: el código ya está listo y deployado en espera de tu cuenta.
> No hay nada más que programar: activar es 100% configuración en webs de
> Google + variables de entorno en Vercel. Esta guía asume que todavía
> **no tienes la cuenta Google configurada**.

---

## Qué hay implementado (no tocar código)

| Archivo | Comportamiento |
|---|---|
| `src/components/seo/GoogleAnalytics.jsx` | Carga el tag de GA4 **solo si** `NEXT_PUBLIC_GA_ID` está definido. Sin la variable, no renderiza nada |
| `src/components/seo/WhatsAppTracker.jsx` | Captura **todos** los clicks en links `wa.me` del sitio (Navbar, Footer, tarjetas de producto, botón flotante) y emite el evento `click_whatsapp` |
| `@vercel/analytics` | Ya venía activo — da métricas básicas de visitas sin configurar nada |

**Por qué GA4 además de Vercel Analytics**: Vercel muestra visitas y páginas
vistas, pero GA4 permite eventos personalizados (nuestras conversaciones de
WhatsApp), audiencias, Search Console y retargeting futuro.

### El evento `click_whatsapp` (tu métrica de conversión real)

El negocio no tiene e-commerce: la conversión real es la **conversación
iniciada por WhatsApp**. Cada click en cualquier CTA de WhatsApp emite:

| Campo GA4 | Contenido | Ejemplo |
|---|---|---|
| `link_text` | Texto del botón | "Escríbenos por WhatsApp" |
| `whatsapp_message` | Mensaje preescrito (incluye la planta consultada) | "Hola, me interesa Lavanda Francesa (B-22 · bolsa 22 cm)" |
| `page_location` | URL donde se clickeó | `/tienda` |

Esto permite responder: **¿qué plantas generan más consultas? ¿Desde qué
página? ¿Qué botones funcionan?**

---

## Paso a paso — Activar GA4 (~20 minutos)

### 1. Crear la cuenta y la propiedad

1. Ve a https://analytics.google.com con tu cuenta Google.
2. Si es tu primera vez: clic **"Empezar a medir"** → nombre de cuenta
   (ej: "Jardín Cordillera") → Crear.
3. Crear **Propiedad**: nombre "Jardín Cordillera — Web".
   - Zona horaria: **Chile (America/Santiago)**
   - Moneda: **CLP (peso chileno)**
4. Crear **Flujo de datos** → **Web**:
   - URL del sitio: `https://www.jardincordillera.cl` (dominio ya en producción).
   - Nombre del flujo: "Sitio Jardín Cordillera".
5. Anota el **ID de medición** (Measurement ID), formato **`G-XXXXXXXXXX`**
   (visible en la pantalla del flujo o en Admin → Flujos de datos).

### 2. Configuración recomendada de la propiedad

En **Admin**:
- **Configuración de los datos** → Retención de eventos: subir de 2 a
  **14 meses** (para ver estacionalidad año a año).
- **Definiciones de los eventos** → buscar `click_whatsapp` (aparecerá tras
  el primer click registrado) → toggle **"Marcar como evento clave"**
  (= conversión). Google registrará cada click a WhatsApp como key event.

### 3. Activar el tag en el sitio (¡aquí se enciende todo!)

**En Vercel** (producción):
1. Vercel → tu proyecto → **Settings → Environment Variables**.
2. Agregar: clave `NEXT_PUBLIC_GA_ID`, valor `G-XXXXXXXXXX` → Environments:
   **Production** (y Preview si quieres).
3. Aprovecha de agregar también `NEXT_PUBLIC_SITE_URL` =
   `https://www.jardincordillera.cl` si aún no está (ver `02-plan-seo-tecnico.md` P1.1).
4. **Redeploy** (Deployments → ⋯ → Redeploy). Las variables `NEXT_PUBLIC_*`
   se inyectan al momento del build: sin redeploy no funcionan.

**En local** (`.env.local`):
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Verificar que funciona

1. Abre tu sitio (producción o `npm run dev`).
2. En GA4: **Informes → Tiempo real** → deberías ver tu visita ("1 usuario
   activo ahora mismo").
3. Haz clic en un botón de WhatsApp → en Tiempo real → **Eventos** debería
   aparecer `click_whatsapp` con recuento.
4. Alternativa técnica: en el navegador → DevTools → Network → filtro `collect`
   → cada click/envío de página genera una petición a Google (si existe,
   el tag está funcionando).
5. Comprobación anti-olvido: ver en el HTML renderizado
   (clic derecho → Ver código fuente) el texto `googletagmanager.com/gtag/js`.
   Si no está, `NEXT_PUBLIC_GA_ID` no llegó al build → revisar redeploy.

> ⚠️ Los datos históricos NO se recuperan: GA4 mide desde que se activa.
> Cuanto antes se configure, antes empieza a acumularse la historia.

---

## Search Console — el "ojo" de Google sobre el sitio

### 1. Verificar la propiedad

1. https://search.google.com/search-console → **Agregar propiedad**.
2. Prefijo de URL: `https://www.jardincordillera.cl` (o tipo Dominio si ya manejas DNS en Vercel).
3. Verificación recomendada: **registro DNS TXT** en el panel de dominio
   (Google da el valor exacto a copiar). Alternativa: etiqueta HTML.
4. Una vez verificado, la propiedad queda vinculada a tu cuenta Google.

### 2. Enviar el sitemap

1. Search Console → **Sitemaps** → ingresar `sitemap.xml` → Enviar.
   (El archivo ya existe: Next.js genera `/sitemap.xml` automáticamente
   gracias a `src/app/sitemap.js`.)
2. Estado esperado: "Éxito". Cuenta de URLs: hoy 2 (`/` y `/tienda`), subirá
   a 6 con las categorías y a ~125 con las páginas de especie y blog.

### 3. Rutina de revisión (quincenal, 10 min)

- **Informes de rendimiento**: qué consultas muestran el sitio, posición media,
  CTR. Aquí aparecen las búsquedas reales → alimentan el calendario del blog
  (ver `04-estrategia-contenidos.md`).
- **Páginas**: verificar que las nuevas rutas se indexen (buscar `site:www.jardincordillera.cl`
  en Google).
- **Núcleo web / Experiencia de página**: monitorear LCP/CLS tras subir fotos.
- **URLs** → "Inspección de URL": diagnosticar cualquier página que no indexe.

### 4. Vincular GA4 ↔ Search Console

Admin (GA4) → **Vinculación de productos** → Search Console → vincular la
propiedad. Esto habilita los informes de consultas dentro de GA4.

---

## Futuro (NO instalar todavía)

| Herramienta | Cuándo considerar | Nota |
|---|---|---|
| **Google Tag Manager** | Si algún día necesitan 3+ tags de distintos proveedores (Meta Pixel, TikTok, etc.) | Hoy con GA4 directo es más simple y suficiente. Migrar después es directo |
| **Meta Pixel / Advantage+** | Si el negocio arranca en Instagram Ads | Requiere aprobación del dueño — agregar por Vercel o GTM, nunca hardcodeado |
| **GA4 audiences → Google Ads** | Si deciden pagar búsqueda local ("vivero las condes") | Con `click_whatsapp` como conversión se puede optimizar la campaña |
| **Consentimiento (cookie banner)** | Si expansion a mercados con GDPR | Chile hoy no lo exige para analytics sin ads |

---

## Checklist de cierre

- [ ] Cuenta Google creada y propiedad GA4 con zona horaria Chile + moneda CLP
- [ ] `NEXT_PUBLIC_GA_ID` en Vercel (Production) + redeploy
- [ ] `NEXT_PUBLIC_SITE_URL` con dominio propio en Vercel
- [ ] Verificado en Tiempo real (visita + `click_whatsapp`)
- [ ] `click_whatsapp` marcado como evento clave
- [ ] Retención de datos subida a 14 meses
- [ ] Search Console: propiedad verificada + sitemap enviado
- [ ] GA4 ↔ Search Console vinculados
