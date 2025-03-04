import { create } from "zustand";

export const useWord = create((set) => ({
  word: "",
  setWord: (newWord: string) => set({ word: newWord }),
}));
