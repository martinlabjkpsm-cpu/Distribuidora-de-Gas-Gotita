import React from 'react';
import { Title } from '../Atoms/Title';
import { TarjetaProducto } from '../Molecules/TarjetaProducto'; // ⚠️ 'Molecules' con M mayúscula

export const GridProductosCliente = ({
  tituloSeccion = 'Nuestros Productos',
  productos = [],
  cantidades = {},
  onCantidadChange,
}) => {
  return (
    <section className="seccion-catalogo">
      <Title level={2}>{tituloSeccion}</Title>
      <div className="grid-productos d-flex flex-wrap gap-3 mt-3">
        {productos.map((prod) => (
          <TarjetaProducto
            key={prod.id}
            id={prod.id}
            nombre={prod.nombre}
            imagenSrc={prod.imagenSrc}
            precio={prod.precio}
            cantidad={cantidades[prod.id] || 0}
            onCantidadChange={onCantidadChange}
          />
        ))}
      </div>
    </section>
  );
};