// app/page.tsx
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Registration from '@/components/Registration';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Registration />
      <Footer />
    </>
  );
}
