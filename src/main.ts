import "./style.css";

import { searchCards } from "./api/scryfall";
import { renderCards } from "./ui/renderCard";
import { debounce } from "./utils/debounce";

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
