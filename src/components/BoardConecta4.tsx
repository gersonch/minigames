export function BoardConecta4() {
  const board = Array.from({ length: 6 }, () => Array(7).fill(null));

  const handleClick = (rowIndex: number, colIndex: number) => {
    console.log(`row: ${rowIndex + 1} - col: ${colIndex + 1}`);
  };

  return (
    <div>
      <section className="grid grid-cols-7 gap-1">
        {board.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              title={`row: ${rowIndex + 1} - col: ${colIndex + 1}`}
              className="w-8 h-8 border border-black rounded"
              onClick={() => handleClick(rowIndex, colIndex)} // Llamar a handleClick con rowIndex y colIndex
            ></button>
          ))
        )}
      </section>
    </div>
  );
}
