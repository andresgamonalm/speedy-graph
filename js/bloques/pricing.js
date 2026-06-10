// Bloque: Plan de precios. LINEAMIENTOS: nombre, precio, periodo, features, CTA,
// plan destacado. Hereda paleta. Features vía editor de listas.
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "pricing",
  cat: "Acción",
  nombre: "Plan de precios",
  sub: "Tier con features y CTA",
  icon: "layers",

  defaults: {
    destacado: false,
    tier: "Pro", precio: "$79", periodo: "/mes",
    features: [{ t: "Campañas ilimitadas" }, { t: "IA aplicada Char-B" }, { t: "Export a email y banner" }],
    ctaTexto: "Empezar ahora", ctaUrl: "https://",
    alin: "left", padding: 24,
    bg: null, colorTier: null, colorPrecio: null, colorTexto: null, colorAcento: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "destacado", tipo: "check", label: "Plan destacado" },
    { k: "tier", tipo: "text", label: "Nombre del plan" },
    { k: "precio", tipo: "text", label: "Precio" },
    { k: "periodo", tipo: "text", label: "Periodo" },
    { k: "features", tipo: "lista", label: "Feature", nuevo: { t: "Nueva feature" }, sub: [{ k: "t", tipo: "text", label: "Texto" }] },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padding", tipo: "range", label: "Padding interno", min: 8, max: 40, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoPrincipal" },
    { k: "colorTier", tipo: "color", label: "Color del plan", hereda: "textoSecundario" },
    { k: "colorPrecio", tipo: "color", label: "Color del precio", hereda: "principal" },
    { k: "colorTexto", tipo: "color", label: "Color de features", hereda: "textoPrincipal" },
    { k: "colorAcento", tipo: "color", label: "Color del marcador", hereda: "acento" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const borde = d.destacado ? `2px solid ${col(null, p, "principal")}` : `1px solid ${col(null, p, "borde")}`;
    const feats = d.features.map((f, i) => `<li data-edit="features.${i}.t" style="position:relative;padding-left:22px;margin:0 0 8px;font-size:14px;color:${col(d.colorTexto, p, "textoPrincipal")};list-style:none"><span style="position:absolute;left:0;color:${col(d.colorAcento, p, "acento")};font-weight:600">✓</span>${esc(f.t)}</li>`).join("");
    return `<div style="background:${col(d.bg, p, "fondoPrincipal")};border:${borde};border-radius:14px;padding:${d.padding}px;font-family:${fuente};text-align:${d.alin}">
      <p data-edit="tier" style="font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:${col(d.colorTier, p, "textoSecundario")};margin:0 0 8px">${esc(d.tier)}</p>
      <p style="margin:0 0 16px"><span data-edit="precio" style="font-size:40px;font-weight:600;color:${col(d.colorPrecio, p, "principal")}">${esc(d.precio)}</span><span style="font-size:15px;color:${col(d.colorTier, p, "textoSecundario")}">${esc(d.periodo)}</span></p>
      <ul style="margin:0 0 20px;padding:0">${feats}</ul>
      <a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:block;text-align:center;font-size:15px;font-weight:500;color:#fff;background:${col(null, p, "cta")};padding:12px;border-radius:6px;text-decoration:none;transition:all .3s ease">${esc(d.ctaTexto)}</a></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const borde = d.destacado ? `2px solid ${col(null, p, "principal")}` : `1px solid ${col(null, p, "borde")}`;
    const feats = d.features.map((f) => `<tr><td valign="top" width="22" style="color:${col(d.colorAcento, p, "acento")};font-weight:600;font-size:14px">✓</td><td style="font-size:14px;color:${col(d.colorTexto, p, "textoPrincipal")};padding-bottom:8px">${esc(f.t)}</td></tr>`).join("");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoPrincipal")}" style="border:${borde};border-radius:14px"><tr><td style="padding:${d.padding}px;font-family:${fuente}" align="${d.alin}">
      <div style="font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:${col(d.colorTier, p, "textoSecundario")};padding-bottom:8px">${esc(d.tier)}</div>
      <div style="padding-bottom:16px"><span style="font-size:40px;font-weight:600;color:${col(d.colorPrecio, p, "principal")}">${esc(d.precio)}</span><span style="font-size:15px;color:${col(d.colorTier, p, "textoSecundario")}">${esc(d.periodo)}</span></div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px">${feats}</table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:block;font-size:15px;font-weight:500;color:#fff;text-decoration:none;padding:12px">${esc(d.ctaTexto)}</a></td></tr></table>
    </td></tr></table>`;
  },
};
