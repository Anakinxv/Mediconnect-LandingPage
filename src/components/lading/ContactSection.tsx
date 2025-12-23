import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hasAnimated, setHasAnimated] = useState(false);
  const { t } = useTranslation("landing");

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const contact = contactRef.current;

    if (!container || !image || !overlay || !contact) return;

    // En mobile, no aplicar animaciones complejas
    if (isMobile) {
      gsap.set(image, { scale: 1, borderRadius: "1rem" });
      gsap.set(overlay, { scale: 1, borderRadius: "1rem" });
      gsap.set(contact, { x: 0, opacity: 1, scale: 1 });
      const formElements = contact.querySelectorAll(".animate-item");
      gsap.set(formElements, { y: 0, opacity: 1 });
      return;
    }

    // Si ya se animó, establecer estado final
    if (hasAnimated) {
      gsap.set(image, { scale: 1, borderRadius: "35px" });
      gsap.set(overlay, { scale: 1, borderRadius: "35px" });
      gsap.set(contact, { x: 0, opacity: 1, scale: 1 });
      const formElements = contact.querySelectorAll(".animate-item");
      gsap.set(formElements, { y: 0, opacity: 1 });
      return;
    }

    // 🔥 USAR GSAP CONTEXT
    const ctx = gsap.context(() => {
      // Estado inicial
      gsap.set(image, { scale: 0.2, borderRadius: "3rem" });
      gsap.set(overlay, { scale: 0.2, borderRadius: "3rem" });
      gsap.set(contact, { x: -100, opacity: 0, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=100%",

          pinSpacing: true,
          invalidateOnRefresh: true,
          onLeave: () => setHasAnimated(true),
        },
      });

      tl.to([image, overlay], {
        scale: 1,
        borderRadius: "35px",
        duration: 1,
        ease: "power2.out",
      });

      tl.to(
        contact,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      const formElements = contact.querySelectorAll(".animate-item");
      tl.fromTo(
        formElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, container); // 🔥 Scope al container

    return () => {
      ctx.revert(); // 🔥 LIMPIA SOLO los triggers de esta sección
    };
  }, [isMobile, hasAnimated]);

  const handleSubmit = (data: any) => {
    alert("¡Mensaje enviado correctamente!");
  };

  const contactForm = useAppStore((state) => state.conctactForm);
  const setcontactForm = useAppStore((state) => state.setcontactForm);

  return (
    <section id="contact" className="w-full">
      <div
        ref={containerRef}
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
    </section>
  );
}

export default ContactSection;
