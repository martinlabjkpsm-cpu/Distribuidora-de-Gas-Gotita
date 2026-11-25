import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayoutTemplate } from '../components/Templates/AuthLayoutTemplate';
import { FormularioRegistro } from '../components/Organisms/FormularioRegistro';
import { LinkNav } from '../components/Atoms';
import { registrarCliente } from '../services/authService';
import { obtenerMensajeError } from '../services/errores';
import { crearRegistroRequestDto } from '../dto/auth.dto';
import { useTituloPagina } from '../hooks/useTituloPagina';

export const RegistroPage = () => {
  useTituloPagina('Registro');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  // Solo se llama cuando el formulario ya validó todos los campos.
  // POST /auth/register: el servidor vuelve a validar y asigna el rol CLIENTE.
  const registrar = async (datos) => {
    setCargando(true);
    setError('');
    try {
      await registrarCliente(crearRegistroRequestDto(datos));
      setMensajeExito('¡Cuenta creada! Te llevamos al inicio de sesión...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  return (
    <AuthLayoutTemplate titulo="Registro de cliente" subtitulo="Crea tu cuenta para hacer pedidos">
      {mensajeExito && <div className="alert alert-success py-2 small text-center">{mensajeExito}</div>}

      <FormularioRegistro onEnviar={registrar} errorGeneral={error} cargando={cargando} />

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