import HeroSection from "../heroSection";
import QueSon from "../queSon";
import Footer from "../footer";
import TiposPesquisas from "../tipos";
import ProcedimientoPesquisas from "../procedimientos";
import BenefitsSection from "../beneficios";
import ContactForm from "../contacto";
import InfoCarousel from "../information";
import CentrosMedicos from "../centros";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section id="inicio" className="bg-white py-16">
        <HeroSection />
      </section>
      <section id="queson" className="bg-white py-16">
        <QueSon />
      </section>
      <section id="tipos" className="bg-white py-16">
        <TiposPesquisas />
      </section>
      <section id="procedimientos" className="py-16">
        <ProcedimientoPesquisas />
      </section>
      <section id="importancia" className="bg-white py-16">
        <BenefitsSection />
      </section>
      <section id="importancia" className="bg-white py-16">
        <InfoCarousel />
      </section>
      <section id="centros" className="bg-white py-16">
        <CentrosMedicos />
      </section>
      <section id="contacto" className="py-16">
        <ContactForm />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
