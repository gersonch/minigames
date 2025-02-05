export async function getWordOfTheDay() {
  const response = await fetch("https://minigames-back-qabrim6oo-gerson-contreras-projects.vercel.app/wordOfTheDay");
  const data = await response.json();
  return data;
}
