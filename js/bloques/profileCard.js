// Bloque: Card de perfil. LINEAMIENTOS: avatar, nombre, sub, CTA opcional, stats.
// Sistema de imagen (avatar cuadrado). Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";
import { renderImagenPantalla, renderImagenEmail } from "../core/imagen.js";

export default {
  id: "profileCard",
  cat: "Cards",
  nombre: "Card de perfil",
  sub: "Avatar, nombre y stats",
  icon: "type",

  defaults: {
    avatarUrl: "", aspecto: "1:1", fit: "cover", zoom: 100, focoX: 50, focoY: 50, radio: 999,
    nombre: "Nombre Apellido", sub: "Marketing & Performance",
    mostrarCta: true, ctaTexto: "Ver perfil", ctaUrl: "https://",
    mostrarStats: true,
    stats: [{ numero: "120", label: "Campañas" }, { numero: "3.2x", label: "ROI" }],
    padding: 24,
    bg: null, colorNombre: null, colorSub: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "avatarUrl", tipo: "imgurl", label: "Avatar" },
    { k: "nombre", tipo: "text", label: "Nombre" },
    { k: "sub", tipo: "text", label: "Subtítulo" },
    { k: "mostrarCta", tipo: "check", label: "Mostrar botón" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { k: "mostrarStats", tipo: "check", label: "Mostrar stats" },
    { k: "stats", tipo: "lista", label: "Stat", nuevo: { numero: "0", label: "Métrica" }, sub: [{ k: "numero", tipo: "text", label: "Número" }, { k: "label", tipo: "text", label: "Label" }] },
    { grupo: "Espaciado" },
    { k: "padding", tipo: "range", label: "Padding interno", min: 8, max: 40, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoPrincipal" },
    { k: "colorNombre", tipo: "color", label: "Color del nombre", hereda: "textoPrincipal" },
    { k: "colorSub", tipo: "color", label: "Color del subtítulo", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const avatar = d.avatarUrl ? `<div style="width:80px;height:80px;margin:0 auto 12px">${renderImagenPantalla({ ...d, url: d.avatarUrl, aspecto: "1:1" }, { alto: 80 })}</div>` : "";
    const stats = d.mostrarStats ? `<div style="display:flex;gap:24px;justify-content:center;margin-top:16px">${d.stats.map((s, i) => `<div style="text-align:center"><div data-edit="stats.${i}.numero" style="font-size:22px;font-weight:600;color:${col(null, p, "principal")}">${esc(s.numero)}</div><div data-edit="stats.${i}.label" style="font-size:12px;color:${col(d.colorSub, p, "textoSecundario")}">${esc(s.label)}</div></div>`).join("")}</div>` : "";
    const cta = d.mostrarCta ? `<div style="margin-top:16px"><a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:inline-block;font-size:14px;font-weight:500;color:#fff;background:${col(null, p, "cta")};padding:10px 20px;border-radius:6px;text-decoration:none;transition:all .3s ease">${esc(d.ctaTexto)}</a></div>` : "";
    return `<div style="background:${col(d.bg, p, "fondoPrincipal")};border:1px solid ${col(null, p, "borde")};border-radius:14px;padding:${d.padding}px;text-align:center;font-family:${fuente}">
      ${avatar}
      <p data-edit="nombre" style="font-size:18px;font-weight:600;color:${col(d.colorNombre, p, "textoPrincipal")};margin:0">${esc(d.nombre)}</p>
      <p data-edit="sub" style="font-size:14px;color:${col(d.colorSub, p, "textoSecundario")};margin:4px 0 0">${esc(d.sub)}</p>
      ${stats}${cta}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const avatar = d.avatarUrl ? `<tr><td align="center" style="padding-bottom:12px">${renderImagenEmail({ ...d, url: d.avatarUrl, radio: 999 }, { ancho: 80 })}</td></tr>` : "";
    const stats = d.mostrarStats ? `<tr><td align="center" style="padding-top:16px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>${d.stats.map((s) => `<td align="center" style="padding:0 16px"><div style="font-size:22px;font-weight:600;color:${col(null, p, "principal")}">${esc(s.numero)}</div><div style="font-size:12px;color:${col(d.colorSub, p, "textoSecundario")}">${esc(s.label)}</div></td>`).join("")}</tr></table></td></tr>` : "";
    const cta = d.mostrarCta ? `<tr><td align="center" style="padding-top:16px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-size:14px;font-weight:500;color:#fff;text-decoration:none;padding:10px 20px">${esc(d.ctaTexto)}</a></td></tr></table></td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoPrincipal")}" style="border:1px solid ${col(null, p, "borde")};border-radius:14px"><tr><td style="padding:${d.padding}px;font-family:${fuente}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${avatar}
      <tr><td align="center" style="font-size:18px;font-weight:600;color:${col(d.colorNombre, p, "textoPrincipal")}">${esc(d.nombre)}</td></tr>
      <tr><td align="center" style="font-size:14px;color:${col(d.colorSub, p, "textoSecundario")};padding-top:4px">${esc(d.sub)}</td></tr>
      ${stats}${cta}</table></td></tr></table>`;
  },
};
