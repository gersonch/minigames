import "./keyboard_styles.css";
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
  const keys = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "ñ",
    "✅",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "←",
  ];

  const handleClick = (e) => {
    const key = e.currentTarget.innerText.trim();
    console.log("Tecla presionada en teclado:", key);
    if (key && !deactivatedKeys.has(key)) onKeyPress(key);
  };

  return (
    <div className="keyboard">
      {keys.map((key, index) => (
        <button
          key={index}
          className={`key ${key === "✅" ? "special" : ""} ${
            deactivatedKeys.has(key) ? "disabled" : ""
          }`}
          onClick={handleClick}
          disabled={disabled || deactivatedKeys.has(key)} // Deshabilitar tecla si está en deactivatedKeys
        >
          {key}
        </button>
      ))}
    </div>
  );
}
