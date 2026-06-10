// Bloque: Tarjeta KPI. LINEAMIENTOS: número dominante, unidad, label, variación,
// contexto, color destacado. El número domina visualmente. Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

const flecha = (dir) => (dir === "sube" ? "▲" : dir === "baja" ? "▼" : "•");

export default {
  id: "kpi",
  cat: "Datos",
  nombre: "Tarjeta KPI",
  sub: "Número dominante",
  icon: "layers",

  defaults: {
    numero: "1.240", unidad: "", label: "Conversiones del mes",
    mostrarTrend: true, trendValor: "+12%", trendDir: "sube",
    contexto: "vs. mes anterior",
    alin: "left", padV: 24, padH: 24,
    bg: null, colorNumero: null, colorLabel: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "numero", tipo: "text", label: "Número" },
    { k: "unidad", tipo: "text", label: "Unidad" },
    { k: "label", tipo: "text", label: "Label" },
    { k: "mostrarTrend", tipo: "check", label: "Mostrar variación" },
    { k: "trendValor", tipo: "text", label: "Variación" },
    { k: "trendDir", tipo: "select", label: "Dirección", opciones: [{ v: "sube", t: "Sube" }, { v: "baja", t: "Baja" }, { v: "neutro", t: "Neutro" }] },
    { k: "contexto", tipo: "text", label: "Contexto" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padV", tipo: "range", label: "Padding vertical", min: 0, max: 48, paso: 4, suf: "px" },
    { k: "padH", tipo: "range", label: "Padding horizontal", min: 0, max: 48, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorNumero", tipo: "color", label: "Color del número", hereda: "principal" },
    { k: "colorLabel", tipo: "color", label: "Color del label", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const trendCol = d.trendDir === "baja" ? col(null, p, "error") : col(null, p, "success");
    const trend = d.mostrarTrend ? `<span style="font-size:14px;font-weight:600;color:${trendCol};margin-left:8px">${flecha(d.trendDir)} ${esc(d.trendValor)}</span>` : "";
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};padding:${d.padV}px ${d.padH}px;border-radius:12px;text-align:${d.alin};box-sizing:border-box;font-family:${fuente}">
      <div><span data-edit="numero" style="font-size:40px;font-weight:600;line-height:1;color:${col(d.colorNumero, p, "principal")}">${esc(d.numero)}</span><span style="font-size:20px;font-weight:500;color:${col(d.colorNumero, p, "principal")}">${esc(d.unidad)}</span>${trend}</div>
      <p data-edit="label" style="font-size:14px;font-weight:500;color:${col(d.colorLabel, p, "textoSecundario")};margin:8px 0 0">${esc(d.label)}</p>
      ${d.contexto ? `<p style="font-size:12px;color:${col(d.colorLabel, p, "textoSecundario")};margin:2px 0 0">${esc(d.contexto)}</p>` : ""}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const trendCol = d.trendDir === "baja" ? col(null, p, "error") : col(null, p, "success");
    const trend = d.mostrarTrend ? `<span style="font-size:14px;font-weight:600;color:${trendCol}">&nbsp;&nbsp;${flecha(d.trendDir)} ${esc(d.trendValor)}</span>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:12px"><tr><td style="padding:${d.padV}px ${d.padH}px;font-family:${fuente}" align="${d.alin}">
      <span style="font-size:40px;font-weight:600;color:${col(d.colorNumero, p, "principal")}">${esc(d.numero)}${esc(d.unidad)}</span>${trend}
      <div style="font-size:14px;font-weight:500;color:${col(d.colorLabel, p, "textoSecundario")};padding-top:8px">${esc(d.label)}</div>
      ${d.contexto ? `<div style="font-size:12px;color:${col(d.colorLabel, p, "textoSecundario")};padding-top:2px">${esc(d.contexto)}</div>` : ""}
    </td></tr></table>`;
  },
};
