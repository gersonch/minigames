import { useState, useEffect } from "react";
import { words } from "../mockups/words";
import { Row } from "./Row";

export default function Wordle() {
  const [randomWord, setRandomWord] = useState<string>("");
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]); // Guardamos los índices correctos
  const [lowHighlightIndices, setLowHighlightIndices] = useState<number[]>([]); // Guardamos los índices que estan pero no en el lugar correcto

  useEffect(() => {
    const word = words[Math.floor(Math.random() * words.length)];
    setRandomWord(word);
    setInputValues(new Array(word.length).fill(""));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...inputValues];
    newValues[index] = e.target.value;
    setInputValues(newValues);
  };

  const handleSubmit = () => {
    if (inputValues.join("").toLowerCase() === randomWord.toLowerCase()) {
      setIsCorrect(true);
      setHighlightIndices([...Array(randomWord.length).keys()]); // Si es correcta, resaltar todo
      return;
    }

    // Identificar los índices correctos
    const correctIndices = [];
    const lowCorrectIndices = [];

    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i].toLowerCase() === inputValues[i]?.toLowerCase()) {
        correctIndices.push(i);
      }
      if (
        randomWord.toLowerCase().includes(inputValues[i]?.toLowerCase()) &&
        !correctIndices.includes(i)
      ) {
        lowCorrectIndices.push(i);
      }
    }

    setHighlightIndices(correctIndices);
    setLowHighlightIndices(lowCorrectIndices);
    // Guardamos los índices correctos en el state
  };

  return (
    <div>
      <h1>{randomWord}</h1>
      <div>
        {randomWord.split("").map((_, index) => (
          <Row
            key={index}
            index={index}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
            // esto verifica si el índice está en el array de índices correctos (estos son los hig)
            isCorrect={highlightIndices.includes(index)} // Verifica si el índice debe estar resaltado
            isLowCorrect={lowHighlightIndices.includes(index)} // Verifica si el índice debe estar resaltado en gris
          />
        ))}
      </div>
      {isCorrect ? <p>¡Correcto! 🎉</p> : <p>¡Inténtalo de nuevo! ❌</p>}
      <button onClick={handleSubmit}>✅</button>
    </div>
  );
}
