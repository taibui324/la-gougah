import HeroSection from "@/components/hero-section";
import StorySection from "@/components/story-section";
import ProductSection from "@/components/product-section";
import TechnologySection from "@/components/technology-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <StorySection />
      <ProductSection />
      <TechnologySection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </>
  );
}
