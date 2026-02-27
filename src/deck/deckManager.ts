import type { Deck, DeckCard } from "../types/deckTypes";
import { isBasicLand } from "./deckRules";

export const deck: Deck = {
  main: [],
  side: [],
};

export function addCard(
  card: DeckCard,
  destination: "main" | "side",
  options?: { ignoreLimit?: boolean }
): void {
  const section = deck[destination];

  // 1. Limite sideboard: 15 carte totali (non lo ignoriamo nemmeno in move)
  if (destination === "side") {
    const totalSide = section.reduce((sum, c) => sum + c.count, 0);
    if (totalSide >= 15) {
      console.warn("Sideboard piena (15 carte massimo)");
      return;
    }
  }

  // 2. Calcolo copie totali main + side per quella carta
  const mainCount = deck.main.find((c) => c.id === card.id)?.count ?? 0;
  const sideCount = deck.side.find((c) => c.id === card.id)?.count ?? 0;
  const totalCount = mainCount + sideCount;

  const existing = section.find((c) => c.id === card.id);
  const isBasic = isBasicLand(card.typeLine);

  // 3. Limite 4 copie totali (main + side), ignorabile solo se esplicitamente richiesto
  if (!options?.ignoreLimit && !isBasic && totalCount >= 4) {
    console.warn("❌ Limite di 4 copie totali raggiunto (main + side)");
    return;
  }

  // 4. Se esiste già nella sezione → incrementa
  if (existing) {
    existing.count++;
    return;
  }

  // 5. Altrimenti aggiungi nuova entry
  section.push({ ...card, count: 1 });
}

export function removeCard(cardId: string, destination: "main" | "side"): void {
  const section = deck[destination];

  const existing = section.find((c) => c.id === cardId);
  if (!existing) return;

  existing.count--;

  if (existing.count <= 0) {
    deck[destination] = section.filter((c) => c.id !== cardId);
  }
}

export function getMain(): DeckCard[] {
  return deck.main;
}

export function getSide(): DeckCard[] {
  return deck.side;
}

export function getTotalSideCount(): number {
  return deck.side.reduce((sum, c) => sum + c.count, 0);
}

// ------------------------------------------------------------
// 🆕 moveCard(cardId, from, to)
// Sposta una copia di una carta tra main e side
// ------------------------------------------------------------
export function moveCard(id: string, from: "main" | "side", to: "main" | "side") {
  if (from === to) return;

  // 1. Rimuovi una copia dal gruppo di origine
  removeCard(id, from);

  // 2. Recupera la carta aggiornata dal gruppo di origine o destinazione
  const source = from === "main" ? getMain() : getSide();
  const dest = to === "main" ? getMain() : getSide();

  // Se la carta esiste ancora nel mazzo (ha altre copie), prendiamo quella
  let card = source.find(c => c.id === id) || dest.find(c => c.id === id);

  // Se non esiste più (era 1 sola copia), dobbiamo ricostruirla dalla cache
  if (!card) {
    console.error("❌ moveCard: carta non trovata dopo removeCard");
    return;
  }

  // 3. Aggiungi una copia nel gruppo di destinazione SENZA bloccare per limite 4
  addCard(card, to, { ignoreLimit: true });
}

