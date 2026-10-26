/**
 * sitio.js
 * ─────────────────────────────────────────────────────────────────
 * Fuente única de verdad (single source of truth) sobre el NEGOCIO.
 * La consumen: app/layout.jsx (metadata), app/sitemap.js, app/robots.js,
 * components/seo/JsonLd.jsx.
 *
 * ⚠️ IMPORTANTE — CONSISTENCIA DE ENTIDAD (SEO/GEO):
 * Estos datos deben coincidir EXACTAMENTE con lo que se muestra en
 * Footer.jsx, Contacto.jsx y con el perfil de Google Business Profile.
 * Google y los LLMs comparan nombre + dirección + teléfono (NAP) entre
 * fuentes; cualquier divergencia baja la confianza en el negocio.
 *
 * CÓMO AGREGAR / EDITAR:
 *  - Los textos visibles del sitio (Footer, Contacto) siguen usando sus
 *    propias env vars con fallback — si cambias un dato aquí, cámbialo
 *    también allá (y en .env.local y en Vercel).
 *  - fundado debe coincidir con la sección Historia y el badge del Hero.
 * ─────────────────────────────────────────────────────────────────
 */

/** URL pública del sitio, sin slash final.
 *  En Vercel: Project Settings → Environment Variables → NEXT_PUBLIC_SITE_URL
 *  (ej: https://jardincordillera.cl). Requiere redeploy al cambiarla. */
export const SITIO_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jcordillera-landing.vercel.app'
).replace(/\/+$/, '');

export const NEGOCIO = {
  nombre: 'Jardín Cordillera',
  // Descriptor corto con keywords — usado en metadata y JSON-LD
  tipo: 'Vivero productor de plantas ornamentales',
  fundado: '1966', // confirmado por el dueño — mantener consistente en TODO el sitio
  generaciones: 3,
  // Dónde cultivan (producción) — diferencia clave vs. viveros revendedores
  produccion: 'Ocoa, Región de Valparaíso',

  direccion: {
    calle: 'Camino La Posada 11.900',
    comuna: 'Las Condes',
    region: 'Región Metropolitana',
    pais: 'CL',
  },

  telefonoFijo: process.env.NEXT_PUBLIC_PHONE_FIJO || '+562 2217 8386',
  email: process.env.NEXT_PUBLIC_EMAIL || 'contacto@jardincordillera.cl',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || 'jardincordillera',
  mapsLink:
    process.env.NEXT_PUBLIC_MAPS_LINK ||
    'https://maps.google.com/?q=Camino+La+Posada+11900,+Las+Condes,+Santiago',

  /** Horarios de atención — deben coincidir con Footer.jsx y Contacto.jsx */
  horarios: [
    { dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves'], abre: '09:00', cierra: '18:00' },
    { dias: ['Viernes'], abre: '09:00', cierra: '17:00' },
    { dias: ['Sábado'], abre: '09:00', cierra: '14:00' },
    // Domingo: cerrado
  ],

  /** Resumen del catálogo — actualizar al cambiar data/tienda.js.
   *  Se usa en llms.txt y en futuras páginas de categoría (ver agents/02). */
  catalogo: {
    especies: 119,
    variantes: 161,
    categorias: ['Arbustos', 'Árboles', 'Trepadoras', 'Cubresuelos'],
  },
};

/** Descripción SEO principal (~155 chars) con keywords locales */
export const DESCRIPCION_SEO =
  'Vivero productor familiar desde 1966: arbustos, árboles, trepadoras y cubresuelos cultivados en Ocoa y a la venta en Las Condes, Santiago. Asesoría por WhatsApp.';

/** Keywords principales — ordenadas por relevancia */
export const KEYWORDS = [
  'vivero productor',
  'vivero Las Condes',
  'vivero Santiago',
  'plantas ornamentales Chile',
  'arbustos',
  'árboles ornamentales',
  'trepadoras',
  'cubresuelos',
  'vivero familiar',
  'jardín Santiago',
  'plantas para jardín Chile',
];

/** Mapeo días es→en para schema.org (openingHoursSpecification) */
const DIAS_EN = {
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miércoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sábado: 'Saturday',
  Domingo: 'Sunday',
};

/** Horarios en formato schema.org (lo usa JsonLd.jsx) */
export function horariosSchema() {
  return NEGOCIO.horarios.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.dias.map((d) => DIAS_EN[d]),
    opens: h.abre,
    closes: h.cierra,
  }));
}

/** Dirección en formato schema.org (lo usa JsonLd.jsx) */
export function direccionSchema() {
  return {
    '@type': 'PostalAddress',
    streetAddress: NEGOCIO.direccion.calle,
    addressLocality: NEGOCIO.direccion.comuna,
    addressRegion: NEGOCIO.direccion.region,
    addressCountry: NEGOCIO.direccion.pais,
  };
}

/** Perfiles oficiales del negocio (sameAs en schema.org) */
export function redesSociales() {
  return [
    `https://www.instagram.com/${NEGOCIO.instagram}`,
    NEGOCIO.mapsLink,
  ].filter(Boolean);
}
