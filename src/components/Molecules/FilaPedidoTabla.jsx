import React from 'react'; 
import { Select, Etiqueta, Boton } from '../Atoms'; 

export const FilaPedidoTabla = ({ 
  pedido, 
  repartidoresDisponibles = [], 
  repartidorSeleccionado, 
  onCambiarRepartidor, 
  onAsignar, 
  onVerEnMapa 
}) => { 
  const { id, clienteNombre, direccion, productoResumen, estado } = pedido; 
  const esCompletado = estado.toUpperCase() === 'ENTREGADO'; 
 
  return ( 
    <tr> 
      <td>#{id}</td> 
      <td> 
        <strong>{clienteNombre}</strong> 
        <br /> 
        <small className="text-muted">{direccion}</small> 
      </td> 
      <td>{productoResumen}</td> 
      <td> 
        {esCompletado ? ( 
          <span className="badge bg-light text-dark border">{repartidorSeleccionado}</span> 
        ) : ( 
          <Select 
            id={`select-rep-${id}`} 
            name={`select-rep-${id}`} 
            value={repartidorSeleccionado} 
            onChange={(e) => onCambiarRepartidor(id, e.target.value)} 
            options={repartidoresDisponibles} 
          /> 
        )} 
      </td> 
      <td> 
        <Etiqueta variant={estado}>{estado}</Etiqueta> 
      </td> 
      <td> 
        {esCompletado ? ( 
          <Boton variant="disabled" disabled> 
            Completado 
          </Boton> 
        ) : estado.toUpperCase() === 'EN CAMINO' ? ( 
          <Boton variant="secondary" onClick={() => onVerEnMapa(id)}> 
            Ver en Mapa 
          </Boton> 
        ) : ( 
          <Boton variant="primary" onClick={() => onAsignar(id)}> 
            Asignar 
          </Boton> 
        )} 
      </td> 
    </tr> 
  ); 
}; 

export default FilaPedidoTabla;
