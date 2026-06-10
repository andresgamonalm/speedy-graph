// Bloque: Testimonio. LINEAMIENTOS: cita, nombre, cargo, imagen opcional, rating,
// card. Hereda paleta. Foto por el sistema de imagen (cuadrada).
import { roles, fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";
import { renderImagenPantalla, renderImagenEmail } from "../core/imagen.js";

const estrellas = (n) => "★★★★★☆☆☆☆☆".slice(5 - n, 10 - n);

export default {
  id: "testimonial",
  cat: "Cards",
  nombre: "Testimonio",
  sub: "Cita con autor",
  icon: "type",

  defaults: {
    cita: "Pasamos de la idea a campañas publicadas en horas, no semanas.",
    avatarUrl: "", aspecto: "1:1", fit: "cover", zoom: 100, focoX: 50, focoY: 50, radio: 999,
    autor: "Nombre Apellido", cargo: "Head of Growth",
    mostrarRating: true, rating: 5,
    alin: "left", padding: 24,
    bg: null, colorCita: null, colorAutor: null, colorAcento: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "cita", tipo: "textarea", label: "Cita" },
    { k: "avatarUrl", tipo: "imgurl", label: "Foto del autor" },
    { k: "autor", tipo: "text", label: "Autor" },
    { k: "cargo", tipo: "text", label: "Cargo" },
    { k: "mostrarRating", tipo: "check", label: "Mostrar rating" },
    { k: "rating", tipo: "range", label: "Estrellas", min: 1, max: 5 },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padding", tipo: "range", label: "Padding interno", min: 0, max: 40, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorCita", tipo: "color", label: "Color de la cita", hereda: "textoPrincipal" },
    { k: "colorAutor", tipo: "color", label: "Color del autor", hereda: "textoSecundario" },
    { k: "colorAcento", tipo: "color", label: "Color del rating", hereda: "acento" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const cita = roles.cita;
    const rating = d.mostrarRating ? `<div style="font-size:16px;color:${col(d.colorAcento, p, "acento")};margin:0 0 10px">${estrellas(d.rating)}</div>` : "";
    const avatar = d.avatarUrl ? `<div style="width:48px;height:48px;flex:none">${renderImagenPantalla({ ...d, url: d.avatarUrl, aspecto: "1:1" }, { alto: 48 })}</div>` : "";
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};padding:${d.padding}px;border-radius:12px;font-family:${fuente};text-align:${d.alin}">
      ${rating}
      <p data-edit="cita" style="font-size:${cita.size}px;font-style:italic;line-height:${cita.lh};color:${col(d.colorCita, p, "textoPrincipal")};margin:0 0 16px">“${esc(d.cita)}”</p>
      <div style="display:flex;align-items:center;gap:12px;justify-content:${d.alin === "center" ? "center" : d.alin === "right" ? "flex-end" : "flex-start"}">
        ${avatar}
        <div><p data-edit="autor" style="font-size:15px;font-weight:600;color:${col(d.colorCita, p, "textoPrincipal")};margin:0">${esc(d.autor)}</p>
        <p data-edit="cargo" style="font-size:13px;color:${col(d.colorAutor, p, "textoSecundario")};margin:0">${esc(d.cargo)}</p></div>
      </div></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const cita = roles.cita;
    const rating = d.mostrarRating ? `<div style="font-size:16px;color:${col(d.colorAcento, p, "acento")};padding-bottom:10px">${estrellas(d.rating)}</div>` : "";
    const avatar = d.avatarUrl ? `<td valign="middle" width="60" style="padding-right:12px">${renderImagenEmail({ ...d, url: d.avatarUrl, radio: 999 }, { ancho: 48 })}</td>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:12px"><tr><td style="padding:${d.padding}px;font-family:${fuente}" align="${d.alin}">
      ${rating}
      <div style="font-size:${cita.size}px;font-style:italic;line-height:${cita.lh};color:${col(d.colorCita, p, "textoPrincipal")};padding-bottom:16px">“${esc(d.cita)}”</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr>${avatar}<td valign="middle">
        <div style="font-size:15px;font-weight:600;color:${col(d.colorCita, p, "textoPrincipal")}">${esc(d.autor)}</div>
        <div style="font-size:13px;color:${col(d.colorAutor, p, "textoSecundario")}">${esc(d.cargo)}</div>
      </td></tr></table></td></tr></table>`;
  },
};
