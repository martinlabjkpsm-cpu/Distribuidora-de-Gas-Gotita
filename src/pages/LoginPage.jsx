import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usuarioService } from '../services/usuarioService';
import { Title, Boton } from '../components/Atoms';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { validarRutOEmailFormulario, validarPasswordFormulario } from '../utils/validaciones';

export const LoginPage = () => {
  // 1. Hook propio para el título de la pestaña (Llamado en el nivel superior)
  useTituloPagina('Iniciar Sesión');

  // Estados para inputs controlados
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  // Estado para mensajes de error de validación por campo
  const [errores, setErrores] = useState({ rut: '', password: '' });
  const [errorGeneral, setErrorGeneral] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorGeneral('');

    // 2. Ejecutar validaciones puras antes de procesar
    const errRut = validarRutOEmailFormulario(rut);
    const errPass = validarPasswordFormulario(password);

    setErrores({ rut: errRut, password: errPass });

    // Si algún campo tiene error, detener el envío
    if (errRut || errPass) return;

    const rutLimpio = rut.trim();
    const passLimpia = password.trim();

    let usuarioEncontrado = null;

    // Búsqueda vía servicio o datos locales
    if (usuarioService && typeof usuarioService.login === 'function') {
      usuarioEncontrado = usuarioService.login({
        rut: rutLimpio,
        email: rutLimpio,
        password: passLimpia,
        contrasena: passLimpia
      });

      if (!usuarioEncontrado) {
        usuarioEncontrado = usuarioService.login(rutLimpio, passLimpia);
      }
    }

    if (!usuarioEncontrado && usuarioService && typeof usuarioService.getUsuarios === 'function') {
      const listaUsuarios = usuarioService.getUsuarios() || [];
      const rutSinPuntos = rutLimpio.toLowerCase().replace(/\./g, '');

      usuarioEncontrado = listaUsuarios.find((u) => {
        const uRut = (u.rut || '').trim().toLowerCase().replace(/\./g, '');
        const uEmail = (u.email || '').trim().toLowerCase();
        const uPass = String(u.password || u.contrasena || u.clave || '').trim();

        const coincideUsuario = (uRut === rutSinPuntos) || (uEmail === rutSinPuntos) || (u.rut === rutLimpio);
        const coincideClave = uPass === passLimpia;

        return coincideUsuario && coincideClave;
      });
    }

    if (!usuarioEncontrado) {
      setErrorGeneral('RUT/Correo o contraseña incorrectos.');
      return;
    }

    // Guardar sesión y redirigir con useNavigate
    login(usuarioEncontrado);

    const rol = usuarioEncontrado?.rol ? String(usuarioEncontrado.rol).toUpperCase() : '';

    if (rol === 'ADMINISTRADOR' || rol === 'ADMIN') {
      navigate('/admin');
    } else if (rol === 'OPERADOR') {
      navigate('/operador');
    } else if (rol === 'REPARTIDOR') {
      navigate('/repartidor');
    } else {
      navigate('/cliente');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card p-4 shadow-sm border-0 col-12 col-md-6 col-lg-4">
        <div className="mb-3">
          <Boton
            type="button"
            variant="outline-secondary"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate('/')}
          >
            ← Volver al Inicio
          </Boton>
        </div>

        <Title level={2} className="text-center mb-4 text-danger fw-bold">
          Iniciar Sesión
        </Title>

        {errorGeneral && (
          <div className="alert alert-danger py-2 small text-center mb-3" role="alert">
            {errorGeneral}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label small fw-bold">RUT o Correo Electrónico</label>
            <input
              type="text"
              className={`form-control ${errores.rut ? 'is-invalid' : ''}`}
              placeholder="12345678-9 o usuario@correo.cl"
              value={rut}
              onChange={(e) => {
                setRut(e.target.value);
                if (errores.rut) setErrores({ ...errores, rut: '' });
              }}
            />
            {errores.rut && <div className="invalid-feedback small">{errores.rut}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errores.password ? 'is-invalid' : ''}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errores.password) setErrores({ ...errores, password: '' });
              }}
            />
            {errores.password && <div className="invalid-feedback small">{errores.password}</div>}
          </div>

          <Boton
            type="submit"
            variant="danger"
            className="btn btn-danger w-100 fw-bold mt-2"
          >
            Ingresar al Sistema
          </Boton>
        </form>

        <div className="text-center mt-3 pt-3 border-top">
          <small className="text-muted">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-danger fw-bold text-decoration-none">
              Regístrate aquí
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;