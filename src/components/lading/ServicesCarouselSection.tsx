import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "gsap/all";
import { useIsMobile } from "../../hooks/useIsMobile";
import service1 from "@/assets/ServicesCarousel/service-1.png";
import service2 from "@/assets/ServicesCarousel/service-2.png";
import service3 from "@/assets/ServicesCarousel/service-3.png";
import service4 from "@/assets/ServicesCarousel/service-4.png";
import service5 from "@/assets/ServicesCarousel/service-5.png";
import service6 from "@/assets/ServicesCarousel/service-6.png";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { image: service1, title: "Telehealth Services" },
  { image: service2, title: "Rehabilitation" },
  { image: service3, title: "Healthcare Solutions" },
  { image: service4, title: "Medical Device" },
  { image: service5, title: "Diagnostics" },
  { image: service6, title: "Patient Care" },
];

function ServicesCarouselSection() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const infiniteTimeline = useRef<gsap.core.Timeline | null>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Siempre usa 700px de ancho para todos los dispositivos
  const itemWidth = 700;
  const originalSetWidth = itemWidth * servicesData.length;

  // Triple services for seamless infinite loop
  const tripleServices = [...servicesData, ...servicesData, ...servicesData];

  useGSAP(() => {
    if (!sliderRef.current) return;

    // Set initial position to show the middle set
    gsap.set(sliderRef.current, { x: -originalSetWidth });

    // Más rápido: duration menor (por ejemplo, 20 segundos)
    infiniteTimeline.current = gsap.timeline({ repeat: -1 });
    infiniteTimeline.current.to(sliderRef.current, {
      x: -originalSetWidth * 2,
      duration: 60,
      ease: "none",
      modifiers: {
        x: (x) => {
          const currentX = parseFloat(x);
          if (currentX <= -originalSetWidth * 2) {
            gsap.set(sliderRef.current, { x: -originalSetWidth });
            return (-originalSetWidth).toString() + "px";
          }
          return x;
        },
      },
    });

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }
    );

    // Animación alternada para los servicios (solo el set central)
    gsap.fromTo(
      serviceRefs.current.slice(servicesData.length, servicesData.length * 2),
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <main className="flex w-full justify-center">
      <section
        ref={containerRef}
        className="bg-white py-12 px-6 gap-2 items-center w-full"
      >
        <div className="relative overflow-hidden ">
          <div
            ref={sliderRef}
            className="flex gap-4 "
            style={{
              width: `${tripleServices.length * itemWidth}px`,
            }}
          >
            {tripleServices.map((service, index) => (
              <div
                key={`${service.title}-${index}`}
                ref={(el) => {
                  if (el) serviceRefs.current[index] = el;
                }}
                className="flex items-center gap-4 py-6"
                onMouseEnter={() => {
                  if (infiniteTimeline.current) {
                    infiniteTimeline.current.timeScale(0.2);
                  }
                }}
                onMouseLeave={() => {
                  if (infiniteTimeline.current) {
                    infiniteTimeline.current.timeScale(1);
                  }
                }}
              >
                {/* Service Image */}
                <div className="w-[350px] h-[100px] overflow-hidden rounded-full flex-shrink-0 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Circular Title Pill */}
                <div className="bg-[#F5FAF3] w-[350px] h-[100px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300  hover:bg-[#ecf6e8]">
                  <span className="text-primary font-semibold text-3xl px-4 text-center">
                    {service.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServicesCarouselSection;
