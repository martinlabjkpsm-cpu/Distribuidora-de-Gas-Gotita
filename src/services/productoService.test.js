import { describe, it, expect, beforeEach } from 'vitest';
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  descontarStock,
  crearCategoria,
  eliminarCategoria,
} from './productoService';

// Suite de integración: prueba el service junto con localStorage real (de jsdom).
describe('productoService (CRUD con persistencia en localStorage)', () => {
  // beforeEach: antes de CADA caso se limpia localStorage para que los casos no dependan entre sí.
  beforeEach(() => {
    localStorage.clear();
  });

  it('lista los 14 productos iniciales del catálogo cuando no hay nada guardado', () => {
    const productos = listarProductos();
    expect(productos).toHaveLength(14);
    expect(productos[0].codigo).toBe('CL001');
  });

  it('crea un producto nuevo y lo deja guardado', () => {
    crearProducto({
      codigo: 'ac004',
      categoria: 'Accesorios',
      producto: 'Llave para cilindro',
      precioResidencial: '2990',
      precioComercial: '2500',
      stockActual: '15',
    });
    const guardado = obtenerProducto('AC004');
    expect(guardado).not.toBeNull();
    expect(guardado.precioResidencial).toBe(2990); // se convierte a número
    expect(listarProductos()).toHaveLength(15);
  });

  it('lanza un error si el código del producto ya existe', () => {
    expect(() => crearProducto({ codigo: 'CL001', producto: 'Repetido' })).toThrow('Ya existe');
  });

  it('actualiza solo los campos indicados', () => {
    actualizarProducto('CL002', { precioResidencial: 12500 });
    const producto = obtenerProducto('CL002');
    expect(producto.precioResidencial).toBe(12500);
    expect(producto.producto).toBe('Cilindro GLP 11 kg'); // lo demás no cambió
  });

  it('lanza un error al actualizar un producto que no existe', () => {
    expect(() => actualizarProducto('XX999', { stockActual: 1 })).toThrow('No existe');
  });

  it('elimina un producto', () => {
    eliminarProducto('AC003');
    expect(obtenerProducto('AC003')).toBeNull();
  });

  it('descuenta el stock de los productos de un pedido', () => {
    descontarStock([{ codigo: 'CL002', cantidad: 3 }]);
    expect(obtenerProducto('CL002').stockActual).toBe(197);
  });

  it('no deja eliminar una categoría que todavía tiene productos', () => {
    expect(() => eliminarCategoria('Reguladores')).toThrow('hay productos');
    crearCategoria('Repuestos');
    expect(() => eliminarCategoria('Repuestos')).not.toThrow();
  });
});
