// Motor de exportación a email. Recursivo: junta los renderEmail de cada bloque (y de los
// contenedores, como tablas con celdas) en un documento bulletproof de 600px en tablas,
// sin CSS de pantalla. NUNCA reusa gamonal.css ni Tailwind.
import { porId } from "../bloques/_registro.js";
import { anchosColumna, normalizarHijos } from "../bloques/columnas.js";

const ANCHO = 600;

function emailItem(inst, pal, ancho) {
  const b = porId[inst.tipo];
  if (!b) return "";
  if (b.esContenedor) {
    const d = inst.datos;
    const anchos = anchosColumna(d);
    const hijos = normalizarHijos(d);
    const va = d.alinV === "middle" ? "middle" : d.alinV === "bottom" ? "bottom" : "top";
    const celdas = anchos.map((w, i) => {
      const cw = Math.floor((ancho - d.gap * (anchos.length - 1)) * (w / 100));
      const dentro = (hijos[i] || []).map((h) => emailItem(h, pal, cw)).join("") || "&nbsp;";
      const pad = i < anchos.length - 1 ? `padding-right:${d.gap}px` : "";
      return `<td valign="${va}" width="${w}%" style="${pad}">${dentro}</td>`;
    }).join("");
    const bg = d.bg ? ` bgcolor="${d.bg}"` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"${bg}><tr><td style="padding:${d.padding}px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${celdas}</tr></table></td></tr></table>`;
  }
  return b.renderEmail(inst.datos, { ancho, paleta: pal });
}

export function generarEmail(estado) {
  const pal = estado.paleta;
  const filas = estado.piezas
    .map((p) => `<tr><td style="padding:0 24px">${emailItem(p, pal, ANCHO - 48)}</td></tr>`)
    .join("\n");

  return `<!doctype html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Pieza</title>
</head>
<body style="margin:0;padding:0;background:${pal.fondoSecundario};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${pal.fondoSecundario}">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="${ANCHO}" cellpadding="0" cellspacing="0" border="0" style="width:${ANCHO}px;max-width:${ANCHO}px;background:${pal.fondoPrincipal};">
      <tr><td style="height:24px;line-height:24px;font-size:0;">&nbsp;</td></tr>
${filas}
      <tr><td style="height:24px;line-height:24px;font-size:0;">&nbsp;</td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
