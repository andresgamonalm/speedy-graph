// Bloque: Imagen + Texto. LINEAMIENTOS: imagen, lado, proporción, gap, título, texto,
// link, alineación. Sistema de imagen único. Hereda paleta.
import { roles, fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";
import { defaultsImagen, renderImagenPantalla, renderImagenEmail, proporciones } from "../core/imagen.js";

export default {
  id: "imgtext",
  cat: "Contenido",
  nombre: "Imagen + Texto",
  sub: "Foto y texto lado a lado",
  icon: "layers",

  defaults: {
    ...defaultsImagen, aspecto: "4:3",
    lado: "izquierda", propImg: 45, gap: 24,
    titulo: "Título de la sección",
    texto: "Un párrafo que explica el beneficio y conecta con la acción.",
    mostrarLink: false, linkTexto: "Ver más", linkUrl: "https://",
    alinVert: "middle",
    colorTitulo: null, colorTexto: null, colorEnlace: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "url", tipo: "imgurl", label: "Imagen" },
    { k: "alt", tipo: "text", label: "Alt" },
    { k: "aspecto", tipo: "select", label: "Proporción", opciones: Object.keys(proporciones).map((v) => ({ v, t: v })) },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "texto", tipo: "textarea", label: "Texto" },
    { k: "mostrarLink", tipo: "check", label: "Mostrar enlace" },
    { k: "linkTexto", tipo: "text", label: "Texto del enlace" },
    { k: "linkUrl", tipo: "text", label: "URL del enlace" },
    { grupo: "Layout" },
    { k: "lado", tipo: "select", label: "Imagen a la", opciones: [{ v: "izquierda", t: "Izquierda" }, { v: "derecha", t: "Derecha" }] },
    { k: "propImg", tipo: "range", label: "Ancho de imagen", min: 30, max: 60, paso: 5, suf: "%" },
    { k: "alinVert", tipo: "select", label: "Alineación vertical", opciones: [{ v: "top", t: "Arriba" }, { v: "middle", t: "Centro" }, { v: "bottom", t: "Abajo" }] },
    { grupo: "Espaciado" },
    { k: "gap", tipo: "range", label: "Separación", min: 8, max: 48, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", hereda: "textoPrincipal" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
    { k: "colorEnlace", tipo: "color", label: "Color del enlace", hereda: "link" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const h2 = roles.h2;
    const img = `<div style="flex:0 0 ${d.propImg}%">${renderImagenPantalla(d)}</div>`;
    const link = d.mostrarLink ? `<p style="margin:12px 0 0"><a href="${url(d.linkUrl)}" style="font-size:14px;font-weight:500;color:${col(d.colorEnlace, p, "link")};text-decoration:none">${esc(d.linkTexto)} →</a></p>` : "";
    const txt = `<div style="flex:1;align-self:${d.alinVert === "top" ? "flex-start" : d.alinVert === "bottom" ? "flex-end" : "center"}">
      <h2 data-edit="titulo" style="font-family:${fuente};font-size:${h2.size}px;font-weight:${h2.weight};line-height:${h2.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0 0 8px">${esc(d.titulo)}</h2>
      <p data-edit="texto" style="font-family:${fuente};font-size:16px;line-height:1.55;color:${col(d.colorTexto, p, "textoSecundario")};margin:0">${esc(d.texto)}</p>${link}</div>`;
    const orden = d.lado === "derecha" ? txt + img : img + txt;
    return `<div style="display:flex;gap:${d.gap}px;align-items:stretch">${orden}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const h2 = roles.h2;
    const ancho = ctx?.ancho || 552;
    const imgW = Math.round(ancho * (d.propImg / 100)) - d.gap;
    const va = d.alinVert;
    const link = d.mostrarLink ? `<div style="padding-top:12px"><a href="${url(d.linkUrl)}" target="_blank" style="font-size:14px;font-weight:500;color:${col(d.colorEnlace, p, "link")};text-decoration:none">${esc(d.linkTexto)} &rarr;</a></div>` : "";
    const tdImg = `<td valign="${va}" width="${d.propImg}%" style="padding:0 ${d.gap / 2}px 0 0">${renderImagenEmail(d, { ancho: imgW })}</td>`;
    const tdTxt = `<td valign="${va}" style="padding:0 0 0 ${d.gap / 2}px;font-family:${fuente}">
      <div style="font-size:${h2.size}px;font-weight:${h2.weight};line-height:${h2.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};padding-bottom:8px">${esc(d.titulo)}</div>
      <div style="font-size:16px;line-height:1.55;color:${col(d.colorTexto, p, "textoSecundario")}">${esc(d.texto)}</div>${link}</td>`;
    const orden = d.lado === "derecha" ? tdTxt + tdImg : tdImg + tdTxt;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${orden}</tr></table>`;
  },
};
