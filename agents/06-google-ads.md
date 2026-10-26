# 06 — Google Ads: primera campaña + conversión de WhatsApp

> **Guía para el dueño**: cómo montar tu primera campaña de Google Ads
> para Jardín Cordillera y medir como conversión lo único que importa —
> que alguien te escriba por **WhatsApp**. El tracking ya está programado
> (`03-analytics-ga4.md`); este doc es 100% configuración en los paneles
> de Google: cero código, cero e-commerce. Ads solo mide la conversación
> si el evento `click_whatsapp` de GA4 se le **importa** — eso es esto.

---

## Paso 0 — Requisitos previos (sin esto, NO lanzar)

| Requisito | Dónde se hace |
|---|---|
| Cuenta GA4 creada (zona horaria Chile, moneda CLP) | `03` → Paso 1 |
| `NEXT_PUBLIC_GA_ID` en Vercel (**Production**) + redeploy | `03` → Paso 3 |
| `click_whatsapp` marcado como **evento clave** en GA4 | `03` → Paso 2 |
| Tag verificado: clic de prueba → evento en Tiempo real | `03` → Paso 4 |

> ⚠️ **No lances la campaña antes de esto**: Ads solo puede importar
> conversiones que GA4 registró. Los clics con el tag apagado se pierden
> para siempre y la campaña queda ciega desde el día 1.

> ⚠️ Al crear la cuenta Ads: **moneda CLP y zona horaria Chile** — no se
> pueden cambiar después. Es una decisión de una sola vez.

---

## Paso 1 — Vincular GA4 ↔ Google Ads (~5 min)

1. En GA4: **Admin → Vinculación de productos → Google Ads** → vincular la
   cuenta Ads (si no existe aún, el mismo flujo permite crearla desde ahí).
2. La vinculación queda "procesando" y luego "completada"; refrescar el
   estado puede tardar unos minutos.

> Las rutas del menú pueden variar ligeramente según la versión del panel.
> Lo importante: cuenta Ads vinculada a la propiedad GA4 correcta
> ("Jardín Cordillera — Web"), en estado completado.

---

## Paso 2 — Importar `click_whatsapp` como conversión

1. En Google Ads: **Objetivos → Conversiones** (en versiones antiguas:
   Herramientas → Configuración → Conversiones) → **+ Nueva conversión**.
2. Elegir **Importar → Google Analytics 4** → la propiedad vinculada.
3. Marcar `click_whatsapp` como acción de conversión **primaria** (objetivo),
   no secundaria: así la puja inteligente optimiza hacia conversaciones.
4. Si no aparece: falta marcarlo como evento clave en GA4 (`03` → Paso 2).

### Desfase esperado (no asustarse el día 1)

| Dónde | Cuándo se ve |
|---|---|
| GA4 → Tiempo real | al instante (segundos) |
| **Google Ads (conversión importada)** | **3 a 5 horas de desfase** |

Una conversación de las 10:00 puede aparecer en Ads pasadas las 13:00 — es
normal, no reparear la campaña el día 1 por "0 conversiones".

---

## Paso 3 — Estructura de campaña recomendada (vivero local)

### Tipo: campaña de Búsqueda — NO Performance Max

**Búsqueda** ✅ — empezar aquí: control total de palabras, negativas y
páginas de destino; auditable con presupuesto chico. Crearla en modo con
control total y **solo la red de búsqueda** (si el asistente ofrece
incluir Display, desactivarla).
**Performance Max** ❌ — no para partir: sin datos históricos de conversión
es difícil de controlar y reparte el presupuesto entre canales opacos.

### Segmentación

| Eje | Configuración |
|---|---|
| Ubicación | **Las Condes + radio ~15-20 km** (Santiago oriente: Vitacura, Lo Barnechea, Providencia, La Reina, Ñuñoa...) |
| Opción de ubicación | "Personas **en o regularmente en** la ubicación" — NO "que mostraron interés" |
| Idioma | Español |
| Dispositivos | Todos (el móvil domina en búsquedas locales) |

### Dos grupos de anuncios = dos páginas de destino

Hoy el sitio tiene 2 páginas públicas, y eso mapea perfecto a 2 grupos:

| Grupo | Palabras clave (concordancia de frase) | Destino | Por qué |
|---|---|---|---|
| **Vivero local** | vivero las condes · vivero santiago · vivero de plantas · vivero cerca de mi | `/` | Buscan un vivero: marca, historia (1966), galería |
| **Catálogo / compra** | comprar plantas santiago · plantas para jardín santiago · arbustos santiago · trepadoras santiago · cubresuelos chile | `/tienda` | Buscan qué comprar: 119 especies, precios visibles, CTA por producto |

Concordancia sugerida: **frase** para partir (exacta para las que ya convierten); la amplia quema presupuesto en búsquedas raras.

> **Evolución futura**: cuando existan `/tienda/[categoria]` y
> `/planta/[slug]` (P1.2/P1.3 de `02-plan-seo-tecnico.md`) se arman grupos
> específicos ("arbustos santiago" → `/tienda/arbustos`). Mientras tanto,
> `/` y `/tienda` bastan.

### Palabras clave negativas iniciales

**empleo · trabajo · gratis · semillas · cursos · como hacer** — ajustables.
El criterio: filtrar búsquedas sin intención de compra (pega, regalado,
aprender, DIY; se venden plantas en bolsa, no semillas). Que no falten.

### Textos del anuncio (punto de partida)

- Titulares: "Vivero Productor Desde 1966" · "Plantas en Las Condes" ·
  "119 Especies · Precios Visibles"
- Texto: "Arbustos, árboles, trepadoras y cubresuelos cultivados en Ocoa.
  Venta directa en Las Condes. Escríbenos por WhatsApp."

### Extensiones ("Recursos" en los paneles nuevos)

| Extensión | Configuración |
|---|---|
| Enlaces de sitio | "Tienda" → `/tienda` · "Contáctanos por WhatsApp" → `/#contacto` (la sección de contacto del home) |
| Textos destacados | "Vivero productor desde 1966" · "Precios visibles" |
| Llamada | Teléfono fijo **+562 2217 8386** |

> Google exige que los enlaces de sitio apunten al propio dominio: por eso
> "WhatsApp" enlaza a `/#contacto` (no a `wa.me`); el teléfono debe coincidir con `src/data/sitio.js` (regla NAP).

---

## Paso 4 — Presupuesto y la métrica que importa

**Empezar pequeño**: CLP **$10.000-$15.000/día** es un punto de partida
razonable — recomendación, no mandato: **el presupuesto real es decisión
del dueño**. Evaluar a las **2-4 semanas** (no al segundo día): con
presupuesto chico la Búsqueda acumula pocos clics diarios.

### La métrica clave: costo por conversación de WhatsApp

```
costo por conversación = gasto total ÷ conversiones click_whatsapp
```

Visible en Google Ads (campaña → columnas de conversiones). Es el número
que decide si la campaña sigue, se ajusta o se pausa.

### ¿Y qué costo es "bueno"? — ejemplo ajustable, no cifra definitiva

No hay promedio de industria útil aquí (y no lo vamos a inventar): el
umbral se define con la economía propia. **Ejemplo ilustrativo**: si una
venta promedio vale **$30.000-$60.000 CLP**, una conversación que cueste
**$2.000-$4.000 CLP** deja margen sano (varios leads por venta). Anotar
el **CPA máximo** antes de lanzar: es la línea para pausar o ajustar.

---

## UTMs — convención del proyecto

| Parámetro | Valor |
|---|---|
| `utm_source` | `google` |
| `utm_medium` | `cpc` |
| `utm_campaign` | `vivero_santiago` |

URL final de ejemplo:
`https://www.jardincordillera.cl/tienda?utm_source=google&utm_medium=cpc&utm_campaign=vivero_santiago`

- Configurables en la cuenta Ads (parámetros de seguimiento de URL). Ojo: la
  **atribución** de conversiones la hace la vinculación (auto-tagging); las UTMs son para **análisis de tráfico** en GA4.
- Dónde verlas en GA4: **Informes → Adquisición de tráfico**, dimensiones
  "Fuente/medio de la sesión" y "Campaña de la sesión". `google / cpc` y
  `vivero_santiago` deben aparecer con datos desde el primer día.

---

## Advertencias críticas (leer antes de lanzar)

1. **No lanzar antes de que GA4 esté activo en producción** — se perderían
   las conversiones (Paso 0). Un día de campaña ciega es plata regalada.
2. **No usar anuncios solo de llamada (phone-call-only)** sin verificar el
   número: el canal oficial del negocio es **WhatsApp**; el fijo
   (+562 2217 8386) va como *extensión*, no como campaña central.
3. **Revisar el Informe de términos de búsqueda cada semana** y agregar
   negativas: la mantención mínima para que el presupuesto no se filtre.

---

## Checklist de cierre (campaña lista para lanzar)

- [ ] GA4 activo en producción (`NEXT_PUBLIC_GA_ID` + redeploy, ver `03`)
- [ ] `click_whatsapp` marcado como evento clave en GA4
- [ ] Cuenta Ads creada con moneda CLP + zona horaria Chile
- [ ] GA4 ↔ Google Ads vinculados (Admin → Vinculación de productos)
- [ ] `click_whatsapp` importado como acción de conversión **primaria**
- [ ] Campaña de Búsqueda, solo red de búsqueda (sin Display)
- [ ] Segmentación: Las Condes + radio 15-20 km · español · todos los dispositivos
- [ ] 2 grupos de anuncios con destinos correctos (`/` y `/tienda`)
- [ ] Palabras clave en concordancia frase/exacta + negativas cargadas
- [ ] Textos del anuncio con propuesta de valor (1966, productor, precios)
- [ ] Extensiones: enlaces de sitio + textos destacados + llamada (+562 2217 8386)
- [ ] UTMs configuradas (`google` / `cpc` / `vivero_santiago`)
- [ ] Presupuesto diario definido + CPA máximo anotado antes de lanzar
- [ ] Clic de prueba en el anuncio → evento visible en GA4 Tiempo real
