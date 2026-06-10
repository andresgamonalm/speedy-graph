// Bloque: Card de producto. LINEAMIENTOS: imagen, nombre, descripción, precio, CTA.
// Usa el sistema de imagen único. Hereda paleta. Imagen vía clic / biblioteca.
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";
import { camposImagen, defaultsImagen, renderImagenPantalla, renderImagenEmail } from "../core/imagen.js";

export default {
  id: "product",
  cat: "Cards",
  nombre: "Card de producto",
  sub: "Foto, precio y CTA",
  icon: "layers",

  defaults: {
    ...defaultsImagen, aspecto: "4:3",
    nombre: "Nombre del producto",
    descripcion: "Una línea que explica el beneficio principal.",
    precio: "$29.990", ctaTexto: "Comprar", ctaUrl: "https://",
    alin: "left", padding: 16,
    bg: null, colorNombre: null, colorTexto: null, colorPrecio: null,
  },

  campos: [
    { grupo: "Contenido" },
    ...camposImagen(),
    { k: "nombre", tipo: "text", label: "Nombre" },
    { k: "descripcion", tipo: "textarea", label: "Descripción" },
    { k: "precio", tipo: "text", label: "Precio" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padding", tipo: "range", label: "Padding interno", min: 0, max: 32, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoPrincipal" },
    { k: "colorNombre", tipo: "color", label: "Color del nombre", hereda: "textoPrincipal" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
    { k: "colorPrecio", tipo: "color", label: "Color del precio", hereda: "principal" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    return `<div style="background:${col(d.bg, p, "fondoPrincipal")};border:1px solid ${col(null, p, "borde")};border-radius:12px;overflow:hidden;font-family:${fuente};text-align:${d.alin}">
      ${renderImagenPantalla(d)}
      <div style="padding:${d.padding}px">
        <p data-edit="nombre" style="font-size:18px;font-weight:600;color:${col(d.colorNombre, p, "textoPrincipal")};margin:0">${esc(d.nombre)}</p>
        <p data-edit="descripcion" style="font-size:14px;color:${col(d.colorTexto, p, "textoSecundario")};margin:6px 0 0">${esc(d.descripcion)}</p>
        <p style="font-size:22px;font-weight:600;color:${col(d.colorPrecio, p, "principal")};margin:12px 0">${esc(d.precio)}</p>
        <a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:inline-block;font-size:15px;font-weight:500;color:#fff;background:${col(null, p, "cta")};padding:10px 20px;border-radius:6px;text-decoration:none;transition:all .3s ease">${esc(d.ctaTexto)}</a>
      </div></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const ancho = ctx?.ancho || 552;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoPrincipal")}" style="border:1px solid ${col(null, p, "borde")};border-radius:12px">
      <tr><td>${renderImagenEmail(d, { ancho })}</td></tr>
      <tr><td style="padding:${d.padding}px;font-family:${fuente}" align="${d.alin}">
        <div style="font-size:18px;font-weight:600;color:${col(d.colorNombre, p, "textoPrincipal")}">${esc(d.nombre)}</div>
        <div style="font-size:14px;color:${col(d.colorTexto, p, "textoSecundario")};padding-top:6px">${esc(d.descripcion)}</div>
        <div style="font-size:22px;font-weight:600;color:${col(d.colorPrecio, p, "principal")};padding:12px 0">${esc(d.precio)}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr><td bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-size:15px;font-weight:500;color:#fff;text-decoration:none;padding:10px 20px">${esc(d.ctaTexto)}</a></td></tr></table>
      </td></tr></table>`;
  },
};
