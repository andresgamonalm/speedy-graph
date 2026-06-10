// Panel de Diseño Global (grupo 12 de LINEAMIENTOS). Controla la marca activa, la paleta
// del proyecto, el formato y el canvas. Todo cambio aquí re-renderiza los bloques que
// heredan: es la materialización de "Canvas manda → Bloque hereda".
import { kits, rolesPaleta } from "../core/marcas.js";
import { setPaletaColor, setFormato, aplicarKit } from "../core/estado.js";
import { contrasteOk } from "../core/tokens.js";

export function renderGlobal(cont, estado) {
  const p = estado.paleta;
  const opcionesKit = Object.entries(kits)
    .map(([k, v]) => `<button class="sbb-kit" data-kit="${k}"><span class="sbb-kit-sw" style="background:${v.paleta.principal}"></span><span class="sbb-kit-sw" style="background:${v.paleta.acento}"></span>${v.nombre}</button>`)
    .join("");

  const colores = rolesPaleta
    .map(([rol, label]) => `<label class="sbb-ctrl"><span>${label}</span><div class="sbb-color"><input type="color" data-rol="${rol}" value="${p[rol] || "#000000"}"><code class="sbb-hex">${p[rol] || ""}</code></div></label>`)
    .join("");

  // Aviso de contraste: texto principal sobre fondo principal.
  const contraste = contrasteOk(p.textoPrincipal, p.fondoPrincipal);

  cont.innerHTML = `
    <div class="sbb-panel-titulo">Diseño global</div>
    <div class="sbb-grupo">Marca activa</div>
    <div class="sbb-kits">${opcionesKit}</div>
    <div class="sbb-grupo">Formato</div>
    <label class="sbb-ctrl"><span>Tipo de pieza</span>
      <select data-fmt>
        <option value="libre"${estado.formato === "libre" ? " selected" : ""}>Libre (universal)</option>
        <option value="email"${estado.formato === "email" ? " selected" : ""}>Email (600px)</option>
      </select></label>
    <div class="sbb-grupo">Paleta del proyecto</div>
    ${!contraste ? `<div class="sbb-aviso">Contraste bajo entre texto y fondo principal. Revisa la legibilidad.</div>` : ""}
    ${colores}`;

  cont.querySelectorAll("[data-kit]").forEach((b) =>
    b.addEventListener("click", () => aplicarKit(kits[b.dataset.kit].paleta))
  );
  cont.querySelector("[data-fmt]").addEventListener("change", (e) => setFormato(e.target.value));
  cont.querySelectorAll("[data-rol]").forEach((inp) =>
    inp.addEventListener("input", () => setPaletaColor(inp.dataset.rol, inp.value))
  );
}
