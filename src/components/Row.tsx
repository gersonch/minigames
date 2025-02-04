interface RowProps {
  index: number;
  inputValues: string[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  isCorrect: boolean; // Nuevo prop para saber si debe pintarse de verde
  isLowCorrect: boolean; // Nuevo prop para saber si debe pintarse de gris
}

export function Row({
  index,
  inputValues,
  handleInputChange,
  isCorrect,
  isLowCorrect,
}: RowProps) {
  return (
    <input
      type="text"
      maxLength={1}
      style={{
        width: "3rem",
        height: "3rem",
        textAlign: "center",
        fontSize: "1.5rem",
        margin: "0 0.2rem",
        color: "white",
        background: isCorrect ? "lightgreen" : isLowCorrect ? "gray" : "black", // Si es correcto, verde; si no, blanco
        border: "none",
      }}
      value={inputValues[index] || ""}
      onChange={(e) => handleInputChange(e, index)}
    />
  );
}
