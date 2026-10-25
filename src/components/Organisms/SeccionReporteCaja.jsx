import React from 'react';
import { Title } from '../Atoms';
import { TarjetaResumenCaja } from '../Molecules';

// Organismo: resumen de caja del día (ventas por método de pago).
export const SeccionReporteCaja = ({ reporte = {} }) => {
  const { totalVentas = 0, efectivo = 0, transferencias = 0, debito = 0 } = reporte;

  return (
    <section className="mb-4">
      <Title level={2} className="fs-5 fw-bold mb-3">Reporte de caja</Title>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
        <div className="col"><TarjetaResumenCaja titulo="Total vendido" monto={totalVentas} color="success" /></div>
        <div className="col"><TarjetaResumenCaja titulo="Efectivo a rendir" monto={efectivo} color="primary" /></div>
        <div className="col"><TarjetaResumenCaja titulo="Transferencias" monto={transferencias} color="info" /></div>
        <div className="col"><TarjetaResumenCaja titulo="Débito / POS" monto={debito} color="secondary" /></div>
      </div>
    </section>
  );
};

export default SeccionReporteCaja;
