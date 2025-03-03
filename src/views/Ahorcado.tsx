import { Body } from "../components/Body";
import { KeyboardAhorcado } from "../components/KeyboardAhorcado";
import { useState } from "react";

export function Ahorcado() {
  const word = "mañana";
  const wordArray = word.split("");
  const [selectedLetter, setSelectedLetter] = useState<string[]>([]);

  const onLetterClick = (letter: string): boolean => {
    setSelectedLetter((prevLetters) => [...prevLetters, letter]);
    return wordArray.includes(letter);
  };

  const allLettersGuessed = wordArray.every((letter) =>
    selectedLetter.includes(letter)
  );

  return (
    <section className="flex justify-between w-full">
      <div className="flex flex-col items-center px-10">
        <h1 className="text-2xl font-bold mb-4">El Ahorcado</h1>
        {/* Ilustración de persona ahorcada para juego */}
        <Body />

        <div className="flex my-8">
          {wordArray.map((letter, index) => (
            <div
              key={index}
              className="border-b-2 border-amber-50 w-8 h-8 mx-2 font-bold uppercase"
            >
              {selectedLetter.includes(letter) ? letter : ""}
            </div>
          ))}
        </div>

        {allLettersGuessed && (
          <div className="text-green-500 font-bold mt-4">
            ¡Felicidades! Has adivinado la palabra.
          </div>
        )}
      </div>
      <div className="px-10 flex justify-center items-center ">
        <KeyboardAhorcado onLetterClick={onLetterClick} />
      </div>
    </section>
  );
}
