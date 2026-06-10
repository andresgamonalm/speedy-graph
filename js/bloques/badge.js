// Bloque: Badge / etiqueta. LINEAMIENTOS: texto, color fondo, color texto, radio, tamaño,
// alineación. Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "badge",
  cat: "Decoración",
  nombre: "Badge / etiqueta",
  sub: "Etiqueta breve",
  icon: "plus",

  defaults: {
    texto: "Nuevo", alin: "left", tamano: 13, radio: 999, padX: 12, padY: 4,
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "texto", tipo: "text", label: "Texto" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { k: "tamano", tipo: "range", label: "Tamaño", min: 11, max: 18, suf: "px" },
    { grupo: "Espaciado" },
    { k: "padX", tipo: "range", label: "Padding horizontal", min: 6, max: 24, paso: 2, suf: "px" },
    { k: "padY", tipo: "range", label: "Padding vertical", min: 2, max: 12, suf: "px" },
    { grupo: "Bordes" },
    { k: "radio", tipo: "range", label: "Radio", min: 0, max: 999, paso: 1, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "acento" },
    { k: "color", tipo: "color", label: "Color del texto", heredaFijo: "#FFFFFF" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    return `<div style="text-align:${d.alin};font-family:${fuente}"><span data-edit="texto" style="display:inline-block;background:${col(d.bg, p, "acento")};color:${c};font-size:${d.tamano}px;font-weight:600;padding:${d.padY}px ${d.padX}px;border-radius:${d.radio}px">${esc(d.texto)}</span></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${d.alin}" style="font-family:${fuente}"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr><td bgcolor="${col(d.bg, p, "acento")}" style="border-radius:${d.radio}px;font-size:${d.tamano}px;font-weight:600;color:${c};padding:${d.padY}px ${d.padX}px">${esc(d.texto)}</td></tr></table></td></tr></table>`;
  },
};
