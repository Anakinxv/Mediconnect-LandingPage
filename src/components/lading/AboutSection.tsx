import AboutMain from "../../assets/about-image-main.png";
import AboutAside from "../../assets/about-image-aside.png";
import { useIsMobile } from "../../hooks/useIsMobile";

function AboutSection() {
  const isMobile = useIsMobile();

  return (
    <main className="p-[15px] flex justify-center">
      <main className="bg-white py-12 px-6 gap-2 items-center w-full">
        <div className="flex flex-col gap-6 w-full px-6 h-full">
          <h4 className="tracking-wide text-xl font-normal text-primary">
            Sobre Nosotros
          </h4>
          <div
            className={`${
              isMobile ? "flex flex-col" : "grid grid-cols-[65%_35%]"
            } align-top items-start gap-6`}
          >
            <h1
              className={`${
                isMobile ? "text-4xl" : "text-7xl"
              } font-bold text-primary mb-4`}
            >
              Una Plataforma para la Salud Conectada
            </h1>
            <p className="font-normal text-xl text-primary mb-4 w-full">
              MediConect es una plataforma digital que conecta pacientes,
              médicos y centros de salud para ofrecer atención rápida y
              organizada. Simplifica citas, comunicación y acceso a historiales,
              creando una experiencia médica más clara, humana y eficiente.
            </p>
          </div>
          <div
            className={`w-full h-full ${
              isMobile ? "flex flex-col" : "grid grid-cols-[65%_35%]"
            } align-top items-start gap-6`}
          >
            {isMobile ? (
              <img
                src={AboutMain}
                alt="About Main"
                className="rounded-2xl w-full h-[350px] object-cover shadow-lg pointer-events-none"
              />
            ) : (
              <>
                <img
                  src={AboutMain}
                  alt="About Main"
                  className="rounded-2xl w-full h-full object-cover shadow-lg pointer-events-none"
                />
                <img
                  src={AboutAside}
                  alt="About Aside"
                  className="rounded-2xl w-full h-full object-cover shadow-md pointer-events-none"
                />
              </>
            )}
          </div>
        </div>
      </main>
    </main>
  );
}

export default AboutSection;
