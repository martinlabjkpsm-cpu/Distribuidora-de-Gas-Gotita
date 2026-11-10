import React from 'react';
import { Boton } from '../Atoms';
import { formatearMoneda } from '../../utils/formato';
import { esStockCritico } from '../../utils/precios';

// Organismo: tabla del catálogo para el administrador (mostrar, editar, eliminar).
export const TablaProductos = ({ productos = [], onEditar, onEliminar }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr className="small">
            <th>Código</th>
            <th>Producto</th>
            <th>Residencial</th>
            <th>Comercial</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted py-3">No hay productos.</td>
            </tr>
          ) : (
            productos.map((p) => (
              <tr key={p.codigo}>
                <td className="small fw-bold">{p.codigo}</td>
                <td>
                  <strong className="d-block small">{p.producto}</strong>
                  <small className="text-muted">{p.categoria}</small>
                </td>
                <td className="small">{formatearMoneda(p.precioResidencial)}</td>
                <td className="small">{formatearMoneda(p.precioComercial)}</td>
                <td>
                  <span className={`badge ${esStockCritico(p) ? 'bg-danger' : 'bg-success'}`}>{p.stockActual}</span>
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-1">
                    {onEditar && (
                      <Boton texto="Editar" variante="outline-primary" tamano="sm" onClick={() => onEditar(p)} />
                    )}
                    {onEliminar && (
                      <Boton texto="Eliminar" variante="outline-danger" tamano="sm" onClick={() => onEliminar(p)} />
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;
