import "./App.css";
import VirtualKeyboard from "./components/Keyboard";
import Wordle from "./components/Wordle";

function App() {
  return (
    <>
      <h1>WordQuest</h1>
      <Wordle />
      <VirtualKeyboard />
    </>
  );
}

export default App;
