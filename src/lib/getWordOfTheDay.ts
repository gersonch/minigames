export async function getWordOfTheDay() {
  const response = await fetch("http://localhost:3000/wordOfTheDay");
  const data = await response.json();
  return data;
}
