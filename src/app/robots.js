/**
 * robots.js → genera /robots.txt automáticamente (Next.js Metadata Routes)
 * ─────────────────────────────────────────────────────────────────
 * Permite a todos los crawlers (Googlebot, Bingbot y los crawlers de
 * IA como GPTBot/PerplexityBot usan robots.txt) y les indica el sitemap.
 *
 * No requiere mantención salvo que se agreguen rutas privadas.
 * ─────────────────────────────────────────────────────────────────
 */

import { SITIO_URL } from '@/data/sitio';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITIO_URL}/sitemap.xml`,
  };
}
