import HeroSection from "@/components/hero-section";
import StorySection from "@/components/story-section";
import ProductSection from "@/components/product-section";
import TechnologySection from "@/components/technology-section";
// import TeamSection from "@/components/team-section"; // Temporarily hidden
import NewsSection from "@/components/news-section";
import ContactSection from "@/components/contact-section";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import AboutSection from "@/components/about-section"; // Removed as requested

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <AboutSection /> */}
      <StorySection />
      <ProductSection />
      <TechnologySection />
      {/* <TeamSection /> */}
      <NewsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
