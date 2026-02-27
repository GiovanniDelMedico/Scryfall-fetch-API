import type { ScryfallSearchResponse } from "../types/scryfallTypes";

export async function searchCards(
  query: string,
): Promise<ScryfallSearchResponse> {
  const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error("Errore nella chiamata API Scryfall:", res.status);

    return { data: [] };
  }
  // 🆕 TS ora sa che questo JSON è un ScryfallSearchResponse
  const json = (await res.json()) as ScryfallSearchResponse;
  return json;
}
