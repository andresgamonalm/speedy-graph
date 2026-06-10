// Bloque: Tabla de datos. LINEAMIENTOS: encabezados, filas, columnas, padding de celdas,
// bordes, alineación. Pantalla y email usan <table> nativa (compatible email).
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "tabla",
  cat: "Datos",
  nombre: "Tabla de datos",
  sub: "Filas y columnas",
  icon: "layers",

  defaults: {
    filas: "Plan | Precio | Leads\nBásico | $29 | 500\nPro | $79 | 2.000\nFull | $149 | Ilimitado",
    primeraFilaHeader: true, bordes: true,
    bgHeader: null, colorHeader: null, color: null, colorBorde: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "filas", tipo: "textarea", label: "Filas (celdas con |, una fila por línea)" },
    { grupo: "Layout" },
    { k: "primeraFilaHeader", tipo: "check", label: "Primera fila = encabezado" },
    { grupo: "Bordes" },
    { k: "bordes", tipo: "check", label: "Mostrar bordes" },
    { grupo: "Color" },
    { k: "bgHeader", tipo: "color", label: "Fondo de encabezado", hereda: "principal" },
    { k: "colorHeader", tipo: "color", label: "Texto de encabezado", heredaFijo: "#FFFFFF" },
    { k: "color", tipo: "color", label: "Texto", hereda: "textoPrincipal" },
    { k: "colorBorde", tipo: "color", label: "Borde", hereda: "borde" },
  ],

  _filas(s) {
    return String(s).split("\n").map((l) => l.split("|").map((c) => c.trim())).filter((f) => f.length && f.some((c) => c));
  },

  _render(d, ctx) {
    const p = ctx?.paleta;
    const bord = d.bordes ? `1px solid ${col(d.colorBorde, p, "borde")}` : "none";
    const filas = this._filas(d.filas);
    const cuerpo = filas.map((f, i) => {
      const head = d.primeraFilaHeader && i === 0;
      const celdas = f.map((c) => {
        const css = `padding:10px 14px;border:${bord};text-align:left;font-family:${fuente};font-size:14px;` +
          (head ? `background:${col(d.bgHeader, p, "principal")};color:${d.colorHeader || "#FFFFFF"};font-weight:600` : `color:${col(d.color, p, "textoPrincipal")}`);
        const tag = head ? "th" : "td";
        return `<${tag} style="${css}">${esc(c)}</${tag}>`;
      }).join("");
      return `<tr>${celdas}</tr>`;
    }).join("");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%">${cuerpo}</table>`;
  },

  renderPantalla(d, ctx) { return this._render(d, ctx); },
  renderEmail(d, ctx) { return this._render(d, ctx); },
};
