// Reglas de precio del negocio (funciones puras, sin React).
// El precio depende del tipo de cliente: RESIDENCIAL o COMERCIAL.

export function precioSegunCliente(producto, tipo = 'RESIDENCIAL') {
  if (!producto) return 0;
  const tipoNormalizado = String(tipo).toUpperCase();
  const precio =
    tipoNormalizado === 'COMERCIAL' ? producto.precioComercial : producto.precioResidencial;
  return Number(precio) || 0;
}

// Suma precio x cantidad de cada ítem del carrito según la tarifa elegida.
export function calcularTotal(items = [], tipo = 'RESIDENCIAL') {
  return items.reduce(
    (total, item) => total + precioSegunCliente(item, tipo) * (Number(item.cantidad) || 0),
    0
  );
}

// Un producto es crítico cuando su stock es igual o menor al límite.
export function esStockCritico(producto, limite = 20) {
  return (Number(producto?.stockActual) || 0) <= limite;
}
