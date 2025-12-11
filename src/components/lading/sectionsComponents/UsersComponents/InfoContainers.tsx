import MediButton from "@/components/common/MediButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface InfoContainersProps {
  userType?: "patient" | "doctor" | "center";
}

function InfoContainers({ userType = "patient" }: InfoContainersProps) {
  const isMobile = useIsMobile();
  const [currentType, setCurrentType] = useState(userType);

  useEffect(() => {
    setCurrentType(userType);
  }, [userType]);

  const getContent = () => {
    switch (currentType) {
      case "patient":
        return {
          subtitle: "Hecho para ti, según lo que necesitas",
          title: "Pacientes",
          description: "Atención rápida, simple y accesible.",
          benefits: [
            "Agenda tus citas médicas en segundos",
            "Consulta tu historial desde cualquier dispositivo",
            "Recibe recordatorios automáticos de citas",
            "Realiza teleconsultas con médicos de confianza",
            "Todo disponible 24/7",
          ],
          indicator: "1",
        };

      case "doctor":
        return {
          subtitle: "Optimiza tu práctica médica",
          title: "Médicos",
          description: "Gestión eficiente de pacientes y consultas.",
          benefits: [
            "Gestiona tu agenda de forma inteligente",
            "Accede al historial completo de tus pacientes",
            "Realiza teleconsultas desde cualquier lugar",
            "Automatiza recordatorios y seguimientos",
            "Herramientas de diagnóstico integradas",
          ],
          indicator: "2",
        };

      case "center":
        return {
          subtitle: "Solución integral para tu centro",
          title: "Centros Médicos",
          description: "Administración completa y centralizada.",
          benefits: [
            "Gestiona múltiples médicos y especialidades",
            "Sistema de facturación integrado",
            "Reportes y estadísticas en tiempo real",
            "Control de inventario médico",
            "Cumplimiento normativo automatizado",
          ],
          indicator: "3",
        };

      default:
        return getContent();
    }
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
        start: "top 85%",
        toggleActions: "play none none none", // No reverse
        once: true, // Solo una vez
      },
    });

    tl.from(containerRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.4, // Más rápido
      ease: "power3.out",
    })
      .from(
        [subtitleRef.current, titleRef.current],
        {
          opacity: 0,
          y: 12,
          duration: 0.25, // Más rápido
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .from(
        descriptionRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.15"
      )
      .from(
        listRef.current ? listRef.current.children : [],
        {
          opacity: 0,
          x: -10,
          duration: 0.2,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.15"
      )
      .from(
        buttonsRef.current,
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.18,
          ease: "back.out(1.8)",
        },
        "-=0.1"
      )
      .from(
        indicatorsRef.current?.children ?? [],
        {
          opacity: 0,
          y: 8,
          duration: 0.15,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.1"
      );
  });

  return (
    <div
      ref={containerRef}
      className={`flex flex-col justify-center items-center gap-6 w-full p-25 bg-accent rounded-[35px] `}
    >
      <div className="flex flex-col w-full max-w-md gap-2">
        <h4
          ref={subtitleRef}
          className={`tracking-wide ${
            isMobile ? "text-base" : "text-lg"
          } font-regular text-primary`}
        >
          {content.subtitle}
        </h4>

        <h2 ref={titleRef} className="text-3xl font-medium text-primary">
          {content.title}
        </h2>

        <p ref={descriptionRef} className="text-lg text-primary font-regular">
          {content.description}
        </p>
      </div>

      {/* Lista */}
      <div className="w-full max-w-md">
        <h4 className="text-lg font-medium text-primary mb-4">Incluye:</h4>

        <ul
          ref={listRef}
          className="list-disc list-inside text-primary space-y-2"
        >
          {content.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {/* Botones */}
      <div ref={buttonsRef} className="flex gap-4 w-full max-w-md">
        <MediButton variant="primary">Comenzar a Gestionar</MediButton>
        <MediButton variant="secondary">Configurar</MediButton>
      </div>

      {/* Indicadores */}
      <div
        ref={indicatorsRef}
        className="flex w-full max-w-md justify-start gap-2 mt-4"
      >
        <div className="w-8 h-8 flex items-center justify-center text-md text-primary border border-primary rounded-full font-medium">
          {content.indicator}
        </div>
        <div className="w-8 h-8 flex items-center justify-center text-md text-primary opacity-70 border border-primary rounded-full font-medium">
          3
        </div>
      </div>
    </div>
  );
}

export default InfoContainers;
