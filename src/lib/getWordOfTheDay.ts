export async function getWordOfTheDay() {
  const response = await fetch(
    "https://minigames-back.vercel.app/wordOfTheDay"
  );
  const data = await response.json();
  return data.word;
}
