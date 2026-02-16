export async function searchCards(query: string) {
  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${query}`,
  );

  if (response.status === 404) return null;

  if (!response.ok) throw new Error("Errore nella richiesta");
  const data = await response.json(); 
  console.log(data);
  return data;
}
