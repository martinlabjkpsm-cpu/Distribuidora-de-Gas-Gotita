import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext({
  carrito: [],
  agregarAlCarrito: () => {},
  disminuirCantidad: () => {},
  eliminarDelCarrito: () => {},
  limpiarCarrito: () => {},
  totalCarrito: 0
});

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    if (!producto) return;
    setCarrito((prev) => {
      const lista = Array.isArray(prev) ? prev : [];
      const idProd = producto.id || producto.codigo;
      const existe = lista.find((item) => (item.id || item.codigo) === idProd);

      if (existe) {
        return lista.map((item) =>
          (item.id || item.codigo) === idProd
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...lista,
        {
          ...producto,
          id: idProd,
          codigo: producto.codigo || idProd,
          nombre: producto.nombre || producto.producto,
          cantidad: 1
        }
      ];
    });
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) => {
      const lista = Array.isArray(prev) ? prev : [];
      return lista
        .map((item) => {
          if ((item.id || item.codigo) === id) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0);
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => {
      const lista = Array.isArray(prev) ? prev : [];
      return lista.filter((item) => (item.id || item.codigo) !== id);
    });
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const totalCarrito = Array.isArray(carrito)
    ? carrito.reduce((acc, item) => acc + (item.cantidad || 0) * (item.precioUnitario || 0), 0)
    : 0;

  return (
    <CartContext.Provider
      value={{
        carrito: Array.isArray(carrito) ? carrito : [],
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        limpiarCarrito,
        totalCarrito
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      carrito: [],
      agregarAlCarrito: () => {},
      disminuirCantidad: () => {},
      eliminarDelCarrito: () => {},
      limpiarCarrito: () => {},
      totalCarrito: 0
    };
  }
  return context;
};

export default CartContext;