// Bloque contenedor: Columnas / Grid / Contenedor libre. LINEAMIENTOS Estructura.
// Es un CONTENEDOR (esContenedor) → guarda hijos en datos.hijos (un array por columna).
// El render y el export lo tratan de forma recursiva (ver core/render.js y export-email).
// cols=1 equivale a "contenedor libre"; cols 2–4 a columnas/grid.
export default {
  id: "columnas",
  cat: "Estructura",
  nombre: "Columnas",
  sub: "Contenedor de bloques",
  icon: "layers",
  esContenedor: true,

  defaults: {
    cols: 2, prop: "iguales", gap: 16, alinV: "top",
    apilarMobile: true,
    bg: null, padding: 0,
    hijos: [[], []],
  },

  campos: [
    { grupo: "Layout" },
    { k: "cols", tipo: "range", label: "Columnas", min: 1, max: 4 },
    { k: "prop", tipo: "select", label: "Proporción", opciones: [
      { v: "iguales", t: "Iguales" }, { v: "40/60", t: "40 / 60" }, { v: "60/40", t: "60 / 40" },
      { v: "30/70", t: "30 / 70" }, { v: "70/30", t: "70 / 30" } ] },
    { k: "alinV", tipo: "select", label: "Alineación vertical", opciones: [{ v: "top", t: "Arriba" }, { v: "middle", t: "Centro" }, { v: "bottom", t: "Abajo" }] },
    { k: "apilarMobile", tipo: "check", label: "Apilar en mobile" },
    { grupo: "Espaciado" },
    { k: "gap", tipo: "range", label: "Separación", min: 0, max: 48, paso: 4, suf: "px" },
    { k: "padding", tipo: "range", label: "Padding interno", min: 0, max: 40, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoPrincipal" },
  ],

  // Sin render propio: lo construye el motor (pantalla y email) porque maneja hijos.
};

// Anchos de columna (en %) según cols + proporción. Compartido por render y export.
export function anchosColumna(d) {
  const cols = Math.max(1, Math.min(4, d.cols || 1));
  if (cols === 2 && d.prop && d.prop !== "iguales") {
    const [a, b] = d.prop.split("/").map(Number);
    return [a, b];
  }
  return Array.from({ length: cols }, () => Math.round(100 / cols));
}

// Normaliza datos.hijos para que tenga exactamente `cols` columnas sin perder bloques.
export function normalizarHijos(d) {
  const cols = Math.max(1, Math.min(4, d.cols || 1));
  if (!Array.isArray(d.hijos)) d.hijos = [];
  while (d.hijos.length < cols) d.hijos.push([]);
  if (d.hijos.length > cols) {
    // Mueve el sobrante a la última columna visible (no se pierde contenido).
    const extra = d.hijos.splice(cols);
    extra.forEach((col) => { d.hijos[cols - 1].push(...col); });
  }
  return d.hijos;
}
