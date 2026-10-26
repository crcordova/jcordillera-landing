/**
 * sitemap.js → genera /sitemap.xml automáticamente (Next.js Metadata Routes)
 * ─────────────────────────────────────────────────────────────────
 * MANTENIMIENTO: cada vez que se agregue una página pública nueva
 * (blog, categorías de plantas, /nosotros...), agregarla al array de
 * abajo. Ver agents/02-plan-seo-tecnico.md (hay un spec para hacer
 * este sitemap dinámico cuando existan /tienda/[categoria] y /blog).
 *
 * En producción, /sitemap.xml se sirve desde NEXT_PUBLIC_SITE_URL.
 * ─────────────────────────────────────────────────────────────────
 */

import { SITIO_URL } from '@/data/sitio';

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITIO_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITIO_URL}/tienda`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
