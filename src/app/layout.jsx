import './globals.css';
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from '@/components/seo/GoogleAnalytics';
import WhatsAppTracker from '@/components/seo/WhatsAppTracker';
import JsonLd from '@/components/seo/JsonLd';
import { SITIO_URL, NEGOCIO, DESCRIPCION_SEO, KEYWORDS } from '@/data/sitio';

// metadataBase: obligatorio para que Next resuelva canonical y OG images absolutas.
// Se construye desde NEXT_PUBLIC_SITE_URL (ver agents/03-analytics-ga4.md).
export const metadata = {
  metadataBase: new URL(SITIO_URL),

  title: {
    default: `${NEGOCIO.nombre} · Vivero Productor en Las Condes, Santiago`,
    template: `%s · ${NEGOCIO.nombre}`,
  },
  description: DESCRIPCION_SEO,
  keywords: KEYWORDS,

  // URL canónica del home (evita duplicado www/no-www y trailing slash)
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: `${NEGOCIO.nombre} · Vivero Productor en Las Condes, Santiago`,
    description: DESCRIPCION_SEO,
    url: SITIO_URL,
    siteName: NEGOCIO.nombre,
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        alt: `${NEGOCIO.nombre} — ${NEGOCIO.tipo}`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${NEGOCIO.nombre} · Vivero Productor en Las Condes, Santiago`,
    description: DESCRIPCION_SEO,
    images: ['/images/logo.png'],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/logo.ico', // el archivo vive en public/logo.ico
  },
};

export const viewport = {
  themeColor: '#2d4a2e', // --verde-profundo (ver app/globals.css)
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        {/* Analytics: GA4 (solo si NEXT_PUBLIC_GA_ID está definido) +
            tracking de clicks a WhatsApp + Vercel Analytics */}
        <GoogleAnalytics />
        <WhatsAppTracker />
        <Analytics />
        {/* Datos estructurados schema.org (LocalBusiness + WebSite) */}
        <JsonLd />
      </body>
    </html>
  );
}
