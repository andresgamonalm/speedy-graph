// Panel de propiedades. Orden fijo de grupos en TODOS los bloques. Solo muestra los
// grupos que el bloque declara. Indica herencia y permite editar overrides.
import { porId } from "../bloques/_registro.js";
import { actualizar } from "../core/estado.js";

export function renderPanel(cont, estado) {
  const sel = estado.piezas.find((p) => p.id === estado.seleccion);
  if (!sel) {
    cont.innerHTML = `<div class="sbb-panel-vacio">Selecciona un bloque para ver sus propiedades.</div>`;
    return;
  }
  const b = porId[sel.tipo];
  const filas = b.campos.map((c) => (c.grupo ? grupo(c.grupo) : control(c, sel))).join("");
  cont.innerHTML = `<div class="sbb-panel-titulo">${b.nombre}</div>${filas}`;
  bind(cont, sel.id);
}

const grupo = (t) => `<div class="sbb-grupo">${t}</div>`;

function control(c, sel) {
  const v = sel.datos[c.k];
  const id = `f_${c.k}`;
  let campo = "";
  switch (c.tipo) {
    case "textarea":
      campo = `<textarea id="${id}" data-k="${c.k}" rows="3">${v ?? ""}</textarea>`;
      break;
    case "select":
      campo = `<select id="${id}" data-k="${c.k}">${c.opciones
        .map((o) => `<option value="${o.v}"${String(v) === String(o.v) ? " selected" : ""}>${o.t}</option>`)
        .join("")}</select>`;
      break;
    case "range":
      campo = `<div class="sbb-range"><input id="${id}" data-k="${c.k}" type="range" min="${c.min}" max="${c.max}" step="${c.paso || 1}" value="${v ?? c.min}"><span class="sbb-range-val">${v ?? c.placeholder || ""}${v != null ? c.suf || "" : ""}</span></div>`;
      break;
    case "color":
      campo = `<input id="${id}" data-k="${c.k}" type="color" value="${v || "#000000"}">`;
      break;
    case "check":
      campo = `<input id="${id}" data-k="${c.k}" type="checkbox"${v ? " checked" : ""}>`;
      break;
    case "alignH":
      campo = `<div class="sbb-seg" data-k="${c.k}">${["left", "center", "right"]
        .map((a) => `<button data-v="${a}"${v === a ? " class='on'" : ""}>${a[0].toUpperCase()}</button>`)
        .join("")}</div>`;
      break;
    default:
      campo = `<input id="${id}" data-k="${c.k}" type="text" value="${v ?? ""}">`;
  }
  return `<label class="sbb-ctrl"><span>${c.label}</span>${campo}</label>`;
}

function bind(cont, idPieza) {
  cont.querySelectorAll("[data-k]").forEach((el) => {
    const k = el.dataset.k;
    if (el.classList.contains("sbb-seg")) {
      el.querySelectorAll("button").forEach((btn) =>
        btn.addEventListener("click", () => actualizar(idPieza, k, btn.dataset.v))
      );
      return;
    }
    const ev = el.type === "range" || el.type === "color" ? "input" : "change";
    el.addEventListener(ev, () => {
      let val = el.type === "checkbox" ? el.checked : el.value;
      if (el.type === "range") val = Number(val);
      if (el.tagName === "SELECT" && val === "") val = null;
      if (el.tagName === "SELECT" && !isNaN(val) && val !== null && val !== "") val = Number(val);
      actualizar(idPieza, k, val);
    });
  });
}
