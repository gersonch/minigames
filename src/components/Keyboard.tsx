import "./keyboard_styles.css";
import { keys } from "./keys";
interface KeyboardProps {
  onKeyPress: (key: string) => void;
  disabled: boolean;
  deactivatedKeys: Set<string>;
}

export function Keyboard({
  onKeyPress,
  disabled,
  deactivatedKeys,
}: KeyboardProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.innerText.trim();
    console.log("Tecla presionada en teclado:", key);
    if (key && !deactivatedKeys.has(key)) onKeyPress(key);
  };

  return (
    <div className="keyboard flex justify-center ">
      {keys.map((key, index) => (
        <button
          key={index}
          className={`key ${key === "✅" ? "special" : ""} ${
            deactivatedKeys.has(key) ? "disabled" : ""
          } md:w-15 md:h-15 w-10 h-10 text-sm `}
          onClick={handleClick}
          disabled={disabled || deactivatedKeys.has(key)} // Deshabilitar tecla si está en deactivatedKeys
        >
          {key}
        </button>
      ))}
    </div>
  );
}
