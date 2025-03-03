import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import Wordle from "./views/Wordle";
import { Routes, Route } from "react-router-dom";
import { Ahorcado } from "./views/Ahorcado";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/ahorcado" element={<Ahorcado />} />
          <Route path="/" element={<Wordle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
