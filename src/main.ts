import "./style.css";

import { searchCards } from "./api/scryfall";
import { renderCards } from "./ui/renderCard";
import { debounce } from "./utils/debounce";
import { renderDeck } from "./ui/renderDeck";
import { addCard } from "./deck/deckManager";

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
  const data = await searchCards(query);

  // Render dei risultati (gestisce anche "nessuna carta trovata")
  renderCards(data, results);
}, 300);

// Listener sull'input
input.addEventListener("input", handleSearch);

// Event delegation sui risultati: click su una carta → aggiungi al deck
results.addEventListener("click", (e) => {
  const target = (e.target as HTMLElement).closest(".card-result");
  if (!target) return;

  const raw = target.getAttribute("data-card");
  if (!raw) return;

  const card = JSON.parse(raw);

  const deckCard = {
    id: card.id,
    name: card.name,
    typeLine: card.type_line,
    image: card.image_uris?.normal ?? "",
    count: 1,
  };

  addCard(deckCard);
  renderDeck();
});

// Render iniziale del deck (vuoto)
renderDeck();
