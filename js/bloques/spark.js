// Bloque: Gráfico simple (barras). LINEAMIENTOS: tipo, datos, labels, colores de paleta,
// título, conclusión + fallback email. Toda gráfica comunica una conclusión.
// P0 email: sin SVG → barras hechas con celdas de tabla (bulletproof).
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "spark",
  cat: "Datos",
  nombre: "Gráfico de barras",
  sub: "Datos con conclusión",
  icon: "layers",

  defaults: {
    titulo: "Conversiones por semana",
    datos: "S1:40, S2:55, S3:48, S4:72",
    conclusion: "Cuarta semana, el mejor cierre del mes.",
    alturaMax: 120, alin: "left",
    color: null, colorTexto: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "datos", tipo: "textarea", label: "Datos (label:valor, …)" },
    { k: "conclusion", tipo: "text", label: "Conclusión" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { k: "alturaMax", tipo: "range", label: "Altura máxima", min: 60, max: 200, paso: 10, suf: "px" },
    { grupo: "Color" },
    { k: "color", tipo: "color", label: "Color de barras", hereda: "acento" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
  ],

  _parse(s) {
    return String(s).split(",").map((par) => {
      const [l, v] = par.split(":");
      return { l: (l || "").trim(), v: Number(v) || 0 };
    }).filter((x) => x.l);
  },

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const datos = this._parse(d.datos);
    const max = Math.max(1, ...datos.map((x) => x.v));
    const fg = col(d.color, p, "acento"), txt = col(d.colorTexto, p, "textoSecundario");
    const barras = datos.map((x) => `<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px">
      <div style="width:70%;height:${Math.round((x.v / max) * d.alturaMax)}px;background:${fg};border-radius:6px 6px 0 0"></div>
      <span style="font-size:12px;color:${txt}">${esc(x.l)}</span></div>`).join("");
    return `<div style="text-align:${d.alin};font-family:${fuente}">
      <p style="font-size:16px;font-weight:600;color:${col(null, p, "textoPrincipal")};margin:0 0 12px">${esc(d.titulo)}</p>
      <div style="display:flex;align-items:flex-end;gap:8px;height:${d.alturaMax + 24}px">${barras}</div>
      ${d.conclusion ? `<p style="font-size:13px;color:${txt};margin:10px 0 0">${esc(d.conclusion)}</p>` : ""}</div>`;
  },

  // Email: barras verticales con celdas de tabla (altura por atributo height).
  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const datos = this._parse(d.datos);
    const max = Math.max(1, ...datos.map((x) => x.v));
    const fg = col(d.color, p, "acento"), txt = col(d.colorTexto, p, "textoSecundario");
    const celdas = datos.map((x) => {
      const h = Math.round((x.v / max) * d.alturaMax);
      return `<td valign="bottom" align="center" style="padding:0 4px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="${fg}" width="24" height="${h}" style="border-radius:6px 6px 0 0;font-size:0;line-height:0">&nbsp;</td></tr></table>
        <div style="font-size:12px;color:${txt};padding-top:6px;font-family:${fuente}">${esc(x.l)}</div></td>`;
    }).join("");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${d.alin}" style="font-family:${fuente}">
      <div style="font-size:16px;font-weight:600;color:${col(null, p, "textoPrincipal")};padding-bottom:12px">${esc(d.titulo)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${celdas}</tr></table>
      ${d.conclusion ? `<div style="font-size:13px;color:${txt};padding-top:10px">${esc(d.conclusion)}</div>` : ""}
    </td></tr></table>`;
  },
};
