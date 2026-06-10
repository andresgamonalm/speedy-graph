// Bloque: Contador. LINEAMIENTOS: valor inicial, final, label, animación, fallback.
// El email no anima → muestra el valor final fijo. Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "contador",
  cat: "Widgets",
  nombre: "Contador",
  sub: "Número con énfasis",
  icon: "layers",

  defaults: {
    prefijo: "", valor: "12.480", sufijo: "+", label: "Leads generados este año",
    alin: "center",
    bg: null, colorNumero: null, colorLabel: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "prefijo", tipo: "text", label: "Prefijo" },
    { k: "valor", tipo: "text", label: "Valor" },
    { k: "sufijo", tipo: "text", label: "Sufijo" },
    { k: "label", tipo: "text", label: "Label" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorNumero", tipo: "color", label: "Color del número", hereda: "principal" },
    { k: "colorLabel", tipo: "color", label: "Color del label", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};border-radius:12px;padding:28px 24px;text-align:${d.alin};font-family:${fuente}">
      <div data-edit="valor" style="font-size:52px;font-weight:600;line-height:1;color:${col(d.colorNumero, p, "principal")}">${esc(d.prefijo)}${esc(d.valor)}${esc(d.sufijo)}</div>
      <p data-edit="label" style="font-size:15px;color:${col(d.colorLabel, p, "textoSecundario")};margin:10px 0 0">${esc(d.label)}</p></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:12px"><tr><td align="${d.alin}" style="padding:28px 24px;font-family:${fuente}">
      <div style="font-size:52px;font-weight:600;line-height:1;color:${col(d.colorNumero, p, "principal")}">${esc(d.prefijo)}${esc(d.valor)}${esc(d.sufijo)}</div>
      <div style="font-size:15px;color:${col(d.colorLabel, p, "textoSecundario")};padding-top:10px">${esc(d.label)}</div></td></tr></table>`;
  },
};
