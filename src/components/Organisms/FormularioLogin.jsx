import React from 'react';
import { Title, Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';

export const FormularioLogin = ({
  rut,
  password,
  onChangeRut,
  onChangePassword,
  onSubmit,
  error
}) => {
  return (
    <form onSubmit={onSubmit}>
      {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

      <CampoFormulario
        id="login-rut"
        name="rut"
        label="RUT o Correo Electrónico"
        placeholder="12345678-9 o usuario@gaselvolcan.cl"
        value={rut}
        onChange={onChangeRut}
        required
        className="mb-2"
      />

      <CampoFormulario
        id="login-password"
        name="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        value={password}
        onChange={onChangePassword}
        required
        className="mb-3"
      />

      <Boton type="submit" variant="primary" fullWidth className="btn btn-primary btn-lg w-100 fw-bold mb-3">
        Ingresar al Sistema
      </Boton>
    </form>
  );
};

export default FormularioLogin;