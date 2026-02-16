export function renderManaCost(cost?: string) {
  if (!cost) return "";

  const colors: Record<string, string> = {
    W: "bg-yellow-200 text-yellow-800",
    U: "bg-blue-200 text-blue-800",
    B: "bg-gray-800 text-gray-100",
    R: "bg-red-200 text-red-800",
    G: "bg-green-200 text-green-800"
  };

  return cost.replace(/\{(.+?)\}/g, (_, symbol) => {
    const cls = colors[symbol] || "bg-gray-200 text-gray-800";
    return `<span class="px-2 py-1 rounded ${cls} mr-1 inline-block">${symbol}</span>`;
  });
}
