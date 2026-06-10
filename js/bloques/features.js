// Bloque: Lista de features. LINEAMIENTOS: título, items, disposición, por fila,
// orientación, íconos. Hereda roles y paleta. Ítems con edición directa y lista en panel.
import { roles, fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "features",
  cat: "Contenido",
  nombre: "Lista de features",
  sub: "Beneficios con ícono",
  icon: "layers",

  defaults: {
    titulo: "Por qué funciona",
    disposicion: "columna",   // columna | fila
    porFila: 2,
    items: [
      { titulo: "Listo para ejecutar", texto: "De estrategia a pieza publicable." },
      { titulo: "Sin tiempo perdido", texto: "Menos operación, más conversión." },
    ],
    alin: "left", gap: 16,
    colorTitulo: null, colorItem: null, colorTexto: null, colorMarca: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "titulo", tipo: "text", label: "Título de la sección" },
    {
      k: "items", tipo: "lista", label: "Feature",
      nuevo: { titulo: "Nuevo beneficio", texto: "Descripción breve." },
      sub: [
        { k: "titulo", tipo: "text", label: "Título" },
        { k: "texto", tipo: "text", label: "Texto" },
      ],
    },
    { grupo: "Layout" },
    { k: "disposicion", tipo: "select", label: "Disposición", opciones: [{ v: "columna", t: "Una columna" }, { v: "fila", t: "En fila" }] },
    { k: "porFila", tipo: "range", label: "Por fila", min: 2, max: 4 },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "gap", tipo: "range", label: "Separación", min: 8, max: 40, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "colorTitulo", tipo: "color", label: "Color de título", hereda: "textoPrincipal" },
    { k: "colorItem", tipo: "color", label: "Color de ítem", hereda: "textoPrincipal" },
    { k: "colorTexto", tipo: "color", label: "Color de texto", hereda: "textoSecundario" },
    { k: "colorMarca", tipo: "color", label: "Color del marcador", hereda: "acento" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const h2 = roles.h2;
    const fila = d.disposicion === "fila";
    const items = d.items
      .map(
        (it, i) => `<div style="display:flex;gap:10px;align-items:flex-start;text-align:left">
        <span style="flex:none;width:8px;height:8px;border-radius:50%;background:${col(d.colorMarca, p, "acento")};margin-top:7px"></span>
        <div><p data-edit="items.${i}.titulo" style="font-family:${fuente};font-size:16px;font-weight:600;color:${col(d.colorItem, p, "textoPrincipal")};margin:0">${esc(it.titulo)}</p>
        <p data-edit="items.${i}.texto" style="font-family:${fuente};font-size:14px;color:${col(d.colorTexto, p, "textoSecundario")};margin:2px 0 0">${esc(it.texto)}</p></div></div>`
      )
      .join("");
    const cont = fila
      ? `display:grid;grid-template-columns:repeat(${d.porFila},1fr);gap:${d.gap}px`
      : `display:flex;flex-direction:column;gap:${d.gap}px`;
    return `<div style="text-align:${d.alin}">
      <h2 data-edit="titulo" style="font-family:${fuente};font-size:${h2.size}px;font-weight:${h2.weight};line-height:${h2.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0 0 16px">${esc(d.titulo)}</h2>
      <div style="${cont}">${items}</div></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const h2 = roles.h2;
    const cols = d.disposicion === "fila" ? d.porFila : 1;
    const celda = (it, i) => `<td valign="top" width="${Math.floor(100 / cols)}%" style="padding:0 8px ${d.gap}px 0;font-family:${fuente}">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="top" width="16" style="padding-top:6px"><div style="width:8px;height:8px;border-radius:50%;background:${col(d.colorMarca, p, "acento")};font-size:0">&nbsp;</div></td>
        <td valign="top" style="padding-left:8px">
          <div style="font-size:16px;font-weight:600;color:${col(d.colorItem, p, "textoPrincipal")}">${esc(it.titulo)}</div>
          <div style="font-size:14px;color:${col(d.colorTexto, p, "textoSecundario")};padding-top:2px">${esc(it.texto)}</div>
        </td></tr></table></td>`;
    // Agrupar en filas de `cols`.
    let filas = "";
    for (let i = 0; i < d.items.length; i += cols) {
      filas += `<tr>${d.items.slice(i, i + cols).map((it, j) => celda(it, i + j)).join("")}</tr>`;
    }
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="${d.alin}" style="font-family:${fuente};font-size:${h2.size}px;font-weight:${h2.weight};line-height:${h2.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};padding:0 0 16px">${esc(d.titulo)}</td></tr>
      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${filas}</table></td></tr></table>`;
  },
};
