import { useRef } from "react";
import { useTranslation } from "react-i18next";
import MediButton from "@/components/common/MediButton";
import MCInput from "@/components/common/forms/MCInput";
import MCFormWrapper from "../common/forms/MCFormWrapper";
import { newsletterSchema } from "@/schema/landingSchema";
import { useAppStore } from "@/stores/useAppStore";
import MCLOGO from "@/assets/MediConnectLanding.png";
import { ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useTranslation("landing");
  const quickLinks = t("footer.quickLinks", { returnObjects: true }) as {
    href: string;
    label: string;
  }[];

  const newsletterForm = useAppStore((state) => state.newletterForm);
  const setnewsletterForm = useAppStore((state) => state.setnewsletterForm);

  // Refs for animations
  const containerRef = useRef(null);
  const brandRef = useRef(null);
  const quickLinksRef = useRef(null);
  const newsletterRef = useRef(null);
  const bottomBarRef = useRef(null);

  useGSAP(
    () => {
      // Brand section animation
      gsap.fromTo(
        brandRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Quick links animation
      gsap.fromTo(
        quickLinksRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quickLinksRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Newsletter section animation
      gsap.fromTo(
        newsletterRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Bottom bar animation
      gsap.fromTo(
        bottomBarRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomBarRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleSubmit = (data: { email: string }) => {
    setnewsletterForm({ email: "" });
  };

  return (
    <footer className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      {/* Main Footer Content */}
      <div
        ref={containerRef}
        className="bg-primary rounded-[20px] sm:rounded-[25px] lg:rounded-[35px]"
      >
        <div className="rounded-[20px] sm:rounded-[25px] lg:rounded-[35px] border border-primary/20 bg-primary py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-8  mx-auto items-center lg:items-start">
            {/* Brand Column */}
            <div
              ref={brandRef}
              className="flex flex-col gap-y-3 sm:gap-y-4 text-center lg:text-left w-full lg:w-auto"
            >
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
                {t("footer.brandDesc")}
              </p>
            </div>

            {/* Quick Links Column */}
            {/* <div
              ref={quickLinksRef}
              className="flex flex-col gap-y-3 sm:gap-y-4 text-left lg:text-center w-full lg:w-auto mt-6 lg:mt-0 items-center justify-center"
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                {t("footer.quickLinksTitle")}
              </h3>
              <nav>
                <ul className="flex flex-col gap-2 w-full">
                  {quickLinks.map((link) => (
                    <li key={link.href} className="w-full">
                      <a
                        href={link.href}
                        className="group flex items-center gap-3 text-lg text-white transition-colors duration-300 hover:text-accent py-2 w-full"
                      >
                        <span className="flex items-center transition-transform duration-300 group-hover:translate-x-2">
                          <ChevronRight
                            size={28}
                            className="text-white transition-colors duration-300 group-hover:text-accent"
                          />
                        </span>
                        <span className="font-medium transition-colors duration-300 group-hover:text-accent group-hover:translate-x-1">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div> */}

            {/* Newsletter Column */}
            <div
              ref={newsletterRef}
              className="flex flex-col gap-y-3 sm:gap-y-4 text-center lg:text-left w-full lg:w-auto mt-6 lg:mt-0 px-0"
            >
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {t("footer.newsletterTitle")}
              </h3>
              <p className="text-md sm:text-md text-white max-w-md mx-auto lg:mx-0">
                {t("footer.newsletterDesc")}
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
                      placeholder={t("footer.InputPlaceholder")}
                      value={newsletterForm!.email}
                      onChange={(e) =>
                        setnewsletterForm({ email: e.target.value })
                      }
                      required
                      className="bg-white text-primary h-12 sm:h-[52px] md:w-[300px] text-sm sm:text-base flex-1 min-w-0 transition-all duration-300 hover:shadow-lg focus:shadow-lg focus:scale-[1.02]"
                    />
                    <MediButton
                      type="submit"
                      className="bg-accent text-primary h-12 sm:h-[52px] text-sm sm:text-base flex items-center justify-center shadow transition-all duration-300 w-full sm:w-auto sm:min-w-[140px] hover:scale-105 hover:shadow-lg hover:bg-accent/90"
                      aria-label="Enviar"
                    >
                      {t("footer.newsletterBtn")}
                    </MediButton>
                  </div>
                </MCFormWrapper>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomBarRef}
          className="border-t border-white/20 py-3 sm:py-4"
        >
          <div className="mx-auto flex flex-col items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 md:flex-row">
            <p className="text-xs sm:text-sm text-white text-center md:text-left hover:text-accent transition-colors duration-300">
              {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="#"
                className="text-xs sm:text-sm text-white transition-all duration-300 hover:text-accent whitespace-nowrap hover:scale-105 hover:translate-y-[-2px]"
              >
                {t("footer.terms")}
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-white transition-all duration-300 hover:text-accent whitespace-nowrap hover:scale-105 hover:translate-y-[-2px]"
              >
                {t("footer.privacy")}
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-white transition-all duration-300 hover:text-accent whitespace-nowrap hover:scale-105 hover:translate-y-[-2px]"
              >
                {t("footer.contact")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
