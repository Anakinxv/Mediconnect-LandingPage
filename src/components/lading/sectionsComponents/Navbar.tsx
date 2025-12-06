import MediConnectLogo from "../../../assets/MediConnectLanding.png";
import MediButton from "@/components/common/MediButton";
import LanguageDropDown from "@/components/common/LanguageDropDown";
function Navbar() {
  return (
    <nav className=" w-full flex justify-between items-center px-6  bg-transparent  ">
      <span className="flex gap-3 items-center">
        <img
          src={MediConnectLogo}
          alt="MediConnect Logo"
          className="h-16 w-16 object-contain pointer-events-none"
        />
        <h1 className="text-xl font-medium">Mediconnect</h1>
      </span>

      <span>
        <ul className="flex gap-8 items-center">
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
                className="relative block transition-all duration-300
                  hover:scale-105 hover:opacity-90
                  after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0
                  hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:rounded-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </span>

      <span className="flex gap-4">
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
      </span>
    </nav>
  );
}

export default Navbar;
