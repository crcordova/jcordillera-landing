import { SITIO_URL } from '@/data/sitio';

export const metadata = {
  title: 'Tienda · Catálogo de Plantas',
  description:
    'Catálogo del vivero con precios: 119 especies entre arbustos, árboles, trepadoras y cubresuelos, cultivados en Ocoa y disponibles en Las Condes. Pide o consulta por WhatsApp.',
  alternates: {
    canonical: '/tienda',
  },
  openGraph: {
    title: 'Tienda · Catálogo de Plantas',
    description:
      '119 especies con precios: arbustos, árboles, trepadoras y cubresuelos. Asesoría directa por WhatsApp.',
    url: `${SITIO_URL}/tienda`,
    locale: 'es_CL',
    type: 'website',
  },
};

export default function TiendaLayout({ children }) {
  return children;
}
