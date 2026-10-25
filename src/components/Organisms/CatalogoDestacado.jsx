import React from 'react';
import { Title, Imagen } from '../Atoms';

// Organismo: tarjetas de los cilindros destacados en la página de inicio.
export const CatalogoDestacado = ({ productos = [], onVerProducto }) => {
  return (
    <section className="mb-5">
      <Title level={2} className="fs-4 fw-bold mb-3">Nuestros cilindros</Title>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
        {productos.map((p) => (
          <div key={p.codigo} className="col">
            <div className="card h-100 shadow-sm border-0 text-center p-3">
              <Imagen src={p.imagenSrc} alt={p.producto} className="img-fluid img-cilindro-cat mx-auto mb-2" />
              <div className="card-body p-2 d-flex flex-column">
                <Title level={3} className="fs-6 fw-bold mb-2">{p.producto}</Title>
                <p className="small text-muted flex-grow-1">{p.descripcion}</p>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onVerProducto(p)}>
                  Ver producto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CatalogoDestacado;
