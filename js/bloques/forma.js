// Bloque: Forma geométrica. LINEAMIENTOS: tipo, tamaño, color, opacidad, posición.
// No debe tapar contenido. Decorativo. Email: celda de color (círculo/cuadrado).
import { col } from "../core/utils.js";

export default {
  id: "forma",
  cat: "Decoración",
  nombre: "Forma geométrica",
  sub: "Elemento decorativo",
  icon: "plus",

  defaults: { tipo: "circulo", tamano: 64, opacidad: 100, alin: "center", color: null },

  campos: [
    { grupo: "Layout" },
    { k: "tipo", tipo: "select", label: "Tipo", opciones: [{ v: "circulo", t: "Círculo" }, { v: "cuadrado", t: "Cuadrado" }, { v: "pildora", t: "Píldora" }] },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { k: "tamano", tipo: "range", label: "Tamaño", min: 16, max: 160, paso: 4, suf: "px" },
    { k: "opacidad", tipo: "range", label: "Opacidad", min: 10, max: 100, paso: 5, suf: "%" },
    { grupo: "Color" },
    { k: "color", tipo: "color", label: "Color", hereda: "acento" },
  ],

  _radio(d) { return d.tipo === "circulo" ? "50%" : d.tipo === "pildora" ? "999px" : "8px"; },
  _ancho(d) { return d.tipo === "pildora" ? d.tamano * 2.2 : d.tamano; },

  renderPantalla(d, ctx) {
    const c = col(d.color, ctx?.paleta, "acento");
    return `<div style="text-align:${d.alin}"><span style="display:inline-block;width:${this._ancho(d)}px;height:${d.tamano}px;background:${c};border-radius:${this._radio(d)};opacity:${d.opacidad / 100}"></span></div>`;
  },

  renderEmail(d, ctx) {
    const c = col(d.color, ctx?.paleta, "acento");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${d.alin}"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr><td width="${this._ancho(d)}" height="${d.tamano}" bgcolor="${c}" style="border-radius:${this._radio(d)};font-size:0;line-height:0">&nbsp;</td></tr></table></td></tr></table>`;
  },
};
