import React from 'react';
import { DashboardLayoutTemplate } from '../Templates/DashboardLayoutTemplate';
import { ListaPedidosRepartidor } from '../Organisms/ListaPedidosRepartidor';

export const RepartidorPage = ({
  repartidorNombre,
  camionUnidad,
  estaOnline,
  pedidos,
  metodosPago,
  onMetodoPagoChange,
  onConfirmarEntrega,
  onIniciarRuta
}) => {
  return (
    <DashboardLayoutTemplate tituloHeader="Panel Móvil de Reparto">
      <ListaPedidosRepartidor
        repartidorNombre={repartidorNombre}
        camionUnidad={camionUnidad}
        estaOnline={estaOnline}
        pedidos={pedidos}
        metodosPago={metodosPago}
        onMetodoPagoChange={onMetodoPagoChange}
        onConfirmarEntrega={onConfirmarEntrega}
        onIniciarRuta={onIniciarRuta}
      />
    </DashboardLayoutTemplate>
  );
};

