import { useState } from "react";
import HeroSection from "../../components/lading/HeroSection";
import AboutSection from "@/components/lading/AboutSection";
import UsersSection from "@/components/lading/UsersSection";
import HowItWorksSection from "@/components/lading/HowItWorksSection";
import FuncionalitySection from "@/components/lading/FuncionalitySection";
import BeneficitsSection from "@/components/lading/BenefictsSection";
import TestimonialsSection from "@/components/lading/TestimonialsSection";
import { useAppStore } from "@/stores/useAppStore";
function LandingPage() {
  const setisCarouselActive = useAppStore((state) => state.setisCarouselActive);
  const isCarouselActive = useAppStore((state) => state.isCarouselActive);

  return (
    <div className="bg-white w-full overflow-x-hidden">
      <HeroSection isCarouselActive={isCarouselActive} />
      <AboutSection />
      <UsersSection />
      <HowItWorksSection onCarouselActiveChange={setisCarouselActive} />{" "}
      <FuncionalitySection />
      <BeneficitsSection onCarouselActiveChange={setisCarouselActive} />
      <TestimonialsSection />
    </div>
  );
}

export default LandingPage;
