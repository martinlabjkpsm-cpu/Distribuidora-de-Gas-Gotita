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
    <article className={`tarjeta-pedido card p-3 mb-3 border shadow-sm ${estado.toLowerCase()}`}> 
      <header className="tarjeta-header d-flex justify-content-between align-items-center mb-2"> 
        <Title level={3} className="fs-5 m-0">Pedido #{id}</Title> 
        <Etiqueta variant={estado}>{estado}</Etiqueta> 
      </header> 
 
      <div className="tarjeta-body mb-3"> 
        <p className="mb-1"><strong>Cliente:</strong> {clienteNombre}</p> 
        <p className="mb-1"><strong>Dirección:</strong> {direccion}</p> 
        {indicaciones && ( 
          <p className="indicaciones-despacho text-muted small fst-italic mb-1"> 
            "{indicaciones}" 
          </p> 
        )} 
        <p className="mb-1"><strong>Detalle:</strong> {detalle}</p> 
        <p className="monto-cobro text-success fw-bold fs-5 mt-2 mb-0"> 
          Monto a Cobrar: \${total ? total.toLocaleString('es-CL') : '0'} CLP
        </p> 
      </div> 
 
      {esEnCamino ? ( 
        <form onSubmit={(e) => onConfirmarEntrega(e, id)} className="form-confirmar-entrega"> 
          <fieldset className="border-0 p-0 m-0"> 
            <legend className="fs-6 fw-bold mb-2">Confirmación de Pago y Entrega</legend> 
            <div className="campo-pago mb-2"> 
              <label htmlFor={`pago-${id}`} className="form-label small">Método de Pago Recibido:</label> 
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

export default TarjetaPedidoRepartidor;
