import HeroSection from "@/components/hero-section";
import OriginSection from "@/components/origin-section";
import ProductSection from "@/components/product-section";
import TechnologySection from "@/components/technology-section";
// import TeamSection from "@/components/team-section"; // Temporarily hidden
import NewsSection from "@/components/news-section"; // Hidden in phase 1
import ContactSection from "@/components/contact-section";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
// import AboutSection from "@/components/about-section"; // Removed as requested

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <AboutSection /> */}
      <OriginSection />
      <ProductSection />
      <TechnologySection />
      {/* <TeamSection /> */}
      <NewsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </>
  );
}
