import type { ScryfallCard, ScryfallCardFace } from "../types/scryfallTypes";
import { getCardFaces } from "../utils/faces";
import { renderManaCost } from "../utils/mana";

export function renderCards(
  data: { data: ScryfallCard[] },
  container: HTMLElement,
) {
  if (!data || !data.data || data.data.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-600 mt-4">Nessuna carta trovata</p>`;
    return;
  }

  container.innerHTML = data.data
    .map((card: ScryfallCard) => {
      const faces: ScryfallCardFace[] = getCardFaces(card);

      const facesHtml = faces
        .map((face) => {
          const img = face.image_uris?.normal;

          return `
            <div class="bg-white rounded-lg shadow p-3 mb-4 flex items-start gap-4 max-w-2xl mx-auto">
              ${img ? `<img src="${img}" class="w-40 rounded-lg shadow-md" />` : ""}
              <div class="flex flex-col flex-1">
                <h2 class="text-lg font-bold mb-1">${face.name}</h2>
                <div class="flex items-center gap-1 mb-2">${renderManaCost(face.mana_cost)}</div>
                <p class="text-sm text-gray-600 italic mb-2">${face.type_line || ""}</p>
                <p class="text-sm text-gray-800 whitespace-pre-line leading-tight">${face.oracle_text || ""}</p>
              </div>
            </div>
          `;
        })
        .join("");

      return `
  <div 
  class="card-result bg-blue-300 rounded-lg p-3 shadow max-w-2xl mx-auto mb-4"
  data-card-id='${card.id}'
>
  ${facesHtml}

  <div class="flex gap-2 mt-2">
    <button class="add-main bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
      + Main
    </button>
    <button class="add-side bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded">
      + Side
    </button>
  </div>
</div>`;
    })
    .join("");
}
