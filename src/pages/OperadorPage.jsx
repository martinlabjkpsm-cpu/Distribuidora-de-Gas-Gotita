import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton } from '../components/Atoms';
import { pedidoService } from '../services/pedidoService';
import { usuarioService } from '../services/usuarioService';
import { formatearMoneda } from '../utils/formato';

export const OperadorPage = () => {
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [repartidoresSeleccionados, setRepartidoresSeleccionados] = useState({});
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  const cargarDatos = () => {
    const listaPedidos = pedidoService.getPedidos();
    setPedidos(Array.isArray(listaPedidos) ? listaPedidos : []);

    const todosUsuarios = usuarioService.getUsuarios();
    const listaUsuarios = Array.isArray(todosUsuarios) ? todosUsuarios : [];

    const choferes = listaUsuarios.filter(
      (u) => u.rol?.toUpperCase() === 'REPARTIDOR'
    );
    setRepartidores(choferes);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCambiarRepartidor = (pedidoId, rutSeleccionado) => {
    setRepartidoresSeleccionados((prev) => ({
      ...prev,
      [pedidoId]: rutSeleccionado
    }));
  };

  const handleAsignarChofer = (pedidoId) => {
    const rutChofer = repartidoresSeleccionados[pedidoId];

    if (!rutChofer) {
      mostrarAlerta('Por favor selecciona un repartidor antes de presionar Asignar.');
      return;
    }

    const chofer = repartidores.find((r) => r.rut === rutChofer);
    const nombreChofer = chofer ? chofer.nombre : 'Sin Asignar';

    const pedidosActualizados = pedidoService.asignarRepartidor(
      pedidoId,
      rutChofer,
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
    <MainLayoutTemplate tituloHeader="Central de Despacho y Operaciones">
      <div className="container py-4">
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
          <div className="alert alert-info text-center fw-bold shadow-sm mb-4" role="alert">
            {mensajeNotificacion}
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3 bg-white rounded">
              <span className="text-muted small fw-bold">Total Pedidos</span>
              <span className="fs-3 fw-bold text-dark">{listaSeguraPedidos.length}</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3 bg-warning bg-opacity-10 rounded">
              <span className="text-warning-emphasis small fw-bold">Pendientes</span>
              <span className="fs-3 fw-bold text-warning">{cantPendientes}</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3 bg-info bg-opacity-10 rounded">
              <span className="text-info-emphasis small fw-bold">En Camino</span>
              <span className="fs-3 fw-bold text-info">{cantEnCamino}</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3 bg-success bg-opacity-10 rounded">
              <span className="text-success-emphasis small fw-bold">Entregados</span>
              <span className="fs-3 fw-bold text-success">{cantEntregados}</span>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border bg-white p-4 rounded">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 pb-3 border-bottom">
            <Title level={2} className="fs-4 fw-bold m-0 text-dark">
              Gestión de Despachos
            </Title>

            <div className="d-flex align-items-center gap-2">
              <span className="small fw-bold text-muted me-1">Filtrar:</span>
              <button
                type="button"
                className={`btn btn-sm ${filtroEstado === 'TODOS' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setFiltroEstado('TODOS')}
              >
                Todos
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filtroEstado === 'PENDIENTE' ? 'btn-warning text-dark fw-bold' : 'btn-outline-warning text-dark'}`}
                onClick={() => setFiltroEstado('PENDIENTE')}
              >
                Pendientes
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filtroEstado === 'EN CAMINO' ? 'btn-info text-white fw-bold' : 'btn-outline-info'}`}
                onClick={() => setFiltroEstado('EN CAMINO')}
              >
                En Camino
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filtroEstado === 'ENTREGADO' ? 'btn-success fw-bold' : 'btn-outline-success'}`}
                onClick={() => setFiltroEstado('ENTREGADO')}
              >
                Entregados
              </button>
            </div>
          </div>

          {pedidosFiltrados.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <p className="mb-0">No hay pedidos registrados con el filtro seleccionado.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th># ID</th>
                    <th>Cliente</th>
                    <th>Dirección</th>
                    <th>Monto Total</th>
                    <th>Estado</th>
                    <th>Repartidor Asignado</th>
                    <th style={{ minWidth: '240px' }}>Asignar Repartidor</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.map((pedido) => {
                    const rutSeleccionado = repartidoresSeleccionados[pedido.id] || pedido.repartidorRut || '';

                    return (
                      <tr key={pedido.id}>
                        <td><strong className="text-danger">#{pedido.id}</strong></td>
                        <td>{pedido.clienteNombre || 'Cliente'}</td>
                        <td className="small">{pedido.direccion || 'Sin dirección'}</td>
                        <td className="fw-bold text-success">
                          {formatearMoneda ? formatearMoneda(pedido.total || 0) : `$${pedido.total || 0}`}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              pedido.estado === 'ENTREGADO'
                                ? 'bg-success'
                                : pedido.estado === 'EN CAMINO'
                                ? 'bg-info'
                                : 'bg-warning text-dark'
                            }`}
                          >
                            {pedido.estado || 'PENDIENTE'}
                          </span>
                        </td>
                        <td>
                          <span className="small fw-bold text-dark">
                            {pedido.repartidorNombre || 'Sin Asignar'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              className="form-select form-select-sm"
                              value={rutSeleccionado}
                              onChange={(e) => handleCambiarRepartidor(pedido.id, e.target.value)}
                            >
                              <option value="">-- Seleccionar --</option>
                              {repartidores.map((r) => (
                                <option key={r.rut} value={r.rut}>
                                  {r.nombre} ({r.rut})
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger fw-bold"
                              onClick={() => handleAsignarChofer(pedido.id)}
                            >
                              Asignar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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