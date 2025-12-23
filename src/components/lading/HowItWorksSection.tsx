import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import step1 from "../../assets/step-01.png";
import step2 from "../../assets/step-02.png";
import step3 from "../../assets/step-03.png";
import step4 from "../../assets/step-04.png";
import HowItWorksPanels from "./sectionsComponents/HowItWorksPanels";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLenisGsap } from "@/hooks/useLenisGsap";
gsap.registerPlugin(ScrollTrigger);

interface HowItWorksSectionProps {
  onCarouselActiveChange?: (isActive: boolean) => void;
}

function HowItWorksSection({ onCarouselActiveChange }: HowItWorksSectionProps) {
  const { t } = useTranslation("landing");
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const panelsWrapperRef = useRef<HTMLDivElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { image: step1, number: "01" },
    { image: step2, number: "02" },
    { image: step3, number: "03" },
    { image: step4, number: "04" },
  ];
  useLenisGsap();
  useGSAP(
    () => {
      // Fade up para títulos
      gsap.fromTo(
        titlesContainerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titlesContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Fade up para carrusel, con delay para suavidad
      gsap.fromTo(
        carouselContainerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación del título
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación del subtítulo
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación de la descripción
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación del carrusel horizontal
      const container = panelsContainerRef.current;
      const wrapper = panelsWrapperRef.current;

      if (!container || !wrapper) return;

      // Calcular el ancho total correctamente
      const totalWidth = wrapper.offsetWidth - container.offsetWidth;

      const tween = gsap.to(wrapper, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (steps.length - 1),
            duration: 0.3,
            ease: "power1.inOut",
          },
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => onCarouselActiveChange?.(true),
          onLeave: () => onCarouselActiveChange?.(false),
          onEnterBack: () => onCarouselActiveChange?.(true),
          onLeaveBack: () => onCarouselActiveChange?.(false),
        },
      });

      // Animación de zoom en las imágenes de los paneles
      const panels = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
      panels.forEach((panel) => {
        const img = panel.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left center",
                end: "center center",
                scrub: 1,
              },
            }
          );
        }
      });

      // Animación de entrada para cada panel (como las imágenes en AboutSection)
      panels.forEach((panel, i) => {
        gsap.fromTo(
          panel,
          {
            opacity: 0,
            scale: 0.95,
            y: 40,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: i * 0.1, // pequeño delay escalonado
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left center",
              end: "center center",
              toggleActions: "play none none none",
              scrub: 1,
            },
          }
        );
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef, dependencies: [isMobile, onCarouselActiveChange] }
  );

  return (
    <main className="p-[15px] flex justify-center w-full" id="how">
      <div ref={containerRef} className="w-full">
        <section
          ref={sectionRef}
          className="bg-white py-12 px-6 items-center w-full"
        >
          {/* TÍTULOS - CENTRADOS */}
          <div className="flex flex-col items-center text-center gap-4">
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
              className="font-normal text-lg text-primary mb-4 w-full max-w-2xl"
            >
              {t("how.description")}
            </p>
          </div>
        </section>

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
      </div>
    </main>
  );
}

export default HowItWorksSection;
