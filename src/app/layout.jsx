import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Jardín Cordillera · Vivero con Tradición',
  description:
    'Más de 70 años cultivando plantas con pasión en Ocoa. Visítanos en Las Condes, Santiago. Plantas de interior, exterior, flores, suculentas y más.',
  keywords: 'vivero, plantas, jardín, Las Condes, Santiago, Chile, interior, exterior',
  openGraph: {
    title: 'Jardín Cordillera · Vivero con Tradición',
    description: 'Más de 70 años cultivando plantas con pasión. Santiago, Chile.',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
