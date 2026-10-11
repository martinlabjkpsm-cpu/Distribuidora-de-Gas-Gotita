import React from 'react';
import { DashboardLayoutTemplate } from '../components/Templates/DashboardLayoutTemplate';
import { SeccionReporteCaja } from '../components/Organisms/SeccionReporteCaja';
import { catalogoGasElVolcan } from '../data/catalogoGasElVolcan';

export const AdminPage = ({ reporte }) => {
 
  const productos = catalogoGasElVolcan['productosYTarifas'] || [];

  return (
    <DashboardLayoutTemplate tituloHeader="Panel de Administración - Gas Gotita">
      
      <section className="mb-4">
        <h2>Inventario y Tarifas Oficiales</h2>
        <table className="table table-bordered table-striped mt-2">
          <thead>
            <tr>
              <th>Código</th>
              <th>Categoría</th>
              <th>Producto</th>
              <th>Precio Res.</th>
              <th>Precio Com.</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos['map']((prod) => {
              const codigo = prod['codigo'];
              const categoria = prod['categoria'];
              const nombreProducto = prod['producto'];
              const precioRes = prod['precioResidencial'];
              const precioCom = prod['precioComercial'];
              const stockActual = prod['stockActual'];
              const unidad = prod['unidad'];

              return (
                <tr key={codigo}>
                  <td><strong>{codigo}</strong></td>
                  <td>{categoria}</td>
                  <td>{nombreProducto}</td>
                  <td>\${precioRes.toLocaleString('es-CL')}</td>
                  <td>\${precioCom.toLocaleString('es-CL')}</td>
                  <td>
                    <span className={`badge ${stockActual < 20 ? 'bg-danger' : 'bg-success'}`}>
                      {stockActual} {unidad}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <SeccionReporteCaja reporte={reporte} />
    </DashboardLayoutTemplate>
  );
};

export default AdminPage;