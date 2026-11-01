import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import TiendaClient from '@/components/tienda/TiendaClient';
import TiendaHeader from '@/components/tienda/TiendaHeader';
import { productos, CATEGORIAS } from '@/data/tienda';

export default function TiendaPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero fuera de Suspense para que renderice como HTML estático */}
        <TiendaHeader totalProductos={productos.length} />
        <Suspense fallback={null}>
          <TiendaClient
            productos={productos}
            categorias={CATEGORIAS}
            mostrarHeader={false}
          />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
