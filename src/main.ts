import "./style.css";

import type { ScryfallCard, ScryfallSearchResponse } from "./types/scryfallTypes";
import { searchCards } from "./api/scryfallApi";
import { renderCards } from "./ui/renderCard";
import { debounce } from "./utils/debounce";
import { renderDeck } from "./ui/renderDeck";
import { addCard } from "./deck/deckManager";
import { getMain,getSide } from "./deck/deckManager";
import { removeCard } from "./deck/deckManager";
import { moveCard } from "./deck/deckManager";


const cardCache = new Map<string, ScryfallCard>();

const input = document.querySelector("#search") as HTMLInputElement;
const results = document.querySelector("#results") as HTMLElement;

// Funzione debounced che gestisce la ricerca
const handleSearch = debounce(async () => {
  const query = input.value.trim();

  // Se l'input è vuoto → pulisci i risultati
  if (!query) {
    results.innerHTML = "";
    return;
  }

  // Chiamata API
  const data: ScryfallSearchResponse = await searchCards(query);
  if(data?.data){
    data.data.forEach((card:ScryfallCard)=>{
      cardCache.set(card.id,card);
    });
  }

  // Render dei risultati (gestisce anche "nessuna carta trovata")
  renderCards(data, results);
}, 300);

// Listener sull'input
input.addEventListener("input", handleSearch);

// Event delegation sui risultati: click su una carta → aggiungi al deck
results.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  const cardDiv = target.closest(".card-result") as HTMLElement;
  if (!cardDiv) return;

  const id = cardDiv.getAttribute("data-card-id");
  if (!id) return;

  const card = cardCache.get(id);
  if (!card) return;

  const deckCard = {
    id: card.id,
    name: card.name,
    typeLine: card.type_line,
    image: card.image_uris?.normal ?? "",
    count: 1,
  };

  if (target.classList.contains("add-main")) {
    addCard(deckCard, "main");
    renderDeck();
  }

  if (target.classList.contains("add-side")) {
    addCard(deckCard, "side");
    renderDeck();
  }
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  // + copia
  if (target.classList.contains("btn-inc")) {
    const id = target.dataset.id!;
    const dest = target.dataset.dest as "main" | "side";

    const card = (dest === "main" ? getMain() : getSide()).find(c => c.id === id);
    if (!card) return;

    addCard(card, dest);
    renderDeck();
  }

  // - copia
  if (target.classList.contains("btn-dec")) {
    const id = target.dataset.id!;
    const dest = target.dataset.dest as "main" | "side";

    removeCard(id, dest);
    renderDeck();
  }

  // move main <-> side
  if (target.classList.contains("btn-move")) {
    const id = target.dataset.id!;
    const from = target.dataset.from as "main" | "side";
    const to = target.dataset.to as "main" | "side";

    moveCard(id, from, to);
    renderDeck();
  }
});


// Render iniziale del deck (vuoto)
renderDeck();
