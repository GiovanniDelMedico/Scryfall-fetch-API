import type {  Deck } from "../types/deckTypes";

export function isBasicLand(typeLine: string): boolean {
  return typeLine.includes("Basic Land");
}

export function validateDeck(deck: Deck) {
  const totalMain = deck.main.reduce((sum, c) => sum + c.count, 0);
  const totalSide = deck.side.reduce((sum, c) => sum + c.count, 0);

  return {
    totalMain,
    totalSide,
    isValid: totalMain >= 60
  };
}
