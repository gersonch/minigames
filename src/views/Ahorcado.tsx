import { Body } from "../components/Body";

export function Ahorcado() {
  const tries = 6;
  const word = "hola";
  const wordArray = word.split("");
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">El Ahorcado</h1>
      {/* Ilustración de persona ahorcada para juego */}
      <Body />
      <div>
        {wordArray.map((_, index) => (
          <span
            key={index}
            className="w-8 h-8 text-center mx-1 border-b-2 border-gray-500 bg-amber-200"
          />
        ))}
      </div>
    </div>
  );
}
