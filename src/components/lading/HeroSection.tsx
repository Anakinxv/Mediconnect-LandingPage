import HeroImageSection from "./sectionsComponents/HeroImage";
import { useLenisGsap } from "@/hooks/useLenisGsap";

interface HeroSectionProps {
  isCarouselActive: boolean;
}

function HeroSection({ isCarouselActive }: HeroSectionProps) {
  useLenisGsap();
  return <HeroImageSection isCarouselActive={isCarouselActive} />;
}

export default HeroSection;
