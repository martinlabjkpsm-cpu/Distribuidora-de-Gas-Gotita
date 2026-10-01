import React from 'react';

export const IndicadorConexion = ({ repartidorNombre, camionUnidad, estaOnline = true }) => {
  return (
    <section className="estado-chofer">
      <p>
        <strong>Repartidor:</strong> {repartidorNombre} | <strong>Unidad:</strong> {camionUnidad}
      </p>
      <div className={`indicador-conexion ${estaOnline ? 'online' : 'offline'}`}>
        <span>
          {estaOnline ? ' Estado: En Ruta (Sincronizado)' : ' Estado: Modo Offline (Guardando local)'}
        </span>
      </div>
    </section>
  );
};

