// Bloque: Anillo de progreso. LINEAMIENTOS: valor, máximo, %, color, grosor, label.
// P0 email: SVG NO renderiza en Outlook → pantalla usa conic-gradient (CSS, no SVG) y
// email cae a una barra de progreso hecha con tablas (bulletproof).
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

const pct = (d) => Math.max(0, Math.min(100, Math.round((d.valor / d.maximo) * 100)));

export default {
  id: "ring",
  cat: "Datos",
  nombre: "Anillo de progreso",
  sub: "Avance en porcentaje",
  icon: "layers",

  defaults: {
    valor: 72, maximo: 100, label: "Meta del trimestre",
    grosor: 12, alin: "center",
    color: null, colorPista: null, colorTexto: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "valor", tipo: "range", label: "Valor", min: 0, max: 100 },
    { k: "maximo", tipo: "range", label: "Máximo", min: 1, max: 100 },
    { k: "label", tipo: "text", label: "Label" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { k: "grosor", tipo: "range", label: "Grosor", min: 6, max: 24, suf: "px" },
    { grupo: "Color" },
    { k: "color", tipo: "color", label: "Color del avance", hereda: "acento" },
    { k: "colorPista", tipo: "color", label: "Color de la pista", hereda: "borde" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoPrincipal" },
  ],

  // Pantalla: anillo con conic-gradient (sin SVG).
  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const v = pct(d);
    const fg = col(d.color, p, "acento"), pista = col(d.colorPista, p, "borde"), txt = col(d.colorTexto, p, "textoPrincipal");
    return `<div style="text-align:${d.alin};font-family:${fuente}">
      <div style="display:inline-block;width:120px;height:120px;border-radius:50%;background:conic-gradient(${fg} ${v * 3.6}deg, ${pista} 0deg);position:relative">
        <div style="position:absolute;inset:${d.grosor}px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:600;color:${txt}">${v}%</div>
      </div>
      <p style="font-size:14px;font-weight:500;color:${txt};margin:10px 0 0">${esc(d.label)}</p></div>`;
  },

  // Email: barra de progreso con tablas (sin SVG, sin conic-gradient).
  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const v = pct(d);
    const fg = col(d.color, p, "acento"), pista = col(d.colorPista, p, "borde"), txt = col(d.colorTexto, p, "textoPrincipal");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${d.alin}" style="font-family:${fuente}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:360px">
        <tr><td style="font-size:26px;font-weight:600;color:${txt};padding-bottom:8px">${v}%</td></tr>
        <tr><td bgcolor="${pista}" style="border-radius:8px;font-size:0;line-height:0">
          <table role="presentation" width="${v}%" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${fg}" height="14" style="border-radius:8px;font-size:0;line-height:0">&nbsp;</td></tr></table>
        </td></tr>
        <tr><td style="font-size:14px;font-weight:500;color:${txt};padding-top:10px">${esc(d.label)}</td></tr>
      </table></td></tr></table>`;
  },
};
