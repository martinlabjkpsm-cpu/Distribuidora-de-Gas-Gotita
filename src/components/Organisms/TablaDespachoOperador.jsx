import { Title } from '../atoms/Title';
import { FilaPedidoTabla } from '../molecules/FilaPedidoTabla';

export const TablaDespachoOperador = ({
    pedidos = [],
    repartidoresDisponibles = [],
    repartidoresSeleccionados = {},
    onCambiarRepartidor,
    onAsignar,
    onVerEnMapa
}) => {
    return (
        <section className="organismo-tabla-despacho">
            <Title level={2}>Solicitudes Pendientes y en Ruta</Title>
            <table className="tabla-pedidos-operador">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente / Dirección</th>
                        <th>Producto</th>
                        <th>Repartidor</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="texto-centro">No hay pedidos registrados en el día.</td>
                        </tr>
                    ) : (
                        pedidos.map((pedido) => (
                            <FilaPedidoTabla
                                key={pedido.id}
                                pedido={pedido}
                                repartidoresDisponibles={repartidoresDisponibles}
                                repartidorSeleccionado={repartidoresSeleccionados[pedido.id] || ''}
                                onCambiarRepartidor={onCambiarRepartidor}
                                onAsignar={onAsignar}
                                onVerEnMapa={onVerEnMapa}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
};
