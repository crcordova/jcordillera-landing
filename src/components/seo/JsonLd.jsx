/**
 * JsonLd.jsx
 * ─────────────────────────────────────────────────────────────────
 * Datos estructurados schema.org inyectados en el <body> (server
 * component — el JSON queda en el HTML inicial, visible para Google
 * y para LLMs/IA generativa).
 *
 * Entidades declaradas:
 *  - GardenStore (LocalBusiness) → el vivero: NAP, horarios, redes.
 *    "GardenStore" es el tipo oficial de schema.org para viveros.
 *  - WebSite → el sitio con su idioma y audiencia.
 *
 * Los datos provienen de src/data/sitio.js — fuente única de verdad.
 * ⚠️ NO editar este componente para cambiar datos: editar sitio.js.
 *
 * Pendiente opcional (ver agents/02-plan-seo-tecnico.md):
 *  - geo: coordenadas del vivero (clic derecho en Google Maps → copiar)
 *  - FAQPage schema cuando exista sección de preguntas frecuentes
 * ─────────────────────────────────────────────────────────────────
 */

import { SITIO_URL, NEGOCIO, DESCRIPCION_SEO, horariosSchema, direccionSchema, redesSociales } from '@/data/sitio';

export default function JsonLd() {
  const negocio = {
    '@context': 'https://schema.org',
    '@type': 'GardenStore',
    '@id': `${SITIO_URL}/#negocio`,
    name: NEGOCIO.nombre,
    alternateName: 'Vivero Jardín Cordillera',
    description: DESCRIPCION_SEO,
    url: SITIO_URL,
    logo: `${SITIO_URL}/images/logo.png`,
    image: `${SITIO_URL}/images/arbusto_galeria.png`,
    telephone: NEGOCIO.telefonoFijo.replace(/\s/g, ''),
    email: NEGOCIO.email,
    foundingDate: NEGOCIO.fundado,
    address: direccionSchema(),
    openingHoursSpecification: horariosSchema(),
    sameAs: redesSociales(),
    areaServed: {
      '@type': 'City',
      name: 'Santiago',
    },
    knowsAbout: NEGOCIO.catalogo.categorias,
  };

  const sitio = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITIO_URL}/#sitio`,
    name: NEGOCIO.nombre,
    url: SITIO_URL,
    inLanguage: 'es-CL',
    publisher: { '@id': `${SITIO_URL}/#negocio` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(negocio) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitio) }}
      />
    </>
  );
}
