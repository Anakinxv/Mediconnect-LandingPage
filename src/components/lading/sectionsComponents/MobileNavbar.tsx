import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MediConnectLogo from "../../../assets/MediConnectLanding.png";
import MediConnectGreenLogo from "../../../assets/MediConnectLanding-green.png";
import MediButton from "@/components/common/MediButton";
import LanguageDropDown from "@/components/common/LanguageDropDown";
import { GripIcon } from "@/components/ui/drop-icon";
import { XIcon } from "@/components/ui/x-icon";
import { useTranslation } from "react-i18next";

type MobileNavbarProps = {
  id?: string;
  isFixed?: boolean;
};

function MobileNavbar({ id, isFixed = false }: MobileNavbarProps) {
  const { t } = useTranslation("landing");
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Cerrar overlay si se hace scroll con el menú abierto
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Manejar el overflow del body al abrir/cerrar el menú
  useEffect(() => {
    if (isOpen) {
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { label: t("navbar.home") },
    { label: t("navbar.about") },
    { label: t("navbar.how") },
    { label: t("navbar.faq") },
    { label: t("navbar.contact") },
  ];

  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();

      tl.set(overlayRef.current, { display: "flex" })
        .fromTo(
          overlayRef.current,
          { y: "-100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.25, ease: "power2.out" }
        )
        .fromTo(
          menuItemsRef.current?.children || [],
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.15"
        )
        .fromTo(
          buttonsRef.current?.children || [],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.2"
        );
    } else {
      const tl = gsap.timeline();

      tl.to(buttonsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.15,
        stagger: 0.02,
        ease: "power2.in",
      })
        .to(
          menuItemsRef.current?.children || [],
          {
            x: -50,
            opacity: 0,
            duration: 0.2,
            stagger: 0.02,
            ease: "power2.in",
          },
          "-=0.1"
        )
        .to(
          overlayRef.current,
          {
            y: "-100%",
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(overlayRef.current, { display: "none" });
            },
          },
          "-=0.15"
        );
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  // Estilo para el círculo de hover en botones
  const hoverCircleButton =
    "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-current after:opacity-10 after:scale-0 active:after:scale-100 after:transition-transform after:duration-200 after:ease-out";

  return (
    <>
      {/* Mobile Navbar Header */}
      <nav
        id={id}
        className={`w-full flex justify-between items-center px-6 py-4 transition-all duration-300 ${
          isFixed
            ? "fixed top-0 left-0 z-50 bg-white shadow-md"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex gap-3 items-center">
          <img
            src={isFixed ? MediConnectGreenLogo : MediConnectLogo}
            alt="MediConnect Logo"
            className="h-14 w-14 object-contain pointer-events-none"
          />
          <h1
            className={`text-2xl font-semibold ${
              isFixed ? "text-primary" : "text-white"
            }`}
          >
            Mediconnect
          </h1>
        </div>

        {/* Hamburger Menu Button SOLO cuando overlay está cerrado */}
        {!isOpen && (
          <button
            onClick={toggleMenu}
            className={`flex items-center justify-center w-12 h-12 p-2 rounded-full transition-colors duration-200 ${hoverCircleButton} ${
              isFixed ? "text-primary" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <GripIcon size={32} />
          </button>
        )}
      </nav>

      {/* Full Screen Overlay Menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-white flex-col p-6 hidden overflow-y-auto"
      >
        {/* Top Section - Logo y X en la misma row */}
        <div className="flex items-center justify-between mb-12 mt-2 ml-2">
          <div className="flex items-center gap-3">
            <img
              src={MediConnectGreenLogo}
              alt="MediConnect Logo"
              className="h-16 w-16 object-contain pointer-events-none"
            />
            <h1 className="text-3xl font-semibold text-primary">Mediconnect</h1>
          </div>
          {/* Close Button alineado a la derecha */}
          <button
            onClick={toggleMenu}
            className={`flex items-center justify-center w-12 h-12 rounded-full text-primary ${hoverCircleButton}`}
            aria-label="Close menu"
          >
            <XIcon size={32} />
          </button>
        </div>

        {/* Menu Items - Toda la fila con efecto táctil y rounded */}
        <div className="flex-1 -mx-6">
          <ul ref={menuItemsRef} className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={handleMenuItemClick}
                  className="block w-full px-8 py-4 text-3xl font-medium text-primary transition-all duration-300 rounded-xl active:bg-primary/10 active:scale-95 text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section - Language Dropdown and Buttons */}
        <div className="space-y-6 mt-8">
          {/* Language Dropdown FUERA del ref de animación */}
          <LanguageDropDown
            buttonBg="bg-white"
            buttonText="text-primary"
            borderColor="border-primary"
            showLabel={true}
            className="w-full h-14 px-6 text-xl font-medium rounded-full border transition-all duration-150"
          />

          {/* Botones CON animación */}
          <div ref={buttonsRef} className="space-y-4">
            <MediButton
              variant="secondary"
              className="w-full h-14 px-6 text-xl font-medium rounded-full border text-primary bg-white border-primary active:bg-primary/10 active:scale-95 transition-all duration-150"
            >
              {t("navbar.login")}
            </MediButton>
            <MediButton
              variant="primary"
              className="w-full h-14 px-6 text-xl font-medium rounded-full bg-primary text-white active:opacity-90 active:scale-95 transition-all duration-150"
            >
              {t("navbar.register")}
            </MediButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNavbar;
