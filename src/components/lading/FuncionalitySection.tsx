import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/useIsMobile";
import FuncionalityCards from "./sectionsComponents/FuncionalityCards";

gsap.registerPlugin(ScrollTrigger);

function FuncionalitySection() {
  const { t } = useTranslation("landing");
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
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
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="w-full bg-white p-[15px]">
      {/* TITULOS - CENTRADOS */}
      <div className="bg-white py-12 px-6 items-center w-full">
        <div className="flex flex-col items-center text-center gap-2">
          <h4
            ref={titleRef}
            className="tracking-wide text-lg font-regular text-primary"
          >
            Funcionalidades
          </h4>
          <h1
            ref={subtitleRef}
            className={`${
              isMobile ? "text-3xl" : "text-6xl"
            } font-medium text-primary mb-4`}
          >
            Soluciones inteligentes, claras y conectadas
          </h1>
          <p
            ref={textRef}
            className="font-normal text-lg text-primary w-full max-w-2xl"
          >
            Diseñadas para ofrecer herramientas modernas que elevan la atención
            médica y hacen todo el proceso más eficiente y seguro.
          </p>
        </div>
      </div>
      <div>
        <FuncionalityCards />
      </div>
    </section>
  );
}

export default FuncionalitySection;
