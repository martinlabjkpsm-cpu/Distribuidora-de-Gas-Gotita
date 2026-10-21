import React from 'react';
import { Title, Boton } from '../Atoms';

export const BannerInicio = ({ onNavigateLogin, onNavigateRegistro }) => {
  return (
    <section className="text-center py-5 bg-light rounded-4 shadow-sm mb-5 px-3">
      <Title level={1} className="display-5 fw-bold text-danger mb-3">
        Distribuidora Gas Gotita
      </Title>
      <p className="lead text-secondary mb-4 mx-auto max-w-banner">
        Despacho de gas licuado rápido, seguro y con seguimiento digital en Chillán y la Región del Ñuble.
      </p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Boton variant="primary" className="btn-lg fw-bold" onClick={onNavigateLogin}>
           Iniciar Sesión
        </Boton>
        <Boton variant="outline-success" className="btn-lg fw-bold" onClick={onNavigateRegistro}>
           Registrarse
        </Boton>
      </div>
    </section>
  );
};

export default BannerInicio;