// Bloque: Card de artículo / Post. LINEAMIENTOS: imagen, categoría, título, lead, link.
// Sistema de imagen único. Hereda paleta.
import { roles, fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";
import { camposImagen, defaultsImagen, renderImagenPantalla, renderImagenEmail } from "../core/imagen.js";

export default {
  id: "article",
  cat: "Cards",
  nombre: "Card de artículo",
  sub: "Post con categoría",
  icon: "type",

  defaults: {
    ...defaultsImagen, aspecto: "16:9",
    categoria: "Performance",
    titulo: "Cómo bajar el CPA sin perder volumen",
    lead: "Tres ajustes de campaña que mueven la aguja en una semana.",
    linkTexto: "Leer artículo", linkUrl: "https://",
    alin: "left", padding: 16,
    bg: null, colorTitulo: null, colorLead: null, colorCategoria: null, colorEnlace: null,
  },

  campos: [
    { grupo: "Contenido" },
    ...camposImagen(),
    { k: "categoria", tipo: "text", label: "Categoría" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "lead", tipo: "textarea", label: "Lead" },
    { k: "linkTexto", tipo: "text", label: "Texto del enlace" },
    { k: "linkUrl", tipo: "text", label: "URL del enlace" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padding", tipo: "range", label: "Padding interno", min: 0, max: 32, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoPrincipal" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", hereda: "textoPrincipal" },
    { k: "colorLead", tipo: "color", label: "Color del lead", hereda: "textoSecundario" },
    { k: "colorCategoria", tipo: "color", label: "Color de categoría", hereda: "acento" },
    { k: "colorEnlace", tipo: "color", label: "Color del enlace", hereda: "link" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const h3 = roles.h3;
    return `<div style="background:${col(d.bg, p, "fondoPrincipal")};border:1px solid ${col(null, p, "borde")};border-radius:12px;overflow:hidden;font-family:${fuente};text-align:${d.alin}">
      ${renderImagenPantalla(d)}
      <div style="padding:${d.padding}px">
        <p data-edit="categoria" style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:${col(d.colorCategoria, p, "acento")};margin:0 0 8px">${esc(d.categoria)}</p>
        <p data-edit="titulo" style="font-size:${h3.size}px;font-weight:${h3.weight};line-height:${h3.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0">${esc(d.titulo)}</p>
        <p data-edit="lead" style="font-size:14px;color:${col(d.colorLead, p, "textoSecundario")};margin:8px 0 12px">${esc(d.lead)}</p>
        <a href="${url(d.linkUrl)}" style="font-size:14px;font-weight:500;color:${col(d.colorEnlace, p, "link")};text-decoration:none">${esc(d.linkTexto)} →</a>
      </div></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const h3 = roles.h3;
    const ancho = ctx?.ancho || 552;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoPrincipal")}" style="border:1px solid ${col(null, p, "borde")};border-radius:12px">
      <tr><td>${renderImagenEmail(d, { ancho })}</td></tr>
      <tr><td style="padding:${d.padding}px;font-family:${fuente}" align="${d.alin}">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:${col(d.colorCategoria, p, "acento")};padding-bottom:8px">${esc(d.categoria)}</div>
        <div style="font-size:${h3.size}px;font-weight:${h3.weight};line-height:${h3.lh};color:${col(d.colorTitulo, p, "textoPrincipal")}">${esc(d.titulo)}</div>
        <div style="font-size:14px;color:${col(d.colorLead, p, "textoSecundario")};padding:8px 0 12px">${esc(d.lead)}</div>
        <a href="${url(d.linkUrl)}" target="_blank" style="font-size:14px;font-weight:500;color:${col(d.colorEnlace, p, "link")};text-decoration:none">${esc(d.linkTexto)} &rarr;</a>
      </td></tr></table>`;
  },
};
