import React from 'react';
import { Title, Imagen } from '../Atoms';

export const CatalogoDestacado = ({ productos }) => {
  return (
    <section className="mb-5">
      <Title level={2} className="text-center fw-bold mb-4">
        Nuestros Formatos de Cilindros
      </Title>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {productos.map((cilindro) => (
          <div key={cilindro.id} className="col">
            <div className="card h-100 shadow-sm border-0 text-center p-3">
              <Imagen
                src={cilindro.imagenSrc}
                alt={cilindro.nombre}
                className="card-img-top mx-auto my-2 img-cilindro-cat"
              />
              <div className="card-body p-2 d-flex flex-column">
                <Title level={3} className="fs-5 fw-bold mb-2">
                  {cilindro.nombre}
                </Title>
                <p className="card-text small text-muted flex-grow-1">
                  {cilindro.descripcion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CatalogoDestacado;