import { Title } from '../Atoms/Title';
import { TarjetaResumenCaja } from '../Molecules/TarjetaResumenCaja';

export const SeccionReporteCaja = ({ reporte = {} }) => {
    const { totalVentas = 0, efectivo = 0, transferencias = 0, debito = 0, estadoCuadre = 'Pendiente' } = reporte;

    return (
        <section className="organismo-reporte-caja">
            <Title level={2}>Reporte de Caja Diario y Finanzas</Title>
            <div className="resumen-caja-grid">
                <TarjetaResumenCaja titulo="Total Ventas Día" monto={totalVentas} />
                <TarjetaResumenCaja titulo="Efectivo Recibido" monto={efectivo} />
                <TarjetaResumenCaja titulo="Transferencias" monto={transferencias} />
                <TarjetaResumenCaja titulo="Tarjeta Débito" monto={debito} />
                <TarjetaResumenCaja titulo="Estado de Caja" monto={estadoCuadre} variante="destacada" />
            </div>
        </section>
    );
};
