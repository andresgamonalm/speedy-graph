// Panel de propiedades. Orden fijo de grupos en TODOS los bloques. Solo muestra los
// grupos que el bloque declara. Indica herencia y permite editar overrides.
import { porId } from "../bloques/_registro.js";
import { actualizar } from "../core/estado.js";
import { icono } from "../core/iconos.js";

export function renderPanel(cont, estado) {
  const sel = estado.piezas.find((p) => p.id === estado.seleccion);
  if (!sel) {
    cont.innerHTML = `<div class="sbb-panel-vacio">Selecciona un bloque para ver sus propiedades.</div>`;
    return;
  }
  const b = porId[sel.tipo];
  const filas = b.campos.map((c) => (c.grupo ? grupo(c.grupo) : control(c, sel, estado.paleta))).join("");
  cont.innerHTML = `<div class="sbb-panel-titulo">${b.nombre}</div>${filas}`;
  bind(cont, sel.id);
}

const grupo = (t) => `<div class="sbb-grupo">${t}</div>`;

function control(c, sel, paleta) {
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
    case "color": {
      // Herencia real: si el override es null, muestra el color heredado de la paleta
      // y lo marca como "Heredado". Si hay override, ofrece reset (volver a heredado).
      const heredado = c.hereda ? (paleta && paleta[c.hereda]) : c.heredaFijo;
      const heredable = heredado != null;
      const esOverride = v != null;
      const shown = (esOverride ? v : heredado) || "#000000";
      const extra = heredable
        ? esOverride
          ? `<button type="button" class="sbb-reset" data-reset="${c.k}" title="Volver a heredado">${icono("undo", 14)}</button>`
          : `<span class="sbb-hered">Heredado</span>`
        : "";
      campo = `<div class="sbb-color"><input id="${id}" data-k="${c.k}" type="color" value="${shown}">${extra}</div>`;
      break;
    }
    case "imgurl":
      campo = `<div class="sbb-imgurl"><input id="${id}" data-k="${c.k}" type="text" value="${v ?? ""}" placeholder="https://…"><button type="button" data-pick="${c.k}">Elegir</button></div>`;
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
  // Botón "Elegir" de los campos imgurl (placeholder hasta tener biblioteca).
  cont.querySelectorAll("[data-pick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = cont.querySelector(`[data-k="${btn.dataset.pick}"]`);
      const nueva = window.prompt("URL de la imagen:", input.value || "https://");
      if (nueva != null) { input.value = nueva.trim(); actualizar(idPieza, btn.dataset.pick, input.value); }
    });
  });
  // Reset de color: vuelve el override a null (heredado).
  cont.querySelectorAll("[data-reset]").forEach((btn) => {
    btn.addEventListener("click", () => actualizar(idPieza, btn.dataset.reset, null));
  });
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
