import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/useIsMobile";
import FAQImage from "@/assets/faq.png";
import FAQImage2 from "@/assets/Heren_HERE_[YOUR_SCENE_CONCEPT_HERE]__COLOR_PALETTE___-_Primary_calm_greens__5157a5a4-2da5-4b37-a912-3cf351cc5e90.png";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What types of organizations do you work with?",
    answer:
      "We work with universities, pharmaceutical companies, biotech startups, and government research institutions. Our services are tailored to meet the unique needs of each organization.",
  },
  {
    question: "Can your lab help with regulatory compliance?",
    answer:
      "Yes, we provide comprehensive regulatory compliance support including GLP, GMP, and FDA guidelines. Our team ensures all research meets the highest industry standards.",
  },
  {
    question: "How do we get started with a project?",
    answer:
      "Simply contact us through our website or email. We'll schedule an initial consultation to discuss your research goals, timeline, and budget requirements.",
  },
  {
    question: "Do you offer custom research outside of your listed services?",
    answer:
      "Absolutely. We specialize in developing custom research protocols and can adapt our services to meet your specific scientific objectives.",
  },
  {
    question: "What's the average turnaround time for lab testing?",
    answer:
      "Turnaround times vary by project complexity. Standard tests typically take 5-10 business days, while comprehensive studies may require 4-8 weeks.",
  },
  {
    question: "Where is your lab located, and do you serve clients remotely?",
    answer:
      "Our main facility is located in San Francisco, CA. We serve clients globally and offer remote consultation, sample shipping, and digital reporting services.",
  },

  {
    question: "Where is your lab located, and do you serve clients remotely?",
    answer:
      "Our main facility is located in San Francisco, CA. We serve clients globally and offer remote consultation, sample shipping, and digital reporting services.",
  },
];

function FAQSection() {
  const isMobile = useIsMobile();
  return (
    <div className="p-[15px] flex justify-center w-full">
      <section className="gap-4 w-full grid grid-cols-[40%_60%] justify-center py-12 px-6">
        <main>
          <div className="flex flex-col gap-2 w-full h-full justify-between">
            {/* TITULOS - CENTRADOS */}
            <div className="flex flex-col items-start text-start gap-2">
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
              <img
                src={FAQImage2}
                alt="FAQ"
                className="w-full h-[300px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </main>
        <aside className="flex items-start justify-center w-full h-full">
          <Accordion
            type="single"
            collapsible
            className="w-full  rounded-2xl  flex flex-col gap-2 h-full justify-between"
          >
            {faqItems.map((item, idx) => (
              <AccordionItem
                value={`item-${idx}`}
                key={idx}
                className="bg-[#ecf6e8dc]/80  p-4 rounded-lg shadow-none border-0"
              >
                <AccordionTrigger className="text-primary text-md font-medium w-fit ">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-primary text-md">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </aside>
      </section>
    </div>
  );
}

export default FAQSection;
