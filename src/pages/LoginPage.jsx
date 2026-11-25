import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayoutTemplate } from '../components/Templates/AuthLayoutTemplate';
import { FormularioLogin } from '../components/Organisms/FormularioLogin';
import { LinkNav } from '../components/Atoms';
import { useAuth } from '../context/AuthContext';
import { iniciarSesion } from '../services/authService';
import { obtenerMensajeError } from '../services/errores';
import { crearLoginRequestDto, crearSesionDesdeLogin } from '../dto/auth.dto';
import { useTituloPagina } from '../hooks/useTituloPagina';

const rutaSegunRol = {
  ADMINISTRADOR: '/admin',
  OPERADOR: '/operador',
  REPARTIDOR: '/repartidor',
  CLIENTE: '/cliente',
};

// Página: inicio de sesión. El formulario valida; la página llama a la API (POST /auth/login),
// guarda la sesión y navega según el rol que devolvió el servidor.
export const LoginPage = () => {
  useTituloPagina('Iniciar sesión');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);

  const ingresar = async (formulario) => {
    setCargando(true);
    setErrorGeneral('');
    try {
      const respuesta = await iniciarSesion(crearLoginRequestDto(formulario));
      const sesion = crearSesionDesdeLogin(respuesta);
      login(sesion);
      navigate(rutaSegunRol[sesion.usuario.rol] || '/cliente');
    } catch (error) {
      setErrorGeneral(obtenerMensajeError(error));
    } finally {
      setCargando(false);
    }
  };

  return (
    <AuthLayoutTemplate titulo="Iniciar sesión" subtitulo="Ingresa con tu RUT y contraseña">
      <FormularioLogin onEnviar={ingresar} errorGeneral={errorGeneral} cargando={cargando} />

      <div className="text-center mt-3 pt-3 border-top small d-flex flex-column gap-1">
        <span>
          ¿No tienes cuenta?{' '}
          <LinkNav to="/registro" onNavegar={navigate} className="text-danger fw-bold">Regístrate aquí</LinkNav>
        </span>
        <LinkNav to="/" onNavegar={navigate} className="text-secondary">← Volver al inicio</LinkNav>
      </div>
    </AuthLayoutTemplate>
  );
};

export default LoginPage;