import MediButton from "@/components/common/MediButton";
import MCInput from "@/components/common/forms/MCInput";
import MCFormWrapper from "../common/forms/MCFormWrapper";
import { newsletterSchema } from "@/schema/landingSchema";
import { useAppStore } from "@/stores/useAppStore";
import MCLOGO from "@/assets/MediConnectLanding.png";
import { ChevronRight } from "lucide-react";

const quickLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#about", label: "Nosotros" },
  { href: "#how", label: "Cómo Funciona" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contacto" },
];

const Footer = () => {
  const newsletterForm = useAppStore((state) => state.newletterForm);
  const setnewsletterForm = useAppStore((state) => state.setnewsletterForm);

  const handleSubmit = (data: { email: string }) => {
    console.log("Subscribing email:", data.email);
    setnewsletterForm({ email: "" });
  };

  return (
    <footer className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      {/* Main Footer Content */}
      <div className="bg-primary rounded-[20px] sm:rounded-[25px] lg:rounded-[35px]">
        <div className="rounded-[20px] sm:rounded-[25px] lg:rounded-[35px] border border-primary/20 bg-primary py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-8  mx-auto items-center lg:items-start">
            {/* Brand Column */}
            <div className="flex flex-col gap-y-3 sm:gap-y-4 text-center lg:text-left w-full lg:w-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center lg:justify-start gap-3 mb-1">
                <img
                  src={MCLOGO}
                  alt="MediConnect Logo"
                  className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 drop-shadow-lg"
                />
                <span className="tracking-wide drop-shadow-md">
                  MediConnect
                </span>
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-white max-w-md mx-auto lg:mx-0">
                Plataforma digital para conectar pacientes y médicos de forma
                segura y eficiente. Salud al alcance de todos.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="flex flex-col gap-y-3 sm:gap-y-4 text-left lg:text-center w-full lg:w-auto mt-6 lg:mt-0 items-center justify-center">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Enlaces Rápidos
              </h3>
              <nav>
                <ul className="flex flex-col gap-2 w-full">
                  {quickLinks.map((link) => (
                    <li key={link.href} className="w-full">
                      <a
                        href={link.href}
                        className="group flex items-center justify-start gap-3 text-lg text-white transition-colors hover:text-accent py-2 w-full"
                      >
                        <ChevronRight
                          size={28}
                          className="text-white transition-colors group-hover:text-accent transform duration-200 group-hover:translate-x-2"
                        />
                        <span className="font-medium">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Newsletter Column */}
            <div className="flex flex-col gap-y-3 sm:gap-y-4 text-center lg:text-left w-full lg:w-auto mt-6 lg:mt-0 px-0">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Boletín Informativo
              </h3>
              <p className="text-md sm:text-md text-white max-w-md mx-auto lg:mx-0">
                Suscríbete para recibir novedades y consejos de salud.
              </p>

              {/* Newsletter Form */}
              <div className="w-full flex justify-center">
                <MCFormWrapper
                  onSubmit={handleSubmit}
                  schema={newsletterSchema}
                  defaultValues={{ email: newsletterForm!.email }}
                  className="w-full"
                >
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <MCInput
                      name="email"
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={newsletterForm!.email}
                      onChange={(e) =>
                        setnewsletterForm({ email: e.target.value })
                      }
                      required
                      className="bg-white text-primary h-12 sm:h-[52px] text-sm sm:text-base flex-1 min-w-0"
                    />
                    <MediButton
                      type="submit"
                      className="bg-accent text-primary h-12 sm:h-[52px] text-sm sm:text-base flex items-center justify-center shadow transition w-full sm:w-auto sm:min-w-[140px]"
                      aria-label="Enviar"
                    >
                      Suscribirse
                    </MediButton>
                  </div>
                </MCFormWrapper>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-3 sm:py-4">
          <div className="mx-auto flex  flex-col items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 md:flex-row">
            <p className="text-xs sm:text-sm text-white text-center md:text-left hover:text-accent transition-colors">
              © 2025 MediConnect. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="#"
                className="text-xs sm:text-sm text-white transition-colors hover:text-accent whitespace-nowrap"
              >
                Términos y Condiciones
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-white transition-colors hover:text-accent whitespace-nowrap"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-white transition-colors hover:text-accent whitespace-nowrap"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
