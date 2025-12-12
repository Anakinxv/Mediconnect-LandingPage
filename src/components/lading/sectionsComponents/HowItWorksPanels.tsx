import { useTranslation } from "react-i18next";
import { forwardRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import step1 from "../../../assets/step-01.png";
import step2 from "../../../assets/step-02.png";
import step3 from "../../../assets/step-03.png";
import step4 from "../../../assets/step-04.png";

interface HowItWorksPanelsProps {
  stepIndex: number;
  imgRef?: React.Ref<HTMLImageElement>;
}

const HowItWorksPanels = forwardRef<HTMLImageElement, HowItWorksPanelsProps>(
  ({ stepIndex, imgRef }, ref) => {
    const { t } = useTranslation("landing");
    const isMobile = useIsMobile();

    const steps = [
      {
        image: step1,
        number: "01",
        step: "Paso 1",
        title: "Regístrate fácilmente",
        description:
          "Crea tu cuenta en segundos y completa tu información básica para comenzar a usar la plataforma sin complicaciones.",
      },
      {
        image: step2,
        number: "02",
        step: "Paso 2",
        title: "Encuentra tu servicio médico",
        description:
          "Busca especialidades, doctores o centros cercanos. Utiliza filtros simples para localizar exactamente el servicio que necesitas.",
      },
      {
        image: step3,
        number: "03",
        step: "Paso 3",
        title: "Agenda tu cita",
        description:
          "Elige fecha, hora y modalidad de atención. Confirma tu cita y recibe notificaciones automáticas en tu dispositivo.",
      },
      {
        image: step4,
        number: "04",
        step: "Paso 4",
        title: "Preséntate a tu consulta",
        description:
          "Preséntate a tu consulta de forma presencial o conéctate a tu teleconsulta desde la app con un solo clic, según la modalidad seleccionada.",
      },
    ];

    const step = steps[stepIndex];

    return (
      <div className="w-full h-full rounded-4xl overflow-hidden bg-white relative">
        <img
          ref={imgRef}
          src={step.image}
          alt={t(`howItWorks.${step.number}_alt`)}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />

        <div
          className={`absolute top-0 left-0 right-0 flex justify-start items-start ${
            isMobile ? "p-4" : "p-6"
          }`}
        >
          <div
            className={`flex flex-col justify-center items-center relative rounded-full border border-white/40 bg-white/30 backdrop-blur-xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,2.2)] z-20 ${
              isMobile ? "px-4 py-2" : "px-5 py-2"
            }`}
          >
            <h3
              className={`text-white ${
                isMobile ? "text-base" : "text-lg"
              } font-normal tracking-wider text-center`}
            >
              {step.step}
            </h3>
          </div>
        </div>

        <div>
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent ${
              isMobile ? "p-4" : "p-6 md:p-8"
            } flex ${
              isMobile ? "flex-col gap-4 items-start" : "flex-row"
            } justify-between items-end`}
          >
            <h2
              className={`text-white ${
                isMobile ? "text-xl" : "text-2xl md:text-5xl"
              } font-medium mb-2 max-w-lg`}
            >
              {step.title}
            </h2>

            <div
              className={`${
                isMobile ? "max-w-full" : "max-w-sm"
              } flex flex-col justify-center items-start relative rounded-3xl border border-white/40 bg-white/30 backdrop-blur-xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,2.2)] z-20 ${
                isMobile ? "px-4 py-3" : "px-7 py-4"
              }`}
            >
              <h3
                className={`text-white ${
                  isMobile ? "text-sm" : "text-base md:text-lg"
                } font-normal tracking-wide text-left drop-shadow`}
              >
                {step.description}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default HowItWorksPanels;
