import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/useIsMobile";
import FAQImage from "@/assets/faq.png";
import FAQImage2 from "@/assets/Heren_HERE_[YOUR_SCENE_CONCEPT_HERE]__COLOR_PALETTE___-_Primary_calm_greens__5157a5a4-2da5-4b37-a912-3cf351cc5e90.png";
function FAQSection() {
  const isMobile = useIsMobile();
  return (
    <div className="p-[15px] flex justify-center text-teal-500 h-[100vh] w-full">
      <section className="bg-red-300 py-12 px-6  w-full grid gap-4 grid-cols-[45%_55%] ">
        <main className="bg-pink-400 max-w-xl">
          <div className="flex flex-col gap-2 w-full h-full justify-between">
            {/* TITULOS - CENTRADOS */}
            <div className="flex flex-col items-start text-start gap-4">
              <h4 className="tracking-wide text-lg font-regular text-primary">
                FAQ
              </h4>
              <h1
                className={`${
                  isMobile ? "text-3xl" : "text-6xl"
                } font-medium text-primary mb-4 `}
              >
                Preguntas frecuentes esenciales
              </h1>
              <p className="font-normal text-lg text-primary mb-4 w-full ">
                Descubre cómo MediConnect facilita la atención médica para
                pacientes, doctores y centros de salud.
              </p>
            </div>

            <div>
              <img src={FAQImage2} alt="FAQ" className="w-[350px] h-[300px] " />
            </div>
          </div>
        </main>
        <aside className="bg-blue-300 ">
          {/* Aquí puedes agregar las preguntas frecuentes */}
          preguntas aquí dik
        </aside>
      </section>
    </div>
  );
}

export default FAQSection;
