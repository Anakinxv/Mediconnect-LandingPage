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
          className="h-16 w-16 object-contain"
        />
        <h1 className="text-xl font-medium">Mediconnect</h1>
      </span>

      <span>
        <ul className="flex gap-8 items-center">
          <li>
            <a href="#inicio" className="hover:text-blue-600">
              Inicio
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-600">
              Sobre Nosotros
            </a>
          </li>
          <li>
            <a href="#how" className="hover:text-blue-600">
              Cómo Funciona
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-blue-600">
              FAQ
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-600">
              Contacto
            </a>
          </li>
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
