// Render del lienzo (pantalla). Pinta cada pieza con su renderPantalla y le añade
// el "chrome" de selección (borde, barra de acciones). No toca el HTML de exportación.
import { porId } from "../bloques/_registro.js";
import { icono } from "./iconos.js";

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

  cont.innerHTML = estado.piezas
    .map((p) => {
      const b = porId[p.tipo];
      const sel = p.id === estado.seleccion;
      const inner = b ? b.renderPantalla(p.datos, { paleta: estado.paleta }) : `<em>Bloque desconocido: ${p.tipo}</em>`;
      return `
        <div class="sbb-bloque${sel ? " sbb-sel" : ""}" data-id="${p.id}">
          <div class="sbb-bloque-barra">
            <span class="sbb-bloque-nombre">${b ? b.nombre : p.tipo}</span>
            <span class="sbb-acciones">
              <button data-acc="up"   title="Subir">${icono("up", 15)}</button>
              <button data-acc="down" title="Bajar">${icono("down", 15)}</button>
              <button data-acc="dup"  title="Duplicar">${icono("copy", 15)}</button>
              <button data-acc="del"  title="Eliminar">${icono("trash", 15)}</button>
            </span>
          </div>
          <div class="sbb-bloque-cuerpo">${inner}</div>
        </div>`;
    })
    .join("");
}
