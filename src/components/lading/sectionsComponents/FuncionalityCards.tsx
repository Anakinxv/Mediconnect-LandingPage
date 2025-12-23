import Funcionality01 from "../../../assets/Heren_HERE_[YOUR_SCENE_CONCEPT_HERE]__COLOR_PALETTE___-_Primary_calm_greens__5157a5a4-2da5-4b37-a912-3cf351cc5e90.png";
import Funcionality02 from "../../../assets/Heren_HERE_[YOUR_SCENE_CONCEPT_HERE]__COLOR_PALETTE___-_Primary_calm_greens__5157a5a4-2da5-4b37-a912-3cf351cc5e90.png";
import Funcionality03 from "../../../assets/Heren_HERE_[YOUR_SCENE_CONCEPT_HERE]__COLOR_PALETTE___-_Primary_calm_greens__5157a5a4-2da5-4b37-a912-3cf351cc5e90.png";
import Funcionality04 from "../../../assets/Heren_HERE_[YOUR_SCENE_CONCEPT_HERE]__COLOR_PALETTE___-_Primary_calm_greens__5157a5a4-2da5-4b37-a912-3cf351cc5e90.png";
import { useTranslation } from "react-i18next";

interface FuncionalityCardsProps {
  cardClassName?: string;
}

function FuncionalityCards({ cardClassName }: FuncionalityCardsProps) {
  const { t } = useTranslation("landing");

  const cardImages = [
    Funcionality01,
    Funcionality02,
    Funcionality03,
    Funcionality04,
  ];

  const cards = cardImages.map((img, index) => ({
    img,
    title: t(`functionality.cards.${index}.title`),
    desc: t(`functionality.cards.${index}.description`),
  }));

  const Card = ({
    card,
    className = "",
  }: {
    card: (typeof cards)[0];
    className?: string;
  }) => (
    <div
      className={`bg-white rounded-3xl bg-gradient-to-b 
        from-white from-[0%]
        via-[#F5FAF3] via-[71%]
        to-[#D7E3C9]/25 to-[100%] overflow-hidden 
        flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-center 
        p-3 sm:p-4 md:p-6 lg:p-8 ${className} border border-accent/40  `}
    >
      <div className="overflow-hidden inline-block rounded-2xl sm:rounded-3xl w-full flex-1">
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-start w-full">
        <h3 className="font-semibold text-primary mb-1 sm:mb-2 md:mb-3 text-start text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {card.title}
        </h3>
        <p className="text-primary text-start text-xs sm:text-sm md:text-base lg:text-lg">
          {card.desc}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      {/*
        En cada grid, agrega cardClassName a cada Card
      */}

      {/* Móvil: grid 2 columnas */}
      <div className="block sm:hidden w-full ">
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              className={`h-[350px] ${cardClassName ?? ""}`}
            />
          ))}
        </div>
      </div>

      {/* Tablet: grid 2x2 */}
      <div className="hidden sm:block md:hidden w-full max-w-2xl">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[700px]">
          <Card card={cards[0]} className={cardClassName} />
          <Card card={cards[1]} className={cardClassName} />
          <Card card={cards[2]} className={cardClassName} />
          <Card
            card={cards[3]}
            className={`bg-gradient-to-b from-white from-[0%] via-[#F5FAF3] via-[90%] to-[#D7E3C9]/60 to-[100%] ${
              cardClassName ?? ""
            }`}
          />
        </div>
      </div>

      {/* Desktop pequeño: grid 2x2 más grande */}
      <div className="hidden md:block lg:hidden w-full max-w-4xl">
        <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[800px]">
          <Card card={cards[0]} className={cardClassName} />
          <Card card={cards[1]} className={cardClassName} />
          <Card card={cards[2]} className={cardClassName} />
          <Card
            card={cards[3]}
            className={`bg-gradient-to-b from-white from-[0%] via-[#F5FAF3] via-[90%] to-[#D7E3C9]/60 to-[100%] ${
              cardClassName ?? ""
            }`}
          />
        </div>
      </div>

      {/* Desktop grande: grid asimétrico original */}
      <div className="hidden lg:block w-full max-w-7xl">
        <div className="grid grid-rows-2 gap-4">
          {/* Primera fila: 55% - 45% */}
          <div className="grid grid-cols-[55%_45%] gap-4">
            <Card
              card={cards[0]}
              className={`h-[500px] ${cardClassName ?? ""}`}
            />
            <Card
              card={cards[1]}
              className={`h-[500px] ${cardClassName ?? ""}`}
            />
          </div>

          {/* Segunda fila: 45% - 55% */}
          <div className="grid grid-cols-[45%_55%] gap-4">
            <Card
              card={cards[2]}
              className={`h-[500px] ${cardClassName ?? ""}`}
            />
            <Card
              card={cards[3]}
              className={`h-[500px] bg-gradient-to-b from-white from-[0%] via-[#F5FAF3] via-[90%] to-[#D7E3C9]/60 to-[100%] ${
                cardClassName ?? ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FuncionalityCards;
