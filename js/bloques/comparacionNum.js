// Bloque: Comparación numérica. LINEAMIENTOS: métrica A, B, diferencia, variación,
// color según resultado, contexto. Hereda paleta. Stack en mobile (pantalla).
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "comparacionNum",
  cat: "Datos",
  nombre: "Comparación numérica",
  sub: "A vs. B con variación",
  icon: "layers",

  defaults: {
    labelA: "Antes", valorA: "2,1%",
    labelB: "Después", valorB: "4,8%",
    variacion: "+128%", positivo: true,
    conclusion: "Más del doble de conversión tras optimizar el flujo.",
    bg: null, colorValor: null, colorLabel: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "labelA", tipo: "text", label: "Label A" },
    { k: "valorA", tipo: "text", label: "Valor A" },
    { k: "labelB", tipo: "text", label: "Label B" },
    { k: "valorB", tipo: "text", label: "Valor B" },
    { k: "variacion", tipo: "text", label: "Variación" },
    { k: "positivo", tipo: "check", label: "Variación positiva" },
    { k: "conclusion", tipo: "text", label: "Conclusión" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorValor", tipo: "color", label: "Color de valores", hereda: "principal" },
    { k: "colorLabel", tipo: "color", label: "Color de labels", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const vc = d.positivo ? col(null, p, "success") : col(null, p, "error");
    const lado = (lab, val) => `<div style="flex:1;text-align:center">
      <div style="font-size:13px;color:${col(d.colorLabel, p, "textoSecundario")}">${esc(lab)}</div>
      <div style="font-size:30px;font-weight:600;color:${col(d.colorValor, p, "principal")};margin-top:4px">${esc(val)}</div></div>`;
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};padding:24px;border-radius:12px;font-family:${fuente}">
      <div style="display:flex;align-items:center;gap:12px">
        ${lado(d.labelA, d.valorA)}
        <div style="font-size:14px;font-weight:600;color:${vc};white-space:nowrap">${esc(d.variacion)}</div>
        ${lado(d.labelB, d.valorB)}
      </div>
      ${d.conclusion ? `<p style="font-size:13px;color:${col(d.colorLabel, p, "textoSecundario")};text-align:center;margin:12px 0 0">${esc(d.conclusion)}</p>` : ""}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const vc = d.positivo ? col(null, p, "success") : col(null, p, "error");
    const lado = (lab, val) => `<td align="center" valign="middle" width="40%" style="font-family:${fuente}">
      <div style="font-size:13px;color:${col(d.colorLabel, p, "textoSecundario")}">${esc(lab)}</div>
      <div style="font-size:30px;font-weight:600;color:${col(d.colorValor, p, "principal")};padding-top:4px">${esc(val)}</div></td>`;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:12px"><tr><td style="padding:24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        ${lado(d.labelA, d.valorA)}
        <td align="center" valign="middle" width="20%" style="font-family:${fuente};font-size:14px;font-weight:600;color:${vc}">${esc(d.variacion)}</td>
        ${lado(d.labelB, d.valorB)}
      </tr></table>
      ${d.conclusion ? `<div style="font-family:${fuente};font-size:13px;color:${col(d.colorLabel, p, "textoSecundario")};text-align:center;padding-top:12px">${esc(d.conclusion)}</div>` : ""}
    </td></tr></table>`;
  },
};
