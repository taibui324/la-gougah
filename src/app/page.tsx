import HeroSection from "@/components/hero-section";
import OriginSection from "@/components/origin-section";
import ProductSection from "@/components/product-section";
import TechnologySection from "@/components/technology-section";
// import TeamSection from "@/components/team-section"; // Temporarily hidden
import NewsSection from "@/components/news-section"; // Uncommented news section
import ContactSection from "@/components/contact-section";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import SectionWrapper from "@/components/section-wrapper";
// import AboutSection from "@/components/about-section"; // Removed as requested

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <AboutSection /> */}
      <SectionWrapper sectionId="origin">
        <OriginSection />
      </SectionWrapper>
      <SectionWrapper sectionId="products">
        <ProductSection />
      </SectionWrapper>
      <SectionWrapper sectionId="technology">
        <TechnologySection />
      </SectionWrapper>
      {/* <TeamSection /> */}
      <SectionWrapper sectionId="news">
        <NewsSection />
      </SectionWrapper>
      <SectionWrapper sectionId="contact">
        <ContactSection />
      </SectionWrapper>
      <Footer />
      <ScrollToTop />
    </>
  );
}
