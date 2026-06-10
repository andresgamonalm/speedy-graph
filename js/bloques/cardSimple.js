// Bloque: Card simple. LINEAMIENTOS: fondo, padding, radio, borde, sombra, título, texto,
// CTA opcional, gap. Card base sin imagen. Hereda paleta.
import { roles, fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "cardSimple",
  cat: "Cards",
  nombre: "Card simple",
  sub: "Título, texto y CTA",
  icon: "layers",

  defaults: {
    titulo: "Título de la card",
    texto: "Texto breve que explica el beneficio o la idea principal.",
    mostrarCta: false, ctaTexto: "Ver más", ctaUrl: "https://",
    alin: "left", padding: 24, radio: 12, borde: true, sombra: "soft",
    bg: null, colorTitulo: null, colorTexto: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "texto", tipo: "textarea", label: "Texto" },
    { k: "mostrarCta", tipo: "check", label: "Mostrar botón" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padding", tipo: "range", label: "Padding interno", min: 8, max: 40, paso: 4, suf: "px" },
    { grupo: "Bordes" },
    { k: "radio", tipo: "range", label: "Radio", min: 0, max: 24, paso: 2, suf: "px" },
    { k: "borde", tipo: "check", label: "Mostrar borde" },
    { grupo: "Sombra" },
    { k: "sombra", tipo: "select", label: "Sombra", opciones: [{ v: "none", t: "Ninguna" }, { v: "soft", t: "Suave" }, { v: "medium", t: "Media" }] },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoPrincipal" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", hereda: "textoPrincipal" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
  ],

  _sombra(s) {
    return s === "medium" ? "0 4px 12px rgba(4,7,100,.10)" : s === "soft" ? "0 1px 3px rgba(4,7,100,.08)" : "none";
  },

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const h3 = roles.h3;
    const borde = d.borde ? `1px solid ${col(null, p, "borde")}` : "none";
    const cta = d.mostrarCta ? `<div style="margin-top:14px"><a href="${url(d.ctaUrl)}" style="font-size:14px;font-weight:500;color:${col(null, p, "link")};text-decoration:none">${esc(d.ctaTexto)} →</a></div>` : "";
    return `<div style="background:${col(d.bg, p, "fondoPrincipal")};border:${borde};border-radius:${d.radio}px;box-shadow:${this._sombra(d.sombra)};padding:${d.padding}px;text-align:${d.alin};font-family:${fuente}">
      <p data-edit="titulo" style="font-size:${h3.size}px;font-weight:${h3.weight};line-height:${h3.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0 0 6px">${esc(d.titulo)}</p>
      <p data-edit="texto" style="font-size:15px;line-height:1.55;color:${col(d.colorTexto, p, "textoSecundario")};margin:0">${esc(d.texto)}</p>${cta}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const h3 = roles.h3;
    const borde = d.borde ? `border:1px solid ${col(null, p, "borde")};` : "";
    const cta = d.mostrarCta ? `<div style="padding-top:14px"><a href="${url(d.ctaUrl)}" target="_blank" style="font-size:14px;font-weight:500;color:${col(null, p, "link")};text-decoration:none">${esc(d.ctaTexto)} &rarr;</a></div>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoPrincipal")}" style="${borde}border-radius:${d.radio}px"><tr><td align="${d.alin}" style="padding:${d.padding}px;font-family:${fuente}">
      <div style="font-size:${h3.size}px;font-weight:${h3.weight};line-height:${h3.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};padding-bottom:6px">${esc(d.titulo)}</div>
      <div style="font-size:15px;line-height:1.55;color:${col(d.colorTexto, p, "textoSecundario")}">${esc(d.texto)}</div>${cta}</td></tr></table>`;
  },
};
