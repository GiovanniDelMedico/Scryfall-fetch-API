export function getCardFaces(card: any) {
  if (card.card_faces) return card.card_faces;

  return [
    {
      name: card.name,
      image_uris: card.image_uris,
      mana_cost: card.mana_cost,
      type_line: card.type_line,
      oracle_text: card.oracle_text
    }
  ];
}
