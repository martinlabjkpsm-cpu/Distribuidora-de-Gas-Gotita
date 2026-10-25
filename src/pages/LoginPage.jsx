import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayoutTemplate } from '../components/Templates/AuthLayoutTemplate';
import { FormularioLogin } from '../components/Organisms/FormularioLogin';
import { LinkNav } from '../components/Atoms';
import { useAuth } from '../context/AuthContext';
import { usuarioService } from '../services/usuarioService';
import { useTituloPagina } from '../hooks/useTituloPagina';

const rutaSegunRol = {
  ADMINISTRADOR: '/admin',
  OPERADOR: '/operador',
  REPARTIDOR: '/repartidor',
  CLIENTE: '/cliente',
};

// Página: inicio de sesión. El formulario valida; la página decide qué hacer
// cuando los datos son correctos (buscar el usuario y navegar según su rol).
export const LoginPage = () => {
  useTituloPagina('Iniciar sesión');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorGeneral, setErrorGeneral] = useState('');

  const ingresar = ({ rut, password }) => {
    try {
      const usuario = usuarioService.autenticar(rut, password);
      login(usuario);
      navigate(rutaSegunRol[usuario.rol] || '/cliente');
    } catch (error) {
      setErrorGeneral(error.message);
    }
  };

  return (
    <AuthLayoutTemplate titulo="Iniciar sesión" subtitulo="Ingresa con tu RUT y contraseña">
      <FormularioLogin onEnviar={ingresar} errorGeneral={errorGeneral} />

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
