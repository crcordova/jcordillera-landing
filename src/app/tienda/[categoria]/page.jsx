/**
 * /tienda/[categoria] — página indexable por categoría (arbusto, arbol,
 * trepadora, cubresuelo). Ver agents/02-plan-seo-tecnico.md § P1.2.
 *
 * La página es estática en el build (generateStaticParams desde CATEGORIAS)
 * pero data-driven: agregar una categoría en src/data/tienda.js + redeploy
 * crea la página y su entrada en el sitemap automáticamente.
 */

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import TiendaClient from '@/components/tienda/TiendaClient';
import CategoriaIntro from '@/components/tienda/CategoriaIntro';
import { productos, CATEGORIAS } from '@/data/tienda';
import { SITIO_URL } from '@/data/sitio';

export function generateStaticParams() {
  return Object.keys(CATEGORIAS)
    .filter((k) => k !== 'all')
    .map((categoria) => ({ categoria }));
}

export async function generateMetadata({ params }) {
  const { categoria } = await params; // Next 16: params es Promise
  const cat = CATEGORIAS[categoria];
  if (!cat) return {};

  const total = productos.filter((p) => p.categoria === categoria).length;

  return {
    title: `${cat.label} para jardín · Venta en vivero Las Condes`,
    description: `${cat.h1}: ${total} especies con precios por tamaño de bolsa, cultivadas por vivero productor desde 1966 (Ocoa). Asesoría y pedidos por WhatsApp, retiro en Las Condes, Santiago.`,
    alternates: { canonical: `/tienda/${categoria}` },
    openGraph: {
      title: `${cat.label} · Jardín Cordillera`,
      description: cat.descripcionSeo,
      url: `${SITIO_URL}/tienda/${categoria}`,
      type: 'website',
      locale: 'es_CL',
    },
  };
}

export default async function CategoriaPage({ params }) {
  const { categoria } = await params;
  const cat = CATEGORIAS[categoria];
  if (!cat) notFound();

  const deCategoria = productos.filter((p) => p.categoria === categoria);
  const otrasCategorias = Object.entries(CATEGORIAS).filter(
    ([key]) => key !== 'all' && key !== categoria
  );

  return (
    <>
      <Navbar />
      <main>
        <CategoriaIntro
          categoria={categoria}
          cat={cat}
          totalProductos={deCategoria.length}
          otrasCategorias={otrasCategorias}
        />
        <Suspense fallback={null}>
          <TiendaClient
            productos={productos}
            categorias={CATEGORIAS}
            categoriaInicial={categoria}
            mostrarHeader={false}
          />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
