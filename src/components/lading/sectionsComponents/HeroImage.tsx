import HeroImage from "../../../assets/HeroImage.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MediButton from "@/components/common/MediButton";
import Navbar from "./Navbar";
import NavbarMobile from "./Navbar-Mobile";
import { useIsMobile } from "@/hooks/useIsMobile";

function HeroImageSection() {
  const isMobile = useIsMobile();

  useGSAP(() => {
    gsap.fromTo(
      "#hero-image",
      { scale: 1.3, opacity: 0 },
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
  });

  return (
    <div
      className={`h-dvh w-full box-border flex items-center justify-center bg-white ${
        isMobile ? "" : "p-[15px]"
      }`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
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
        {isMobile && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-0 pointer-events-none" />
        )}

        <div
          className={`absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6 ${
            isMobile ? "z-10" : "z-10"
          }`}
        >
          {isMobile ? <NavbarMobile id="navbar" /> : <Navbar id="navbar" />}

          <div
            className={`flex flex-col items-start justify-end h-full px-6 gap-4 ${
              isMobile ? "max-w-xs" : ""
            }`}
            id="info-content"
          >
            <h4
              className={`tracking-wide ${
                isMobile ? "text-base" : "text-xl"
              } font-regular text-background`}
            >
              Bienvenido a Mediconnect
            </h4>
            <h1
              className={`${
                isMobile ? "text-2xl" : "text-6xl"
              } font-medium text-background`}
            >
              Conectando el Futuro <br /> de la Atención Médica
            </h1>
            <p
              className={`font-medium text-background ${
                isMobile ? "text-base max-w-xs" : "text-xl max-w-xl"
              }`}
            >
              Una plataforma integral que transforma la comunicación entre
              <br /> médicos, pacientes y centros de salud.
            </p>
            <div className="flex gap-4 ">
              <MediButton variant="primary" className="bg-white text-primary ">
                Conectar
              </MediButton>
              <MediButton
                variant="secondary"
                className="text-white bg-transparent border-white"
              >
                Empezar ahora
              </MediButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroImageSection;
