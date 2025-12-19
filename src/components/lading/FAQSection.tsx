import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/useIsMobile";
import FAQImage from "@/assets/faq.png";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

function FAQSection() {
  const { t } = useTranslation("landing");
  const isMobile = useIsMobile();

  // Refs para las animaciones
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  // Obtener los items de FAQ traducidos
  const faqItems = t("faq.items", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

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

      // Animación de la imagen FAQ (idéntica a AboutSection)
      gsap.fromTo(
        imageRef.current,
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
            trigger: imageRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación del acordeón FAQ (idéntica a AboutSection)
      gsap.fromTo(
        accordionRef.current,
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
            trigger: accordionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <main className="p-[15px] flex justify-center w-full">
      <section
        ref={containerRef}
        className="bg-white py-12 px-6 items-center w-full"
      >
        <div
          className={`flex  ${
            isMobile ? "flex-col gap-6" : "grid grid-cols-2 gap-4"
          } w-full h-full`}
        >
          {/* CONTENIDO IZQUIERDO */}
          <div className="flex flex-col gap-2 w-full h-full justify-between">
            {/* TÍTULOS */}
            <div
              className={`flex flex-col ${
                isMobile ? "items-center text-center" : "items-start text-start"
              } gap-2`}
            >
              <h4
                ref={titleRef}
                className="tracking-wide text-lg font-regular text-primary"
              >
                {t("faq.title")}
              </h4>
              <h1
                ref={subtitleRef}
                className={`${
                  isMobile ? "text-3xl" : "text-6xl"
                } font-medium text-primary mb-4`}
              >
                {t("faq.heading")}
              </h1>
              <p
                ref={textRef}
                className="font-normal text-lg text-primary mb-4"
              >
                {t("faq.description")}
              </p>
            </div>

            {/* IMAGEN */}
            <div
              ref={imageRef}
              className="overflow-hidden inline-block rounded-4xl w-full"
            >
              <img
                src={FAQImage}
                alt="FAQ"
                className="rounded-4xl w-full h-[300px] object-cover shadow-lg hover:scale-115 transition-transform duration-500"
              />
            </div>
          </div>

          {/* CONTENIDO DERECHO - ACCORDION */}
          <div className="flex items-start justify-center w-full h-full">
            <Accordion
              ref={accordionRef}
              type="single"
              collapsible
              className="w-full rounded-2xl flex flex-col gap-2 h-full justify-between"
            >
              {faqItems.map((item, idx) => (
                <AccordionItem
                  value={`item-${idx}`}
                  key={idx}
                  className="bg-[#ecf6e8dc]/80 p-4 rounded-lg shadow-none border-0"
                >
                  <AccordionTrigger className="text-primary text-md font-medium w-fit">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-primary text-md">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQSection;
