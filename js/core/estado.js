// Estado del documento + deshacer/rehacer. Única fuente de verdad de la pieza.
// El resto de la app observa este estado y se re-renderiza ante cambios.

import { paletaGamonal } from "./tokens.js";

let id = 0;
const nuevoId = () => `b${Date.now().toString(36)}${(id++).toString(36)}`;

const estado = {
  formato: "libre",            // libre | email | banner…
  paleta: { ...paletaGamonal },// paleta activa del proyecto (Capa B)
  piezas: [],                  // [{ tipo, id, datos }]
  seleccion: null,             // id del bloque seleccionado
};

const undo = [];
const redo = [];
const oyentes = new Set();

function snapshot() {
  return JSON.stringify({ piezas: estado.piezas, paleta: estado.paleta, formato: estado.formato });
}
function restaurar(s) {
  const o = JSON.parse(s);
  estado.piezas = o.piezas; estado.paleta = o.paleta; estado.formato = o.formato;
}
function guardarHistorial() { undo.push(snapshot()); if (undo.length > 100) undo.shift(); redo.length = 0; }

function notificar() { oyentes.forEach((fn) => fn(estado)); }

// ── Árbol: los contenedores guardan hijos en datos.hijos (array de columnas). ──
// localizar() encuentra una instancia a cualquier profundidad y devuelve su array padre.
function colsDe(inst) { return Array.isArray(inst?.datos?.hijos) ? inst.datos.hijos : null; }

function localizar(idBuscado, arr = estado.piezas) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === idBuscado) return { inst: arr[i], arr, idx: i };
    const cols = colsDe(arr[i]);
    if (cols) for (const col of cols) { const r = localizar(idBuscado, col); if (r) return r; }
  }
  return null;
}

// Regenera ids de una instancia y de todos sus descendientes (para duplicar).
function reIdar(inst) {
  inst.id = nuevoId();
  const cols = colsDe(inst);
  if (cols) cols.forEach((col) => col.forEach(reIdar));
  return inst;
}

// ── API pública ──
export function suscribir(fn) { oyentes.add(fn); fn(estado); return () => oyentes.delete(fn); }
export function getEstado() { return estado; }
export function getSeleccionada() { return localizar(estado.seleccion)?.inst || null; }

// Crea una instancia. target = { contenedorId, col } la inserta en esa columna.
export function agregar(tipo, datos, target = null) {
  guardarHistorial();
  const inst = { tipo, id: nuevoId(), datos: structuredClone(datos) };
  let destino = estado.piezas;
  if (target) {
    const loc = localizar(target.contenedorId);
    const cols = loc && colsDe(loc.inst);
    if (cols && cols[target.col]) destino = cols[target.col];
  }
  destino.push(inst);
  estado.seleccion = inst.id;
  notificar();
  return inst.id;
}

export function seleccionar(idSel) { estado.seleccion = idSel; notificar(); }

// Actualiza un campo (admite rutas anidadas "items.0.t") a cualquier profundidad.
export function actualizar(idPieza, ruta, valor) {
  const loc = localizar(idPieza);
  if (!loc) return;
  guardarHistorial();
  const partes = ruta.split(".");
  let obj = loc.inst.datos;
  for (let i = 0; i < partes.length - 1; i++) obj = obj[partes[i]];
  obj[partes[partes.length - 1]] = valor;
  notificar();
}

export function eliminar(idPieza) {
  const loc = localizar(idPieza);
  if (!loc) return;
  guardarHistorial();
  loc.arr.splice(loc.idx, 1);
  if (estado.seleccion === idPieza) estado.seleccion = null;
  notificar();
}

export function duplicar(idPieza) {
  const loc = localizar(idPieza);
  if (!loc) return;
  guardarHistorial();
  const copia = reIdar({ tipo: loc.inst.tipo, datos: structuredClone(loc.inst.datos) });
  loc.arr.splice(loc.idx + 1, 0, copia);
  estado.seleccion = copia.id;
  notificar();
}

export function mover(idPieza, delta) {
  const loc = localizar(idPieza);
  if (!loc) return;
  const j = loc.idx + delta;
  if (j < 0 || j >= loc.arr.length) return;
  guardarHistorial();
  const [p] = loc.arr.splice(loc.idx, 1);
  loc.arr.splice(j, 0, p);
  notificar();
}

// ── Operaciones sobre listas de ítems dentro de un bloque (features, pricing…) ──
export function agregarItem(idPieza, k, item) {
  const loc = localizar(idPieza);
  if (!loc || !Array.isArray(loc.inst.datos[k])) return;
  guardarHistorial();
  loc.inst.datos[k].push(structuredClone(item));
  notificar();
}
export function quitarItem(idPieza, k, idx) {
  const loc = localizar(idPieza);
  if (!loc || !Array.isArray(loc.inst.datos[k])) return;
  guardarHistorial();
  loc.inst.datos[k].splice(idx, 1);
  notificar();
}

// ── Diseño global (grupo 12 de LINEAMIENTOS): paleta activa, formato, marca. ──
export function setPaletaColor(rol, hex) {
  guardarHistorial();
  estado.paleta = { ...estado.paleta, [rol]: hex };
  notificar();
}
export function setFormato(f) { guardarHistorial(); estado.formato = f; notificar(); }

// Carga una plantilla (composición prearmada). Asigna ids nuevos a todo el árbol.
export function cargarPlantilla(piezas, formato, paleta) {
  guardarHistorial();
  estado.piezas = piezas.map((p) => reIdar(structuredClone(p)));
  if (formato) estado.formato = formato;
  if (paleta) estado.paleta = { ...estado.paleta, ...paleta };
  estado.seleccion = null;
  notificar();
}
export function aplicarKit(paleta) {
  guardarHistorial();
  estado.paleta = { ...estado.paleta, ...paleta };
  notificar();
}

export function deshacer() { if (!undo.length) return; redo.push(snapshot()); restaurar(undo.pop()); notificar(); }
export function rehacer() { if (!redo.length) return; undo.push(snapshot()); restaurar(redo.pop()); notificar(); }
