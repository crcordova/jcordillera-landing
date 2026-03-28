import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import TiendaClient from '@/components/tienda/TiendaClient';
import { productos, CATEGORIAS } from '@/data/tienda';

export default function TiendaPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <TiendaClient productos={productos} categorias={CATEGORIAS} />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
