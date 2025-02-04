import { useState, useEffect } from "react";
import { words } from "../mockups/words";
import { Keyboard } from "../components/Keyboard";
import { GameBoard } from "../components/GameBoard";

export default function Wordle() {
  const maxAttempts = 6;
  const [randomWord, setRandomWord] = useState<string>("");
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
    const word = words[Math.floor(Math.random() * words.length)];
    setRandomWord(word);

    const emptyRows = Array(maxAttempts)
      .fill(null)
      .map(() => Array(word.length).fill(""));
    setAttempts(emptyRows);
  }, []);

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

    // Contar ocurrencias de cada letra en la palabra objetivo
    const letterCount: Record<string, number> = {};
    for (const letter of randomWord.toLowerCase()) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    // Primero marcar las posiciones correctas
    for (let i = 0; i < randomWord.length; i++) {
      if (
        randomWord[i].toLowerCase() ===
        attempts[currentAttempt][i]?.toLowerCase()
      ) {
        correctIndices.push(i);
        letterCount[randomWord[i].toLowerCase()] -= 1; // Reducir la cuenta disponible de esa letra
      }
    }

    // Luego, marcar las letras que están en la palabra pero en la posición incorrecta
    for (let i = 0; i < randomWord.length; i++) {
      const letter = attempts[currentAttempt][i]?.toLowerCase();
      if (
        letter &&
        letter !== randomWord[i].toLowerCase() && // No debe estar en la posición correcta
        randomWord.toLowerCase().includes(letter) && // Debe estar en la palabra
        letterCount[letter] > 0 // Aún hay más letras disponibles para marcar
      ) {
        lowCorrectIndices.push(i);
        letterCount[letter] -= 1; // Reducir la cuenta disponible de esa letra
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

    // Marcar letras no existentes en la palabra como desactivadas
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
    if (isCorrect || currentAttempt >= maxAttempts) return;

    // Si el botón "✅" es presionado, se envía el intento
    if (key === "✅") {
      if (isCorrect || currentAttempt >= maxAttempts) return;
      handleSubmit();
      return;
    }

    // Si la tecla presionada no está desactivada, se escribe en el input
    if (!deactivatedKeys.has(key)) {
      const newAttempts = [...attempts];
      newAttempts[currentAttempt][currentLetterIndex] = key;
      setAttempts(newAttempts);
      setCurrentLetterIndex((prevIndex) => (prevIndex + 1) % randomWord.length);
    }
  };

  return (
    <div>
      <h1 style={{ display: "none" }}>{randomWord}</h1>
      <p>find the Word</p>
      <GameBoard
        attempts={attempts}
        highlightIndices={highlightIndices}
        lowHighlightIndices={lowHighlightIndices}
        handleInputChange={handleInputChange}
      />
      {isCorrect ? <p>¡Correcto! 🎉</p> : <p></p>}

      <Keyboard
        onKeyPress={handleKeyPress}
        disabled={currentAttempt >= maxAttempts || isCorrect}
        deactivatedKeys={deactivatedKeys}
      />
    </div>
  );
}
