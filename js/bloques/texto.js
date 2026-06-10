// Bloque: Texto. Patrón de referencia para todos los demás.
// Exporta { id, cat, nombre, sub, icon, defaults, campos, renderPantalla, renderEmail }.
import { roles, fuente, spacing } from "../core/tokens.js";

// Escape para no romper el HTML con contenido del usuario.
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Estilo tipográfico común a ambos renders, derivado del rol + overrides.
function estilo(d) {
  const r = roles[d.rol] || roles.parrafo;
  const size = d.tamano ?? r.size;
  const weight = Math.min(d.peso ?? r.weight, 600); // nunca >600
  const italic = d.italica || r.italic ? "italic" : "normal";
  return { size, weight, italic, lh: r.lh, color: d.color, alin: d.alin };
}

export default {
  id: "texto",
  cat: "Contenido",
  nombre: "Texto",
  sub: "Párrafo con rol tipográfico",
  icon: "type",

  // El color sale de la paleta activa (Capa B). Aquí queda el override por defecto.
  defaults: {
    rol: "parrafo",
    contenido: "Escribe aquí tu texto. Haz clic para editarlo directamente.",
    tamano: null,        // null = hereda del rol
    peso: null,
    italica: false,
    color: "#3B3B3B",    // = paleta.textoPrincipal por defecto
    alin: "left",
    margenSup: 0,
    margenInf: 16,
  },

  // Controles del panel (orden y tipos reutilizables).
  campos: [
    { grupo: "Contenido" },
    { k: "contenido", tipo: "textarea", label: "Texto" },
    { grupo: "Tipografía" },
    { k: "rol", tipo: "select", label: "Rol", opciones: Object.entries(roles).map(([v, r]) => ({ v, t: r.label })) },
    { k: "tamano", tipo: "range", label: "Tamaño", min: 11, max: 64, suf: "px", placeholder: "rol" },
    { k: "peso", tipo: "select", label: "Peso", opciones: [{ v: "", t: "Rol" }, { v: 300, t: "300" }, { v: 400, t: "400" }, { v: 500, t: "500" }, { v: 600, t: "600" }] },
    { k: "italica", tipo: "check", label: "Cursiva" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Color" },
    { k: "color", tipo: "color", label: "Color de texto" },
    { grupo: "Espaciado" },
    { k: "margenSup", tipo: "range", label: "Margen superior", min: 0, max: 80, paso: 4, suf: "px" },
    { k: "margenInf", tipo: "range", label: "Margen inferior", min: 0, max: 80, paso: 4, suf: "px" },
  ],

  // Pantalla: editable y lindo. Edición directa vía data-edit.
  renderPantalla(d) {
    const e = estilo(d);
    const css = [
      `font-family:${fuente}`,
      `font-size:${e.size}px`,
      `font-weight:${e.weight}`,
      `font-style:${e.italic}`,
      `line-height:${e.lh}`,
      `color:${e.color}`,
      `text-align:${e.alin}`,
      `margin:${d.margenSup}px 0 ${d.margenInf}px`,
      "box-sizing:border-box",
    ].join(";");
    return `<p data-edit="contenido" style="${css}">${esc(d.contenido)}</p>`;
  },

  // Email: bulletproof. Solo tabla + inline. Sin flex, grid, aspect-ratio, transform, etc.
  renderEmail(d) {
    const e = estilo(d);
    const tdCss = [
      `font-family:${fuente}`,
      `font-size:${e.size}px`,
      `font-weight:${e.weight}`,
      `font-style:${e.italic}`,
      `line-height:${e.lh}`,
      `color:${e.color}`,
      `text-align:${e.alin}`,
      `padding:${d.margenSup}px 0 ${d.margenInf}px`,
    ].join(";");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="${tdCss}">${esc(d.contenido)}</td></tr></table>`;
  },
};
