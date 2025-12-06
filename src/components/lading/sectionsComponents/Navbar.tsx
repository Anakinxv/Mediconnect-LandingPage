import MediConnectLogo from "../../../assets/MediConnectLanding.png";
import MediButton from "@/components/common/MediButton";
import LanguageDropDown from "@/components/common/LanguageDropDown";
type NavbarProps = {
  id?: string;
};
function Navbar({ id }: NavbarProps) {
  return (
    <nav
      id={id}
      className=" w-full flex justify-between items-center px-6  bg-transparent  "
    >
      <span className="flex gap-3 items-center">
        <img
          src={MediConnectLogo}
          alt="MediConnect Logo"
          className="h-16 w-16 object-contain pointer-events-none"
        />
        <h1 className="text-xl font-semibold">Mediconnect</h1>
      </span>

      <span>
        <ul className="flex gap-2 items-center text-lg font-medium text-white">
          {[
            { href: "#inicio", label: "Inicio" },
            { href: "#about", label: "Sobre Nosotros" },
            { href: "#how", label: "Cómo Funciona" },
            { href: "#faq", label: "FAQ" },
            { href: "#contact", label: "Contacto" },
          ].map((item) => (
            <li key={item.href} className="overflow-hidden">
              <a
                href={item.href}
                className="relative block px-3 py-2 rounded-full
                  hover:bg-white/10
                  [perspective:10000px] group"
                style={{ transformStyle: "preserve-3d" }}
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
                      text-white"
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                </span>
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
