import MediConnectLogo from "../../../assets/MediConnectLanding.png";
import MediButton from "@/components/common/MediButton";
import LanguageDropDown from "@/components/common/LanguageDropDown";
import MediConnectGreenLogo from "../../../assets/MediConnectLanding-green.png";
import { useTranslation } from "react-i18next";

type NavbarProps = {
  id?: string;
  isFixed?: boolean;
};

function Navbar({ id, isFixed = false }: NavbarProps) {
  const { t } = useTranslation("landing");

  const handleMenuClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { href: "#hero-container", label: t("navbar.home") },
    { href: "#about", label: t("navbar.about") },
    { href: "#how", label: t("navbar.how") },
    { href: "#faq", label: t("navbar.faq") },
    { href: "#contact", label: t("navbar.contact") },
  ];

  return (
    <nav
      id={id}
      className={`w-full flex justify-between items-center px-6 ${
        isFixed
          ? "fixed top-0 left-0 z-50 bg-white shadow-md py-3"
          : "bg-transparent"
      }`}
    >
      <span className="flex gap-3 items-center">
        <img
          src={isFixed ? MediConnectGreenLogo : MediConnectLogo}
          alt="MediConnect Logo"
          className="h-16 w-16 object-contain pointer-events-none"
        />
        <h1
          className={`text-xl font-semibold ${
            isFixed ? "text-primary" : "text-white"
          }`}
        >
          Mediconnect
        </h1>
      </span>

      <span>
        <ul
          className={`flex gap-2 items-center text-lg font-medium ${
            isFixed ? "text-primary" : "text-white"
          }`}
        >
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={handleMenuClick(item.href)}
                className={`block px-3 py-2 rounded-full transition-colors duration-300 ${
                  isFixed ? "hover:bg-primary/10" : "hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </span>

      <span className="flex gap-4">
        <LanguageDropDown
          buttonBg="transparent"
          buttonText={isFixed ? "text-primary" : "text-white"}
          borderColor={isFixed ? "border-primary" : "border-white"}
        />
        <MediButton
          variant="secondary"
          className={
            isFixed
              ? "text-primary bg-transparent border-primary"
              : "text-white bg-transparent border-white"
          }
        >
          {t("navbar.login")}
        </MediButton>
        <MediButton
          variant="primary"
          className={
            isFixed ? "bg-primary text-white" : "bg-white text-primary"
          }
        >
          {t("navbar.register")}
        </MediButton>
      </span>
    </nav>
  );
}

export default Navbar;
