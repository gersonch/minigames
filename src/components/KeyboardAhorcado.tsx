import { useEffect, useState } from "react";
import { useWord } from "../store/useWord";

export function KeyboardAhorcado({
  onLetterClick,
  letterStatus,
}: {
  onLetterClick: (letter: string) => boolean;
  letterStatus: Record<string, boolean>;
  allLettersGuessed: boolean;
}) {
  const tries = 7;
  const letters = "abcdefghijklmnñopqrstuvwxyz".split("");
  const word = useWord((state) => state.word);

  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);

  const failedAttempts = Object.values(letterStatus).filter(
    (val) => !val
  ).length;

  useEffect(() => {
    const allCorrect = word.split("").every((letter) => letterStatus[letter]);
    if (allCorrect) {
      setIsWinner(true);
    }
  }, [letterStatus, word]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const letter = e.currentTarget.textContent;
    if (letter) {
      const isIncluded = onLetterClick(letter);

      // Contar los intentos fallidos
      const failedAttempts = Object.values(letterStatus).filter(
        (val) => !val
      ).length;

      if (failedAttempts >= tries) {
        setIsGameOver(true);
      }
      console.log(isIncluded);
    }
  };

  const styleButtons =
    "m-1 p-2 bg-[#1a1a1a] text-white font-bold uppercase w-12 h-12 hover:scale-110 transition-transform duration-200 rounded relative";

  return (
    <div className="flex flex-wrap justify-center items-center max-w-48 relative">
      {letters.map((letter, index) => (
        <button
          key={index}
          className={
            isGameOver || failedAttempts >= tries || isWinner
              ? `${styleButtons} opacity-25`
              : styleButtons
          }
          onClick={handleClick}
          disabled={isGameOver || failedAttempts >= tries || isWinner}
        >
          {letterStatus[letter] !== undefined && (
            <span className="absolute inset-0 flex items-center justify-center text-2xl">
              {letterStatus[letter] ? "✅" : "❌"}
            </span>
          )}
          {letter}
        </button>
      ))}
      {isGameOver ||
        (failedAttempts >= tries && (
          <div className="text-8xl absolute flex text-red-500 font-bold animate-fade-up">
            <div className="flex flex-col ">
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
        ))}
      {isWinner && (
        <div className="text-8xl absolute flex text-green-500 font-bold animate-fade-up">
          <div className="flex flex-col justify-center items-center">
            <span>H</span>
            <span>A</span>
            <span>S</span>
          </div>
          <div className="flex flex-col">
            <span>G</span>
            <span>A</span>
            <span>N</span>
            <span>A</span>
            <span>D</span>
            <span>O</span>
          </div>
        </div>
      )}
    </div>
  );
}
