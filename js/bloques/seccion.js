// Bloque: Sección con fondo. LINEAMIENTOS: eyebrow, título, subtítulo, botón, fondo,
// colores, padding. Banda de sección (puede ir a ancho completo). Hereda roles y paleta.
import { roles, fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "seccion",
  cat: "Estructura",
  nombre: "Sección con fondo",
  sub: "Banda con título y CTA",
  icon: "layers",

  defaults: {
    mostrarEyebrow: true, eyebrow: "Cómo funciona",
    titulo: "Una idea, una campaña lista para ejecutar",
    subtitulo: "Conecta estrategia con piezas publicables, sin perder tiempo operativo.",
    mostrarCta: true, ctaTexto: "Ver ejemplo", ctaUrl: "https://",
    alin: "center", padV: 48, padH: 24,
    bg: null, colorEyebrow: null, colorTitulo: null, colorSub: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "mostrarEyebrow", tipo: "check", label: "Mostrar eyebrow" },
    { k: "eyebrow", tipo: "text", label: "Eyebrow" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "subtitulo", tipo: "textarea", label: "Subtítulo" },
    { k: "mostrarCta", tipo: "check", label: "Mostrar botón" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padV", tipo: "range", label: "Padding vertical", min: 16, max: 96, paso: 8, suf: "px" },
    { k: "padH", tipo: "range", label: "Padding horizontal", min: 0, max: 64, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorEyebrow", tipo: "color", label: "Color del eyebrow", hereda: "acento" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", hereda: "textoPrincipal" },
    { k: "colorSub", tipo: "color", label: "Color del subtítulo", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const h1 = roles.h1;
    const eye = d.mostrarEyebrow ? `<p data-edit="eyebrow" style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:${col(d.colorEyebrow, p, "acento")};margin:0 0 10px">${esc(d.eyebrow)}</p>` : "";
    const cta = d.mostrarCta ? `<div style="margin-top:20px"><a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:inline-block;font-size:15px;font-weight:500;color:#fff;background:${col(null, p, "cta")};padding:12px 26px;border-radius:6px;text-decoration:none;transition:all .3s ease">${esc(d.ctaTexto)}</a></div>` : "";
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};padding:${d.padV}px ${d.padH}px;border-radius:14px;text-align:${d.alin};font-family:${fuente}">
      ${eye}
      <h2 data-edit="titulo" style="font-size:${h1.size}px;font-weight:${h1.weight};line-height:${h1.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0;max-width:560px;margin-left:${d.alin === "center" ? "auto" : "0"};margin-right:${d.alin === "center" ? "auto" : "0"}">${esc(d.titulo)}</h2>
      <p data-edit="subtitulo" style="font-size:17px;line-height:1.5;color:${col(d.colorSub, p, "textoSecundario")};margin:12px auto 0;max-width:520px">${esc(d.subtitulo)}</p>${cta}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const h1 = roles.h1;
    const eye = d.mostrarEyebrow ? `<tr><td align="${d.alin}" style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:${col(d.colorEyebrow, p, "acento")};padding-bottom:10px">${esc(d.eyebrow)}</td></tr>` : "";
    const cta = d.mostrarCta ? `<tr><td align="${d.alin}" style="padding-top:20px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr><td bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-size:15px;font-weight:500;color:#fff;text-decoration:none;padding:12px 26px">${esc(d.ctaTexto)}</a></td></tr></table></td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:14px"><tr><td style="padding:${d.padV}px ${d.padH}px;font-family:${fuente}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${eye}
      <tr><td align="${d.alin}" style="font-size:${h1.size}px;font-weight:${h1.weight};line-height:${h1.lh};color:${col(d.colorTitulo, p, "textoPrincipal")}">${esc(d.titulo)}</td></tr>
      <tr><td align="${d.alin}" style="font-size:17px;line-height:1.5;color:${col(d.colorSub, p, "textoSecundario")};padding-top:12px">${esc(d.subtitulo)}</td></tr>
      ${cta}</table></td></tr></table>`;
  },
};
