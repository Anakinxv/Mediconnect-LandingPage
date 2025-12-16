import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "../../../hooks/useIsMobile";
import testimonialImage1 from "@/assets/Funcionality-01.png";
gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    name: "Sarah M.",
    service: "Diagnósticos Avanzados",
    testimonial:
      "Los diagnósticos avanzados de Sanaris me dieron una claridad y una tranquilidad que nunca antes había tenido.",
    avatar: testimonialImage1, // Usa la imagen local
  },
  {
    name: "Carlos R.",
    service: "Telemedicina",
    testimonial:
      "La atención médica a distancia me permitió recibir cuidados de calidad sin salir de casa.",
    avatar: testimonialImage1, // Usa la imagen local
  },
  {
    name: "María L.",
    service: "Consulta Especializada",
    testimonial:
      "El seguimiento personalizado y la atención del equipo médico superó todas mis expectativas.",
    avatar: testimonialImage1, // Usa la imagen local
  },
];

function TestimonialsCards() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      cardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.02,
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`w-full ${
        isMobile
          ? "flex flex-col gap-4"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      }`}
    >
      {testimonialsData.map((testimonial, index) => (
        <div
          key={index}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="bg-[#F5FAF3] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
        >
          <div className="flex items-start gap-4 mb-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg">
                {testimonial.name}
              </h4>
              <p className="text-primary font-medium text-sm">
                {testimonial.service}
              </p>
            </div>
          </div>
          <blockquote className="text-gray-700 leading-relaxed italic">
            "{testimonial.testimonial}"
          </blockquote>
        </div>
      ))}
    </div>
  );
}

export default TestimonialsCards;
