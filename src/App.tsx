import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import Wordle from "./views/Wordle";
import { Routes, Route } from "react-router-dom";
import { Ahorcado } from "./views/Ahorcado";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Sidebar />

          <Routes>
            <Route path="/ahorcado" element={<Ahorcado />} />
            <Route path="/" element={<Wordle />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
