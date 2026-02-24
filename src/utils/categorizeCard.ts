export function categorizeCard(typeLine:string): "land"|"creature"|"istant and sorcery"|"other"{
    if(typeLine.includes("Land")) return "land";
    if(typeLine.includes("Creature")) return "creature";
    if(typeLine.includes("Instant") || typeLine.includes("Sorcery")) return  "istant and sorcery";
    return "other";
}