import type { DeckCard } from "../types/deckTypes";

export interface GroupedByType {
  lands: DeckCard[];
  creatures: DeckCard[];
  instantsSorceries: DeckCard[];
  others: DeckCard[];
}

export function groupByType(cards: DeckCard[]): GroupedByType {
  const groups: GroupedByType = {
    lands: [],
    creatures: [],
    instantsSorceries: [],
    others: [],
  };
  for (const card of cards){
    const type = card.typeLine.toLowerCase();
    if(type.includes("land")){
        groups.lands.push(card);
    }else if(type.includes("creature")){
        groups.creatures.push(card)
    }
    else if(type.includes("instant") || type.includes("sorcery")){
        groups.instantsSorceries.push(card)
    }
    else {
        groups.others.push(card)
    }
  }
  return groups
}
