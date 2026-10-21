
import React, { useState, useEffect } from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton } from '../components/Atoms';
import { useAuth } from '../context/AuthContext';
import { pedidoService } from '../services/pedidoService';
import { formatearMoneda, formatearFecha } from '../utils/formato';

export const RepartidorPage = () => {
  const { usuario } = useAuth(); 
  const [misPedidos, setMisPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [notificacion, setNotificacion] = useState(null);


  const cargarMisPedidos = () => {
    const todosPedidos = pedidoService.getPedidos();

    const asignados = todosPedidos.filter(
      (p) => p.repartidorRut === usuario?.rut
    );
    setMisPedidos(asignados);
  };

  useEffect(() => {
    if (usuario?.rut) {
      cargarMisPedidos();
    }
  }, [usuario]);

  const handleCambiarEstado = (pedidoId, nuevoEstado) => {
    pedidoService.cambiarEstado(pedidoId, nuevoEstado);
    cargarMisPedidos(); // Recargar lista actualizada
    mostrarAlerta(`Pedido #${pedidoId} actualizado a "${nuevoEstado}".`);
  };

  const mostrarAlerta = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(null), 3500);
  };


  const pedidosFiltrados = filtroEstado === 'TODOS'
    ? misPedidos
    : misPedidos.filter((p) => p.estado === filtroEstado);


  const pendientesYCamino = misPedidos.filter((p) => p.estado !== 'ENTREGADO' && p.estado !== 'CANCELADO').length;
  const entregadosHoy = misPedidos.filter((p) => p.estado === 'ENTREGADO').length;
  const totalRecaudado = misPedidos
    .filter((p) => p.estado === 'ENTREGADO')
    .reduce((acc, p) => acc + (p.total || 0), 0);

  return (
    <MainLayoutTemplate tituloHeader={`Panel Repartidor - Gas Gotita - ${usuario?.nombre || 'Chofer'}`}>
      <div className="container py-2 max-w-lg">
        
      
        {notificacion && (
          <div className="alert alert-success text-center py-2 mb-3 fw-bold" role="alert">
            ✓ {notificacion}
          </div>
        )}

       
        <div className="row g-2 mb-3 text-center">
          <div className="col-4">
            <div className="card p-2 bg-primary text-white shadow-sm border-0">
              <span className="small text-uppercase">Por Entregar</span>
              <strong className="fs-4">{pendientesYCamino}</strong>
            </div>
          </div>
          <div className="col-4">
            <div className="card p-2 bg-success text-white shadow-sm border-0">
              <span className="small text-uppercase">Entregados</span>
              <strong className="fs-4">{entregadosHoy}</strong>
            </div>
          </div>
          <div className="col-4">
            <div className="card p-2 bg-dark text-white shadow-sm border-0">
              <span className="small text-uppercase">Rendir \$</span>
              <strong className="fs-6 d-block mt-1">{formatearMoneda(totalRecaudado)}</strong>
            </div>
          </div>
        </div>

       
        <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 border rounded shadow-sm">
          <span className="fw-bold small ms-1">Hoja de Ruta:</span>
          <div className="btn-group btn-group-sm" role="group">
            {['TODOS', 'EN CAMINO', 'ENTREGADO'].map((est) => (
              <button
                key={est}
                type="button"
                className={`btn ${filtroEstado === est ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setFiltroEstado(est)}
              >
                {est}
              </button>
            ))}
          </div>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-secondary"
            onClick={cargarMisPedidos}
            title="Actualizar"
          >
            🔄
          </button>
        </div>

     
        {pedidosFiltrados.length === 0 ? (
          <div className="card p-4 text-center text-muted bg-white border shadow-sm">
            <p className="m-0">No tienes pedidos asignados en estado "{filtroEstado}".</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {pedidosFiltrados.map((ped) => (
              <div 
                key={ped.id} 
                className={`card shadow-sm border-2 ${
                  ped.estado === 'ENTREGADO' 
                    ? 'border-success bg-light' 
                    : ped.estado === 'EN CAMINO'
                    ? 'border-primary bg-white'
                    : 'border-warning bg-white'
                }`}
              >
                <div className="card-header bg-transparent d-flex justify-content-between align-items-center py-2">
                  <strong className="fs-6 text-primary">{ped.id}</strong>
                  <span
                    className={`badge ${
                      ped.estado === 'PENDIENTE'
                        ? 'bg-warning text-dark'
                        : ped.estado === 'EN CAMINO'
                        ? 'bg-primary'
                        : ped.estado === 'ENTREGADO'
                        ? 'bg-success'
                        : 'bg-danger'
                    }`}
                  >
                    {ped.estado}
                  </span>
                </div>

                <div className="card-body py-2">
                  <h6 className="card-title fw-bold mb-1">{ped.clienteNombre}</h6>
                  
            
                  <div className="p-2 bg-light border rounded mb-2">
                    <span className="d-block fw-bold text-dark fs-6">
                      📍 {ped.direccion}
                    </span>
                    {ped.indicaciones && (
                      <small className="text-muted d-block mt-1">
                        📝 Indicación: "{ped.indicaciones}"
                      </small>
                    )}
                  </div>

          
                  <div className="mb-2">
                    <small className="text-muted d-block">Carga a Entregar:</small>
                    <strong className="text-dark small d-block">
                      {ped.productoResumen}
                    </strong>
                  </div>

       
                  <div className="d-flex justify-content-between align-items-center border-top pt-2">
                    <div>
                      <small className="text-muted d-block">Cobrar en Terreno:</small>
                      <strong className="fs-5 text-success">
                        {formatearMoneda(ped.total)}
                      </strong>
                    </div>
                    <span className="badge bg-secondary">
                      Pago: {ped.metodoPago}
                    </span>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-top-0 pt-0 pb-3">
                  {ped.estado !== 'ENTREGADO' ? (
                    <div className="d-grid gap-2">
                      {ped.estado === 'PENDIENTE' && (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg fw-bold"
                          onClick={() => handleCambiarEstado(ped.id, 'EN CAMINO')}
                        >
                          Iniciar Ruta ("En Camino")
                        </button>
                      )}

                      {ped.estado === 'EN CAMINO' && (
                        <button
                          type="button"
                          className="btn btn-success btn-lg fw-bold"
                          onClick={() => handleCambiarEstado(ped.id, 'ENTREGADO')}
                        >
                          ✓ Confirmar Entrega y Cobro
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-success fw-bold small py-1">
                      ✓ Pedido Entregado ({formatearFecha(ped.fecha)})
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </MainLayoutTemplate>
  );
};

export default RepartidorPage;