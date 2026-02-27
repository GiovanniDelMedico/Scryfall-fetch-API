import type { DeckCard } from "../types/deckTypes";
import { getMain, getSide } from "../deck/deckManager";
import { groupByType } from "../deck/groupByType";
import type { GroupedByType } from "../deck/groupByType";

type GroupKey = keyof GroupedByType;

function getTotalCount(cards: DeckCard[]): number {
  return cards.reduce((sum, c) => sum + c.count, 0);
}

export function renderDeck() {
  const container = document.getElementById("deck-content");
  if (!container) {
    console.error("❌ deck-content non trovato nel DOM");
    return;
  }

  const main = getMain();
  const side = getSide();

  const groupedMain = groupByType(main);
  const groupedSide = groupByType(side);

  const totalMain = getTotalCount(main);
  const totalSide = getTotalCount(side);

  const sections: { title: string; key: GroupKey }[] = [
    { title: "Lands", key: "lands" },
    { title: "Creatures", key: "creatures" },
    { title: "Instants & Sorceries", key: "instantsSorceries" },
    { title: "Other", key: "others" },
  ];

  container.innerHTML = ` <h2 class="text-lg font-bold mt-4 mb-2">Main Deck (${totalMain} carte)</h2> ${sections.map((s) => renderSection(s.title, groupedMain[s.key], "main")).join("")} <h2 class="text-lg font-bold mt-6 mb-2">Sideboard (${totalSide} carte)</h2> ${sections.map((s) => renderSection(s.title, groupedSide[s.key], "side")).join("")} `;
}

function renderSection(
  title: string,
  cards: DeckCard[],
  destination: "main" | "side",
): string {
  if (cards.length === 0) return "";

  const totalInSection = cards.reduce((sum, c) => sum + c.count, 0);

  return `
    <section class="mb-4">
      <h3 class="font-semibold text-md mb-1">${title} (${totalInSection})</h3>
      <div class="flex flex-col gap-1">
        ${cards.map((card) => renderRow(card, destination)).join("")}
      </div>
    </section>
  `;
}

function renderRow(card: DeckCard, destination: "main" | "side"): string {
  const opposite = destination === "main" ? "side" : "main";

  return `
    <div class="flex justify-between items-center text-sm text-zinc-200">
      <span>${card.count}× ${card.name}</span>
      <span class="text-zinc-400">${card.typeLine}</span>

      <div class="flex gap-2 ml-4">
        <button 
          class="btn-inc px-2 bg-green-600 hover:bg-green-700 rounded text-white"
          data-id="${card.id}"
          data-dest="${destination}"
        >+</button>

        <button 
          class="btn-dec px-2 bg-red-600 hover:bg-red-700 rounded text-white"
          data-id="${card.id}"
          data-dest="${destination}"
        >−</button>

        <button 
          class="btn-move px-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          data-id="${card.id}"
          data-from="${destination}"
          data-to="${opposite}"
        >⇄</button>
      </div>
    </div>
  `;
}
