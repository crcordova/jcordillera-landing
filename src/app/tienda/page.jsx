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
        <TiendaClient productos={productos} categorias={CATEGORIAS} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
