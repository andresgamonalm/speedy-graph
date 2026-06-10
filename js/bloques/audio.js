// Bloque: Audio / Podcast. LINEAMIENTOS: cover, título, descripción, duración, link,
// fallback. Email: cover + datos + link (sin player). Sistema de imagen para el cover.
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";
import { renderImagenPantalla, renderImagenEmail } from "../core/imagen.js";

export default {
  id: "audio",
  cat: "Multimedia",
  nombre: "Audio / Podcast",
  sub: "Episodio con portada",
  icon: "eye",

  defaults: {
    coverUrl: "", aspecto: "1:1", fit: "cover", zoom: 100, focoX: 50, focoY: 50, radio: 10,
    titulo: "Episodio 12 — Performance real",
    artista: "Podcast Gamonal", duracion: "28 min",
    audioUrl: "https://",
    bg: null, colorTitulo: null, colorTexto: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "coverUrl", tipo: "imgurl", label: "Portada" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "artista", tipo: "text", label: "Autor / programa" },
    { k: "duracion", tipo: "text", label: "Duración" },
    { k: "audioUrl", tipo: "text", label: "URL del audio" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", hereda: "textoPrincipal" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const cover = d.coverUrl ? `<div style="flex:none;width:80px">${renderImagenPantalla({ ...d, url: d.coverUrl, aspecto: "1:1" }, { alto: 80 })}</div>` : "";
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};border-radius:12px;padding:16px;display:flex;gap:14px;align-items:center;font-family:${fuente}">
      ${cover}
      <div style="flex:1">
        <p data-edit="titulo" style="font-size:16px;font-weight:600;color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0">${esc(d.titulo)}</p>
        <p style="font-size:13px;color:${col(d.colorTexto, p, "textoSecundario")};margin:4px 0 0">${esc(d.artista)} · ${esc(d.duracion)}</p>
        <a href="${url(d.audioUrl)}" style="display:inline-block;font-size:13px;font-weight:500;color:${col(null, p, "link")};text-decoration:none;margin-top:8px">▶ Escuchar</a>
      </div></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const cover = d.coverUrl ? `<td valign="middle" width="80" style="padding-right:14px">${renderImagenEmail({ ...d, url: d.coverUrl }, { ancho: 80 })}</td>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:12px"><tr><td style="padding:16px;font-family:${fuente}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      ${cover}
      <td valign="middle">
        <div style="font-size:16px;font-weight:600;color:${col(d.colorTitulo, p, "textoPrincipal")}">${esc(d.titulo)}</div>
        <div style="font-size:13px;color:${col(d.colorTexto, p, "textoSecundario")};padding-top:4px">${esc(d.artista)} &middot; ${esc(d.duracion)}</div>
        <a href="${url(d.audioUrl)}" target="_blank" style="display:inline-block;font-size:13px;font-weight:500;color:${col(null, p, "link")};text-decoration:none;padding-top:8px">&#9654; Escuchar</a>
      </td></tr></table></td></tr></table>`;
  },
};
