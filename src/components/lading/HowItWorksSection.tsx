import { useRef } from "react";
import { useTranslation } from "react-i18next";
import step1 from "../../assets/step-01.png";
import step2 from "../../assets/step-02.png";
import step3 from "../../assets/step-03.png";
import step4 from "../../assets/step-04.png";
import HowItWorksPanels from "./sectionsComponents/HowItWorksPanels";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HowItWorksSectionProps {
  onCarouselActiveChange?: (isActive: boolean) => void;
}

function HowItWorksSection({ onCarouselActiveChange }: HowItWorksSectionProps) {
  const { t } = useTranslation("landing");
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const panelsWrapperRef = useRef<HTMLDivElement>(null);

  const steps = [
    { image: step1, number: "01" },
    { image: step2, number: "02" },
    { image: step3, number: "03" },
    { image: step4, number: "04" },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-white p-[15px]">
      {/* TITULOS - CENTRADOS */}
      <div className="bg-white py-12 px-6 items-center w-full">
        <div className="flex flex-col items-center text-center gap-2">
          <h4
            ref={titleRef}
            className="tracking-wide text-lg font-regular text-primary"
          >
            {t("how.title")}
          </h4>
          <h1
            ref={subtitleRef}
            className={`${
              isMobile ? "text-3xl" : "text-6xl"
            } font-medium text-primary mb-4`}
          >
            {t("how.subtitle")}
          </h1>
          <p
            ref={textRef}
            className="font-normal text-lg text-primary w-full max-w-2xl"
          >
            {t("how.description")}
          </p>
        </div>
      </div>

      {/* CARRUSEL HORIZONTAL */}
      <div
        ref={panelsContainerRef}
        className="relative overflow-hidden bg-white"
      >
        <div
          ref={panelsWrapperRef}
          className="flex gap-4 pl-4 pr-4"
          style={{ width: `${4 * 95}vw` }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="horizontal-panel w-[100vw] h-[100vh] bg-white flex items-center justify-center py-4"
            >
              <HowItWorksPanels stepIndex={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
