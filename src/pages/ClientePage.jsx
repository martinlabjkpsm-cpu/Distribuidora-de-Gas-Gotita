import React from 'react';
import { MainLayoutTemplate } from '../Templates/MainLayoutTemplate';
import { GridProductosCliente } from '../Organisms/GridProductosCliente';

export const ClientePage = ({
  tituloSeccion,
  productos,
  cantidades,
  onCantidadChange
}) => {
  return (
    <MainLayoutTemplate tituloHeader="Portal de Pedidos - Gas Gotita">
      <GridProductosCliente
        tituloSeccion={tituloSeccion}
        productos={productos}
        cantidades={cantidades}
        onCantidadChange={onCantidadChange}
      />
    </MainLayoutTemplate>
  );
};

