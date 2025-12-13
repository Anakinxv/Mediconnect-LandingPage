import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import step1 from "../../assets/step-01.png";
import step2 from "../../assets/step-02.png";
import step3 from "../../assets/step-03.png";
import step4 from "../../assets/step-04.png";
import HowItWorksPanels from "./sectionsComponents/HowItWorksPanels";
import { useIsMobile } from "@/hooks/useIsMobile";
gsap.registerPlugin(ScrollTrigger);

interface HowItWorksSectionProps {
  onCarouselActiveChange?: (isActive: boolean) => void;
}

function HowItWorksSection({ onCarouselActiveChange }: HowItWorksSectionProps) {
  const { t } = useTranslation("landing");
  const isMobile = useIsMobile(); // Usar el hook en lugar de window.innerWidth
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

  useEffect(() => {
    const section = sectionRef.current;
    const container = panelsContainerRef.current;
    const wrapper = panelsWrapperRef.current;

    if (!section || !container || !wrapper) return;

    // Animación del título
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
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
      { opacity: 0, y: 50 },
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

    // Animación del texto
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
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
        // Callback para notificar cuando el carrusel está activo
        onEnter: () => onCarouselActiveChange?.(true),
        onLeave: () => onCarouselActiveChange?.(false),
        onEnterBack: () => onCarouselActiveChange?.(true),
        onLeaveBack: () => onCarouselActiveChange?.(false),
      },
    });

    // Zoom
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

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, onCarouselActiveChange]); // Agregar isMobile a las dependencias

  return (
    <section ref={sectionRef} className="w-full bg-white p-[15px]">
      {/* TITULOS - CENTRADOS */}
      <div className="bg-white py-12 px-6  items-center w-full ">
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

      {/* CARRUSEL HORIZONTAL - Para todas las pantallas */}
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
