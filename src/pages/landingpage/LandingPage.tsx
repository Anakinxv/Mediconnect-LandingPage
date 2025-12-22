import HeroSection from "../../components/lading/HeroSection";
import AboutSection from "@/components/lading/AboutSection";
import UsersSection from "@/components/lading/UsersSection";
import HowItWorksSection from "@/components/lading/HowItWorksSection";
import FuncionalitySection from "@/components/lading/FuncionalitySection";
import BeneficitsSection from "@/components/lading/BenefictsSection";
import TestimonialsSection from "@/components/lading/TestimonialsSection";
import FAQSection from "@/components/lading/FAQSection";
import { useAppStore } from "@/stores/useAppStore";
import ServicesCarouselSection from "@/components/lading/ServicesCarouselSection";

import Footer from "@/components/lading/Footer";
import ContactSectionWrapper from "@/components/lading/ContactSectionWrapper";
function LandingPage() {
  const setisCarouselActive = useAppStore((state) => state.setisCarouselActive);
  const isCarouselActive = useAppStore((state) => state.isCarouselActive);

  return (
    <div className="bg-white w-full overflow-x-hidden flex flex-col gap-10">
      <HeroSection isCarouselActive={isCarouselActive} />
      <AboutSection />
      <UsersSection />
      <HowItWorksSection onCarouselActiveChange={setisCarouselActive} />{" "}
      <FuncionalitySection />
      <BeneficitsSection onCarouselActiveChange={setisCarouselActive} />
      <TestimonialsSection />
      <FAQSection />
      <ContactSectionWrapper />
      <ServicesCarouselSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
