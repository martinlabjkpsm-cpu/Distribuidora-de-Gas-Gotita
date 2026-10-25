import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Boton } from '../components/Atoms';
import { ComprobantePedido } from '../components/Organisms/ComprobantePedido';
import { pedidoService } from '../services/pedidoService';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página: resultado del pedido. Ruta /pedido/:id
// Si el pedido existe -> pedido exitoso con su resumen. Si no (ej: /pedido/error) -> pedido no realizado.
export const PedidoResultadoPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pedido = pedidoService.obtenerPedido(params.id);
  useTituloPagina(pedido ? 'Pedido confirmado' : 'Pedido no realizado');

  if (!pedido) {
    return (
      <MainLayoutTemplate tituloHeader="No pudimos registrar tu pedido">
        <div className="alert alert-danger">
          Ocurrió un problema al guardar el pedido. Tu carrito sigue guardado, puedes intentarlo de nuevo.
        </div>
        <Boton variant="danger" onClick={() => navigate('/cliente')}>Volver a intentar</Boton>
      </MainLayoutTemplate>
    );
  }

  return (
    <MainLayoutTemplate tituloHeader="¡Pedido confirmado!">
      <p className="text-muted">
        Tu número de pedido es <strong>{pedido.id}</strong>. La operadora lo asignará a un repartidor y podrás
        seguir su estado en "Mis pedidos".
      </p>
      <ComprobantePedido pedido={pedido} />
      <div className="d-flex flex-wrap gap-2 mt-3">
        <Boton variant="danger" onClick={() => navigate('/mis-pedidos')}>Ver mis pedidos</Boton>
        <Boton variant="outline-secondary" onClick={() => navigate('/catalogo')}>Seguir comprando</Boton>
      </div>
    </MainLayoutTemplate>
  );
};

export default PedidoResultadoPage;
