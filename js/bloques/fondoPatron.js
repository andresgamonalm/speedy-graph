// Bloque: Fondo con patrón. LINEAMIENTOS: patrón, color, opacidad, escala. No debe
// afectar legibilidad. Banda decorativa (separador con textura). Email: cae a color sólido
// (los patrones no son fiables en clientes de correo).
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "fondoPatron",
  cat: "Decoración",
  nombre: "Fondo con patrón",
  sub: "Banda con textura",
  icon: "layers",

  defaults: {
    patron: "puntos", escala: 16, alto: 80, texto: "",
    bg: null, colorPatron: null, colorTexto: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "texto", tipo: "text", label: "Texto (opcional)" },
    { grupo: "Layout" },
    { k: "patron", tipo: "select", label: "Patrón", opciones: [{ v: "puntos", t: "Puntos" }, { v: "lineas", t: "Líneas" }, { v: "cuadricula", t: "Cuadrícula" }] },
    { k: "escala", tipo: "range", label: "Escala", min: 8, max: 40, paso: 2, suf: "px" },
    { k: "alto", tipo: "range", label: "Alto", min: 40, max: 240, paso: 8, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorPatron", tipo: "color", label: "Color del patrón", hereda: "borde" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
  ],

  _css(d, patronCol) {
    const e = d.escala;
    if (d.patron === "lineas") return `background-image:repeating-linear-gradient(45deg,${patronCol} 0,${patronCol} 1px,transparent 1px,transparent ${e}px)`;
    if (d.patron === "cuadricula") return `background-image:linear-gradient(${patronCol} 1px,transparent 1px),linear-gradient(90deg,${patronCol} 1px,transparent 1px);background-size:${e}px ${e}px`;
    return `background-image:radial-gradient(${patronCol} 1.5px,transparent 1.5px);background-size:${e}px ${e}px`;
  },

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const txt = d.texto ? `<span style="font-family:${fuente};font-size:14px;font-weight:500;color:${col(d.colorTexto, p, "textoSecundario")}">${esc(d.texto)}</span>` : "";
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};${this._css(d, col(d.colorPatron, p, "borde"))};min-height:${d.alto}px;border-radius:10px;display:flex;align-items:center;justify-content:center;box-sizing:border-box">${txt}</div>`;
  },

  // Email: color sólido (sin patrón). Mantiene legibilidad y compatibilidad.
  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const txt = d.texto ? `<span style="font-family:${fuente};font-size:14px;font-weight:500;color:${col(d.colorTexto, p, "textoSecundario")}">${esc(d.texto)}</span>` : "&nbsp;";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:10px"><tr><td align="center" height="${d.alto}" style="height:${d.alto}px">${txt}</td></tr></table>`;
  },
};
