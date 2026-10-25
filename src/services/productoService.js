// productoService: CRUD de productos y categorías del catálogo.
// Funciones de JavaScript puro (sin React) que guardan en localStorage,
// así los cambios siguen ahí al recargar la página y se pueden probar solas.
import catalogoGasGotita, { categorias as categoriasIniciales } from '../data/catalogoGasGotita';

const CLAVE_PRODUCTOS = 'gas_gotita_productos';
const CLAVE_CATEGORIAS = 'gas_gotita_categorias';

function leer(clave, valorInicial) {
  const guardado = localStorage.getItem(clave);
  if (guardado === null) {
    localStorage.setItem(clave, JSON.stringify(valorInicial));
    return [...valorInicial];
  }
  return JSON.parse(guardado);
}

function guardar(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista));
}

const leerProductos = () => leer(CLAVE_PRODUCTOS, catalogoGasGotita.productosYTarifas);
const leerCategorias = () => leer(CLAVE_CATEGORIAS, categoriasIniciales);

// ---------- PRODUCTOS ----------

// READ: todos los productos
export function listarProductos() {
  return leerProductos();
}

// READ: un producto por su código (ej: "CL002")
export function obtenerProducto(codigo) {
  return leerProductos().find((p) => p.codigo === codigo) ?? null;
}

// CREATE: agrega un producto nuevo. El código no se puede repetir.
export function crearProducto(datos) {
  const lista = leerProductos();
  const codigo = String(datos.codigo || '').trim().toUpperCase();
  if (!codigo) throw new Error('El código del producto es obligatorio');
  if (lista.some((p) => p.codigo === codigo)) {
    throw new Error(`Ya existe un producto con el código ${codigo}`);
  }
  const nuevo = {
    unidad: 'Unidad',
    imagenSrc: '/img/gasGotita.png',
    ...datos,
    codigo,
    precioResidencial: Number(datos.precioResidencial) || 0,
    precioComercial: Number(datos.precioComercial) || 0,
    stockActual: Number(datos.stockActual) || 0,
  };
  guardar(CLAVE_PRODUCTOS, [...lista, nuevo]);
  return nuevo;
}

// UPDATE: cambia solo los campos indicados
export function actualizarProducto(codigo, cambios) {
  const lista = leerProductos();
  if (!lista.some((p) => p.codigo === codigo)) {
    throw new Error(`No existe un producto con el código ${codigo}`);
  }
  const actualizada = lista.map((p) => (p.codigo === codigo ? { ...p, ...cambios, codigo } : p));
  guardar(CLAVE_PRODUCTOS, actualizada);
  return actualizada.find((p) => p.codigo === codigo);
}

// DELETE: quita el producto con ese código
export function eliminarProducto(codigo) {
  guardar(CLAVE_PRODUCTOS, leerProductos().filter((p) => p.codigo !== codigo));
}

// Baja el stock de los productos de un pedido (nunca queda bajo 0).
export function descontarStock(items = []) {
  const lista = leerProductos().map((p) => {
    const item = items.find((i) => (i.codigo || i.id) === p.codigo);
    if (!item) return p;
    return { ...p, stockActual: Math.max(0, (Number(p.stockActual) || 0) - (Number(item.cantidad) || 0)) };
  });
  guardar(CLAVE_PRODUCTOS, lista);
}

// ---------- CATEGORÍAS ----------

export function listarCategorias() {
  return leerCategorias();
}

export function crearCategoria(nombre) {
  const limpio = String(nombre || '').trim();
  if (!limpio) throw new Error('El nombre de la categoría es obligatorio');
  const lista = leerCategorias();
  if (lista.some((c) => c.toLowerCase() === limpio.toLowerCase())) {
    throw new Error('Esa categoría ya existe');
  }
  guardar(CLAVE_CATEGORIAS, [...lista, limpio]);
  return limpio;
}

// Al renombrar una categoría también se actualizan los productos que la usan.
export function actualizarCategoria(nombreActual, nombreNuevo) {
  const limpio = String(nombreNuevo || '').trim();
  if (!limpio) throw new Error('El nombre de la categoría es obligatorio');
  guardar(CLAVE_CATEGORIAS, leerCategorias().map((c) => (c === nombreActual ? limpio : c)));
  guardar(
    CLAVE_PRODUCTOS,
    leerProductos().map((p) => (p.categoria === nombreActual ? { ...p, categoria: limpio } : p))
  );
  return limpio;
}

// Solo se puede eliminar una categoría que no tenga productos.
export function eliminarCategoria(nombre) {
  if (leerProductos().some((p) => p.categoria === nombre)) {
    throw new Error('No se puede eliminar: hay productos en esta categoría');
  }
  guardar(CLAVE_CATEGORIAS, leerCategorias().filter((c) => c !== nombre));
}
