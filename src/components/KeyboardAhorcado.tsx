/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

export function KeyboardAhorcado({
  onLetterClick,
}: {
  onLetterClick: (letter: string) => boolean;
}) {
  const tries = 6;
  const letters = "abcdefghijklmnñopqrstuvwxyz".split("");
  const [letterStatus, setLetterStatus] = useState<Record<string, boolean>>({});
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const letter = e.currentTarget.textContent;
    if (letter) {
      const isIncluded = onLetterClick(letter);
      setLetterStatus((prevStatus) => ({
        ...prevStatus,
        [letter]: isIncluded,
      }));
    }
    if (
      Object.entries(letterStatus).filter(([_, value]) => value === false)
        .length === tries
    ) {
      setIsGameOver(true);
    }
  };
  console.log(letterStatus);
  const styleButtons =
    "m-1 p-2 bg-[#1a1a1a] text-white font-bold uppercase w-12 h-12 hover:scale-110 transition-transform duration-200 rounded relative";

  return (
    <div className="flex flex-wrap justify-center items-center max-w-48 relative">
      {letters.map((letter, index) => (
        <button
          key={index}
          className={isGameOver ? `${styleButtons} opacity-25` : styleButtons}
          onClick={handleClick}
          disabled={isGameOver}
        >
          {letterStatus[letter] !== undefined && (
            <span className="absolute inset-0 flex items-center justify-center text-2xl">
              {letterStatus[letter] ? "✅" : "❌"}
            </span>
          )}
          {letter}
        </button>
      ))}
      {isGameOver && (
        <div className="text-8xl absolute flex text-red-500 font-bold animate-fade-up">
          <div className="flex flex-col">
            <span>G</span>
            <span>A</span>
            <span>M</span>
            <span>E</span>
          </div>
          <div className="flex flex-col">
            <span>O</span>
            <span>V</span>
            <span>E</span>
            <span>R</span>
          </div>
        </div>
      )}
    </div>
  );
}
