import HeroImage from "../../../assets/HeroImage.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MediButton from "@/components/common/MediButton";
import Navbar from "./Navbar";

function HeroImageSection() {
  useGSAP(() => {
    gsap.fromTo(
      "#hero-image",
      {
        scale: 1.3,
        opacity: 0,
      },
      {
        duration: 1.2,
        scale: 1,
        opacity: 1,
        ease: "power3.out",
      }
    );
  });

  return (
    <div className="h-screen w-full p-[15px] box-border flex items-center justify-center bg-white">
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={HeroImage}
          id="hero-image"
          alt="Hero"
          className="rounded-[35px] object-cover w-full h-full pointer-events-none"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between  p-6">
          <Navbar />

          <div className="flex flex-col items-start justify-end h-full px-6 gap-6 ">
            <h4 className="text-lg font-regular tracking-wide text-background">
              Bienvenido a Mediconnect
            </h4>
            <h1 className="text-5xl font-semibold text-background">
              Conectando el Futuro <br /> de la Atención Médica
            </h1>
            <p className="text-lg  font-medium text-background max-w-xl">
              Una plataforma integral que transforma la comunicación entre
              <br /> médicos, pacientes y centros de salud.
            </p>
            <div className="flex gap-4 mt-4">
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
