// Edición directa en el lienzo: clic en un elemento [data-edit] lo vuelve editable.
// Soporta rutas anidadas (data-edit="items.0.t"). Patrón nativo en TODOS los bloques.
import { actualizar } from "../core/estado.js";

export function activarEdicionDirecta(cont) {
  // Clic en una imagen marcada → elegir/cambiar su fuente. (Biblioteca llegará luego.)
  cont.addEventListener("click", (ev) => {
    const img = ev.target.closest("[data-edit-img]");
    if (!img) return;
    const bloque = img.closest(".sbb-bloque");
    if (!bloque) return;
    ev.stopPropagation();
    const ruta = img.getAttribute("data-edit-img");
    const actual = img.tagName === "IMG" ? img.getAttribute("src") : "";
    const nueva = window.prompt("URL de la imagen:", actual || "https://");
    if (nueva != null) actualizar(bloque.dataset.id, ruta, nueva.trim());
  });

  // Doble clic = editar texto. (Clic simple selecciona el bloque.)
  cont.addEventListener("dblclick", (ev) => {
    const el = ev.target.closest("[data-edit]");
    if (!el) return;
    const bloque = el.closest(".sbb-bloque");
    if (!bloque) return;
    ev.stopPropagation();
    el.setAttribute("contenteditable", "true");
    el.classList.add("sbb-editando");
    el.focus();
    document.getSelection()?.selectAllChildren(el);
  });

  // Al salir, persiste el texto en el estado.
  cont.addEventListener("blur", guardar, true);
  cont.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey && ev.target.isContentEditable) {
      ev.preventDefault();
      ev.target.blur();
    }
  });

  function guardar(ev) {
    const el = ev.target;
    if (!el.matches?.("[data-edit][contenteditable='true']")) return;
    const bloque = el.closest(".sbb-bloque");
    const ruta = el.getAttribute("data-edit");
    el.removeAttribute("contenteditable");
    el.classList.remove("sbb-editando");
    actualizar(bloque.dataset.id, ruta, el.innerText.trim());
  }
}
