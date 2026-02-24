import { getDeck } from "../deck/deckManager";

export function renderDeck() {
  console.log("renderDeck() called");
  const deckContent = document.getElementById("deck-content");

  if (!deckContent) {
    console.error("❌ deck-content non trovato nel DOM");
    return;
  }

  const deck = getDeck();
  deckContent.innerHTML = "";

  deck.forEach((card) => {
    const row = document.createElement("div");
    row.className = "text-sm text-zinc-200";
    row.textContent = `${card.count}× ${card.name}`;
    deckContent.appendChild(row)
  });

  
}
