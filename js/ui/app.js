// Interfaz general del builder (Capa A · Gamonal). Arma el chrome y conecta:
// catálogo de bloques, lienzo, edición directa y panel de propiedades.
import { bloques, porCategoria } from "../bloques/_registro.js";
import * as E from "../core/estado.js";
import { renderLienzo } from "../core/render.js";
import { renderPanel } from "../features/panel-props.js";
import { renderGlobal } from "../features/panel-global.js";
import { activarEdicionDirecta } from "../features/edicion-directa.js";
import { generarEmail } from "../features/export-email.js";
import { icono } from "../core/iconos.js";

let modoGlobal = false;

const app = document.getElementById("app");

app.innerHTML = `
  <header class="sbb-top">
    <div class="sbb-marca">
      <span class="sbb-logo">SBB</span>
      <span class="sbb-marca-txt">Simple Block Builder</span>
    </div>
    <div class="sbb-top-acc">
      <button id="global" title="Diseño global">${icono("layers", 16)} Diseño global</button>
      <button id="undo" title="Deshacer">${icono("undo")}</button>
      <button id="redo" title="Rehacer">${icono("redo")}</button>
      <button id="preview" class="sbb-btn-primario">${icono("eye", 16)} Vista previa</button>
    </div>
  </header>
  <main class="sbb-main">
    <aside class="sbb-sidebar">
      <div class="sbb-sidebar-tit">Bloques</div>
      <div id="catalogo"></div>
    </aside>
    <section class="sbb-canvas-wrap">
      <div id="lienzo" class="sbb-canvas" data-formato="libre"></div>
    </section>
    <aside class="sbb-props">
      <div id="panel"></div>
    </aside>
  </main>`;

// ── Catálogo (sidebar) ──
const catalogo = document.getElementById("catalogo");
catalogo.innerHTML = Object.entries(porCategoria)
  .map(
    ([cat, items]) => `
    <div class="sbb-cat">${cat}</div>
    ${items
      .map(
        (b) => `<button class="sbb-bloque-btn" data-add="${b.id}">
          <span class="sbb-bb-ico">${icono(b.icon || "layers", 16)}</span>
          <span class="sbb-bb-txt"><strong>${b.nombre}</strong><small>${b.sub || ""}</small></span>
        </button>`
      )
      .join("")}`
  )
  .join("");

catalogo.addEventListener("click", (ev) => {
  const btn = ev.target.closest("[data-add]");
  if (!btn) return;
  const def = bloques.find((b) => b.id === btn.dataset.add);
  E.agregar(def.id, def.defaults);
});

// ── Lienzo: seleccionar + acciones por bloque ──
const lienzo = document.getElementById("lienzo");
lienzo.addEventListener("click", (ev) => {
  const accBtn = ev.target.closest("[data-acc]");
  const bloque = ev.target.closest(".sbb-bloque");
  if (!bloque) { E.seleccionar(null); return; }
  const id = bloque.dataset.id;
  if (accBtn) {
    ev.stopPropagation();
    const acc = accBtn.dataset.acc;
    if (acc === "up") E.mover(id, -1);
    else if (acc === "down") E.mover(id, 1);
    else if (acc === "dup") E.duplicar(id);
    else if (acc === "del") E.eliminar(id);
    return;
  }
  // Seleccionar un bloque vuelve al panel de propiedades del bloque.
  modoGlobal = false;
  document.getElementById("global").classList.remove("on");
  E.seleccionar(id);
});
activarEdicionDirecta(lienzo);

// ── Toolbar ──
document.getElementById("undo").addEventListener("click", E.deshacer);
document.getElementById("redo").addEventListener("click", E.rehacer);
document.getElementById("preview").addEventListener("click", () => {
  abrirPreview(generarEmail(E.getEstado()));
});
// Reloj en vivo (solo pantalla): actualiza los elementos [data-reloj] cada segundo.
setInterval(() => {
  document.querySelectorAll("[data-reloj]").forEach((el) => {
    const [f24, seg] = el.dataset.reloj.split("");
    const o = { hour: "2-digit", minute: "2-digit", hour12: f24 !== "1" };
    if (seg === "1") o.second = "2-digit";
    el.textContent = new Date().toLocaleTimeString("es", o);
  });
}, 1000);

const btnGlobal = document.getElementById("global");
btnGlobal.addEventListener("click", () => {
  modoGlobal = !modoGlobal;
  btnGlobal.classList.toggle("on", modoGlobal);
  renderPanelActivo(E.getEstado());
});

function abrirPreview(html) {
  const ov = document.createElement("div");
  ov.className = "sbb-modal";
  ov.innerHTML = `
    <div class="sbb-modal-caja">
      <div class="sbb-modal-top">
        <span>Vista previa · Email</span>
        <button class="sbb-modal-x" title="Cerrar">${icono("x", 18)}</button>
      </div>
      <iframe class="sbb-modal-frame" title="Vista previa"></iframe>
    </div>`;
  document.body.appendChild(ov);
  ov.querySelector("iframe").srcdoc = html;
  const cerrar = () => ov.remove();
  ov.querySelector(".sbb-modal-x").addEventListener("click", cerrar);
  ov.addEventListener("click", (e) => { if (e.target === ov) cerrar(); });
}

// ── Render reactivo ──
const panel = document.getElementById("panel");
function renderPanelActivo(estado) {
  if (modoGlobal) renderGlobal(panel, estado);
  else renderPanel(panel, estado);
}
E.suscribir((estado) => {
  // No re-renderizar el lienzo mientras se edita en vivo (evita perder el cursor).
  if (!lienzo.querySelector("[contenteditable='true']")) {
    renderLienzo(lienzo, estado);
    lienzo.dataset.formato = estado.formato;
  }
  renderPanelActivo(estado);
});
