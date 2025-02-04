import { Row } from "./Row";

interface GameBoardProps {
  attempts: string[][];
  highlightIndices: number[][];
  lowHighlightIndices: number[][];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void;
}

export function GameBoard({
  attempts,
  highlightIndices,
  lowHighlightIndices,
  handleInputChange,
}: GameBoardProps) {
  return (
    <div>
      {attempts.map((attempt, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "5px",
          }}
        >
          {attempt.map((_, colIndex) => (
            <Row
              key={colIndex}
              index={colIndex}
              inputValues={attempts[rowIndex]}
              handleInputChange={(e) =>
                handleInputChange(e, rowIndex, colIndex)
              }
              isCorrect={highlightIndices[rowIndex]?.includes(colIndex)}
              isLowCorrect={lowHighlightIndices[rowIndex]?.includes(colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
