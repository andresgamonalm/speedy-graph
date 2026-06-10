// Bloque: Botón CTA. Crítico para email → botón bulletproof (tabla, sin JS, sin flex).
import { fuente, paletaGamonal } from "../core/tokens.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const url = (s = "#") => esc(String(s).trim() || "#");

// Resuelve colores/borde según variante. Hereda de la paleta activa (cta).
function look(d, ctx) {
  const pal = (ctx && ctx.paleta) || paletaGamonal;
  const fondo = d.colorFondo ?? pal.cta;          // hereda de la paleta
  const txt = d.colorTexto ?? "#FFFFFF";          // texto sobre botón: blanco por defecto
  const bor = d.colorBorde || fondo;
  switch (d.variante) {
    case "secundario": return { bg: "#FFFFFF", color: fondo, border: bor, deco: "none" };
    case "outline":    return { bg: "transparent", color: fondo, border: bor, deco: "none" };
    case "ghost":      return { bg: "transparent", color: fondo, border: "transparent", deco: "none" };
    case "link":       return { bg: "transparent", color: fondo, border: "transparent", deco: "underline" };
    default:           return { bg: fondo, color: txt, border: fondo, deco: "none" }; // primario
  }
}

export default {
  id: "cta",
  cat: "Acción",
  nombre: "Botón CTA",
  sub: "Llamada a la acción",
  icon: "plus",

  defaults: {
    texto: "Ver herramienta",
    url: "https://",
    variante: "primario",        // primario | secundario | outline | ghost | link
    alin: "left",                // left | center | right
    ancho: "auto",               // auto | full
    tamano: 15,
    padX: 24,
    padY: 12,
    radio: 6,
    colorFondo: null,            // null = hereda de la paleta activa (cta)
    colorTexto: null,            // null = blanco por defecto
    colorBorde: "",
  },

  campos: [
    { grupo: "Contenido" },
    { k: "texto", tipo: "text", label: "Texto del botón" },
    { k: "url", tipo: "text", label: "URL destino" },
    { grupo: "Layout" },
    { k: "variante", tipo: "select", label: "Tipo", opciones: [
      { v: "primario", t: "Primario" }, { v: "secundario", t: "Secundario" },
      { v: "outline", t: "Outline" }, { v: "ghost", t: "Ghost" }, { v: "link", t: "Enlace" } ] },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { k: "ancho", tipo: "select", label: "Ancho", opciones: [{ v: "auto", t: "Automático" }, { v: "full", t: "Completo" }] },
    { k: "tamano", tipo: "range", label: "Tamaño de texto", min: 12, max: 22, suf: "px" },
    { grupo: "Espaciado" },
    { k: "padX", tipo: "range", label: "Padding horizontal", min: 8, max: 48, paso: 4, suf: "px" },
    { k: "padY", tipo: "range", label: "Padding vertical", min: 6, max: 28, paso: 2, suf: "px" },
    { grupo: "Bordes" },
    { k: "radio", tipo: "range", label: "Radio", min: 0, max: 32, paso: 2, suf: "px" },
    { grupo: "Color" },
    { k: "colorFondo", tipo: "color", label: "Color principal", hereda: "cta" },
    { k: "colorTexto", tipo: "color", label: "Color de texto", heredaFijo: "#FFFFFF" },
  ],

  renderPantalla(d, ctx) {
    const l = look(d, ctx);
    const full = d.ancho === "full";
    const aCss = [
      "display:inline-block", "box-sizing:border-box",
      full ? "width:100%" : "", "text-align:center",
      `font-family:${fuente}`, `font-size:${d.tamano}px`, "font-weight:500", "line-height:1",
      `padding:${d.padY}px ${d.padX}px`, `border-radius:${d.radio}px`,
      `background:${l.bg}`, `color:${l.color}`,
      `border:1px solid ${l.border}`, `text-decoration:${l.deco}`,
      "cursor:pointer", "transition:all .3s ease",
    ].filter(Boolean).join(";");
    return `<div style="text-align:${d.alin}"><a class="sbb-cta-prev" href="${url(d.url)}" data-edit="texto" style="${aCss}">${esc(d.texto)}</a></div>`;
  },

  // Bulletproof: tabla + <a> con padding. Sin flex, sin JS. Degrada bien en Outlook/Gmail.
  renderEmail(d, ctx) {
    const l = look(d, ctx);
    const full = d.ancho === "full";
    const aCss = [
      "display:inline-block", `font-family:${fuente}`, `font-size:${d.tamano}px`,
      "font-weight:500", "line-height:1", `color:${l.color}`, "text-decoration:" + l.deco,
      `padding:${d.padY}px ${d.padX}px`, `border-radius:${d.radio}px`,
      full ? "width:100%;box-sizing:border-box;text-align:center" : "",
    ].filter(Boolean).join(";");
    const tdCss = [
      `background:${l.bg === "transparent" ? "transparent" : l.bg}`,
      `border-radius:${d.radio}px`,
      l.border !== "transparent" ? `border:1px solid ${l.border}` : "",
    ].filter(Boolean).join(";");
    const bg = l.bg !== "transparent" ? ` bgcolor="${l.bg}"` : "";
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" ${full ? 'width="100%"' : ""} align="${d.alin}"><tr><td align="center"${bg} style="${tdCss}"><a href="${url(d.url)}" target="_blank" style="${aCss}">${esc(d.texto)}</a></td></tr></table>`;
  },
};
