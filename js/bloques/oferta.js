// Bloque: Oferta / promoción. LINEAMIENTOS: título, bajada, precio/beneficio, imagen
// opcional, CTA, badge, fecha/condición, fondo, padding. Hereda paleta.
import { roles, fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "oferta",
  cat: "Acción",
  nombre: "Oferta / promoción",
  sub: "Gancho comercial con CTA",
  icon: "plus",

  defaults: {
    mostrarBadge: true, badge: "-30%",
    titulo: "Oferta de lanzamiento",
    bajada: "Activa tu primera campaña con un descuento por tiempo limitado.",
    beneficio: "Desde $29.990",
    ctaTexto: "Aprovechar oferta", ctaUrl: "https://",
    mostrarFecha: true, fecha: "Hasta el 30 de junio",
    alin: "center", padV: 40, padH: 24,
    bg: null, colorTitulo: null, colorBajada: null, colorBadge: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "mostrarBadge", tipo: "check", label: "Mostrar badge" },
    { k: "badge", tipo: "text", label: "Badge" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "bajada", tipo: "textarea", label: "Bajada" },
    { k: "beneficio", tipo: "text", label: "Precio / beneficio" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { k: "mostrarFecha", tipo: "check", label: "Mostrar condición" },
    { k: "fecha", tipo: "text", label: "Condición / fecha" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padV", tipo: "range", label: "Padding vertical", min: 16, max: 80, paso: 4, suf: "px" },
    { k: "padH", tipo: "range", label: "Padding horizontal", min: 8, max: 48, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "principal" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", heredaFijo: "#FFFFFF" },
    { k: "colorBajada", tipo: "color", label: "Color de la bajada", heredaFijo: "#E6E8EF" },
    { k: "colorBadge", tipo: "color", label: "Color del badge", hereda: "acento" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const h1 = roles.h1;
    const tit = d.colorTitulo || "#FFFFFF", baj = d.colorBajada || "#E6E8EF";
    const badge = d.mostrarBadge ? `<span style="display:inline-block;background:${col(d.colorBadge, p, "acento")};color:#040764;font-size:13px;font-weight:600;padding:4px 12px;border-radius:999px;margin-bottom:12px">${esc(d.badge)}</span>` : "";
    const fecha = d.mostrarFecha ? `<p style="font-size:13px;color:${baj};margin:12px 0 0;opacity:.9">${esc(d.fecha)}</p>` : "";
    return `<div style="background:${col(d.bg, p, "principal")};padding:${d.padV}px ${d.padH}px;border-radius:14px;text-align:${d.alin};font-family:${fuente}">
      ${badge}
      <h2 data-edit="titulo" style="font-size:${h1.size}px;font-weight:${h1.weight};line-height:${h1.lh};color:${tit};margin:0">${esc(d.titulo)}</h2>
      <p data-edit="bajada" style="font-size:16px;color:${baj};margin:10px 0 0">${esc(d.bajada)}</p>
      <p style="font-size:24px;font-weight:600;color:${tit};margin:16px 0">${esc(d.beneficio)}</p>
      <a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:inline-block;font-size:15px;font-weight:500;color:${col(d.bg, p, "principal")};background:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;transition:all .3s ease">${esc(d.ctaTexto)}</a>
      ${fecha}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const h1 = roles.h1;
    const tit = d.colorTitulo || "#FFFFFF", baj = d.colorBajada || "#E6E8EF";
    const badge = d.mostrarBadge ? `<tr><td align="${d.alin}" style="padding-bottom:12px"><span style="display:inline-block;background:${col(d.colorBadge, p, "acento")};color:#040764;font-size:13px;font-weight:600;padding:4px 12px;border-radius:999px">${esc(d.badge)}</span></td></tr>` : "";
    const fecha = d.mostrarFecha ? `<tr><td align="${d.alin}" style="font-size:13px;color:${baj};padding-top:12px">${esc(d.fecha)}</td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "principal")}" style="border-radius:14px"><tr><td style="padding:${d.padV}px ${d.padH}px;font-family:${fuente}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${badge}
      <tr><td align="${d.alin}" style="font-size:${h1.size}px;font-weight:${h1.weight};line-height:${h1.lh};color:${tit}">${esc(d.titulo)}</td></tr>
      <tr><td align="${d.alin}" style="font-size:16px;color:${baj};padding-top:10px">${esc(d.bajada)}</td></tr>
      <tr><td align="${d.alin}" style="font-size:24px;font-weight:600;color:${tit};padding:16px 0">${esc(d.beneficio)}</td></tr>
      <tr><td align="${d.alin}"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr><td bgcolor="#FFFFFF" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-size:15px;font-weight:500;color:${col(d.bg, p, "principal")};text-decoration:none;padding:12px 28px">${esc(d.ctaTexto)}</a></td></tr></table></td></tr>
      ${fecha}</table></td></tr></table>`;
  },
};
