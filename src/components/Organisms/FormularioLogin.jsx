import React from 'react';
import { Title } from '../Atoms/Title';
import { Boton } from '../Atoms/Boton';
import { LinkNav } from '../Atoms/LinkNav';
import { CampoFormulario } from '../Molecules/CampoFormulario';

export const FormularioLogin = ({ formData = {}, onChange, onSubmit }) => {
  return (
    <section className="contenedor-login">
      <Title level={2}>Iniciar Sesión</Title>
      <form onSubmit={onSubmit} className="form-login">
        <CampoFormulario
          id="rut"
          name="rut"
          label="RUT del Usuario"
          placeholder="12345678-9"
          value={formData.rut || ''}
          onChange={onChange}
          required
        />
        <CampoFormulario
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={formData.password || ''}
          onChange={onChange}
          required
        />
        <Boton type="submit" variant="primary" fullWidth>
          Ingresar al Sistema
        </Boton>
      </form>
      <nav className="links-auxiliares">
        <LinkNav href="Registro.html">¿No tienes cuenta? Regístrate aquí</LinkNav>
        <br />
        <LinkNav href="Inicio.html">Volver al Inicio</LinkNav>
      </nav>
    </section>
  );
};
