import "./App.css";
import { Sidebar } from "./components/Sidebar";
import Wordle from "./views/Wordle";

function App() {
  return (
    <>
      <section>
        <Sidebar />
        <Wordle />
      </section>
    </>
  );
}

export default App;
