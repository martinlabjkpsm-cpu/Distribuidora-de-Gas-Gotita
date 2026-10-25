// ProductosContext: el puente entre el service (los datos) y las pantallas (React).
// Guarda la lista en el estado de React y llama al service cuando alguien crea, edita o elimina.
// Así el catálogo y el panel de administración siempre muestran lo mismo.
import React, { createContext, useContext, useState } from 'react';
import * as productoService from '../services/productoService';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() => productoService.listarProductos());
  const [categorias, setCategorias] = useState(() => productoService.listarCategorias());

  const recargar = () => {
    setProductos(productoService.listarProductos());
    setCategorias(productoService.listarCategorias());
  };

  // Cada función pide el cambio al service y vuelve a leer la lista.
  // Si el service lanza un error (ej: código repetido), el error sube al formulario que llamó.
  const crear = (datos) => {
    productoService.crearProducto(datos);
    recargar();
  };

  const actualizar = (codigo, cambios) => {
    productoService.actualizarProducto(codigo, cambios);
    recargar();
  };

  const eliminar = (codigo) => {
    productoService.eliminarProducto(codigo);
    recargar();
  };

  const descontarStock = (items) => {
    productoService.descontarStock(items);
    recargar();
  };

  const crearCategoria = (nombre) => {
    productoService.crearCategoria(nombre);
    recargar();
  };

  const actualizarCategoria = (nombreActual, nombreNuevo) => {
    productoService.actualizarCategoria(nombreActual, nombreNuevo);
    recargar();
  };

  const eliminarCategoria = (nombre) => {
    productoService.eliminarCategoria(nombre);
    recargar();
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        categorias,
        crear,
        actualizar,
        eliminar,
        descontarStock,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria,
        recargar,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

// Hook propio: const { productos, crear } = useProductos()
export function useProductos() {
  const contexto = useContext(ProductosContext);
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider');
  }
  return contexto;
}

export default ProductosContext;
