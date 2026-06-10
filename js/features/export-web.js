// Exportación web (formato libre / landing / banner). Usa renderPantalla (flex/grid OK en
// navegador) y limpia los atributos del editor. NO es para email (eso es export-email).
import { porId } from "../bloques/_registro.js";
import { anchosColumna, normalizarHijos } from "../bloques/columnas.js";
import { fuente } from "../core/tokens.js";

function webItem(inst, pal) {
  const b = porId[inst.tipo];
  if (!b) return "";
  if (b.esContenedor) {
    const d = inst.datos;
    const anchos = anchosColumna(d);
    const hijos = normalizarHijos(d);
    const cols = anchos.map((w, i) =>
      `<div style="flex:0 0 calc(${w}% - ${(d.gap * (anchos.length - 1)) / anchos.length}px)">${(hijos[i] || []).map((h) => webItem(h, pal)).join("")}</div>`
    ).join("");
    return `<div style="background:${d.bg || "transparent"};padding:${d.padding}px;border-radius:8px"><div style="display:flex;gap:${d.gap}px;align-items:${d.alinV === "middle" ? "center" : d.alinV === "bottom" ? "flex-end" : "flex-start"};flex-wrap:wrap">${cols}</div></div>`;
  }
  return `<div style="margin-bottom:16px">${b.renderPantalla(inst.datos, { paleta: pal })}</div>`;
}

// Limpia atributos y clases del editor que no deben salir al export.
const limpiar = (html) =>
  html
    .replace(/\s+data-edit(-img|-link)?="[^"]*"/g, "")
    .replace(/\s+data-reloj="[^"]*"/g, "")
    .replace(/\s+class="sbb-[^"]*"/g, "")
    .replace(/\s+contenteditable="[^"]*"/g, "");

export function generarWeb(estado) {
  const pal = estado.paleta;
  const cuerpo = estado.piezas.map((p) => webItem(p, pal)).join("\n");
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<title>Pieza</title>
<style>*{box-sizing:border-box}body{margin:0;background:${pal.fondoSecundario};font-family:${fuente}}.pieza{max-width:720px;margin:0 auto;padding:32px 20px;background:${pal.fondoPrincipal}}</style>
</head>
<body><div class="pieza">
${limpiar(cuerpo)}
</div></body>
</html>`;
}
