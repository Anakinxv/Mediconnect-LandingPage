import { useRef } from "react";
import AboutMain from "../../assets/about-image-main.png";
import AboutAside from "../../assets/about-image-aside.png";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const isMobile = useIsMobile();
  const { t } = useTranslation("landing");
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const mainImageRef = useRef(null);
  const asideImageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        mainImageRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainImageRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      if (!isMobile && asideImageRef.current) {
        gsap.fromTo(
          asideImageRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 60,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: asideImageRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <main className="p-[15px] flex justify-center">
      <main
        ref={containerRef}
        className="bg-white py-12 px-6 gap-2 items-center w-full"
      >
        <div className="flex flex-col gap-6 w-full px-6 h-full">
          <h4
            ref={titleRef}
            className="tracking-wide text-xl font-normal text-primary"
          >
            {t("about.title")}
          </h4>
          <div
            className={`${
              isMobile ? "flex flex-col" : "grid grid-cols-[65%_35%]"
            } align-top items-start gap-6`}
          >
            <h1
              ref={subtitleRef}
              className={`${
                isMobile ? "text-4xl" : "text-7xl"
              } font-bold text-primary mb-4`}
            >
              {t("about.subtitle")}
            </h1>
            <p
              ref={textRef}
              className="font-normal text-xl text-primary mb-4 w-full"
            >
              {t("about.description")}
            </p>
          </div>
          <div
            className={`w-full h-full ${
              isMobile ? "flex flex-col" : "grid grid-cols-[65%_35%]"
            } align-top items-start gap-6`}
          >
            {isMobile ? (
              <img
                ref={mainImageRef}
                src={AboutMain}
                alt="About Main"
                className="rounded-2xl w-full h-[350px] object-cover shadow-lg pointer-events-none "
              />
            ) : (
              <>
                <div
                  ref={mainImageRef}
                  className="overflow-hidden inline-block rounded-2xl w-full h-full "
                >
                  <img
                    src={AboutMain}
                    alt="About Main"
                    className="rounded-2xl w-full h-full object-cover shadow-lg hover:scale-115 transition-transform duration-500  "
                  />
                </div>
                <div
                  ref={asideImageRef}
                  className="overflow-hidden inline-block rounded-2xl w-full h-full "
                >
                  <img
                    src={AboutAside}
                    alt="About Aside"
                    className="rounded-2xl w-full h-full object-cover shadow-lg hover:scale-115 transition-transform duration-500  "
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </main>
  );
}

export default AboutSection;
