import { useRef } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

import TestimonialsCards from "./sectionsComponents/TestimonialsCards";
gsap.registerPlugin(ScrollTrigger);

function TestimonialsSection() {
  const isMobile = useIsMobile();
  const { t } = useTranslation("landing");
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const mainImageRef = useRef(null);
  const asideImageRef = useRef(null);

  useGSAP(
    () => {
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

      gsap.fromTo(
        mainImageRef.current,
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
            trigger: mainImageRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      if (!isMobile && asideImageRef.current) {
        gsap.fromTo(
          asideImageRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 60,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: asideImageRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <main className="p-[15px] flex justify-center">
      <main
        ref={containerRef}
        className="bg-white py-12 px-6 gap-2 items-center w-full"
      >
        <div className="flex flex-col gap-6 w-full h-full">
          <h4
            ref={titleRef}
            className="tracking-wide text-lg font-regular text-primary"
          >
            Testimonios
          </h4>
          <div
            className={`w-full ${
              isMobile ? "flex flex-col" : "grid grid-cols-[65%_35%]"
            } items-start gap-4`}
          >
            <h1
              ref={subtitleRef}
              className={`${
                isMobile ? "text-3xl" : "text-6xl"
              } font-medium text-primary mb-4 w-full`}
            >
              Únete a quienes cuidan su salud
            </h1>
          </div>
          <div className="flex">
            <TestimonialsCards />
          </div>
        </div>
      </main>
    </main>
  );
}

export default TestimonialsSection;
