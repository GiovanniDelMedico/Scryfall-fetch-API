import type { Deck, DeckCard } from "./deckTypes";
import { isBasicLand } from "./deckRules";

export const deck: Deck = {
  cards: [],
};

export function addCard(card: DeckCard) {
  const existing = deck.cards.find((c) => c.id === card.id);
  if (existing && !isBasicLand(card.typeLine)){
    if(existing.count >=4){
        return;
    }
  }

  if (existing) {
    existing.count++;
  } else {
    deck.cards.push({ ...card, count: +1 });
  }
}
export function removeCard(card: DeckCard) {
  const existing = deck.cards.find((c) => c.id === card.id);
  if (!existing) return;

  existing.count--;

  if(existing.count <=0){
    deck.cards= deck.cards.filter(c =>c.id !==card.id)
  }
}

export function getDeck(): DeckCard[] {
  return deck.cards;
}

