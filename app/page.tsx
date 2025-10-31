import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PASBlock from '@/components/PASBlock';
import CoreOffer from '@/components/CoreOffer';
import Services from '@/components/Services';
import Process from '@/components/Process';
import ROICalculator from '@/components/ROICalculator';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <PASBlock />
      <CoreOffer />
      <Services />
      <Process />
      <ROICalculator />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}