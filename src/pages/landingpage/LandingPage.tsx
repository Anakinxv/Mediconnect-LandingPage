import { useState } from "react";
import HeroSection from "../../components/lading/HeroSection";
import AboutSection from "@/components/lading/AboutSection";
import UsersSection from "@/components/lading/UsersSection";
import HowItWorksSection from "@/components/lading/HowItWorksSection";
import FuncionalitySection from "@/components/lading/FuncionalitySection";

function LandingPage() {
  const [isCarouselActive, setIsCarouselActive] = useState(false);

  return (
    <div className="bg-white w-full overflow-x-hidden">
      <HeroSection isCarouselActive={isCarouselActive} />
      <AboutSection />
      <UsersSection />
      <HowItWorksSection onCarouselActiveChange={setIsCarouselActive} />{" "}
      <FuncionalitySection />
    </div>
  );
}

export default LandingPage;
