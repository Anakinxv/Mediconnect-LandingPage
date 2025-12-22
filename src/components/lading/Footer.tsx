import { ChevronRight, Send } from "lucide-react";
import { useState } from "react";
import MediButton from "@/components/common/MediButton";
import MCInput from "@/components/common/forms/MCInput";
import MCFormWrapper from "../common/forms/MCFormWrapper";
import { newsletterSchema } from "@/schema/landingSchema";
import { useAppStore } from "@/stores/useAppStore";
const Footer = () => {
  const [email, setEmail] = useState("");

  const newsletterForm = useAppStore((state) => state.newletterForm);
  const setnewsletterForm = useAppStore((state) => state.setnewsletterForm);
  // Enlaces rápidos igual que en Hero
  const quickLinks = [
    { label: "Conectar con un médico", href: "#" },
    { label: "Comenzar ahora", href: "#" },
    { label: "Preguntas Frecuentes", href: "#" },
    { label: "Soporte Técnico", href: "#" },
  ];

  const handleSubmit = (data: { email: string }) => {
    console.log("Subscribing email:", data.email);
    setnewsletterForm({ email: "" });
  };

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Main Footer Content */}
      <div className="bg-primary rounded-[35px]">
        <div className="rounded-[35px] border border-primary/20 bg-primary py-14 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-start justify-between max-w-7xl mx-auto">
            {/* Brand Column */}
            <div className="flex flex-col gap-y-4 bg-red-300">
              <h3 className="text-xl font-bold text-white">MediConnect</h3>
              <p className="text-sm leading-relaxed text-white">
                Plataforma digital para conectar pacientes y médicos de forma
                segura y eficiente. Salud al alcance de todos.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-lg font-semibold text-white">
                Enlaces Rápidos
              </h3>
              <ul className="flex flex-col gap-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white transition-colors hover:text-green-400"
                    >
                      <ChevronRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="flex flex-col gap-y-4 bg-amber-200">
              <h3 className="text-lg font-semibold text-white">
                Boletín Informativo
              </h3>
              <p className="text-sm text-green-100">
                Suscríbete para recibir novedades y consejos de salud.
              </p>
              <MCFormWrapper
                onSubmit={handleSubmit}
                schema={newsletterSchema}
                defaultValues={{ email: newsletterForm!.email }}
              >
                <MCInput
                  name="email"
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={newsletterForm!.email}
                  onChange={(e) => setnewsletterForm({ email: e.target.value })}
                  required
                  className="bg-white text-primary"
                />
                <MediButton
                  type="submit"
                  variant="primary"
                  className="bg-white text-primary px-4"
                >
                  <Send className="h-4 w-4" />
                </MediButton>
              </MCFormWrapper>
            </div>
          </div>
        </div>{" "}
        {/* Bottom Bar */}
        <div className="border-t border-white py-4">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
            <p className="text-sm text-green-100">
              © 2025 MediConnect. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="#"
                className="text-sm text-white transition-colors hover:text-green-400"
              >
                Términos y Condiciones
              </a>
              <a
                href="#"
                className="text-sm text-white transition-colors hover:text-green-400"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-sm text-green-100 transition-colors hover:text-green-400"
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
