import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MediConnectLogo from "../../../assets/MediConnectLanding.png";
import MediConnectGreenLogo from "../../../assets/MediConnectLanding-green.png";
import MediButton from "@/components/common/MediButton";
import MobileLanguageSelector from "@/components/common/MobileLanguageSelector";
import { GripIcon } from "@/components/ui/drop-icon";
import { XIcon } from "@/components/ui/x-icon";
import { ChevronDownIcon } from "@/components/ui/chevron-down";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/stores/useAppStore";
import flagSpain from "@/assets/flag-spain.png";
import flagUSA from "@/assets/flag-usa.png";
import flagFrance from "@/assets/flag-france.png";
import flagHaiti from "@/assets/flag-haiti.png";
import flagItaly from "@/assets/flag-italy.png";
import flagJapan from "@/assets/flag-japan.png";
import flagPortugal from "@/assets/flag-portugal.png";
import flagChina from "@/assets/flag-china.png";

const languages = [
  { code: "es", label: "Español", flag: flagSpain },
  { code: "en", label: "English", flag: flagUSA },
  { code: "fr", label: "Français", flag: flagFrance },
  { code: "ht", label: "Kreyòl", flag: flagHaiti },
  { code: "it", label: "Italiano", flag: flagItaly },
  { code: "ja", label: "日本語", flag: flagJapan },
  { code: "pt", label: "Português", flag: flagPortugal },
  { code: "zh", label: "中文", flag: flagChina },
];

type MobileNavbarProps = {
  id?: string;
  isFixed?: boolean;
};

function MobileNavbar({ id, isFixed = false }: MobileNavbarProps) {
  const { t } = useTranslation("landing");
  const language = useAppStore((state) => state.language);
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Comentamos o eliminamos el useEffect que cierra el menú al hacer scroll
  /*
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);
  */

  // Manejar el overflow del body al abrir/cerrar el menú
  useEffect(() => {
    if (isOpen || isLanguageSelectorOpen) {
      document.body.style.overflow = "hidden"; // Prevenir scroll del body cuando el menú está abierto
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isLanguageSelectorOpen]);

  const menuItems = [
    { href: "#hero-container", label: t("navbar.home") },
    { href: "#about", label: t("navbar.about") },
    { href: "#how", label: t("navbar.how") },
    { href: "#faq", label: t("navbar.faq") },
    { href: "#contact", label: t("navbar.contact") },
  ];

  const handleMenuItemClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Espera a que cierre el menú antes de hacer scroll
  };

  const handleLanguageButtonClick = () => {
    setIsLanguageSelectorOpen(true);
  };

  const handleLanguageSelectorClose = () => {
    setIsLanguageSelectorOpen(false);
  };

  const selectedLang = languages.find((l) => l.code === language);

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
                <a
                  href={item.href}
                  onClick={handleMenuItemClick(item.href)}
                  className="block w-full px-8 py-4 text-3xl font-medium text-primary transition-all duration-300 rounded-xl active:bg-primary/10 active:scale-95 text-left"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section - Mobile Language Selector and Buttons */}
        <div className="space-y-6 mt-8">
          {/* Mobile Language Button */}
          <button
            onClick={handleLanguageButtonClick}
            className="w-full h-14 px-6 flex items-center justify-center gap-3 text-xl font-medium rounded-full border border-primary bg-white text-primary transition-all duration-150 active:bg-primary/10 active:scale-95"
          >
            <img
              src={selectedLang?.flag}
              alt={selectedLang?.label}
              className="w-6 h-6 rounded-full"
            />
            <span className="flex-1 text-left">{selectedLang?.label}</span>
            <ChevronDownIcon size={20} />
          </button>

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

      {/* Mobile Language Selector Modal */}
      <MobileLanguageSelector
        isOpen={isLanguageSelectorOpen}
        onClose={handleLanguageSelectorClose}
      />
    </>
  );
}

export default MobileNavbar;
