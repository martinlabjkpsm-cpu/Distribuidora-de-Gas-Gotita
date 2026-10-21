import React from 'react';
import { Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';

export const FormularioRegistro = ({
  rut,
  nombre,
  email,
  password,
  onChangeRut,
  onChangeNombre,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  error
}) => {
  return (
    <form onSubmit={onSubmit}>
      {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

      <CampoFormulario
        id="reg-rut"
        name="rut"
        label="RUT"
        placeholder="Ej: 12345678-9"
        value={rut}
        onChange={onChangeRut}
        required
        className="mb-2"
      />

      <CampoFormulario
        id="reg-nombre"
        name="nombre"
        label="Nombre Completo"
        placeholder="Ej: Juan Pérez"
        value={nombre}
        onChange={onChangeNombre}
        required
        className="mb-2"
      />

      <CampoFormulario
        id="reg-email"
        name="email"
        type="email"
        label="Correo Electrónico"
        placeholder="ejemplo@correo.cl"
        value={email}
        onChange={onChangeEmail}
        required
        className="mb-2"
      />

      <CampoFormulario
        id="reg-password"
        name="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        value={password}
        onChange={onChangePassword}
        required
        className="mb-3"
      />

      <Boton type="submit" variant="success" fullWidth className="btn btn-success btn-lg w-100 fw-bold mb-3">
        Crear Mi Cuenta
      </Boton>
    </form>
  );
};

export default FormularioRegistro;