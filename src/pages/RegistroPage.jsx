import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayoutTemplate } from '../components/Templates/AuthLayoutTemplate';
import { FormularioRegistro } from '../components/Organisms/FormularioRegistro';
import { LinkNav } from '../components/Atoms';
import { usuarioService } from '../services/usuarioService';
import { useTituloPagina } from '../hooks/useTituloPagina';

export const RegistroPage = () => {
  useTituloPagina('Registro');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // Solo se llama cuando el formulario ya validó todos los campos.
  const registrar = (datos) => {
    try {
      usuarioService.crearUsuario({ ...datos, rol: 'CLIENTE' });
      setError('');
      setMensajeExito('¡Cuenta creada! Te llevamos al inicio de sesión...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayoutTemplate titulo="Registro de cliente" subtitulo="Crea tu cuenta para hacer pedidos">
      {mensajeExito && <div className="alert alert-success py-2 small text-center">{mensajeExito}</div>}

      <FormularioRegistro onEnviar={registrar} errorGeneral={error} />

      <div className="text-center mt-3 pt-3 border-top small d-flex flex-column gap-1">
        <span>
          ¿Ya tienes cuenta?{' '}
          <LinkNav to="/login" onNavegar={navigate} className="fw-bold">Inicia sesión aquí</LinkNav>
        </span>
        <LinkNav to="/" onNavegar={navigate} className="text-secondary">← Volver al inicio</LinkNav>
      </div>
    </AuthLayoutTemplate>
  );
};

export default RegistroPage;
