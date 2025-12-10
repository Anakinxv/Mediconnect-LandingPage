import HeroImage from "../../../assets/HeroImage.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MediButton from "@/components/common/MediButton";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

import { useIsMobile } from "@/hooks/useIsMobile";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
gsap.registerPlugin(ScrollTrigger);

function HeroImageSection() {
  const isMobile = useIsMobile();
  const { t } = useTranslation("landing");
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);

  // Mostrar navbar fijo en mobile solo al pasar el Hero
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const hero = document.getElementById("hero-container");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setShowFixedNavbar(heroBottom <= 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useGSAP(() => {
    gsap.fromTo(
      "#hero-image",
      { scale: 1.3, opacity: 1 }, // <-- opacity: 1 para evitar parpadeo
      { duration: 1.2, scale: 1, opacity: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      "#navbar",
      { y: -100, opacity: 0 },
      { duration: 1, y: 0, opacity: 1, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      "#info-content > *",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.15 },
        delay: 0.2,
      }
    );

    // Animación de scroll - SOLO EN DESKTOP
    if (!isMobile) {
      gsap.to("#hero-container", {
        padding: "0px",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#hero-container",
          start: "top top",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      gsap.to("#hero-image", {
        borderRadius: "0px",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#hero-container",
          start: "top top",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      // Control del navbar fijo - SOLO EN DESKTOP
      ScrollTrigger.create({
        trigger: "#hero-container",
        start: "50% top",
        end: "bottom top",
        onUpdate: (self) => {
          const scrollDirection = self.direction;
          const progress = self.progress;

          if (progress > 0 && scrollDirection === -1) {
            gsap.to("#fixed-navbar", {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power3.out",
            });
          } else {
            gsap.to("#fixed-navbar", {
              y: -100,
              opacity: 0,
              duration: 0.3,
              ease: "power3.out",
            });
          }
        },
      });

      ScrollTrigger.create({
        trigger: "#hero-container",
        start: "50% top",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to("#navbar", {
              opacity: 0,
              y: -50,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.to("#navbar", {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
      });

      gsap.set("#fixed-navbar", { y: -100, opacity: 0 });
    }
  }, [isMobile]);

  return (
    <>
      {/* Solo mostrar el fixed-navbar en mobile si showFixedNavbar es true */}
      {isMobile ? (
        showFixedNavbar && <MobileNavbar id="fixed-navbar" isFixed={true} />
      ) : (
        <Navbar id="fixed-navbar" isFixed={true} />
      )}

      <div
        id="hero-container"
        className={`h-dvh w-full box-border flex items-center justify-center bg-white ${
          isMobile ? "" : "p-[15px]"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center ">
          {" "}
          {/* <-- color de fondo suave */}
          <img
            src={HeroImage}
            id="hero-image"
            alt="Hero"
            className={`object-cover pointer-events-none z-0 ${
              isMobile
                ? "absolute top-0 left-0 w-full h-full object-right"
                : "rounded-[35px] w-full h-full"
            }`}
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6 z-10">
            {isMobile ? (
              <MobileNavbar id="navbar" isFixed={false} />
            ) : (
              <Navbar id="navbar" isFixed={false} />
            )}

            <div
              className={`flex flex-col items-start justify-end h-full px-6 gap-4 ${
                isMobile ? "max-w-md" : ""
              }`}
              id="info-content"
            >
              <h4
                className={`tracking-wide ${
                  isMobile ? "text-base" : "text-xl"
                } font-regular text-background`}
              >
                {t("hero.welcome")}
              </h4>
              <h1
                className={`${
                  isMobile ? "text-3xl" : "text-6xl"
                } font-medium text-background`}
                dangerouslySetInnerHTML={{ __html: t("hero.title") }}
              />
              <p
                className={`font-medium text-background ${
                  isMobile ? "text-base max-w-xs" : "text-xl max-w-xl"
                }`}
              >
                {t("hero.description")}
              </p>
              <div className="flex gap-4">
                <MediButton
                  variant="primary"
                  className={`bg-white text-primary ${
                    isMobile
                      ? "active:scale-95 active:opacity-90 transition-all duration-150"
                      : ""
                  }`}
                >
                  {t("hero.connect")}
                </MediButton>
                <MediButton
                  variant="secondary"
                  className={`text-white bg-transparent border-white ${
                    isMobile
                      ? "active:scale-95 active:bg-white/10 transition-all duration-150"
                      : ""
                  }`}
                >
                  {t("hero.startNow")}
                </MediButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroImageSection;
