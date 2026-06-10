// Bloque: Mapa. LINEAMIENTOS: dirección, embed o imagen, alto, zoom, link externo,
// fallback. P0: el email no ejecuta iframes → pantalla puede usar embed; email cae a una
// tarjeta de dirección con botón "Ver en mapa". (Imagen estática opcional para el correo.)
import { fuente } from "../core/tokens.js";
import { esc, url, attr, col } from "../core/utils.js";

export default {
  id: "mapa",
  cat: "Multimedia",
  nombre: "Mapa",
  sub: "Ubicación con enlace",
  icon: "layers",

  defaults: {
    direccion: "Av. Apoquindo 4500, Santiago",
    alto: 240, zoom: 15,
    imagenUrl: "", mapUrl: "https://maps.google.com/?q=",
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "direccion", tipo: "text", label: "Dirección" },
    { k: "imagenUrl", tipo: "imgurl", label: "Imagen estática (para email)" },
    { k: "mapUrl", tipo: "text", label: "URL externa del mapa" },
    { grupo: "Layout" },
    { k: "alto", tipo: "range", label: "Alto", min: 160, max: 400, paso: 20, suf: "px" },
    { k: "zoom", tipo: "range", label: "Zoom", min: 8, max: 19 },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo (fallback)", hereda: "fondoSecundario" },
    { k: "color", tipo: "color", label: "Color del texto", hereda: "textoPrincipal" },
  ],

  // Pantalla: embed real de Google Maps (válido en navegador).
  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const src = `https://maps.google.com/maps?q=${encodeURIComponent(d.direccion)}&z=${d.zoom}&output=embed`;
    return `<div style="font-family:${fuente}">
      <iframe src="${attr(src)}" width="100%" height="${d.alto}" style="border:0;border-radius:12px;display:block" loading="lazy" title="Mapa"></iframe>
      <p style="font-size:13px;color:${col(d.color, p, "textoPrincipal")};margin:8px 0 0">${esc(d.direccion)}</p></div>`;
  },

  // Email: sin iframe. Imagen estática si hay; si no, tarjeta de dirección + botón.
  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const linkBtn = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.mapUrl)}" target="_blank" style="display:inline-block;font-size:14px;font-weight:500;color:#fff;text-decoration:none;padding:10px 20px">Ver en el mapa</a></td></tr></table>`;
    if (d.imagenUrl) {
      const ancho = ctx?.ancho || 552;
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="font-family:${fuente}">
        <a href="${url(d.mapUrl)}" target="_blank"><img src="${esc(d.imagenUrl)}" width="${ancho}" alt="Mapa: ${esc(d.direccion)}" style="display:block;width:100%;max-width:${ancho}px;height:auto;border:0;border-radius:12px"></a>
        <div style="font-size:13px;color:${col(d.color, p, "textoPrincipal")};padding:8px 0 12px">${esc(d.direccion)}</div>${linkBtn}</td></tr></table>`;
    }
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:12px"><tr><td align="center" style="padding:28px 24px;font-family:${fuente}">
      <div style="font-size:16px;font-weight:600;color:${col(d.color, p, "textoPrincipal")};padding-bottom:12px">${esc(d.direccion)}</div>${linkBtn}</td></tr></table>`;
  },
};
