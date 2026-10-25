import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Boton } from '../components/Atoms';
import { useTituloPagina } from '../hooks/useTituloPagina';

export const PaginaError = ({ tipo = '404' }) => {
  const esError403 = tipo === '403';
  useTituloPagina(esError403 ? 'Acceso restringido' : 'Página no encontrada');
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div className="card p-4 p-md-5 shadow-sm text-center max-w-md">
        <p className="display-1 text-danger fw-bold mb-0">{esError403 ? '403' : '404'}</p>
        <Title level={1} className="fs-4 mb-3">
          {esError403 ? 'Acceso restringido' : 'Página no encontrada'}
        </Title>
        <p className="text-muted mb-4">
          {esError403
            ? 'No tienes permisos para entrar a este panel.'
            : 'La página que buscas no existe.'}
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Boton variant="danger" onClick={() => navigate('/')}>Ir al inicio</Boton>
          {esError403 && <Boton variant="outline-secondary" onClick={() => navigate('/login')}>Iniciar sesión con otra cuenta</Boton>}
        </div>
      </div>
    </div>
  );
};

export default PaginaError;
