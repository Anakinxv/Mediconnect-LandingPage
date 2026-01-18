import { useTranslation } from "react-i18next";
import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";
import step1 from "../../../assets/step-01.png";
import step2 from "../../../assets/step-02.png";
import step3 from "../../../assets/step-03.png";
import step4 from "../../../assets/step-04.png";

gsap.registerPlugin(ScrollTrigger);

interface HowItWorksPanelsProps {
  stepIndex: number;
  imgRef?: React.Ref<HTMLImageElement>;
}

const HowItWorksPanels = forwardRef<HTMLImageElement, HowItWorksPanelsProps>(
  ({ stepIndex, imgRef }) => {
    const { t } = useTranslation("landing");
    const isMobile = useIsMobile();

    const containerRef = useRef<HTMLDivElement>(null);
    const stepBadgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const steps = [
      {
        image: step1,
        number: "01",
        step: t("how.steps.0.step"),
        title: t("how.steps.0.title"),
        description: t("how.steps.0.description"),
      },
      {
        image: step2,
        number: "02",
        step: t("how.steps.1.step"),
        title: t("how.steps.1.title"),
        description: t("how.steps.1.description"),
      },
      {
        image: step3,
        number: "03",
        step: t("how.steps.2.step"),
        title: t("how.steps.2.title"),
        description: t("how.steps.2.description"),
      },
      {
        image: step4,
        number: "04",
        step: t("how.steps.3.step"),
        title: t("how.steps.3.title"),
        description: t("how.steps.3.description"),
      },
    ];

    const step = steps[stepIndex];

    useGSAP(
      () => {
        const tl = gsap.timeline({ paused: true });

        // Animación del step badge
        tl.fromTo(
          stepBadgeRef.current,
          {
            opacity: 0,
            y: -30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
        );

        // Animación del título
        tl.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3",
        );

        // Animación de la descripción
        tl.fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            x: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        );

        // Trigger para activar cuando el panel esté en vista
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "left 70%",
          end: "right 30%",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          // onLeave: () => tl.reverse(),
          // onLeaveBack: () => tl.reverse(),
        });
      },
      { scope: containerRef, dependencies: [stepIndex] },
    );

    return (
      <div
        ref={containerRef}
        className="w-full h-full rounded-4xl overflow-hidden bg-white relative"
      >
        <img
          ref={imgRef}
          src={step.image}
          alt={t(`howItWorks.${step.number}_alt`)}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />

        <div
          className={`absolute top-0 left-0 right-0 flex justify-start items-start ${
            isMobile ? "p-4" : "p-6"
          }`}
        >
          <div
            ref={stepBadgeRef}
            className={`flex flex-col justify-center items-center relative rounded-full border border-white/60 bg-black/20 backdrop-blur-xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,2.2)] z-20 ${
              isMobile ? "px-4 py-2" : "px-5 py-2"
            }`}
            style={{
              backdropFilter: "blur(16px) saturate(180%) contrast(120%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%) contrast(120%)",
            }}
          >
            <h3
              className={`text-white ${
                isMobile ? "text-base" : "text-lg"
              } font-normal tracking-wider text-center drop-shadow-lg`}
            >
              {step.step}
            </h3>
          </div>
        </div>

        <div>
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent ${
              isMobile ? "p-4" : "p-6 md:p-8"
            } flex ${
              isMobile ? "flex-col gap-4 items-start" : "flex-row"
            } justify-between items-end`}
          >
            <h2
              ref={titleRef}
              className={`text-white ${
                isMobile ? "text-xl" : "text-2xl md:text-5xl"
              } font-medium mb-2 max-w-lg drop-shadow-lg`}
            >
              {step.title}
            </h2>

            <div
              ref={descriptionRef}
              className={`${
                isMobile ? "max-w-full" : "max-w-sm"
              } flex flex-col justify-center items-start relative rounded-3xl border border-white/60 bg-black/20 backdrop-blur-xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,2.2)] z-20 ${
                isMobile ? "px-4 py-3" : "px-7 py-4"
              }`}
              style={{
                backdropFilter: "blur(16px) saturate(180%) contrast(120%)",
                WebkitBackdropFilter:
                  "blur(16px) saturate(180%) contrast(120%)",
              }}
            >
              <h3
                className={`text-white ${
                  isMobile ? "text-sm" : "text-base md:text-lg"
                } font-normal tracking-wide text-left drop-shadow-lg`}
              >
                {step.description}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

HowItWorksPanels.displayName = "HowItWorksPanels";

export default HowItWorksPanels;
