import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const contact = contactRef.current;

    if (!container || !image || !contact) return;

    if (hasAnimated) {
      gsap.set(image, {
        scale: 1,
        borderRadius: isMobile ? "0rem" : "35px",
      });
      gsap.set(contact, {
        x: 0,
        opacity: 1,
        scale: 1,
      });
      const formElements = contact.querySelectorAll(".animate-item");
      gsap.set(formElements, {
        y: 0,
        opacity: 1,
      });
      return;
    }

    gsap.set(image, {
      scale: 0.2,
      borderRadius: "3rem",
    });
    gsap.set(contact, {
      x: -100,
      opacity: 0,
      scale: 0.9,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 1,
        onLeave: () => setHasAnimated(true),
      },
    });

    tl.to(image, {
      scale: 1,
      borderRadius: isMobile ? "0rem" : "35px",
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
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, hasAnimated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Mensaje enviado correctamente!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="w-full">
      <div
        ref={containerRef}
        className="h-screen w-full flex items-center justify-center bg-white py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="relative w-[100%] mx-auto h-full flex items-center">
          <div
            className={`relative w-full h-full overflow-hidden min-h-[600px]`}
          >
            {/* Imagen de fondo */}
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop"
              alt="Imagen de contacto"
              className={`absolute inset-0 w-full h-full object-cover will-change-transform rounded-[35px]`}
              style={{ transformOrigin: "center center" }}
            />

            {/* Formulario de contacto */}
            <div
              ref={contactRef}
              className="absolute z-20 left-16 top-1/2 -translate-y-1/2 w-[600px] max-w-full"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12">
                <h2 className="animate-item font-bold text-gray-800 mb-1 text-4xl lg:text-5xl">
                  <span className="text-emerald-600">Contáctanos</span> si
                  tienes
                </h2>
                <h2 className="animate-item font-bold text-gray-800 mb-6 text-4xl lg:text-5xl">
                  alguna <span className="text-emerald-600">duda!</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="animate-item">
                      <input
                        type="text"
                        name="name"
                        placeholder="Nombre Completo"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-base"
                        required
                      />
                    </div>
                    <div className="animate-item">
                      <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-base"
                        required
                      />
                    </div>
                  </div>
                  <div className="animate-item">
                    <textarea
                      name="message"
                      placeholder="Escriba su mensaje aquí..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 resize-none text-base"
                      required
                    />
                  </div>
                  <div className="animate-item pt-2">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-base"
                    >
                      Enviar Ahora
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
