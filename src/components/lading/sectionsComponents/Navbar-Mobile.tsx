import MediConnectLogo from "../../../assets/MediConnectLanding.png";
import MediButton from "@/components/common/MediButton";
import LanguageDropDown from "@/components/common/LanguageDropDown";
import { useState } from "react";

type NavbarMobileProps = {
  id?: string;
};

function NavbarMobile({ id }: NavbarMobileProps) {
  const [open, setOpen] = useState(false);

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
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        ☰
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-primary/95 z-50 flex flex-col items-center gap-4 py-6">
          <ul className="flex flex-col gap-4 items-center text-lg font-medium text-white">
            {[
              { href: "#inicio", label: "Inicio" },
              { href: "#about", label: "Sobre Nosotros" },
              { href: "#how", label: "Cómo Funciona" },
              { href: "#faq", label: "FAQ" },
              { href: "#contact", label: "Contacto" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-4 py-2 rounded hover:bg-white/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-4">
            <LanguageDropDown />
            <MediButton
              variant="secondary"
              className="text-white bg-transparent border-white"
            >
              Iniciar Sesión
            </MediButton>
            <MediButton variant="primary" className="bg-white text-primary ">
              Registrarse
            </MediButton>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarMobile;
