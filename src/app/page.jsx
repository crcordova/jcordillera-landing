import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Historia from '@/components/sections/Historia';
import Galeria from '@/components/sections/Galeria';
import Contacto from '@/components/sections/Contacto';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import { galeriaItems } from '@/data/galeria';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Galeria items={galeriaItems} />
        <Historia />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
