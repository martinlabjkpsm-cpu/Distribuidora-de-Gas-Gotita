import React, { useState, useEffect } from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title } from '../components/Atoms/Title';
import { pedidoService } from '../services/pedidoService';
import { usuarioService } from '../services/usuarioService';
import { formatearMoneda, formatearFecha } from '../utils/formato';

export const OperadorPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  const cargarDatos = () => {
    const listaPedidos = pedidoService.getPedidos();
    setPedidos(Array.isArray(listaPedidos) ? listaPedidos : []);

    const todosUsuarios = usuarioService.getUsuarios();
    const listaUsuarios = Array.isArray(todosUsuarios) ? todosUsuarios : [];
    const listaChoferes = listaUsuarios.filter(
      (u) => u.rol?.toUpperCase() === 'REPARTIDOR'
    );
    setRepartidores(listaChoferes);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAsignarChofer = (pedidoId, rutChoferSeleccionado) => {
    if (!rutChoferSeleccionado) return;

    const chofer = repartidores.find((r) => r.rut === rutChoferSeleccionado);
    const nombreChofer = chofer ? chofer.nombre : 'Sin Asignar';

    const pedidosActualizados = pedidoService.asignarRepartidor(
      pedidoId,
      rutChoferSeleccionado,
      nombreChofer
    );

    setPedidos(Array.isArray(pedidosActualizados) ? pedidosActualizados : []);
    mostrarAlerta(`Pedido #${pedidoId} asignado exitosamente al repartidor ${nombreChofer}.`);
  };

  const mostrarAlerta = (msg) => {
    setMensajeNotificacion(msg);
    setTimeout(() => setMensajeNotificacion(null), 4000);
  };

  const listaSeguraPedidos = Array.isArray(pedidos) ? pedidos : [];

  const pedidosFiltrados = filtroEstado === 'TODOS'
    ? listaSeguraPedidos
    : listaSeguraPedidos.filter((p) => p.estado === filtroEstado);

  const cantPendientes = listaSeguraPedidos.filter((p) => p.estado === 'PENDIENTE').length;
  const cantEnCamino = listaSeguraPedidos.filter((p) => p.estado === 'EN CAMINO').length;
  const cantEntregados = listaSeguraPedidos.filter((p) => p.estado === 'ENTREGADO').length;

  return (
    <MainLayoutTemplate tituloHeader="Central de Despacho - Operadora">
      <div className="container-fluid py-3">
        {mensajeNotificacion && (
          <div
            className="alert alert-success alert-dismissible fade show text-center fw-bold shadow-sm mb-4"
            role="alert"
          >
            {mensajeNotificacion}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMensajeNotificacion(null)}
            ></button>
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm bg-primary text-white p-3 rounded-3">
              <span className="small text-uppercase fw-bold">Total Pedidos</span>
              <span className="fs-3 fw-bold">{listaSeguraPedidos.length}</span>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm bg-warning text-dark p-3 rounded-3">
              <span className="small text-uppercase fw-bold">Pendientes</span>
              <span className="fs-3 fw-bold">{cantPendientes}</span>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm bg-info text-white p-3 rounded-3">
              <span className="small text-uppercase fw-bold">En Camino</span>
              <span className="fs-3 fw-bold">{cantEnCamino}</span>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm bg-success text-white p-3 rounded-3">
              <span className="small text-uppercase fw-bold">Entregados</span>
              <span className="fs-3 fw-bold">{cantEntregados}</span>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm bg-white p-3 mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <Title level={2} className="fs-5 m-0 fw-bold">
              📋 Control de Pedidos y Despacho
            </Title>

            <div className="d-flex align-items-center gap-2">
              <span className="small fw-bold">Filtrar por Estado:</span>
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className={`btn ${filtroEstado === 'TODOS' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setFiltroEstado('TODOS')}
                >
                  Todos ({listaSeguraPedidos.length})
                </button>
                <button
                  type="button"
                  className={`btn ${filtroEstado === 'PENDIENTE' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setFiltroEstado('PENDIENTE')}
                >
                  Pendientes ({cantPendientes})
                </button>
                <button
                  type="button"
                  className={`btn ${filtroEstado === 'EN CAMINO' ? 'btn-info text-white' : 'btn-outline-info'}`}
                  onClick={() => setFiltroEstado('EN CAMINO')}
                >
                  En Camino ({cantEnCamino})
                </button>
                <button
                  type="button"
                  className={`btn ${filtroEstado === 'ENTREGADO' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFiltroEstado('ENTREGADO')}
                >
                  Entregados ({cantEntregados})
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm bg-white p-3">
          {pedidosFiltrados.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <span className="fs-1 d-block mb-2">📭</span>
              <p className="mb-0 fw-bold">No se encontraron pedidos para el filtro seleccionado.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th># ID</th>
                    <th>Fecha / Hora</th>
                    <th>Cliente / Dirección</th>
                    <th>Detalle Ítems</th>
                    <th>Total</th>
                    <th>Método Pago</th>
                    <th>Estado</th>
                    <th>Repartidor Asignado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className="fw-bold">#{pedido.id}</td>
                      <td className="small text-muted">
                        {formatearFecha ? formatearFecha(pedido.fecha) : pedido.fecha}
                      </td>
                      <td>
                        <strong className="d-block">{pedido.clienteNombre}</strong>
                        <small className="text-muted">📍 {pedido.direccion}</small>
                        {pedido.indicaciones && (
                          <small className="d-block text-secondary fst-italic">
                            "{pedido.indicaciones}"
                          </small>
                        )}
                      </td>
                      <td className="small">
                        {Array.isArray(pedido.items) ? (
                          <ul className="list-unstyled mb-0">
                            {pedido.items.map((it, idx) => (
                              <li key={idx}>
                                • {it.cantidad}x {it.nombre}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>Sin detalle</span>
                        )}
                      </td>
                      <td className="fw-bold text-success">
                        {formatearMoneda ? formatearMoneda(pedido.total) : `$${pedido.total}`}
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {pedido.metodoPago || 'EFECTIVO'}
                        </span>
                      </td>
                      <td>
                        {pedido.estado === 'PENDIENTE' && (
                          <span className="badge bg-warning text-dark">PENDIENTE</span>
                        )}
                        {pedido.estado === 'EN CAMINO' && (
                          <span className="badge bg-info text-white">EN CAMINO</span>
                        )}
                        {pedido.estado === 'ENTREGADO' && (
                          <span className="badge bg-success">ENTREGADO</span>
                        )}
                      </td>
                      <td>
                        {pedido.repartidorNombre ? (
                          <span className="fw-bold text-primary">
                            🚚 {pedido.repartidorNombre}
                          </span>
                        ) : (
                          <select
                            className="form-select form-select-sm border-warning"
                            defaultValue=""
                            onChange={(e) => handleAsignarChofer(pedido.id, e.target.value)}
                          >
                            <option value="" disabled>
                              -- Asignar Repartidor --
                            </option>
                            {repartidores.map((rep) => (
                              <option key={rep.rut} value={rep.rut}>
                                {rep.nombre} ({rep.rut})
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayoutTemplate>
  );
};

export default OperadorPage;