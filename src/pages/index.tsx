import HeroSection from "../sections/HeroSection";
import { ContactSection } from "../sections/ContactSection";
import { AboutSection } from "../sections/AboutSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import Header from "../components/Header";


export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <TestimonialsSection />
    </>
  );
}
