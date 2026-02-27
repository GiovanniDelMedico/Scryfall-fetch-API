// utils/faces.ts
import type { ScryfallCard,ScryfallCardFace} from "./types/scryfallTypes";

/**
 * Restituisce sempre un array di facce della carta.
 * - Se la carta ha card_faces → le restituisce
 * - Se è una carta a singola faccia → crea una face "virtuale"
 */
export function getCardFaces(card: ScryfallCard): ScryfallCardFace[] {
  // Caso 1: carte bifronte o modal (es. MDFC)
  if (card.card_faces && card.card_faces.length > 0) {
    return card.card_faces;
  }

  // Caso 2: carta a singola faccia → la trasformiamo in una face
  return [
    {
      name: card.name,
      type_line: card.type_line,
      mana_cost: card.mana_cost,
      oracle_text: card.oracle_text,
      image_uris: card.image_uris,
    },
  ];
}
