import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/useIsMobile";
import FuncionalityCards from "./sectionsComponents/FuncionalityCards";

gsap.registerPlugin(ScrollTrigger);

function FuncionalitySection() {
  const { t } = useTranslation("landing");
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

      // Animación escalonada para cada tarjeta de funcionalidad
      const cards = gsap.utils.toArray<HTMLElement>(".funcionality-card");
      gsap.fromTo(
        cards,
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
          stagger: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Refresca ScrollTrigger para asegurar que detecta los nuevos elementos
      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <main className="p-[15px] flex w-full justify-center">
      <section
        ref={containerRef}
        className="bg-white py-12 px-6 gap-2 items-center w-full"
      >
        <div className="flex flex-col gap-6 w-full h-full">
          {/* TÍTULOS - CENTRADOS */}
          <div className="flex flex-col items-center text-center gap-4">
            <h4
              ref={titleRef}
              className="tracking-wide text-lg font-regular text-primary"
            >
              {t("functionality.title")}
            </h4>

            <h1
              ref={subtitleRef}
              className={`${
                isMobile ? "text-3xl" : "text-6xl"
              } font-medium text-primary mb-4`}
            >
              {t("functionality.subtitle")}
            </h1>

            <p
              ref={textRef}
              className="font-normal text-lg text-primary mb-4 w-full max-w-2xl"
            >
              {t("functionality.description")}
            </p>
          </div>

          {/* FUNCTIONALITY CARDS */}
          <div
            ref={cardsRef}
            className="flex w-full justify-center items-center"
          >
            <FuncionalityCards />
          </div>
        </div>
      </section>
    </main>
  );
}

export default FuncionalitySection;
