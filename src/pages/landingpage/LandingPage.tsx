import HeroSection from "../../components/lading/HeroSection";
import AboutSection from "@/components/lading/AboutSection";
import UsersSection from "@/components/lading/UsersSection";
function LandingPage() {
  return (
    <div className="bg-white w-full overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <UsersSection />
    </div>
  );
}

export default LandingPage;
