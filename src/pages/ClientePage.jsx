import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton } from '../components/Atoms';
import { TarjetaProducto } from '../components/Molecules';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { pedidoService } from '../services/pedidoService';
import { catalogoGasElVolcan, categorias } from '../data/catalogoGasElVolcan';
import { formatearMoneda } from '../utils/formato';

export const ClientePage = () => {
  const navigate = useNavigate();

  const authContext = useAuth() || {};
  const usuario = authContext.usuario;

  const cartContext = useCart() || {};
  const carrito = Array.isArray(cartContext.carrito) ? cartContext.carrito : [];
  const agregarAlCarrito = cartContext.agregarAlCarrito || (() => {});
  const disminuirCantidad = cartContext.disminuirCantidad || (() => {});
  const eliminarDelCarrito = cartContext.eliminarDelCarrito || (() => {});
  const limpiarCarrito = cartContext.limpiarCarrito || (() => {});

  const [tipoTarifa, setTipoTarifa] = useState('RESIDENCIAL');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('TODAS');
  const [direccion, setDireccion] = useState('');
  const [indicaciones, setIndicaciones] = useState('');
  const [metodoPago, setMetodoPago] = useState('EFECTIVO');
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  const productosRaw = Array.isArray(catalogoGasElVolcan?.productosYTarifas)
    ? catalogoGasElVolcan.productosYTarifas
    : [];

  const listaProductos = productosRaw.map((p) => ({
    ...p,
    id: p.codigo || p.id,
    nombre: p.producto || p.nombre
  }));

  const productosFiltrados = categoriaSeleccionada === 'TODAS'
    ? listaProductos
    : listaProductos.filter((p) => p.categoria === categoriaSeleccionada);

  const listaCategorias = Array.isArray(categorias) ? categorias : [];

  const handleAgregarProducto = (prod) => {
    agregarAlCarrito(prod);
    setMensajeNotificacion({
      tipo: 'success',
      texto: `Se agregó ${prod.nombre || prod.producto} al carrito.`
    });
    setTimeout(() => setMensajeNotificacion(null), 3000);
  };

  const obtenerPrecioUnitario = (item) => {
    if (tipoTarifa === 'COMERCIAL') {
      return Number(item.precioComercial ?? item.precioUnitario ?? 0);
    }
    return Number(item.precioResidencial ?? item.precioUnitario ?? 0);
  };

  const totalCalculado = carrito.reduce((acc, item) => {
    return acc + (item.cantidad || 0) * obtenerPrecioUnitario(item);
  }, 0);

  const handleConfirmarPedido = (e) => {
    e.preventDefault();

    if (!Array.isArray(carrito) || carrito.length === 0) {
      setMensajeNotificacion({
        tipo: 'danger',
        texto: 'El carrito está vacío. Selecciona al menos un producto.'
      });
      return;
    }

    if (!direccion.trim()) {
      setMensajeNotificacion({
        tipo: 'danger',
        texto: 'Por favor ingresa la dirección de despacho en Chillán.'
      });
      return;
    }

    try {
      const itemsConPrecioFinal = carrito.map((item) => ({
        ...item,
        precioUnitario: obtenerPrecioUnitario(item)
      }));

      const nuevoPedido = pedidoService.crearPedido({
        clienteNombre: usuario?.nombre || 'Cliente Registrado',
        direccion: direccion.trim(),
        indicaciones: indicaciones.trim(),
        tipoTarifa,
        items: itemsConPrecioFinal,
        total: totalCalculado,
        metodoPago
      });

      setMensajeNotificacion({
        tipo: 'success',
        texto: `¡Pedido #${nuevoPedido.id} enviado exitosamente! Estará en camino pronto.`
      });

      limpiarCarrito();
      setDireccion('');
      setIndicaciones('');
    } catch (err) {
      setMensajeNotificacion({
        tipo: 'danger',
        texto: 'Error al enviar el pedido. Inténtalo de nuevo.'
      });
    }
  };

  return (
    <MainLayoutTemplate tituloHeader="Portal de Pedidos - Gas El Volcán">
      <div className="container-fluid py-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Boton
            type="button"
            variant="outline-secondary"
            className="btn btn-outline-secondary btn-sm fw-bold"
            onClick={() => navigate('/')}
          >
            ← Volver al Inicio
          </Boton>
        </div>

        {mensajeNotificacion && (
          <div
            className={`alert alert-${mensajeNotificacion.tipo} alert-dismissible fade show text-center fw-bold`}
            role="alert"
          >
            {mensajeNotificacion.texto}
            <button
              type="button"
              className="btn-close float-end"
              onClick={() => setMensajeNotificacion(null)}
            ></button>
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-8 col-md-12">
            <div className="card p-3 mb-4 shadow-sm bg-white border">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                <Title level={2} className="fs-5 m-0">
                  Catálogo de Gas Licuado y Accesorios
                </Title>

                <div className="d-flex align-items-center gap-2">
                  <span className="small fw-bold me-1">Categoría:</span>
                  <button
                    type="button"
                    className={`btn btn-sm ${
                      categoriaSeleccionada === 'TODAS'
                        ? 'btn-dark'
                        : 'btn-outline-dark'
                    }`}
                    onClick={() => setCategoriaSeleccionada('TODAS')}
                  >
                    Todas
                  </button>
                  {listaCategorias.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`btn btn-sm ${
                        categoriaSeleccionada === cat
                          ? 'btn-dark'
                          : 'btn-outline-dark'
                      }`}
                      onClick={() => setCategoriaSeleccionada(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-4">
              {productosFiltrados.map((prod) => {
                const precioAplicado =
                  tipoTarifa === 'COMERCIAL'
                    ? Number(prod.precioComercial) || 0
                    : Number(prod.precioResidencial) || 0;

                return (
                  <div key={prod.id || prod.codigo} className="col">
                    <TarjetaProducto
                      nombre={prod.nombre || prod.producto}
                      descripcion={prod.descripcion}
                      categoria={prod.categoria}
                      imagenSrc={prod.imagenSrc}
                      precio={precioAplicado}
                      etiquetaTarifa={tipoTarifa}
                      onAgregar={() => handleAgregarProducto(prod)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="card shadow-sm border bg-white p-3 sticky-top top-2">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <Title level={2} className="fs-5 m-0">
                  Tu Carrito de Compras
                </Title>
              </div>

              <div className="mb-3 p-2 bg-light rounded border">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="small fw-bold">Tipo de Tarifa del Pedido:</span>
                  <div className="btn-group btn-group-sm" role="group">
                    <button
                      type="button"
                      className={`btn ${
                        tipoTarifa === 'RESIDENCIAL'
                          ? 'btn-danger'
                          : 'btn-outline-danger'
                      }`}
                      onClick={() => setTipoTarifa('RESIDENCIAL')}
                    >
                      Residencial
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        tipoTarifa === 'COMERCIAL'
                          ? 'btn-danger'
                          : 'btn-outline-danger'
                      }`}
                      onClick={() => setTipoTarifa('COMERCIAL')}
                    >
                      Comercial
                    </button>
                  </div>
                </div>
              </div>

              {carrito.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <p className="small mb-0">No has agregado productos al carrito.</p>
                </div>
              ) : (
                <div className="mb-3">
                  <ul className="list-group list-group-flush mb-3">
                    {carrito.map((item) => {
                      const idItem = item.id || item.codigo;
                      const precioUnitario = obtenerPrecioUnitario(item);
                      return (
                        <li
                          key={idItem}
                          className="list-group-item d-flex justify-content-between align-items-center px-0 py-2"
                        >
                          <div className="me-2 flex-grow-1">
                            <strong className="d-block small">{item.nombre || item.producto}</strong>
                            <small className="text-muted d-block">
                              {formatearMoneda(precioUnitario)} c/u
                            </small>
                          </div>

                          <div className="d-flex align-items-center gap-1 me-2">
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm px-2 py-0 fw-bold"
                              onClick={() => disminuirCantidad(idItem)}
                            >
                              -
                            </button>
                            <span className="fw-bold px-1 small">{item.cantidad}</span>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm px-2 py-0 fw-bold"
                              onClick={() => agregarAlCarrito(item)}
                            >
                              +
                            </button>
                          </div>

                          <div className="text-end me-2">
                            <strong className="text-success small d-block">
                              {formatearMoneda(item.cantidad * precioUnitario)}
                            </strong>
                          </div>

                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm py-0 px-2 fw-bold"
                            title="Eliminar producto"
                            onClick={() => eliminarDelCarrito(idItem)}
                          >
                            ×
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="d-flex justify-content-between align-items-center border-top pt-2 fw-bold fs-5">
                    <span>Total:</span>
                    <span className="text-success">{formatearMoneda(totalCalculado)}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleConfirmarPedido} className="mt-3 border-top pt-3">
                <div className="mb-2">
                  <label className="form-label small fw-bold">
                    Dirección de Entrega (Chillán)
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Ej: Av. Libertad 450, Depto 302"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold">
                    Indicaciones para el Repartidor
                  </label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="2"
                    placeholder="Ej: Timbre descompuesto, llamar al celular"
                    value={indicaciones}
                    onChange={(e) => setIndicaciones(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Método de Pago
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <option value="EFECTIVO">Efectivo al Repartidor</option>
                    <option value="TRANSFERENCIA">Transferencia Bancaria</option>
                    <option value="DEBITO">Débito / Tarjeta (POS en Terreno)</option>
                  </select>
                </div>

                <Boton
                  type="submit"
                  variant="success"
                  className="btn btn-success w-100 fw-bold btn-lg"
                >
                  Confirmar y Pagar Pedido
                </Boton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayoutTemplate>
  );
};

export default ClientePage;