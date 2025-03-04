import { Body } from "../components/Body";
import { KeyboardAhorcado } from "../components/KeyboardAhorcado";
import { useEffect, useState } from "react";
import { useWord } from "../store/useWord";
import { useWordQuery } from "../lib/wordQuery";

export function Ahorcado() {
  const { data, isLoading, error } = useWordQuery();
  const word = useWord((state) => state.word);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wordArray = word ? word.split("") : [];

  const getInitialLetterStatus = () => {
    const savedStatus = localStorage.getItem("letterStatus");
    return savedStatus ? JSON.parse(savedStatus) : {};
  };

  const getSelectedLetter = () => {
    const savedSelectedLetter = localStorage.getItem("selectedLetter");
    return savedSelectedLetter ? JSON.parse(savedSelectedLetter) : [];
  };
  // Estado global de las letras
  const [letterStatus, setLetterStatus] = useState<Record<string, boolean>>(
    getInitialLetterStatus
  );
  const [selectedLetter, setSelectedLetter] =
    useState<string[]>(getSelectedLetter);

  useEffect(() => {
    const savedWord = localStorage.getItem("word");

    if (savedWord && word !== word) {
      localStorage.clear(); // 🧹 Borra todo el almacenamiento
      localStorage.setItem("word", word); // Guarda la nueva palabra
      setLetterStatus({});
      setSelectedLetter([]);
      window.location.reload(); // Recarga la página
    }
  }, [word]);
  useEffect(() => {
    localStorage.setItem("letterStatus", JSON.stringify(letterStatus));
    localStorage.setItem("selectedLetter", JSON.stringify(selectedLetter));
  }, [wordArray, letterStatus, selectedLetter]);

  const onLetterClick = (letter: string): boolean => {
    setSelectedLetter((prevLetters) => [...prevLetters, letter]);

    const isCorrect = wordArray.includes(letter);

    // Actualizar letterStatus
    setLetterStatus((prevStatus) => ({
      ...prevStatus,
      [letter]: isCorrect,
    }));

    return isCorrect;
  };

  const allLettersGuessed = wordArray.every((letter: string) =>
    selectedLetter.includes(letter)
  );

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!word) return <div>No se pudo cargar la palabra.</div>;
  console.log(data);
  return (
    <section className="flex justify-between w-full">
      <div className="flex flex-col items-center px-10">
        <h1 className="text-2xl font-bold mb-4">El Ahorcado</h1>

        {/* Ilustración de persona ahorcada para juego */}
        <Body letterStatus={letterStatus} />

        <div className="flex my-12">
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

      <div className="px-10 flex justify-center items-center">
        <KeyboardAhorcado
          onLetterClick={onLetterClick}
          letterStatus={letterStatus} // Ahora pasamos letterStatus
          allLettersGuessed={allLettersGuessed}
        />
      </div>
    </section>
  );
}
