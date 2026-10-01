import React from 'react';
import { Title } from '../atoms/Title';
import { IndicadorConexion } from '../molecules/IndicadorConexion';
import { TarjetaPedidoRepartidor } from '../molecules/TarjetaPedidoRepartidor';

export const ListaPedidosRepartidor = ({
  repartidorNombre,
  camionUnidad,
  estaOnline = true,
  pedidos = [],
  metodosPago = {},
  onMetodoPagoChange,
  onConfirmarEntrega,
  onIniciarRuta
}) => {
  return (
    <section className="organismo-repartidor">
      <IndicadorConexion
        repartidorNombre={repartidorNombre}
        camionUnidad={camionUnidad}
        estaOnline={estaOnline}
      />

      <Title level={2}>Mis Entregas Asignadas</Title>

      <div className="contenedor-pedidos-lista">
        {pedidos.length === 0 ? (
          <p className="sin-pedidos">No tienes entregas pendientes en este momento.</p>
        ) : (
          pedidos.map((pedido) => (
            <TarjetaPedidoRepartidor
              key={pedido.id}
              pedido={pedido}
              metodoPago={metodosPago[pedido.id] || 'EFECTIVO'}
              onMetodoPagoChange={onMetodoPagoChange}
              onConfirmarEntrega={onConfirmarEntrega}
              onIniciarRuta={onIniciarRuta}
            />
          ))
        )}
      </div>
    </section>
  );
};
