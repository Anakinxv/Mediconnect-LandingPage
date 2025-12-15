import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  PiggyBank,
  ClipboardList,
  RefreshCw,
  Lock,
  Target,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTranslation } from "react-i18next"; // <-- Agrega esto

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Mapea los íconos a los ids
const benefitIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  acceso: Zap,
  ahorro: PiggyBank,
  historial: ClipboardList,
  atencion: RefreshCw,
  comunicacion: Lock,
  decisiones: Target,
  gestion: BarChart3,
  experiencia: Sparkles,
};

const benefitImages: Record<string, string> = {
  acceso:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",
  ahorro:
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=800&fit=crop",
  historial:
    "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&h=800&fit=crop",
  atencion:
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=800&fit=crop",
  comunicacion:
    "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=1200&h=800&fit=crop",
  decisiones:
    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200&h=800&fit=crop",
  gestion:
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop",
  experiencia:
    "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&h=800&fit=crop",
};

interface BenefitsSectionProps {
  onCarouselActiveChange?: (isActive: boolean) => void;
}

export const IndustryCarousel = ({
  onCarouselActiveChange,
}: BenefitsSectionProps) => {
  const { t } = useTranslation("landing");

  const benefits: Benefit[] = (
    t("benefitsSection.items", {
      returnObjects: true,
    }) as any[]
  ).map((item: any) => ({
    ...item,
    icon: benefitIcons[item.id],
    image: benefitImages[item.id],
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const photosContainerRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const getVisibleItems = () => {
    const items: { index: number; position: number }[] = [];

    // En mobile, mostrar solo el elemento activo
    if (isMobile) {
      items.push({ index: activeIndex, position: 0 });
      return items;
    }

    // Lógica desktop existente
    if (activeIndex === 0) {
      items.push({ index: 0, position: 0 });
      if (benefits.length > 1) {
        items.push({ index: 1, position: 1 });
      }
    } else if (activeIndex === benefits.length - 1) {
      if (benefits.length > 1) {
        items.push({ index: activeIndex - 1, position: 0 });
      }
      items.push({ index: activeIndex, position: 1 });
    } else {
      items.push({ index: activeIndex - 1, position: 0 });
      items.push({ index: activeIndex, position: 1 });
      items.push({ index: activeIndex + 1, position: 2 });
    }

    return items;
  };

  const visibleItems = getVisibleItems();
  const current = benefits[activeIndex];

  // Lógica para dots verticales (solo mobile)
  const getDotsRange = () => {
    const totalItems = benefits.length;
    const maxVisible = 5;

    if (totalItems <= maxVisible) {
      return [0, totalItems - 1];
    }

    const half = Math.floor(maxVisible / 2);

    if (activeIndex < half) {
      return [0, maxVisible - 1];
    } else if (activeIndex >= totalItems - half) {
      return [totalItems - maxVisible, totalItems - 1];
    } else {
      return [activeIndex - half, activeIndex + half];
    }
  };

  // Lógica mejorada para el carrusel horizontal inferior (solo desktop)
  const getNavRange = () => {
    const totalItems = benefits.length;
    const maxVisible = Math.min(5, totalItems); // Máximo 5 elementos visibles

    // Si tenemos 5 o menos elementos, mostrar todos
    if (totalItems <= maxVisible) {
      return [0, totalItems - 1];
    }

    const half = Math.floor(maxVisible / 2); // 2 para maxVisible = 5

    // Casos especiales para mantener siempre 5 elementos visibles
    if (activeIndex < half) {
      // Al inicio: mostrar 0, 1, 2, 3, 4
      return [0, maxVisible - 1];
    } else if (activeIndex >= totalItems - half) {
      // Al final: mostrar los últimos 5
      return [totalItems - maxVisible, totalItems - 1];
    } else {
      // En el medio: centrar el activeIndex
      return [activeIndex - half, activeIndex + half];
    }
  };

  const [dotsStart, dotsEnd] = getDotsRange();
  const [navStart, navEnd] = getNavRange();

  useEffect(() => {
    if (
      !sectionRef.current ||
      !containerRef.current ||
      !photosContainerRef.current
    )
      return;

    const totalSections = benefits.length;
    const sectionHeight = window.innerHeight;

    // Ajustar la altura para permitir scroll hacia la siguiente sección
    containerRef.current.style.height = `${sectionHeight * totalSections}px`;

    const photos = gsap.utils.toArray<HTMLElement>(
      ".carousel-photo:not(:first-child)"
    );
    const allPhotos = gsap.utils.toArray<HTMLElement>(".carousel-photo");

    gsap.set(photos, { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 });

    const triggers: ScrollTrigger[] = [];

    // Pin trigger con límites más claros
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${sectionHeight * (totalSections - 1)}`, // Reducir el end para evitar loop
      pin: sectionRef.current,
      pinSpacing: true, // Cambiar a true para mantener el espacio
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        console.log("Benefits carousel activated");
        onCarouselActiveChange?.(true);
      },
      onLeave: () => {
        console.log("Benefits carousel deactivated");
        onCarouselActiveChange?.(false);
      },
      onEnterBack: () => {
        console.log("Benefits carousel activated (back)");
        onCarouselActiveChange?.(true);
      },
      onLeaveBack: () => {
        console.log("Benefits carousel deactivated (back)");
        onCarouselActiveChange?.(false);
      },
    });
    triggers.push(pinTrigger);

    // Triggers para cambiar de imagen con límites más específicos
    benefits.forEach((_, index) => {
      if (index === 0) return;

      const animation = gsap.timeline().to(allPhotos[index], {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        duration: 1.5,
        ease: "power2.inOut",
      });

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: () => `top+=${(index - 0.5) * sectionHeight} top`,
        end: () => `top+=${(index + 0.5) * sectionHeight} top`,
        animation: animation,
        scrub: 1,
        onEnter: () => updateActiveIndex(index),
        onEnterBack: () => updateActiveIndex(index - 1),
      });

      triggers.push(trigger);
    });

    // Trigger adicional para detectar cuando sales de la sección completamente
    const exitTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `bottom+=${sectionHeight * 0.2} top`, // Margen para salir
      onLeave: () => {
        console.log("Completely left benefits section");
        onCarouselActiveChange?.(false);
      },
      onLeaveBack: () => {
        console.log("Completely left benefits section (back)");
        onCarouselActiveChange?.(false);
      },
    });
    triggers.push(exitTrigger);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      onCarouselActiveChange?.(false);
    };
  }, [isMobile, onCarouselActiveChange, benefits.length]); // Agregar benefits.length como dependencia

  const updateActiveIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= benefits.length) return;

    if (infoCardRef.current && !isMobile) {
      gsap.to(infoCardRef.current, {
        y: 15,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(newIndex);
          gsap.to(infoCardRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    } else {
      setActiveIndex(newIndex);
    }
  };

  const handleNavClick = (index: number) => {
    if (index === activeIndex) return;

    // En mobile y desktop, navegar con scroll
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const sectionHeight = window.innerHeight;
    const targetScrollPosition = containerTop + index * sectionHeight;

    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
    });
  };

  if (isMobile) {
    return (
      <div ref={containerRef} className="relative bg-primary">
        <div
          ref={sectionRef}
          className="h-screen flex items-center justify-center bg-primary"
        >
          <div className="relative w-full h-full max-w-lg ">
            {/* Título arriba al centro */}
            <div className="absolute top-8 left-0 right-0 z-50 flex flex-col items-center text-3xl font-semibold text-white gap-2">
              {t("benefitsSection.title")}
              <h2 className="text-white text-xl font-medium text-center">
                {current.name}
              </h2>
            </div>

            {/* Dots verticales con glass background */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 z-50">
              <div className="flex flex-col gap-2 px-2 py-3 rounded-full border border-white/20 bg-black/10 backdrop-blur-md">
                {benefits.slice(dotsStart, dotsEnd + 1).map((_, idx) => {
                  const index = dotsStart + idx;
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavClick(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === activeIndex
                          ? "bg-white scale-125 shadow-lg"
                          : "bg-white/40 hover:bg-white/70"
                      )}
                    />
                  );
                })}
              </div>
            </div>

            {/* Container de imágenes centrado */}
            <div ref={photosContainerRef} className="absolute inset-4">
              {/* Overlay oscuro solo en mobile */}
              <div className="absolute inset-0 bg-black/10 rounded-2xl pointer-events-none md:hidden z-20" />
              {benefits.map((benefit, index) => (
                <img
                  key={benefit.id}
                  src={benefit.image}
                  alt={benefit.name}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 rounded-2xl",
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    zIndex: index === activeIndex ? 10 : 1,
                  }}
                />
              ))}
            </div>

            {/* Info card abajo con glass background mejorado */}
            <div
              ref={infoCardRef}
              className="absolute bottom-8 left-10 right-10 px-4 py-3 rounded-2xl border border-white/30 bg-black/20 backdrop-blur-xl shadow-2xl z-50"
            >
              <p className="text-white text-sm font-normal tracking-wide text-center leading-relaxed">
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-primary ">
      <div
        ref={sectionRef}
        className="h-screen md:p-8 flex items-center justify-center bg-primary"
      >
        <div className="w-full h-full gap-4 p-4 grid grid-cols-1 lg:grid-cols-12 md:p-10">
          {/* Left Panel */}
          <div className="bg-[#F5FAF3] rounded-2xl flex flex-col justify-between relative overflow-hidden p-6 md:p-10 lg:col-span-5">
            <div className="text-center ">
              <p className="text-primary font-medium text-xl">
                {" "}
                {t("benefitsSection.title")}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center  py-6">
              <div className="space-y-3 text-center">
                {visibleItems.map((item) => (
                  <div
                    key={item.index}
                    onClick={() => handleNavClick(item.index)}
                    className={cn(
                      "cursor-pointer transition-all duration-500 text-primary",
                      visibleItems.length === 2 && activeIndex === 0
                        ? item.position === 0
                          ? "text-2xl md:text-3xl font-semibold scale-105"
                          : "text-lg md:text-xl opacity-30"
                        : visibleItems.length === 2 &&
                          activeIndex === benefits.length - 1
                        ? item.position === 1
                          ? "text-2xl md:text-3xl font-semibold scale-105"
                          : "text-lg md:text-xl opacity-30"
                        : item.position === 1
                        ? "text-2xl md:text-3xl font-semibold scale-105"
                        : "text-lg md:text-xl opacity-30"
                    )}
                  >
                    {benefits[item.index].name}
                  </div>
                ))}
              </div>
            </div>

            {/* Navegación horizontal con nombres de beneficios (Desktop) */}
            <div className="flex justify-center gap-2 overflow-hidden">
              <div className="flex gap-2 transition-all duration-500 ease-out">
                {benefits.slice(navStart, navEnd + 1).map((benefit, idx) => {
                  const index = navStart + idx;
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={benefit.id}
                      onClick={() => handleNavClick(index)}
                      className={cn(
                        "transition-all duration-500 cursor-pointer relative text-xs",
                        isActive
                          ? "text-card-foreground font-medium opacity-100"
                          : "text-card-foreground/40 hover:text-card-foreground/60 opacity-60"
                      )}
                    >
                      {benefit.name}
                      {isActive && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-1 bg-card-foreground rounded-full opacity-80 -bottom-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative rounded-2xl overflow-hidden lg:col-span-7 min-h-[400px]">
            <div ref={photosContainerRef} className="absolute inset-0">
              {benefits.map((benefit, index) => (
                <img
                  key={benefit.id}
                  src={benefit.image}
                  alt={benefit.name}
                  className="absolute inset-0 w-full h-full object-cover carousel-photo"
                  style={{ zIndex: index }}
                />
              ))}
            </div>

            {/* Glass Info Card */}
            <div
              ref={infoCardRef}
              className="absolute bottom-6 right-6 md:bottom-10 md:right-8 max-w-lg px-5 py-4 md:px-7 md:py-5 rounded-2xl border border-white/30 bg-black/20 backdrop-blur-xl shadow-2xl z-50"
            >
              <p className="text-white font-normal tracking-wide text-left drop-shadow-lg leading-relaxed text-sm md:text-base">
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryCarousel;
