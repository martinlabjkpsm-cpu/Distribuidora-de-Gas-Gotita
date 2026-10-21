import React from 'react';
import { LinkNav, Title, Boton } from '../components/Atoms';

export const PaginaError = ({ tipo = '404' }) => {
  const esError403 = tipo === '403';

  return (
    <div className="container text-center py-5 d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-5 shadow-sm border rounded bg-white max-w-md">
        <h1 className="display-1 text-danger fw-bold">{esError403 ? '403' : '404'}</h1>
        <Title level={2} className="fs-4 mb-3">
          {esError403 ? 'Acceso Restringido' : 'Página No Encontrada'}
        </Title>
        <p className="text-muted mb-4">
          {esError403
            ? 'No tienes los permisos necesarios para acceder a este panel de control.'
            : 'La página que buscas no existe o el servidor no pudo procesar la solicitud.'}
        </p>
        <LinkNav to="/login">
          <Boton variant="primary" className="btn btn-primary">
            Regresar al Inicio de Sesión
          </Boton>
        </LinkNav>
      </div>
    </div>
  );
};

export default PaginaError;