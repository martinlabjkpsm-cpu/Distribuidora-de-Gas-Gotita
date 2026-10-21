import React from 'react'; 

export const IndicadorConexion = ({ repartidorNombre, camionUnidad, estaOnline = true }) => { 
  return ( 
    <section className="estado-chofer p-3 bg-light border rounded mb-3"> 
      <p className="mb-1"> 
        <strong>Repartidor:</strong> {repartidorNombre} | <strong>Unidad:</strong> {camionUnidad} 
      </p> 
      <div className={`indicador-conexion ${estaOnline ? 'online' : 'offline'}`}> 
        <span className={`badge ${estaOnline ? 'bg-success' : 'bg-warning text-dark'}`}> 
          {estaOnline ? '🟢 En Ruta (Sincronizado)' : '🟡 Modo Offline (Guardando local)'} 
        </span> 
      </div> 
    </section> 
  ); 
}; 

export default IndicadorConexion;
