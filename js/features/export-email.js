// Motor de exportación a email. Junta los renderEmail de cada bloque en un documento
// bulletproof: tablas, ancho 600px, sin CSS de pantalla. NUNCA reusa gamonal.css ni Tailwind.
import { porId } from "../bloques/_registro.js";

const ANCHO = 600;

export function generarEmail(estado) {
  const pal = estado.paleta;
  const filas = estado.piezas
    .map((p) => {
      const b = porId[p.tipo];
      if (!b) return "";
      const html = b.renderEmail(p.datos, { ancho: ANCHO - 48, paleta: pal });
      return `<tr><td style="padding:0 24px">${html}</td></tr>`;
    })
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
