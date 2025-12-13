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
    <div className="w-full flex justify-center gap-4 py-8">
      <div className="grid grid-rows-2 gap-4 w-full max-w-6xl">
        {/* Primera fila: 65% - 35% */}
        <div className="grid grid-cols-[60%_40%] gap-4 bg-amber-300">
          <div className="bg-white rounded-xl h-[500px] overflow-hidden shadow-lg flex flex-col gap-4 items-center justify-center px-8 py-8 transition-transform">
            <div className="overflow-hidden inline-block rounded-3xl w-full h-full">
              <img
                src={cards[0].img}
                alt={cards[0].title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-start">
              <h3 className="text-xl font-semibold text-primary mb-2 text-start">
                {cards[0].title}
              </h3>
              <p className="text-base text-gray-700 text-start">
                {cards[0].desc}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl h-[500px] overflow-hidden shadow-lg flex flex-col gap-4 items-center justify-center px-8 py-8 transition-transform">
            <div className="overflow-hidden inline-block rounded-3xl w-full h-full">
              <img
                src={cards[1].img}
                alt={cards[1].title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-start">
              <h3 className="text-xl font-semibold text-primary mb-2 text-start">
                {cards[1].title}
              </h3>
              <p className="text-base text-gray-700 text-start">
                {cards[1].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Segunda fila: 40% - 60% */}
        <div className="grid grid-cols-[40%_60%] gap-4">
          <div className="bg-white rounded-xl h-[500px]  overflow-hidden shadow-lg flex flex-col gap-4 items-center justify-center px-8 py-8 transition-transform">
            <div className="overflow-hidden inline-block rounded-3xl w-full h-full">
              <img
                src={cards[2].img}
                alt={cards[2].title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-start">
              <h3 className="text-xl font-semibold text-primary mb-2 text-start">
                {cards[2].title}
              </h3>
              <p className="text-base text-gray-700 text-start">
                {cards[2].desc}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl h-[500px]  overflow-hidden shadow-lg flex flex-col gap-4 items-center justify-center px-8 py-8 transition-transform">
            <div className="overflow-hidden inline-block rounded-3xl w-full h-full">
              <img
                src={cards[3].img}
                alt={cards[3].title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-start">
              <h3 className="text-xl font-semibold text-primary mb-2 text-start">
                {cards[3].title}
              </h3>
              <p className="text-base text-gray-700 text-start">
                {cards[3].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FuncionalityCards;
