export type DeckCard = {
  id: string;
  name: string;
  typeLine: string;
  image: string;
  count: number;
};

export type Deck = {
  main: DeckCard[];
  side: DeckCard[];
};
