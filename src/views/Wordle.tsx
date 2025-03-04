import { useState, useEffect } from "react";
import { Keyboard } from "../components/Keyboard";
import { GameBoard } from "../components/GameBoard";
import { getWordOfTheDay } from "../lib/getWordOfTheDay";

export default function Wordle() {
  const maxAttempts = 6;
  const [randomWord, setRandomWord] = useState<string | null>(""); // Aseguramos que el tipo sea string | null
  const [attempts, setAttempts] = useState<string[][]>([]);
  const [highlightIndices, setHighlightIndices] = useState<number[][]>(
    Array(maxAttempts)
      .fill(null)
      .map(() => [])
  );
  const [lowHighlightIndices, setLowHighlightIndices] = useState<number[][]>(
    Array(maxAttempts)
      .fill(null)
      .map(() => [])
  );
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [deactivatedKeys, setDeactivatedKeys] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchWord = async () => {
      const data = await getWordOfTheDay();
      setRandomWord(data.word); // Actualiza el estado de randomWord con la palabra del día
    };

    fetchWord(); // Llamamos a la función para obtener la palabra
  }, [randomWord]); // Se ejecuta una sola vez cuando se monta el componente

  useEffect(() => {
    if (randomWord) {
      // Solo crea las filas de intentos cuando ya tenemos la palabra del día
      const emptyRows = Array(maxAttempts)
        .fill(null)
        .map(() => Array(randomWord.length).fill(""));
      setAttempts(emptyRows);
    }
  }, [randomWord]); // Este useEffect depende de randomWord

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (row !== currentAttempt) return;
    const newAttempts = [...attempts];
    newAttempts[row][col] = e.target.value;
    setAttempts(newAttempts);
  };

  const handleSubmit = () => {
    if (currentAttempt >= maxAttempts) return;
    if (!randomWord) return;
    const currentRow = attempts[currentAttempt].join("").toLowerCase();
    if (currentRow.length < randomWord.length) return;

    if (currentRow === randomWord.toLowerCase()) {
      setIsCorrect(true);
      setHighlightIndices((prev) => {
        const newIndices = [...prev];
        newIndices[currentAttempt] = [...Array(randomWord.length).keys()];
        return newIndices;
      });
      return;
    }

    const correctIndices: number[] = [];
    const lowCorrectIndices: number[] = [];

    const letterCount: Record<string, number> = {};
    for (const letter of randomWord.toLowerCase()) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    for (let i = 0; i < randomWord.length; i++) {
      if (
        randomWord[i].toLowerCase() ===
        attempts[currentAttempt][i]?.toLowerCase()
      ) {
        correctIndices.push(i);
        letterCount[randomWord[i].toLowerCase()] -= 1;
      }
    }

    for (let i = 0; i < randomWord.length; i++) {
      const letter = attempts[currentAttempt][i]?.toLowerCase();
      if (
        letter &&
        letter !== randomWord[i].toLowerCase() &&
        randomWord.toLowerCase().includes(letter) &&
        letterCount[letter] > 0
      ) {
        lowCorrectIndices.push(i);
        letterCount[letter] -= 1;
      }
    }

    setHighlightIndices((prev) => {
      const newIndices = [...prev];
      newIndices[currentAttempt] = correctIndices;
      return newIndices;
    });

    setLowHighlightIndices((prev) => {
      const newIndices = [...prev];
      newIndices[currentAttempt] = lowCorrectIndices;
      return newIndices;
    });

    const lettersInAttempt = new Set(
      attempts[currentAttempt].map((letter) => letter.toLowerCase())
    );
    const newDeactivatedKeys = new Set(deactivatedKeys);
    lettersInAttempt.forEach((letter) => {
      if (!randomWord.toLowerCase().includes(letter)) {
        newDeactivatedKeys.add(letter);
      }
    });

    setDeactivatedKeys(newDeactivatedKeys);

    setCurrentAttempt((prev) => prev + 1);
  };

  const handleKeyPress = (key: string) => {
    if (isCorrect || currentAttempt >= maxAttempts || !randomWord) return;

    if (key === "✅") {
      handleSubmit();
      return;
    }

    if (!deactivatedKeys.has(key)) {
      const newAttempts = [...attempts];
      newAttempts[currentAttempt][currentLetterIndex] = key;
      setAttempts(newAttempts);
      setCurrentLetterIndex((prevIndex) => (prevIndex + 1) % randomWord.length);
    }
  };

  return (
    <div className="items-center justify-center flex flex-col max-w-sm mx-auto px-4 py-8 gap-y-2">
      <h1 style={{ display: "none" }}>{randomWord}</h1>
      {randomWord ? (
        <>
          <h1 className="font-bold">Wordle</h1>
          <GameBoard
            attempts={attempts}
            highlightIndices={highlightIndices}
            lowHighlightIndices={lowHighlightIndices}
            handleInputChange={handleInputChange}
          />
          {isCorrect ? <p>¡Correcto! 🎉</p> : <p></p>}
          <div className="flex justify-center  ">
            <Keyboard
              onKeyPress={handleKeyPress}
              disabled={currentAttempt >= maxAttempts || isCorrect}
              deactivatedKeys={deactivatedKeys}
            />
          </div>
          <div>hola</div>
        </>
      ) : (
        <p>Loading word of the day...</p>
      )}
    </div>
  );
}
