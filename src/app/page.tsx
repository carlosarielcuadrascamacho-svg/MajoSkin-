import HeroSection from "@/components/HeroSection";
import AboutMe from "@/components/AboutMe";
import ServiceCatalog from "@/components/ServiceCatalog";
import ProductShowcase from "@/components/ProductShowcase";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import FAQSection from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import FooterAndLocation from "@/components/FooterAndLocation";
import BackToTop from "@/components/BackToTop";
import AnimatedSection from "@/components/AnimatedSection";
import {
  services,
  products,
  testimonials,
  faqs,
  businessInfo,
} from "@/data/mockData";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimatedSection><AboutMe /></AnimatedSection>
      <AnimatedSection delay={100}>
        <ServiceCatalog services={services} />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ProductShowcase products={products} />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <Testimonials testimonials={testimonials} />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <Gallery />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <FAQSection faqs={faqs} />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ContactForm />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <FooterAndLocation data={businessInfo} />
      </AnimatedSection>
      <BackToTop />
    </>
  );
}
