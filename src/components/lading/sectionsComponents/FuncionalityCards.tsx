import Funcionality01 from "../../../assets/Funcionality-01.png";
import Funcionality02 from "../../../assets/Funcionality-02.png";
import Funcionality03 from "../../../assets/Funcionality-03.png";
import Funcionality04 from "../../../assets/Funcionality-04.png";

const cards = [
  {
    img: Funcionality01,
    title: "Chat Directo con Doctores",
    desc: "Mensajería segura y privada con tus médicos. Resuelve dudas rápidamente sin necesidad de una cita.",
  },
  {
    img: Funcionality02,
    title: "Historial Clínico Digital",
    desc: "Todo tu historial médico en un solo lugar. Accede a tus resultados, recetas y análisis cuando los necesites.",
  },
  {
    img: Funcionality03,
    title: "Buscar Doctores por Zona",
    desc: "Encuentra médicos especializados cerca de ti con nuestra búsqueda inteligente por ubicación.",
  },
  {
    img: Funcionality04,
    title: "Teleconsultas en Tiempo Real",
    desc: "Consulta con médicos desde cualquier lugar y en cualquier momento, sin esperas ni traslados.",
  },
];

function FuncionalityCards() {
  return (
    <div className="w-full flex flex-wrap justify-center gap-8 py-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 max-w-xs transition-transform hover:scale-105"
        >
          <img src={card.img} alt={card.title} className="w-20 h-20 mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2 text-center">
            {card.title}
          </h3>
          <p className="text-base text-gray-700 text-center">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default FuncionalityCards;
