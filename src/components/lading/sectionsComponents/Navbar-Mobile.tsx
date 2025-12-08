import MediConnectLogo from "../../../assets/MediConnectLanding.png";
import MediconnectLogoGreen from "../../../assets/MediConnectLanding-green.png";
import MediButton from "@/components/common/MediButton";
import LanguageDropDown from "@/components/common/LanguageDropDown";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { XIcon } from "@/components/ui/x-icon";
import { GripIcon } from "@/components/ui/drop-icon";

type NavbarMobileProps = {
  id?: string;
};

function NavbarMobile({ id }: NavbarMobileProps) {
  const [open, setOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll del body cuando el overlay está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100vw";
      setShowOverlay(true);
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      // Animación de salida GSAP
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setShowOverlay(false),
        });
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open]);

  // Animación de entrada GSAP
  useGSAP(() => {
    if (showOverlay && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.5, ease: "power2.out" }
      );
    }
  }, [showOverlay]);

  return (
    <nav
      id={id}
      className="w-full flex items-center justify-between px-4 py-2 bg-transparent"
    >
      <span className="flex gap-3 items-center">
        <img
          src={MediConnectLogo}
          alt="MediConnect Logo"
          className="h-12 w-12 object-contain pointer-events-none"
        />
        <h1 className="text-lg font-semibold">Mediconnect</h1>
      </span>
      <button
        className="text-white text-2xl focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        style={{ display: open ? "none" : "block" }}
      >
        <GripIcon size={32} />
      </button>
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed inset-0 w-full h-full bg-white/90 backdrop-blur-sm z-50 overflow-y-auto"
        >
          <div className="flex flex-col items-start gap-8 py-8 px-8 h-full w-full">
            {/* Logo y X */}
            <div className="flex items-center justify-between w-full mb-8">
              <span className="flex gap-3 items-center">
                <img
                  src={MediconnectLogoGreen}
                  alt="MediConnect Logo"
                  className="h-14 w-14 object-contain pointer-events-none"
                />
                <h1 className="text-2xl font-bold text-primary">Mediconnect</h1>
              </span>
              <button
                className="text-primary text-4xl font-bold focus:outline-none ml-auto"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
              >
                <XIcon size={40} />
              </button>
            </div>
            {/* Menú */}
            <ul className="flex flex-col gap-5 items-start text-3xl font-bold text-primary w-full mb-4">
              {[
                { href: "#inicio", label: "Inicio" },
                { href: "#about", label: "Sobre Nosotros" },
                { href: "#how", label: "Cómo Funciona" },
                { href: "#faq", label: "FAQ" },
                { href: "#contact", label: "Contacto" },
              ].map((item) => (
                <li key={item.href} className="overflow-hidden group w-full">
                  <a
                    href={item.href}
                    className="relative block px-3 py-2 rounded-full w-full
                      hover:bg-primary/10
                      [perspective:10000px] transition-all duration-500"
                    style={{ transformStyle: "preserve-3d" }}
                    onMouseEnter={(e) => {
                      const siblings =
                        e.currentTarget.parentElement?.parentElement?.children;
                      if (siblings) {
                        Array.from(siblings).forEach((sibling) => {
                          if (sibling !== e.currentTarget.parentElement) {
                            (sibling as HTMLElement).style.opacity = "0.3";
                          }
                        });
                      }
                    }}
                    onMouseLeave={(e) => {
                      const siblings =
                        e.currentTarget.parentElement?.parentElement?.children;
                      if (siblings) {
                        Array.from(siblings).forEach((sibling) => {
                          (sibling as HTMLElement).style.opacity = "1";
                        });
                      }
                    }}
                  >
                    <span
                      className="relative inline-block transition-transform duration-700
                        [transform-style:preserve-3d] [transform-origin:50%_0]
                        group-hover:[transform:rotateX(90deg)_translateY(-22px)]"
                    >
                      {item.label}
                      <span
                        className="pointer-events-none absolute top-full left-0 w-full h-full text-center
                          [transform:rotateX(-90deg)] [transform-origin:50%_0]
                          text-primary"
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {/* Botones y Language */}
            <div className="flex flex-col gap-4 items-start w-full">
              <LanguageDropDown
                showLabel
                buttonBg="transparent"
                buttonText="text-primary"
                borderColor="border-primary"
                className="text-2xl px-8 py-4 w-full h-[56px] min-h-[56px] max-h-[56px]"
              />
              <MediButton
                variant="secondary"
                className="text-primary bg-transparent border-primary md:text-2xl px-8 py-4 w-full h-[56px] min-h-[56px] max-h-[56px]"
              >
                Iniciar Sesión
              </MediButton>
              <MediButton
                variant="primary"
                className="bg-primary text-white md:text-2xl  px-8 py-4 w-full h-[56px] min-h-[56px] max-h-[56px]"
              >
                Registrarse
              </MediButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarMobile;
