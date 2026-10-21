import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayoutTemplate } from '../components/Templates/AuthLayoutTemplate';
import { FormularioRegistro } from '../components/Organisms/FormularioRegistro';
import { usuarioService } from '../services/usuarioService';

export const RegistroPage = () => {
  const navigate = useNavigate();

  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    try {
      usuarioService.crearUsuario({
        rut: rut.trim(),
        nombre: nombre.trim(),
        email: email.trim(),
        password,
        rol: 'CLIENTE'
      });

      setMensajeExito('¡Cuenta registrada exitosamente! Redirigiendo al inicio de sesión...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta.');
    }
  };

  return (
    <AuthLayoutTemplate
      titulo="Registro de Cliente"
      subtitulo="Crea tu cuenta para realizar pedidos"
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/" className="btn btn-sm btn-outline-secondary fw-semibold">
           Volver al Inicio
        </Link>
        <span className="badge bg-danger">Gas El Volcán</span>
      </div>

      {mensajeExito && (
        <div className="alert alert-success py-2 small mb-3 text-center fw-bold">
          {mensajeExito}
        </div>
      )}

      {error && (
        <div className="alert alert-danger py-2 small mb-3">
          {error}
        </div>
      )}

      <FormularioRegistro
        rut={rut}
        nombre={nombre}
        email={email}
        password={password}
        onChangeRut={(e) => setRut(e.target.value)}
        onChangeNombre={(e) => setNombre(e.target.value)}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        onSubmit={handleSubmit}
      />

      <div className="text-center pt-3 border-top d-flex flex-column gap-2">
        <div>
          <span className="small text-muted me-1">¿Ya tienes cuenta?</span>
          <Link to="/login" className="small fw-bold text-primary text-decoration-none">
            Inicia Sesión aquí
          </Link>
        </div>
        <div>
          <Link to="/" className="small text-secondary text-decoration-none">
            ← Volver a la página de Inicio
          </Link>
        </div>
      </div>
    </AuthLayoutTemplate>
  );
};

export default RegistroPage;