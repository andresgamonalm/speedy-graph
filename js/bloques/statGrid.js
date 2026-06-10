// Bloque: Grilla de estadísticas. LINEAMIENTOS: KPIs múltiples, columnas, gap, número
// dominante, label. Hereda paleta. Ítems vía editor de listas.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "statGrid",
  cat: "Datos",
  nombre: "Grilla de stats",
  sub: "Varios KPIs en grilla",
  icon: "layers",

  defaults: {
    columnas: 3, gap: 16,
    items: [
      { numero: "98%", label: "Entregabilidad" },
      { numero: "3.2x", label: "ROI promedio" },
      { numero: "12k", label: "Leads generados" },
    ],
    colorNumero: null, colorLabel: null,
  },

  campos: [
    { grupo: "Contenido" },
    {
      k: "items", tipo: "lista", label: "Stat",
      nuevo: { numero: "0", label: "Métrica" },
      sub: [
        { k: "numero", tipo: "text", label: "Número" },
        { k: "label", tipo: "text", label: "Label" },
      ],
    },
    { grupo: "Layout" },
    { k: "columnas", tipo: "range", label: "Columnas", min: 2, max: 4 },
    { grupo: "Espaciado" },
    { k: "gap", tipo: "range", label: "Separación", min: 8, max: 40, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "colorNumero", tipo: "color", label: "Color del número", hereda: "principal" },
    { k: "colorLabel", tipo: "color", label: "Color del label", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const cels = d.items.map((it, i) => `<div style="text-align:center">
      <div data-edit="items.${i}.numero" style="font-size:32px;font-weight:600;color:${col(d.colorNumero, p, "principal")}">${esc(it.numero)}</div>
      <div data-edit="items.${i}.label" style="font-size:13px;color:${col(d.colorLabel, p, "textoSecundario")};margin-top:4px">${esc(it.label)}</div></div>`).join("");
    return `<div style="display:grid;grid-template-columns:repeat(${d.columnas},1fr);gap:${d.gap}px;font-family:${fuente}">${cels}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const celda = (it) => `<td valign="top" align="center" width="${Math.floor(100 / d.columnas)}%" style="padding:0 ${d.gap / 2}px;font-family:${fuente}">
      <div style="font-size:32px;font-weight:600;color:${col(d.colorNumero, p, "principal")}">${esc(it.numero)}</div>
      <div style="font-size:13px;color:${col(d.colorLabel, p, "textoSecundario")};padding-top:4px">${esc(it.label)}</div></td>`;
    let filas = "";
    for (let i = 0; i < d.items.length; i += d.columnas) {
      filas += `<tr>${d.items.slice(i, i + d.columnas).map(celda).join("")}</tr>`;
    }
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${filas}</table>`;
  },
};
