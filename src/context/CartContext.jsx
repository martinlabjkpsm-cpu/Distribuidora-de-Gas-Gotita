// CartContext: el carrito (pedido en curso) compartido entre páginas.
// Se guarda en localStorage para que no se pierda al recargar.
import React, { createContext, useContext, useEffect, useState } from 'react';

const CLAVE_CARRITO = 'gas_gotita_carrito';

const CartContext = createContext(null);

const leerCarritoGuardado = () => {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    const lista = guardado ? JSON.parse(guardado) : [];
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
};

const idDe = (item) => item.codigo || item.id;

export const CartProvider = ({ children }) => {
  // La función dentro de useState lee localStorage solo la primera vez.
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  // Cada vez que el carrito cambia, se guarda.
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    if (!producto) return;
    const idProd = idDe(producto);
    setCarrito((prev) => {
      const existe = prev.find((item) => idDe(item) === idProd);
      if (existe) {
        return prev.map((item) =>
          idDe(item) === idProd ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...producto,
          id: idProd,
          codigo: idProd,
          nombre: producto.nombre || producto.producto,
          cantidad: 1,
        },
      ];
    });
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) => (idDe(item) === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => idDe(item) !== id));
  };

  const limpiarCarrito = () => setCarrito([]);

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        cantidadTotal,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        limpiarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

export default CartContext;
