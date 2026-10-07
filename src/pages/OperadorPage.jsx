import React from 'react';
import { DashboardLayoutTemplate } from '../Templates/DashboardLayoutTemplate';
import { TablaDespachoOperador } from '../Organisms/TablaDespachoOperador';

export const OperadorPage = ({
  pedidos,
  repartidoresDisponibles,
  repartidoresSeleccionados,
  onCambiarRepartidor,
  onAsignar,
  onVerEnMapa
}) => {
  return (
    <DashboardLayoutTemplate tituloHeader="Central de Despacho">
      <TablaDespachoOperador
        pedidos={pedidos}
        repartidoresDisponibles={repartidoresDisponibles}
        repartidoresSeleccionados={repartidoresSeleccionados}
        onCambiarRepartidor={onCambiarRepartidor}
        onAsignar={onAsignar}
        onVerEnMapa={onVerEnMapa}
      />
    </DashboardLayoutTemplate>
  );
};

