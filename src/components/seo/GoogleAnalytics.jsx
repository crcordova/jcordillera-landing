/**
 * GoogleAnalytics.jsx
 * ─────────────────────────────────────────────────────────────────
 * Carga Google Analytics 4 (gtag.js) SOLO si NEXT_PUBLIC_GA_ID está
 * definido. Sin la variable → no se renderiza nada (cero overhead).
 *
 * CONFIGURACIÓN (ver agents/03-analytics-ga4.md para el paso a paso):
 *  1. Crear propiedad GA4 en https://analytics.google.com
 *  2. Copiar el Measurement ID (formato G-XXXXXXXXXX)
 *  3. Definir NEXT_PUBLIC_GA_ID en .env.local (dev) y en
 *     Vercel → Project Settings → Environment Variables (producción)
 *  4. Redeploy en Vercel (la var se inyecta en build time)
 *
 * No usa dependencias externas: next/script + el snippet oficial de gtag.
 * ─────────────────────────────────────────────────────────────────
 */

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* Carga async de gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* Inicialización del dataLayer */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
