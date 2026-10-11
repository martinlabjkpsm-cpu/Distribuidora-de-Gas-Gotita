import React from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { GridProductosCliente } from '../components/Organisms/GridProductosCliente';
import { catalogoGasElVolcan } from '../data/catalogoGasElVolcan';

export const ClientePage = ({ cantidades = {}, onCantidadChange, tipoCliente = 'RESIDENCIAL' }) => {
  // Extraemos la lista original del catálogo
  const listaOriginal = catalogoGasElVolcan['productosYTarifas'] || [];

  // Mapeamos los productos seleccionando la tarifa según el tipo de cliente sin usar notación de punto en .map
  const productosParaGrid = listaOriginal['map']((prod) => {
    const codigo = prod['codigo'];
    const nombreProducto = prod['producto'];
    const precioComercial = prod['precioComercial'];
    const precioResidencial = prod['precioResidencial'];

    return {
      id: codigo,
      nombre: nombreProducto,
      precio: tipoCliente === 'COMERCIAL' ? precioComercial : precioResidencial,
      imagenSrc: `img/${codigo.toLowerCase()}.jpeg`
    };
  });

  return (
    <MainLayoutTemplate tituloHeader="Portal de Pedidos - Gas Gotita">
      <GridProductosCliente
        tituloSeccion="Catálogo Oficial de Productos"
        productos={productosParaGrid}
        cantidades={cantidades}
        onCantidadChange={onCantidadChange}
      />
    </MainLayoutTemplate>
  );
};

export default ClientePage;