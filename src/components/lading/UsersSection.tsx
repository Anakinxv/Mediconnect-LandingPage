import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRef } from "react";

import InfoContainers from "./sectionsComponents/UsersComponents/InfoContainers";
import PhotoContainers from "./sectionsComponents/UsersComponents/PhotoContainers";

gsap.registerPlugin(ScrollTrigger);

function UsersSection() {
  const isMobile = useIsMobile();
  const { t } = useTranslation("landing");

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const patientRef = useRef<HTMLDivElement>(null);
  const doctorRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

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

      // Animación del bloque de pacientes
      gsap.fromTo(
        patientRef.current,
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: patientRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación del bloque de doctores
      gsap.fromTo(
        doctorRef.current,
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: doctorRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación del bloque de centros
      gsap.fromTo(
        centerRef.current,
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: centerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <main className="p-[15px] flex justify-center">
      <section
        ref={containerRef}
        className="bg-white py-12 px-6 gap-2 items-center w-full"
      >
        <div className="flex flex-col gap-6 w-full px-6 h-full">
          {/* TITULOS - CENTRADOS */}
          <div className="flex flex-col items-center text-center gap-4">
            <h4
              ref={titleRef}
              className="tracking-wide text-xl font-regular text-primary"
            >
              {t("users.title")}
            </h4>

            <h1
              ref={subtitleRef}
              className={`${
                isMobile ? "text-4xl" : "text-7xl"
              } font-medium text-primary`}
              dangerouslySetInnerHTML={{ __html: t("users.subtitle") }}
            ></h1>

            <p
              ref={textRef}
              className={`font-normal text-xl text-primary ${
                isMobile ? "w-full" : "max-w-3xl"
              }`}
            >
              {t("users.description")}
            </p>
          </div>

          {/* BLOQUES DE USUARIOS */}
          <div className="flex flex-col gap-28 w-full mt-10">
            {/* PACIENTES */}
            <div
              ref={patientRef}
              className={`w-full h-[700px] ${
                isMobile ? "flex flex-col" : "grid grid-cols-2"
              } gap-10`}
            >
              <InfoContainers userType="patient" />
              <PhotoContainers userType="patient" />
            </div>

            {/* MÉDICOS */}
            <div
              ref={doctorRef}
              className={`w-full h-[700px] ${
                isMobile ? "flex flex-col" : "grid grid-cols-2"
              } gap-10`}
            >
              <PhotoContainers userType="doctor" />
              <InfoContainers userType="doctor" />
            </div>

            {/* CENTROS */}
            <div
              ref={centerRef}
              className={`w-full h-[700px] ${
                isMobile ? "flex flex-col" : "grid grid-cols-2"
              } gap-10`}
            >
              <InfoContainers userType="center" />
              <PhotoContainers userType="center" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UsersSection;
