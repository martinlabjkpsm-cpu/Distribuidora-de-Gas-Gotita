import React from 'react';
import { Imagen, Title } from '../Atoms';

export const Presentacion = ({ logo, titulo }) => (
  <div className="presentacion">
    <Imagen src={logo} alt="Logotipo de la empresa" />
    <Title level={1}>{titulo}</Title>
  </div>
);
