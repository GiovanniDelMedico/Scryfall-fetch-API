// scryfallTypes.ts

// Tipi per le immagini delle carte
export type ScryfallImageUris = {
  small?: string;
  normal?: string;
  large?: string;
  png?: string;
  art_crop?: string;
  border_crop?: string;
};

// Tipi per le facce delle carte bifronte / modal
export type ScryfallCardFace = {
  name: string;
  type_line: string;
  mana_cost?: string;
  oracle_text?: string;
  image_uris?: ScryfallImageUris;
};

// Tipo principale della carta Scryfall
export type ScryfallCard = {
  id: string;
  name: string;
  type_line: string;
  oracle_text?: string;
  mana_cost?: string;
  image_uris?: ScryfallImageUris;
  card_faces?: ScryfallCardFace[];
};

// Tipo della risposta di ricerca Scryfall
export type ScryfallSearchResponse = {
  data: ScryfallCard[];
};
