// Bloque: Redes sociales. LINEAMIENTOS: redes, URLs, íconos, tamaño, color, alineación +
// compatibilidad email. Los SVG no van en Outlook → en email se usan badges de texto en
// tablas (bulletproof). En pantalla, círculos con inicial.
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "social",
  cat: "Widgets",
  nombre: "Redes sociales",
  sub: "Enlaces a perfiles",
  icon: "layers",

  defaults: {
    redes: [
      { nombre: "LinkedIn", inicial: "in", url: "https://" },
      { nombre: "Instagram", inicial: "ig", url: "https://" },
      { nombre: "YouTube", inicial: "yt", url: "https://" },
    ],
    alin: "center", tamano: 40,
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "redes", tipo: "lista", label: "Red", nuevo: { nombre: "Red", inicial: "?", url: "https://" }, sub: [{ k: "nombre", tipo: "text", label: "Nombre" }, { k: "inicial", tipo: "text", label: "Inicial" }, { k: "url", tipo: "text", label: "URL" }] },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { k: "tamano", tipo: "range", label: "Tamaño", min: 28, max: 56, paso: 2, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo del ícono", hereda: "principal" },
    { k: "color", tipo: "color", label: "Color del texto", heredaFijo: "#FFFFFF" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    const items = d.redes.map((r) => `<a href="${url(r.url)}" title="${esc(r.nombre)}" style="display:inline-flex;align-items:center;justify-content:center;width:${d.tamano}px;height:${d.tamano}px;border-radius:50%;background:${col(d.bg, p, "principal")};color:${c};font-size:13px;font-weight:600;text-decoration:none;text-transform:lowercase">${esc(r.inicial)}</a>`).join("");
    return `<div style="text-align:${d.alin};font-family:${fuente};display:flex;gap:10px;justify-content:${d.alin === "center" ? "center" : d.alin === "right" ? "flex-end" : "flex-start"}">${items}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    const cels = d.redes.map((r) => `<td style="padding:0 5px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="${d.tamano}" height="${d.tamano}" bgcolor="${col(d.bg, p, "principal")}" style="border-radius:50%;font-family:${fuente};font-size:13px;font-weight:600;color:${c}"><a href="${url(r.url)}" target="_blank" style="color:${c};text-decoration:none;display:block;line-height:${d.tamano}px">${esc(r.inicial)}</a></td></tr></table></td>`).join("");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${d.alin}"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr>${cels}</tr></table></td></tr></table>`;
  },
};
