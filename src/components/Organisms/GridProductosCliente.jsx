import React from 'react';
import { Title } from '../Atoms';
import { TarjetaProducto } from '../Molecules';

export const GridProductosCliente = ({
  tituloSeccion = 'Nuestros Productos',
  productos = [],
  cantidades = {},
  onCantidadChange,
  categoriaActiva = 'TODAS',
  onCambiarCategoria,
  categorias = []
}) => {
  const productosFiltrados = categoriaActiva === 'TODAS'
    ? productos
    : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <section className="seccion-catalogo">
      <Title level={2} className="fs-4 fw-bold mb-3">{tituloSeccion}</Title>


      <div className="filtros-categoria mb-4 d-flex flex-wrap gap-2">
        <button
          type="button"
          className={`btn btn-sm ${categoriaActiva === 'TODAS' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => onCambiarCategoria('TODAS')}
        >
          Ver Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`btn btn-sm ${categoriaActiva === cat ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => onCambiarCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {productosFiltrados.length === 0 ? (
          <div className="col-12 alert alert-warning text-center">
            No hay productos disponibles en esta categoría.
          </div>
        ) : (
          productosFiltrados.map((prod) => (
            <div key={prod.id} className="col d-flex align-items-stretch">
              <TarjetaProducto
                id={prod.id}
                nombre={prod.nombre}
                imagenSrc={prod.imagenSrc}
                precio={prod.precio}
                cantidad={cantidades[prod.id] || 0}
                onCantidadChange={onCantidadChange}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default GridProductosCliente;