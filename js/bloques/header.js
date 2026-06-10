// Bloque: Header / Encabezado. LINEAMIENTOS: logo opcional, título, bajada, CTA opcional,
// fondo, padding, alineación, altura mínima. Hereda roles tipográficos y paleta.
import { roles, fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "header",
  cat: "Estructura",
  nombre: "Header",
  sub: "Encabezado con título y bajada",
  icon: "type",

  defaults: {
    logoUrl: "", logoAncho: 120,
    mostrarEyebrow: false, eyebrow: "Novedad",
    titulo: "Título principal del encabezado",
    bajada: "Una bajada breve que explica el beneficio concreto.",
    mostrarCta: false, ctaTexto: "Ver más", ctaUrl: "https://",
    alin: "center", padV: 40, padH: 24,
    bg: null, colorTitulo: null, colorBajada: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "logoUrl", tipo: "imgurl", label: "Logo (opcional)" },
    { k: "logoAncho", tipo: "range", label: "Ancho del logo", min: 60, max: 240, paso: 10, suf: "px" },
    { k: "mostrarEyebrow", tipo: "check", label: "Mostrar eyebrow" },
    { k: "eyebrow", tipo: "text", label: "Eyebrow" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "bajada", tipo: "textarea", label: "Bajada" },
    { k: "mostrarCta", tipo: "check", label: "Mostrar botón" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padV", tipo: "range", label: "Padding vertical", min: 0, max: 80, paso: 4, suf: "px" },
    { k: "padH", tipo: "range", label: "Padding horizontal", min: 0, max: 64, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoPrincipal" },
    { k: "colorTitulo", tipo: "color", label: "Color de título", hereda: "textoPrincipal" },
    { k: "colorBajada", tipo: "color", label: "Color de bajada", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const h1 = roles.h1, ba = roles.bajada;
    const logo = d.logoUrl ? `<img data-edit-img="logoUrl" src="${esc(d.logoUrl)}" alt="" style="width:${d.logoAncho}px;height:auto;display:inline-block;margin:0 0 16px">` : "";
    const eye = d.mostrarEyebrow ? `<p data-edit="eyebrow" style="font-family:${fuente};font-size:13px;font-weight:500;letter-spacing:.5px;text-transform:uppercase;color:${col(null, p, "secundario")};margin:0 0 8px">${esc(d.eyebrow)}</p>` : "";
    const cta = d.mostrarCta ? `<div style="margin-top:20px"><a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:inline-block;font-family:${fuente};font-size:15px;font-weight:500;color:#fff;background:${col(null, p, "cta")};padding:12px 24px;border-radius:6px;text-decoration:none;transition:all .3s ease">${esc(d.ctaTexto)}</a></div>` : "";
    return `<div style="background:${col(d.bg, p, "fondoPrincipal")};padding:${d.padV}px ${d.padH}px;text-align:${d.alin};box-sizing:border-box;border-radius:8px">
      ${logo}${eye}
      <h1 data-edit="titulo" style="font-family:${fuente};font-size:${h1.size}px;font-weight:${h1.weight};line-height:${h1.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0">${esc(d.titulo)}</h1>
      <p data-edit="bajada" style="font-family:${fuente};font-size:${ba.size}px;line-height:${ba.lh};color:${col(d.colorBajada, p, "textoSecundario")};margin:12px 0 0">${esc(d.bajada)}</p>
      ${cta}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const h1 = roles.h1, ba = roles.bajada;
    const logo = d.logoUrl ? `<tr><td align="${d.alin}" style="padding:0 0 16px"><img src="${esc(d.logoUrl)}" width="${d.logoAncho}" alt="" style="display:inline-block;width:${d.logoAncho}px;height:auto;border:0"></td></tr>` : "";
    const eye = d.mostrarEyebrow ? `<tr><td align="${d.alin}" style="font-family:${fuente};font-size:13px;font-weight:500;letter-spacing:.5px;text-transform:uppercase;color:${col(null, p, "secundario")};padding:0 0 8px">${esc(d.eyebrow)}</td></tr>` : "";
    const cta = d.mostrarCta ? `<tr><td align="${d.alin}" style="padding:20px 0 0"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr><td align="center" bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-family:${fuente};font-size:15px;font-weight:500;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px">${esc(d.ctaTexto)}</a></td></tr></table></td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoPrincipal")}"><tr><td style="padding:${d.padV}px ${d.padH}px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${logo}${eye}
      <tr><td align="${d.alin}" style="font-family:${fuente};font-size:${h1.size}px;font-weight:${h1.weight};line-height:${h1.lh};color:${col(d.colorTitulo, p, "textoPrincipal")}">${esc(d.titulo)}</td></tr>
      <tr><td align="${d.alin}" style="font-family:${fuente};font-size:${ba.size}px;line-height:${ba.lh};color:${col(d.colorBajada, p, "textoSecundario")};padding:12px 0 0">${esc(d.bajada)}</td></tr>
      ${cta}</table></td></tr></table>`;
  },
};
