import { useQuery } from "@tanstack/react-query";
import { getWordOfTheDay } from "./getWordOfTheDay";
import { useWord } from "../store/useWord";
import { useEffect } from "react";

export function useWordQuery() {
  const { setWord } = useWord();

  const { data, isLoading, error } = useQuery({
    queryKey: ["word"],
    queryFn: getWordOfTheDay,
  });
  useEffect(() => {
    if (data && typeof data === "string") {
      // Actualiza el estado global con la nueva palabra
      setWord(data);
    }
  }, [data, setWord]);

  return { data, isLoading, error };
}
