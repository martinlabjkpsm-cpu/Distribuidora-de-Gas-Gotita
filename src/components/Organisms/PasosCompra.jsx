import React from 'react';
import { Title } from '../Atoms';

export const PasosCompra = ({ pasos }) => {
  return (
    <section className="py-4 bg-white rounded-4 shadow-sm p-4 border">
      <Title level={2} className="text-center fw-bold mb-4">
        ¿Cómo Funciona el Despacho Digital?
      </Title>
      <div className="row g-4">
        {pasos.map((paso) => (
          <div key={paso.numero} className="col-md-4 text-center">
            <div className="rounded-circle bg-danger text-white d-inline-flex align-items-center justify-content-center mb-3 fs-4 fw-bold paso-circulo">
              {paso.numero}
            </div>
            <Title level={3} className="fs-5 fw-bold mb-2">
              {paso.titulo}
            </Title>
            <p className="small text-muted mb-0">
              {paso.descripcion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PasosCompra;