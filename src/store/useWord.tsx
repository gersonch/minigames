import { create } from "zustand";

interface WordState {
  word: string;
  setWord: (newWord: string) => void;
}

export const useWord = create<WordState>((set) => ({
  word: "",
  setWord: (newWord: string) => set({ word: newWord }),
}));
