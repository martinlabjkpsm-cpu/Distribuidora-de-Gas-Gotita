import React, { useState } from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Boton, Etiqueta } from '../components/Atoms';
import { TarjetaResumenCaja } from '../components/Molecules';
import { useAuth } from '../context/AuthContext';
import { pedidoService } from '../services/pedidoService';
import { formatearMoneda } from '../utils/formato';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página: el repartidor ve SOLO sus pedidos y cambia el estado (EN CAMINO -> ENTREGADO).
export const RepartidorPage = () => {
  useTituloPagina('Mis entregas');
  const { usuario } = useAuth();

  const leerMisPedidos = () =>
    pedidoService.getPedidos().filter((p) => p.repartidorRut === usuario?.rut);

  const [misPedidos, setMisPedidos] = useState(leerMisPedidos);
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [notificacion, setNotificacion] = useState(null);

  const cambiarEstado = (pedidoId, nuevoEstado) => {
    pedidoService.cambiarEstado(pedidoId, nuevoEstado);
    setMisPedidos(leerMisPedidos());
    setNotificacion(`Pedido #${pedidoId} actualizado a "${nuevoEstado}".`);
    setTimeout(() => setNotificacion(null), 3500);
  };

  const pedidosFiltrados =
    filtroEstado === 'TODOS' ? misPedidos : misPedidos.filter((p) => p.estado === filtroEstado);
  const entregados = misPedidos.filter((p) => p.estado === 'ENTREGADO');
  const totalRecaudado = entregados.reduce((acc, p) => acc + (p.total || 0), 0);

  return (
    <MainLayoutTemplate tituloHeader={`Mis entregas - ${usuario?.nombre || 'Repartidor'}`}>
      {notificacion && <div className="alert alert-success text-center fw-bold" role="alert">✓ {notificacion}</div>}

      <div className="row row-cols-1 row-cols-sm-3 g-2 mb-3">
        <div className="col"><TarjetaResumenCaja titulo="Por entregar" monto={misPedidos.length - entregados.length} esDinero={false} /></div>
        <div className="col"><TarjetaResumenCaja titulo="Entregados" monto={entregados.length} esDinero={false} color="success" /></div>
        <div className="col"><TarjetaResumenCaja titulo="Dinero a rendir" monto={totalRecaudado} color="dark" /></div>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 bg-white p-2 border rounded shadow-sm">
        <span className="fw-bold small">Hoja de ruta:</span>
        <div className="d-flex flex-wrap gap-1">
          {['TODOS', 'PENDIENTE', 'EN CAMINO', 'ENTREGADO'].map((est) => (
            <Boton key={est} variant={filtroEstado === est ? 'dark' : 'outline-dark'} className="btn-sm" onClick={() => setFiltroEstado(est)}>
              {est}
            </Boton>
          ))}
          <Boton variant="outline-secondary" className="btn-sm" onClick={() => setMisPedidos(leerMisPedidos())}>🔄</Boton>
        </div>
      </div>

      {pedidosFiltrados.length === 0 ? (
        <div className="card p-4 text-center text-muted">No tienes pedidos en estado "{filtroEstado}".</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {pedidosFiltrados.map((ped) => (
            <div className="col" key={ped.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <strong className="text-danger">#{ped.id}</strong>
                  <Etiqueta variant={ped.estado} />
                </div>
                <div className="card-body small">
                  <p className="fw-bold mb-1">{ped.clienteNombre}</p>
                  <p className="mb-1">📍 {ped.direccion}{ped.zona ? ` (${ped.zona})` : ''}</p>
                  {ped.indicaciones && <p className="text-muted fst-italic mb-1">"{ped.indicaciones}"</p>}
                  <p className="mb-1"><strong>Carga:</strong> {ped.productoResumen}</p>
                  <p className="mb-0">
                    <strong>Cobrar:</strong> <span className="text-success fw-bold">{formatearMoneda(ped.total)}</span> · {ped.metodoPago}
                  </p>
                </div>
                <div className="card-footer bg-white border-0 pb-3">
                  {ped.estado === 'PENDIENTE' && (
                    <Boton variant="primary" fullWidth onClick={() => cambiarEstado(ped.id, 'EN CAMINO')}>Iniciar ruta (en camino)</Boton>
                  )}
                  {ped.estado === 'EN CAMINO' && (
                    <Boton variant="success" fullWidth onClick={() => cambiarEstado(ped.id, 'ENTREGADO')}>✓ Confirmar entrega y cobro</Boton>
                  )}
                  {ped.estado === 'ENTREGADO' && <p className="text-success fw-bold text-center small mb-0">Pedido entregado</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayoutTemplate>
  );
};

export default RepartidorPage;
