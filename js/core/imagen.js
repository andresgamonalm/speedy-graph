// Sistema de imagen único. LINEAMIENTOS exige resolverlo como sistema, no bloque a bloque.
// Dos capas: contenedor (proporción/radio/borde/sombra) e imagen interna (fit/foco/zoom).
// Pantalla puede usar aspect-ratio/object-fit. Email NO: imagen completa al ancho (sin deformar).

export const proporciones = {
  "1:1":  1,        "16:9": 16 / 9,  "4:3": 4 / 3,   "3:2": 3 / 2,
  "4:5":  4 / 5,    "9:16": 9 / 16,  "21:9": 21 / 9, "auto": null,
};

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Campos de imagen reutilizables (se inyectan en el panel de cualquier bloque con foto).
export function camposImagen(pref = "") {
  const k = (n) => (pref ? `${pref}.${n}` : n);
  return [
    { k: k("url"), tipo: "imgurl", label: "Imagen (URL o biblioteca)" },
    { k: k("alt"), tipo: "text", label: "Texto alternativo (alt)" },
    { k: k("aspecto"), tipo: "select", label: "Proporción", opciones: Object.keys(proporciones).map((v) => ({ v, t: v })) },
    { k: k("fit"), tipo: "select", label: "Ajuste", opciones: [{ v: "cover", t: "Cubrir" }, { v: "contain", t: "Encajar" }, { v: "fill", t: "Rellenar (deforma)" }] },
    { k: k("zoom"), tipo: "range", label: "Zoom", min: 100, max: 200, paso: 5, suf: "%" },
    { k: k("focoX"), tipo: "range", label: "Foco horizontal", min: 0, max: 100, suf: "%" },
    { k: k("focoY"), tipo: "range", label: "Foco vertical", min: 0, max: 100, suf: "%" },
    { k: k("radio"), tipo: "range", label: "Radio", min: 0, max: 32, paso: 2, suf: "px" },
  ];
}

export const defaultsImagen = {
  url: "", alt: "", aspecto: "16:9", fit: "cover",
  zoom: 100, focoX: 50, focoY: 50, radio: 8,
};

// Render de pantalla: contenedor con proporción + imagen con object-fit/foco/zoom.
export function renderImagenPantalla(d, { alto = null } = {}) {
  const ratio = proporciones[d.aspecto];
  const contCss = [
    "position:relative", "width:100%", "overflow:hidden",
    ratio ? `aspect-ratio:${ratio}` : "",
    alto ? `height:${alto}px` : "",
    `border-radius:${d.radio}px`, "background:#eef0f5",
  ].filter(Boolean).join(";");
  if (!d.url) {
    return `<div data-edit-img="url" style="${contCss};display:flex;align-items:center;justify-content:center;color:#aeb3c2;font-size:13px;cursor:pointer;min-height:80px">Haz clic para elegir imagen</div>`;
  }
  const imgCss = [
    "width:100%", "height:100%", "display:block",
    `object-fit:${d.fit}`, `object-position:${d.focoX}% ${d.focoY}%`,
    d.zoom > 100 ? `transform:scale(${d.zoom / 100})` : "",
  ].filter(Boolean).join(";");
  return `<div style="${contCss}"><img data-edit-img="url" src="${esc(d.url)}" alt="${esc(d.alt)}" style="${imgCss}"></div>`;
}

// Render de email: imagen completa al ancho, height auto (sin deformar, sin object-fit/aspect-ratio).
export function renderImagenEmail(d, { ancho = 600 } = {}) {
  if (!d.url) return "";
  const css = [
    "display:block", "width:100%", `max-width:${ancho}px`, "height:auto",
    "border:0", "outline:none", "text-decoration:none",
    d.radio ? `border-radius:${d.radio}px` : "",
  ].filter(Boolean).join(";");
  return `<img src="${esc(d.url)}" alt="${esc(d.alt)}" width="${ancho}" style="${css}">`;
}
