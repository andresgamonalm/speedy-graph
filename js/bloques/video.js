// Bloque: Video embed. LINEAMIENTOS: URL, thumbnail, aspect ratio, play, fallback +
// compatibilidad email como imagen + link. P0: el email no ejecuta iframes → thumbnail
// con botón de play que enlaza al video.
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";
import { proporciones, renderImagenPantalla, renderImagenEmail } from "../core/imagen.js";

export default {
  id: "video",
  cat: "Multimedia",
  nombre: "Video",
  sub: "Thumbnail con play",
  icon: "eye",

  defaults: {
    videoUrl: "https://", thumbUrl: "", aspecto: "16:9", fit: "cover",
    zoom: 100, focoX: 50, focoY: 50, radio: 12,
    titulo: "Mira el video",
    color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "videoUrl", tipo: "text", label: "URL del video" },
    { k: "thumbUrl", tipo: "imgurl", label: "Thumbnail" },
    { k: "titulo", tipo: "text", label: "Título / pie" },
    { k: "aspecto", tipo: "select", label: "Proporción", opciones: Object.keys(proporciones).map((v) => ({ v, t: v })) },
    { grupo: "Bordes" },
    { k: "radio", tipo: "range", label: "Radio", min: 0, max: 24, paso: 2, suf: "px" },
    { grupo: "Color" },
    { k: "color", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const img = renderImagenPantalla({ ...d, url: d.thumbUrl });
    return `<a href="${url(d.videoUrl)}" style="display:block;text-decoration:none;font-family:${fuente}">
      <div style="position:relative">${img}
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
          <span style="width:64px;height:64px;border-radius:50%;background:rgba(4,7,100,.75);display:flex;align-items:center;justify-content:center">
            <span style="border-left:18px solid #fff;border-top:11px solid transparent;border-bottom:11px solid transparent;margin-left:4px"></span></span></div></div>
      <p style="font-size:14px;color:${col(d.color, p, "textoSecundario")};margin:8px 0 0;text-align:center">${esc(d.titulo)} →</p></a>`;
  },

  // Email: imagen (thumbnail) enlazada + CTA de texto. Sin iframe, sin overlay absoluto.
  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const ancho = ctx?.ancho || 552;
    const img = renderImagenEmail({ ...d, url: d.thumbUrl }, { ancho });
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="font-family:${fuente}">
      <a href="${url(d.videoUrl)}" target="_blank" style="text-decoration:none">${img}</a>
      <div style="padding-top:8px"><a href="${url(d.videoUrl)}" target="_blank" style="font-size:14px;font-weight:500;color:${col(null, p, "link")};text-decoration:none">▶ ${esc(d.titulo)}</a></div>
    </td></tr></table>`;
  },
};
