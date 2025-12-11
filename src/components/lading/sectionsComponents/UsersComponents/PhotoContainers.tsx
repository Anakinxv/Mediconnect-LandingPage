import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UserPatient from "@/assets/User-Patient.jpg";
import UserDoctor from "@/assets/user-doctor.jpg";
import UserMedico from "@/assets/user-center.png";

gsap.registerPlugin(ScrollTrigger);

interface PhotoContainersProps {
  userType: "patient" | "doctor" | "center";
}

function PhotoContainers({ userType }: PhotoContainersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getImageData = () => {
    switch (userType) {
      case "patient":
        return {
          src: UserPatient,
          alt: "Paciente usando la aplicación MediConnect en su dispositivo móvil",
        };
      case "doctor":
        return {
          src: UserDoctor,
          alt: "Médico profesional utilizando MediConnect para gestionar citas",
        };
      case "center":
        return {
          src: UserMedico,
          alt: "Centro médico moderno equipado con tecnología MediConnect",
        };
      default:
        return {
          src: UserPatient,
          alt: "Usuario de MediConnect",
        };
    }
  };

  const imageData = getImageData();

  // 🔥 Animación de entrada GSAP
  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        scale: 0.95,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  });

  return (
    <div
      ref={containerRef}
      className="bg-accent rounded-[35px] overflow-hidden flex items-center justify-center"
    >
      {/* 🔥 Contenedor con proporción fija */}
      <div className="w-full overflow-hidden inline-block  aspect-[4/5]">
        <img
          src={imageData.src}
          alt={imageData.alt}
          className="w-full h-full object-cover object-top rounded-[35px]  hover:scale-115 transition-transform duration-500 "
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default PhotoContainers;
