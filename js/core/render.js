// Render del lienzo (pantalla). Recursivo: pinta bloques hoja con su chrome de selección
// y los contenedores (columnas) con sus columnas como zonas para soltar hijos.
import { porId } from "../bloques/_registro.js";
import { icono } from "./iconos.js";
import { anchosColumna, normalizarHijos } from "../bloques/columnas.js";

export function renderLienzo(cont, estado) {
  if (!estado.piezas.length) {
    cont.innerHTML = `
      <div class="sbb-vacio">
        ${icono("layers", 40)}
        <p>Lienzo vacío</p>
        <span>Elige un bloque del panel izquierdo para empezar.</span>
      </div>`;
    return;
  }
  cont.innerHTML = estado.piezas.map((p) => renderItem(p, estado)).join("");
}

function barra(b, p) {
  return `<div class="sbb-bloque-barra">
    <span class="sbb-bloque-nombre">${b ? b.nombre : p.tipo}</span>
    <span class="sbb-acciones">
      <button data-acc="up"   title="Subir">${icono("up", 15)}</button>
      <button data-acc="down" title="Bajar">${icono("down", 15)}</button>
      <button data-acc="dup"  title="Duplicar">${icono("copy", 15)}</button>
      <button data-acc="del"  title="Eliminar">${icono("trash", 15)}</button>
    </span></div>`;
}

function renderItem(p, estado) {
  const b = porId[p.tipo];
  const sel = p.id === estado.seleccion;
  const cls = `sbb-bloque${sel ? " sbb-sel" : ""}${b?.esContenedor ? " sbb-cont" : ""}`;

  if (b?.esContenedor) {
    const d = p.datos;
    const anchos = anchosColumna(d);
    const hijos = normalizarHijos(d);
    const cols = anchos.map((w, i) => {
      const dentro = (hijos[i] || []).map((h) => renderItem(h, estado)).join("") ||
        `<div class="sbb-drop-vacio">Suelta bloques aquí</div>`;
      return `<div class="sbb-col" data-cont="${p.id}" data-col="${i}" style="flex:0 0 calc(${w}% - ${(d.gap * (anchos.length - 1)) / anchos.length}px)">${dentro}</div>`;
    }).join("");
    return `<div class="${cls}" data-id="${p.id}">${barra(b, p)}
      <div class="sbb-bloque-cuerpo" style="background:${d.bg || "transparent"};padding:${d.padding}px;border-radius:8px">
        <div class="sbb-cols" style="display:flex;gap:${d.gap}px;align-items:${d.alinV === "middle" ? "center" : d.alinV === "bottom" ? "flex-end" : "flex-start"}">${cols}</div>
      </div></div>`;
  }

  const inner = b ? b.renderPantalla(p.datos, { paleta: estado.paleta }) : `<em>Bloque desconocido: ${p.tipo}</em>`;
  return `<div class="${cls}" data-id="${p.id}">${barra(b, p)}<div class="sbb-bloque-cuerpo">${inner}</div></div>`;
}
