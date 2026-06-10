// Bloque: Separador / Línea decorativa. LINEAMIENTOS: grosor, color, estilo, margen.
import { col } from "../core/utils.js";

export default {
  id: "divisor",
  cat: "Estructura",
  nombre: "Separador",
  sub: "Línea divisoria",
  icon: "down",

  defaults: { grosor: 1, estilo: "solid", color: null, ancho: 100, margenV: 16 },

  campos: [
    { grupo: "Layout" },
    { k: "ancho", tipo: "range", label: "Ancho", min: 10, max: 100, paso: 5, suf: "%" },
    { grupo: "Bordes" },
    { k: "grosor", tipo: "range", label: "Grosor", min: 1, max: 8, suf: "px" },
    { k: "estilo", tipo: "select", label: "Estilo", opciones: [{ v: "solid", t: "Sólido" }, { v: "dashed", t: "Guiones" }, { v: "dotted", t: "Puntos" }] },
    { grupo: "Color" },
    { k: "color", tipo: "color", label: "Color", hereda: "borde" },
    { grupo: "Espaciado" },
    { k: "margenV", tipo: "range", label: "Margen vertical", min: 0, max: 64, paso: 4, suf: "px" },
  ],

  renderPantalla(d, ctx) {
    const c = col(d.color, ctx?.paleta, "borde");
    return `<div style="margin:${d.margenV}px auto;width:${d.ancho}%;border-top:${d.grosor}px ${d.estilo} ${c};box-sizing:border-box"></div>`;
  },

  renderEmail(d, ctx) {
    const c = col(d.color, ctx?.paleta, "borde");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:${d.margenV}px 0"><table role="presentation" width="${d.ancho}%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:${d.grosor}px ${d.estilo} ${c};font-size:0;line-height:0">&nbsp;</td></tr></table></td></tr></table>`;
  },
};
