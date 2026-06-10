// Bloque: Día divisor. LINEAMIENTOS: día, fecha, estilo, margen. Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "diadivisor",
  cat: "Agenda",
  nombre: "Día divisor",
  sub: "Separador de jornada",
  icon: "down",

  defaults: {
    texto: "Día 1", fecha: "Lunes 30 de junio",
    alin: "center", margenV: 16,
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "texto", tipo: "text", label: "Día" },
    { k: "fecha", tipo: "text", label: "Fecha" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "margenV", tipo: "range", label: "Margen vertical", min: 0, max: 48, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "principal" },
    { k: "color", tipo: "color", label: "Color del texto", heredaFijo: "#FFFFFF" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    return `<div style="margin:${d.margenV}px 0;text-align:${d.alin};font-family:${fuente}">
      <span style="display:inline-block;background:${col(d.bg, p, "principal")};color:${c};border-radius:999px;padding:6px 18px;font-size:14px;font-weight:600">${esc(d.texto)} · ${esc(d.fecha)}</span></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${d.alin}" style="padding:${d.margenV}px 0;font-family:${fuente}">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr><td bgcolor="${col(d.bg, p, "principal")}" style="border-radius:999px;padding:6px 18px;font-size:14px;font-weight:600;color:${c}">${esc(d.texto)} &middot; ${esc(d.fecha)}</td></tr></table>
    </td></tr></table>`;
  },
};
