import type { DeckCard,Deck} from "./deckTypes";

export function isBasicLand(typeLine: string):boolean{
    return typeLine.includes("Basic Land");
}

export function validateDeck(deck:Deck){
    const total = deck.cards.reduce((sum,c)=>sum + c.count,0);
    return{
        total,
        isValide:total >=60
    };
}