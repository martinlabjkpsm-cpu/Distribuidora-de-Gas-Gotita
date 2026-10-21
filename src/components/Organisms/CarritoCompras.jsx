import React from 'react';
import { Title, Boton, Select } from '../Atoms';
import { CampoFormulario } from '../Molecules';
import { useCart } from '../../context/CartContext';
import { formatearMoneda } from '../../utils/formato';
import { validarDireccionDespacho } from '../../utils/validaciones';

export const CarritoCompras = ({ catalogo = [], onPedidoExitoso }) => {
  const {
    items,
    tipoTarifa,
    direccion,
    indicaciones,
    metodoPago,
    setDireccion,
    setIndicaciones,
    setMetodoPago,
    actualizarCantidad,
    cambiarTarifa,
    vaciarCarrito,
    obtenerPrecioProducto,
    confirmarYPagar
  } = useCart();

  const listaItemsCarrito = catalogo
    .filter((prod) => (items[prod.codigo || prod.id] || 0) > 0)
    .map((prod) => {
      const idProd = prod.codigo || prod.id;
      const cantidad = items[idProd];
      const precioUnitario = obtenerPrecioProducto(prod);
      const subtotalConjunto = precioUnitario * cantidad;

      return {
        id: idProd,
        nombre: prod.producto || prod.nombre,
        cantidad,
        precioUnitario,
        subtotalConjunto
      };
    });

  const totalPagar = listaItemsCarrito.reduce((acc, item) => acc + item.subtotalConjunto, 0);
  const esDireccionValida = validarDireccionDespacho(direccion);

  const handleSubmitPagar = (e) => {
    e.preventDefault();
    if (listaItemsCarrito.length === 0 || !esDireccionValida) return;

    const pedidoCreado = confirmarYPagar(catalogo);
    if (onPedidoExitoso) {
      onPedidoExitoso(pedidoCreado);
    }
  };

  return (
    <section className="carrito-organismo card p-4 border shadow-sm bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Title level={3} className="fs-5 m-0">🛒 Mi Carrito de Compras</Title>
        {listaItemsCarrito.length > 0 && (
          <button 
            type="button" 
            className="btn btn-outline-danger btn-sm"
            onClick={vaciarCarrito}
          >
            Vaciar
          </button>
        )}
      </div>

      <div className="mb-3 p-2 bg-light border rounded">
        <label className="form-label fw-bold small d-block mb-2">Selecciona el Tipo de Tarifa:</label>
        <div className="btn-group w-100" role="group">
          <button
            type="button"
            className={`btn btn-sm ${tipoTarifa === 'RESIDENCIAL' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => cambiarTarifa('RESIDENCIAL')}
          >
            🏠 Residencial
          </button>
          <button
            type="button"
            className={`btn btn-sm ${tipoTarifa === 'COMERCIAL' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => cambiarTarifa('COMERCIAL')}
          >
            🏢 Comercial / PYME
          </button>
        </div>
      </div>

      {listaItemsCarrito.length === 0 ? (
        <div className="alert alert-info text-center py-3 my-2 small">
          Tu carrito está vacío. Elige tus cilindros o accesorios en el catálogo.
        </div>
      ) : (
        <ul className="list-group mb-3">
          {listaItemsCarrito.map((item) => (
            <li 
              key={item.id} 
              className="list-group-item d-flex justify-content-between align-items-center py-2"
            >
              <div>
                <strong className="d-block small">{item.nombre}</strong>
                <small className="text-muted">
                  {item.cantidad} x {formatearMoneda(item.precioUnitario)}
                </small>
              </div>
              <div className="text-end">
                <span className="fw-bold d-block text-primary">
                  {formatearMoneda(item.subtotalConjunto)}
                </span>
                <button
                  type="button"
                  className="btn btn-link btn-sm text-danger p-0 border-0"
                  onClick={() => actualizarCantidad(item.id, 0)}
                >
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmitPagar}>
        <CampoFormulario
          id="direccion-despacho"
          name="direccion"
          label="Dirección de Despacho (Chillán / Ñuble)"
          placeholder="Ej: Av. Brasil 456, Chillán"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
          error={direccion && !esDireccionValida ? 'Ingresa una dirección válida' : null}
          className="mb-2"
        />

        <CampoFormulario
          id="indicaciones-despacho"
          name="indicaciones"
          label="Indicaciones de entrega (Opcional)"
          placeholder="Ej: Timbre de la derecha, llamar al llegar"
          value={indicaciones}
          onChange={(e) => setIndicaciones(e.target.value)}
          rows={2}
          className="mb-3"
        />

        <div className="mb-3">
          <label htmlFor="metodo-pago-select" className="form-label small fw-bold">Método de Pago:</label>
          <Select
            id="metodo-pago-select"
            name="metodoPago"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            options={[
              { value: 'EFECTIVO', label: 'Efectivo (\$) al Repartidor' },
              { value: 'TRANSFERENCIA', label: 'Transferencia Bancaria' },
              { value: 'DEBITO', label: 'Tarjeta Débito / POS' }
            ]}
          />
        </div>

        <div className="box-total bg-light p-3 rounded mb-3 border text-end">
          <span className="text-muted small d-block">Tarifa Aplicada: {tipoTarifa}</span>
          <span className="fs-5 fw-bold text-dark d-block">
            Total a Pagar: {formatearMoneda(totalPagar)}
          </span>
        </div>

        <Boton
          type="submit"
          variant="success"
          fullWidth
          disabled={listaItemsCarrito.length === 0 || !esDireccionValida}
          className="btn btn-success btn-lg w-100"
        >
          💳 Confirmar y Pagar Pedido
        </Boton>
      </form>
    </section>
  );
};

export default CarritoCompras;