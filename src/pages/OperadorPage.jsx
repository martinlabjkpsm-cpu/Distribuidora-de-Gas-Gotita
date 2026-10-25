import React, { useState } from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton, Etiqueta } from '../components/Atoms';
import { TarjetaResumenCaja } from '../components/Molecules';
import { pedidoService } from '../services/pedidoService';
import { usuarioService } from '../services/usuarioService';
import { formatearMoneda } from '../utils/formato';
import { useTituloPagina } from '../hooks/useTituloPagina';

const estadosFiltro = [
  { valor: 'TODOS', texto: 'Todos', color: 'dark' },
  { valor: 'PENDIENTE', texto: 'Pendientes', color: 'warning' },
  { valor: 'EN CAMINO', texto: 'En camino', color: 'info' },
  { valor: 'ENTREGADO', texto: 'Entregados', color: 'success' },
];

// Página: la operadora ve todos los pedidos y los asigna a un repartidor.
export const OperadorPage = () => {
  useTituloPagina('Central de despacho');

  // La función dentro de useState lee los datos solo la primera vez.
  const [pedidos, setPedidos] = useState(() => pedidoService.getPedidos());
  const [repartidores] = useState(() =>
    usuarioService.getUsuarios().filter((u) => u.rol?.toUpperCase() === 'REPARTIDOR' && u.activo !== false)
  );
  const [seleccionados, setSeleccionados] = useState({});
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [mensaje, setMensaje] = useState(null);

  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 4000);
  };

  const asignar = (pedidoId) => {
    const rutChofer = seleccionados[pedidoId];
    if (!rutChofer) {
      mostrarMensaje('Selecciona un repartidor antes de presionar Asignar.', 'warning');
      return;
    }
    const chofer = repartidores.find((r) => r.rut === rutChofer);
    setPedidos(pedidoService.asignarRepartidor(pedidoId, rutChofer, chofer?.nombre || ''));
    mostrarMensaje(`Pedido #${pedidoId} asignado a ${chofer?.nombre}.`);
  };

  const pedidosFiltrados =
    filtroEstado === 'TODOS' ? pedidos : pedidos.filter((p) => p.estado === filtroEstado);
  const contar = (estado) => pedidos.filter((p) => p.estado === estado).length;

  return (
    <MainLayoutTemplate tituloHeader="Central de despacho">
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} text-center fw-bold`} role="alert">
          {mensaje.texto}
        </div>
      )}

      <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
        <div className="col"><TarjetaResumenCaja titulo="Total pedidos" monto={pedidos.length} esDinero={false} color="dark" /></div>
        <div className="col"><TarjetaResumenCaja titulo="Pendientes" monto={contar('PENDIENTE')} esDinero={false} color="warning" /></div>
        <div className="col"><TarjetaResumenCaja titulo="En camino" monto={contar('EN CAMINO')} esDinero={false} color="info" /></div>
        <div className="col"><TarjetaResumenCaja titulo="Entregados" monto={contar('ENTREGADO')} esDinero={false} color="success" /></div>
      </div>

      <div className="card shadow-sm border bg-white p-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 pb-3 border-bottom">
          <Title level={2} className="fs-5 fw-bold m-0">Gestión de despachos</Title>
          <div className="d-flex flex-wrap align-items-center gap-2">
            {estadosFiltro.map((f) => (
              <Boton
                key={f.valor}
                variant={filtroEstado === f.valor ? f.color : `outline-${f.color}`}
                className="btn-sm"
                onClick={() => setFiltroEstado(f.valor)}
              >
                {f.texto}
              </Boton>
            ))}
            <Boton variant="outline-secondary" className="btn-sm" onClick={() => setPedidos(pedidoService.getPedidos())}>
              🔄
            </Boton>
          </div>
        </div>

        {pedidosFiltrados.length === 0 ? (
          <p className="text-center text-muted py-4 mb-0">No hay pedidos con el filtro seleccionado.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="small">
                  <th>ID</th>
                  <th>Cliente / dirección</th>
                  <th>Detalle</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Repartidor</th>
                  <th className="col-asignar">Asignar repartidor</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="fw-bold text-danger">#{pedido.id}</td>
                    <td>
                      <strong className="d-block small">{pedido.clienteNombre}</strong>
                      <small className="text-muted">{pedido.direccion}{pedido.zona ? ` · ${pedido.zona}` : ''}</small>
                    </td>
                    <td className="small">{pedido.productoResumen}</td>
                    <td className="fw-bold text-success small">{formatearMoneda(pedido.total)}</td>
                    <td><Etiqueta variant={pedido.estado} /></td>
                    <td className="small fw-bold">{pedido.repartidorNombre || 'Sin asignar'}</td>
                    <td>
                      {pedido.estado === 'ENTREGADO' ? (
                        <span className="small text-muted">Pedido cerrado</span>
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          <select
                            className="form-select form-select-sm"
                            aria-label={`Repartidor para ${pedido.id}`}
                            value={seleccionados[pedido.id] ?? pedido.repartidorRut ?? ''}
                            onChange={(e) => setSeleccionados({ ...seleccionados, [pedido.id]: e.target.value })}
                          >
                            <option value="">-- Seleccionar --</option>
                            {repartidores.map((r) => (
                              <option key={r.rut} value={r.rut}>{r.nombre}</option>
                            ))}
                          </select>
                          <Boton variant="danger" className="btn-sm" onClick={() => asignar(pedido.id)}>
                            Asignar
                          </Boton>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayoutTemplate>
  );
};

export default OperadorPage;
