import React from 'react';
import { Title, Etiqueta, Select, Boton } from '../Atoms';

export const TarjetaPedidoRepartidor = ({
  pedido,
  metodoPago,
  onMetodoPagoChange,
  onConfirmarEntrega,
  onIniciarRuta
}) => {
  const { id, estado, clienteNombre, direccion, indicaciones, detalle, total } = pedido;
  const esEnCamino = estado.toUpperCase() === 'EN CAMINO';

  return (
    <article className={`tarjeta-pedido ${estado.toLowerCase()}`}>
      <header className="tarjeta-header">
        <Title level={3}>Pedido #{id}</Title>
        <Etiqueta variant={estado}>{estado}</Etiqueta>
      </header>

      <div className="tarjeta-body">
        <p><strong>Cliente:</strong> {clienteNombre}</p>
        <p><strong>Dirección:</strong> {direccion}</p>
        {indicaciones && (
          <p className="indicaciones-despacho"> <em>"{indicaciones}"</em></p>
        )}
        <p><strong>Detalle:</strong> {detalle}</p>
        <p className="monto-cobro">
          <strong>Monto a Cobrar:</strong> \${total.toLocaleString('es-CL')}
        </p>
      </div>

      {esEnCamino ? (
        <form onSubmit={(e) => onConfirmarEntrega(e, id)} className="form-confirmar-entrega">
          <fieldset>
            <legend>Confirmación de Pago y Entrega</legend>
            <div className="campo-pago">
              <label htmlFor={`pago-${id}`}>Método de Pago Recibido:</label>
              <Select
                id={`pago-${id}`}
                name={`pago-${id}`}
                value={metodoPago}
                onChange={(e) => onMetodoPagoChange(id, e.target.value)}
                options={[
                  { value: 'EFECTIVO', label: 'Efectivo (\$)' },
                  { value: 'TRANSFERENCIA', label: 'Transferencia Bancaria' },
                  { value: 'DEBITO', label: 'Tarjeta Débito / POS' }
                ]}
                required
              />
            </div>
            <Boton type="submit" variant="primary" fullWidth>
               Confirmar Entrega
            </Boton>
          </fieldset>
        </form>
      ) : (
        <Boton variant="secondary" fullWidth onClick={() => onIniciarRuta(id)}>
           Iniciar Ruta hacia este Pedido
        </Boton>
      )}
    </article>
  );
};
