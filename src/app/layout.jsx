import './globals.css';
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: 'Jardín Cordillera · Vivero con Tradición',
  description: 'Más de 60 años cultivando plantas con pasión en Ocoa. Visítanos en Las Condes, Santiago.',
  keywords: 'vivero, plantas, vivero productor, jardín, Las Condes, Santiago, Chile',
  icons: {
    icon: '/favicon.ico',       // ← fuera de openGraph
  },
  openGraph: {
    title: 'Jardín Cordillera · Vivero con Tradición',
    description: 'Más de 60 años cultivando plantas con pasión. Santiago, Chile.',
    locale: 'es_CL',
    type: 'website',
    images: ['/images/logo.png'],  // ← directo en openGraph, con / al inicio
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
      <Analytics /> 
    </html>
  );
}
