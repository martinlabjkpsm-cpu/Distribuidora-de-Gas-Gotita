import React, { useState } from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Boton, Etiqueta } from '../components/Atoms';
import { ComprobantePedido } from '../components/Organisms/ComprobantePedido';
import { useAuth } from '../context/AuthContext';
import { pedidoService } from '../services/pedidoService';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearMoneda, formatearFecha } from '../utils/formato';

// Página: seguimiento de los pedidos del cliente (ve el estado actualizado).
export const MisPedidosPage = () => {
  useTituloPagina('Mis pedidos');
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState(() => pedidoService.listarPorCliente(usuario?.rut));
  const [seleccionado, setSeleccionado] = useState(null);

  const actualizar = () => setPedidos(pedidoService.listarPorCliente(usuario?.rut));

  return (
    <MainLayoutTemplate tituloHeader="Mis pedidos">
      <div className="d-flex justify-content-end mb-3">
        <Boton variant="outline-secondary" className="btn-sm" onClick={actualizar}>🔄 Actualizar estados</Boton>
      </div>

      {pedidos.length === 0 ? (
        <div className="alert alert-info">Todavía no tienes pedidos.</div>
      ) : (
        <div className="table-responsive bg-white border rounded shadow-sm mb-4">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Pedido</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold">{p.id}</td>
                  <td className="small">{formatearFecha(p.fecha)}</td>
                  <td>{formatearMoneda(p.total)}</td>
                  <td><Etiqueta variant={p.estado} /></td>
                  <td>
                    <Boton variant="outline-danger" className="btn-sm" onClick={() => setSeleccionado(p)}>Ver detalle</Boton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {seleccionado && <ComprobantePedido pedido={seleccionado} />}
    </MainLayoutTemplate>
  );
};

export default MisPedidosPage;
