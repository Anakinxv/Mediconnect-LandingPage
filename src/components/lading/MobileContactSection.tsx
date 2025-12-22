import React from "react";
import MCInput from "@/components/common/forms/MCInput";
import MediButton from "@/components/common/MediButton";
import MCTextArea from "@/components/common/forms/MCTextArea";
import MCFormWrapper from "@/components/common/forms/MCFormWrapper";
import { contactSchema } from "@/schema/landingSchema";
import ContactImage from "@/assets/contact.png";
import { useAppStore } from "@/stores/useAppStore";
import { useTranslation } from "react-i18next";

function MobileContactSection() {
  const { t } = useTranslation("landing");
  const contactForm = useAppStore((state) => state.conctactForm);
  const setcontactForm = useAppStore((state) => state.setcontactForm);

  const handleSubmit = (data: any) => {
    alert("¡Mensaje enviado correctamente!");
  };

  return (
    <section id="contact" className="w-full min-h-screen py-12 px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Imagen de fondo */}
        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-6">
          <img
            src={ContactImage}
            alt="Contacto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/30"></div>

          {/* Título sobre la imagen */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold text-center px-4">
              {t("contacts.title")}
            </h2>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <MCFormWrapper
            schema={contactSchema}
            defaultValues={{
              name: contactForm.name,
              email: contactForm.email,
              message: contactForm.message,
            }}
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <div>
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

              <div>
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

              <div>
                <MCTextArea
                  name="message"
                  label={t("contacts.messageLabel")}
                  placeholder={t("contacts.messagePlaceholder")}
                  className="h-[120px]"
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

              <div className="pt-2">
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
            </div>
          </MCFormWrapper>
        </div>
      </div>
    </section>
  );
}

export default MobileContactSection;
