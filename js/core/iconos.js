// Íconos SVG inline para la interfaz (Capa A). Limpios y consistentes.
// JAMÁS emojis en ninguna parte del producto.
const paths = {
  type:  '<path d="M4 7V5h16v2M9 19h6M12 5v14"/>',
  plus:  '<path d="M12 5v14M5 12h14"/>',
  copy:  '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  up:    '<path d="M12 19V5M6 11l6-6 6 6"/>',
  down:  '<path d="M12 5v14M6 13l6 6 6-6"/>',
  undo:  '<path d="M9 14L4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3"/>',
  redo:  '<path d="M15 14l5-5-5-5M20 9H9a5 5 0 0 0 0 10h3"/>',
  eye:   '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/>',
  layers:'<path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  x:     '<path d="M18 6 6 18M6 6l12 12"/>',
};
export function icono(nombre, size = 18) {
  const p = paths[nombre] || paths.layers;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}
