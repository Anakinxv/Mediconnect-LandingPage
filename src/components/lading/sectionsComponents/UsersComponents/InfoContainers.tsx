import MediButton from "@/components/common/MediButton";

import { useEffect, useState, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

interface InfoContainersProps {
  userType?: "patient" | "doctor" | "center";
}

function InfoContainers({ userType = "patient" }: InfoContainersProps) {
  const { t } = useTranslation("landing");

  const [currentType, setCurrentType] = useState(userType);

  useEffect(() => {
    setCurrentType(userType);
  }, [userType]);

  const getContent = () => {
    const type = currentType;
    return {
      subtitle: t("users.title"),
      title: t(`users.${type}.title`),
      description: t(`users.${type}.description`),
      benefits: t(`users.${type}.benefits`, {
        returnObjects: true,
      }) as string[],
      indicator: type === "patient" ? "1" : type === "doctor" ? "2" : "3",
      buttons: {
        primary: t(`users.${type}.buttons.primary`),
        secondary: t(`users.${type}.buttons.secondary`),
      },
    };
  };

  const content = getContent();

  // 🔥 REFS PARA EL TIMELINE
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonsRef = useRef(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  // 🔥 TIMELINE GSAP
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Inicia más temprano para transición suave
        end: "bottom 20%", // Termina más tarde
        scrub: 1.2, // Vincula la animación al scroll con suavizado
        toggleActions: "play pause resume reverse",
        once: false, // Permite reversión
        anticipatePin: 1,
      },
    });

    // Animación más suave con easing personalizado
    tl.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.95,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",
      },
    )
      .fromTo(
        [subtitleRef.current, titleRef.current, descriptionRef.current],
        {
          opacity: 0,
          y: 40,
          x: -30,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=1.2",
      )
      .fromTo(
        listRef.current ? Array.from(listRef.current.children) : [],
        {
          opacity: 0,
          x: -50,
          rotationY: -15,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .fromTo(
        buttonsRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.6",
      )
      .fromTo(
        indicatorsRef.current?.children ?? [],
        {
          opacity: 0,
          y: 20,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(2)",
        },
        "-=0.4",
      );
  });

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-full p-8 bg-accent rounded-4xl ">
      <div className="flex flex-col w-full gap-2 max-w-full sm:max-w-md">
        <h4
          ref={subtitleRef}
          className={`
            tracking-wide font-regular text-primary
            text-base sm:text-lg md:text-xl
          `}
        >
          {content.subtitle}
        </h4>

        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-primary"
        >
          {content.title}
        </h2>

        <p
          ref={descriptionRef}
          className="text-base sm:text-lg md:text-xl text-primary font-regular"
        >
          {content.description}
        </p>
      </div>

      {/* Lista */}
      <div className="w-full max-w-full sm:max-w-md">
        <h4 className="text-base sm:text-lg font-medium text-primary mb-2 sm:mb-4">
          Incluye:
        </h4>
        <ul
          ref={listRef}
          className="list-disc list-inside text-primary space-y-2 text-sm sm:text-base"
        >
          {content.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {/* Botones */}
      <div
        ref={buttonsRef}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-full sm:max-w-md"
      >
        <MediButton variant="primary" className="w-full sm:w-auto">
          {content.buttons.primary}
        </MediButton>
        <MediButton variant="secondary" className="w-full sm:w-auto">
          {content.buttons.secondary}
        </MediButton>
      </div>

      {/* Indicadores */}
      {/* <div
        ref={indicatorsRef}
        className="flex w-full max-w-full sm:max-w-md justify-start gap-2 mt-2 sm:mt-4"
      >
        <div className="w-8 h-8 flex items-center justify-center text-md text-primary border border-primary rounded-full font-medium">
          {content.indicator}
        </div>
        <p
          className={`w-8 h-8 flex items-center justify-center text-md font-medium rounded-full m-0
            ${
              currentType === "center"
                ? "text-primary border border-primary"
                : "text-primary opacity-40 border border-primary/30 pointer-events-none select-none"
            }
          `}
        >
          3
        </p>
      </div> */}
    </div>
  );
}

export default InfoContainers;
