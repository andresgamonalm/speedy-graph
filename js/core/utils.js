// Utilidades compartidas por los bloques. Evita reglas propias dispersas.
export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const attr = (s = "") => esc(s).replace(/"/g, "&quot;");

export const url = (s = "#") => attr(String(s).trim() || "#");

// Color con herencia: override explícito, o valor de la paleta activa por rol.
export const col = (override, paleta, rol) =>
  override ?? (paleta && paleta[rol]) ?? "#000000";
