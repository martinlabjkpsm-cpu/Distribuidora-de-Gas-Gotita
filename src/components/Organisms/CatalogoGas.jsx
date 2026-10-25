import React from 'react';
import { TarjetaProducto } from '../Molecules';
import { precioSegunCliente } from '../../utils/precios';

// Organismo: grilla responsiva de productos (1 columna en celular, 2 en tablet, 3 en escritorio).
export const CatalogoGas = ({ productos = [], tipoTarifa = 'RESIDENCIAL', onAgregar, onVerDetalle }) => {
  if (productos.length === 0) {
    return <div className="alert alert-warning text-center">No hay productos que mostrar.</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
      {productos.map((prod) => (
        <div key={prod.codigo} className="col">
          <TarjetaProducto
            producto={prod}
            precio={precioSegunCliente(prod, tipoTarifa)}
            etiquetaTarifa={tipoTarifa}
            onAgregar={() => onAgregar(prod)}
            onVerDetalle={onVerDetalle ? () => onVerDetalle(prod) : undefined}
          />
        </div>
      ))}
    </div>
  );
};

export default CatalogoGas;
