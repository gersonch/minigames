import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../index.css";

function handleClick(button: string) {
  if (button === "submit") {
    console.log("Submit button clicked");
  } else {
    console.log("Button clicked", button);
  }
}

export default function VirtualKeyboard() {
  return (
    <Keyboard
      layout={{
        default: [
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "z x c v b n m {submit}",
        ],
      }}
      display={{
        "{submit}": "✅", // Cambia la apariencia de la tecla sin afectar su valor
      }}
      theme={"hg-theme-default myCustomTheme"}
      onKeyPress={handleClick}
    />
  );
}
