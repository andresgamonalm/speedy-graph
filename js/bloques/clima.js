// Bloque: Clima. LINEAMIENTOS: ubicación, temperatura, condición, ícono, datos manuales,
// fallback. Datos manuales (sin API en la pieza). Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "clima",
  cat: "Widgets",
  nombre: "Clima",
  sub: "Condición y temperatura",
  icon: "layers",

  defaults: {
    ciudad: "Santiago", temperatura: "22", unidad: "C", condicion: "Despejado",
    mostrarExtra: true, sensacion: "24", humedad: "40%",
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "ciudad", tipo: "text", label: "Ciudad" },
    { k: "temperatura", tipo: "text", label: "Temperatura" },
    { k: "unidad", tipo: "select", label: "Unidad", opciones: [{ v: "C", t: "°C" }, { v: "F", t: "°F" }] },
    { k: "condicion", tipo: "text", label: "Condición" },
    { k: "mostrarExtra", tipo: "check", label: "Mostrar extra" },
    { k: "sensacion", tipo: "text", label: "Sensación térmica" },
    { k: "humedad", tipo: "text", label: "Humedad" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "secundario" },
    { k: "color", tipo: "color", label: "Color del texto", heredaFijo: "#FFFFFF" },
  ],

  _extra(d, c) {
    return d.mostrarExtra
      ? `Sensación ${esc(d.sensacion)}°${esc(d.unidad)} &middot; Humedad ${esc(d.humedad)}`
      : "";
  },

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    const extra = d.mostrarExtra ? `<div style="font-size:12px;color:${c};opacity:.85;padding-top:8px">${this._extra(d, c)}</div>` : "";
    return `<div style="background:${col(d.bg, p, "secundario")};border-radius:14px;padding:24px;font-family:${fuente};color:${c}">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div><div style="font-size:15px;font-weight:600">${esc(d.ciudad)}</div><div style="font-size:13px;opacity:.9">${esc(d.condicion)}</div></div>
        <div style="font-size:44px;font-weight:600;line-height:1">${esc(d.temperatura)}°${esc(d.unidad)}</div>
      </div>${extra}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    const extra = d.mostrarExtra ? `<tr><td colspan="2" style="font-size:12px;color:${c};padding-top:8px">${this._extra(d, c)}</td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "secundario")}" style="border-radius:14px"><tr><td style="padding:24px;font-family:${fuente};color:${c}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td valign="middle"><div style="font-size:15px;font-weight:600">${esc(d.ciudad)}</div><div style="font-size:13px">${esc(d.condicion)}</div></td>
      <td valign="middle" align="right" style="font-size:44px;font-weight:600;line-height:1">${esc(d.temperatura)}°${esc(d.unidad)}</td></tr>
      ${extra}</table></td></tr></table>`;
  },
};
