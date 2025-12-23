import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; // <-- Agregar esto
import { useIsMobile } from "@/hooks/useIsMobile";
import MCInput from "@/components/common/forms/MCInput";
import MediButton from "@/components/common/MediButton";
import MCTextArea from "@/components/common/forms/MCTextArea";
import MCFormWrapper from "@/components/common/forms/MCFormWrapper";
import { contactSchema } from "@/schema/landingSchema";
import ContactImage from "@/assets/contact.png";
import { useAppStore } from "@/stores/useAppStore";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hasAnimated, setHasAnimated] = useState(false);
  const { t } = useTranslation("landing");

  useGSAP(
    () => {
      const container = containerRef.current;
      const section = sectionRef.current;
      const image = imageRef.current;
      const overlay = overlayRef.current;
      const contact = contactRef.current;

      if (!container || !section || !image || !overlay || !contact) return;

      // En mobile, no aplicar animaciones complejas
      if (isMobile) {
        gsap.set(image, { scale: 1, borderRadius: "1rem" });
        gsap.set(overlay, { scale: 1, borderRadius: "1rem" });
        gsap.set(contact, { x: 0, opacity: 1, scale: 1 });
        const formElements = contact.querySelectorAll(".animate-item");
        gsap.set(formElements, { y: 0, opacity: 1 });
        return;
      }

      // Si ya se animó, establecer estado final y no volver a animar
      if (hasAnimated) {
        gsap.set(image, { scale: 1, borderRadius: "35px" });
        gsap.set(overlay, { scale: 1, borderRadius: "35px" });
        gsap.set(contact, { x: 0, opacity: 1, scale: 1 });
        const formElements = contact.querySelectorAll(".animate-item");
        gsap.set(formElements, { y: 0, opacity: 1 });
        return;
      }

      // Configurar altura del contenedor para el scroll
      const sectionHeight = window.innerHeight;
      container.style.height = `${sectionHeight * 2}`; // Doble altura para la animación

      // Configurar estado inicial
      gsap.set(image, { scale: 0.5, borderRadius: "50px" });
      gsap.set(overlay, { scale: 0.5, borderRadius: "50px" });
      gsap.set(contact, { x: -60, opacity: 0, scale: 0.98 });

      const formElements = contact.querySelectorAll(".animate-item");
      gsap.set(formElements, { y: 15, opacity: 0 });

      // Timeline principal con pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${sectionHeight}`, // Una altura de viewport para la animación
          pin: section,
          scrub: 1.2,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Cuando llegue al final del pin, marcar como animado
            if (self.progress >= 0.99) {
              setHasAnimated(true);
            }
          },
          onLeave: () => {
            // Estado final al terminar el pin
            gsap.set(image, { scale: 1, borderRadius: "35px" });
            gsap.set(overlay, { scale: 1, borderRadius: "35px" });
            gsap.set(contact, { x: 0, opacity: 1, scale: 1 });
            gsap.set(formElements, { y: 0, opacity: 1 });
            setHasAnimated(true);
          },
          onEnterBack: () => {
            // Si regresamos, NO resetear el estado
            // Eliminado: setHasAnimated(false);
          },
        },
      });

      // Animaciones del timeline
      tl.to(
        [image, overlay],
        {
          scale: 1,
          borderRadius: "35px",
          duration: 2.5,
          ease: "sine.inOut",
        },
        0
      );

      tl.to(
        contact,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "sine.inOut",
        },
        0.8
      );

      tl.to(
        formElements,
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "sine.out",
        },
        1.5
      );

      // Trigger adicional para el área post-pin (transición suave)
      const postPinTrigger = ScrollTrigger.create({
        trigger: container,
        start: () => `top+=${sectionHeight} top`,
        end: () => `bottom-=${sectionHeight * 0.2} top`,
        onEnter: () => {
          // Asegurar estado final
          gsap.set(image, { scale: 1, borderRadius: "35px" });
          gsap.set(overlay, { scale: 1, borderRadius: "35px" });
          gsap.set(contact, { x: 0, opacity: 1, scale: 1 });
          gsap.set(formElements, { y: 0, opacity: 1 });
        },
        onLeaveBack: () => {
          // Eliminado: setHasAnimated(false);
        },
      });

      return () => {
        postPinTrigger.kill();
      };
    },
    { scope: containerRef, dependencies: [isMobile, hasAnimated] }
  );

  const handleSubmit = (data: any) => {
    alert("¡Mensaje enviado correctamente!");
  };

  const contactForm = useAppStore((state) => state.conctactForm);
  const setcontactForm = useAppStore((state) => state.setcontactForm);

  return (
    <section id="contact" className="w-full">
      <div ref={containerRef} className="w-full">
        <div
          ref={sectionRef}
          className={`w-full flex items-center justify-center bg-rd px-4 sm:px-6 lg:px-8 ${
            isMobile ? "min-h-screen py-8" : "h-screen py-8"
          }`}
        >
          <div className="relative w-full mx-auto h-full flex items-center">
            <div
              className={`relative w-full h-full overflow-hidden min-h-[600px] ${
                isMobile ? "flex items-center" : ""
              }`}
            >
              <img
                ref={imageRef}
                src={ContactImage}
                alt="Imagen de contacto"
                className={`absolute inset-0 w-full h-full object-cover will-change-transform z-0 ${
                  isMobile ? "rounded-2xl" : "rounded-[35px]"
                }`}
                style={{ transformOrigin: "center center" }}
              />

              <div
                ref={overlayRef}
                className={`absolute inset-0 bg-primary/25 z-10 will-change-transform ${
                  isMobile ? "rounded-2xl" : "rounded-[35px]"
                }`}
                style={{ transformOrigin: "center center" }}
              ></div>

              {/* Formulario de contacto */}
              <div
                ref={contactRef}
                className={`absolute z-20 ${
                  isMobile
                    ? "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[90%] max-w-md"
                    : "left-16 top-1/2 -translate-y-1/2 w-3xl max-w-full"
                }`}
              >
                <div
                  className={`bg-white shadow-2xl border border-gray-100 flex flex-col ${
                    isMobile ? "rounded-xl p-6 gap-3" : "rounded-3xl p-12 gap-4"
                  }`}
                >
                  <h2
                    className={`animate-item font-medium text-gray-800 ${
                      isMobile ? "text-2xl mb-0" : "text-4xl lg:text-5xl mb-1"
                    }`}
                  >
                    {t("contacts.title")}
                  </h2>
                  <MCFormWrapper
                    schema={contactSchema}
                    defaultValues={{
                      name: contactForm.name,
                      email: contactForm.email,
                      message: contactForm.message,
                    }}
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="animate-item">
                        <MCInput
                          name="name"
                          label={t("contacts.nameLabel")}
                          placeholder={t("contacts.namePlaceholder")}
                          value={contactForm.name}
                          onChange={(e) =>
                            setcontactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="animate-item">
                        <MCInput
                          name="email"
                          label={t("contacts.emailLabel")}
                          placeholder={t("contacts.emailPlaceholder")}
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setcontactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="animate-item">
                      <MCTextArea
                        name="message"
                        label={t("contacts.messageLabel")}
                        placeholder={t("contacts.messagePlaceholder")}
                        className={isMobile ? "h-[100px]" : "h-[150px]"}
                        value={contactForm.message}
                        onChange={(e) =>
                          setcontactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="animate-item pt-2">
                      <MediButton
                        type="submit"
                        className="w-full"
                        disabled={
                          contactForm.name === "" ||
                          contactForm.email === "" ||
                          contactForm.message === ""
                        }
                      >
                        {t("contacts.submit")}
                      </MediButton>
                    </div>
                  </MCFormWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
