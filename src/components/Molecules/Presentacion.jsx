import React from 'react';

import Imagen from '../Atoms/Imagen'; 
import Title from '../Atoms/Title';

const Presentacion = ({ logo, titulo }) => (

  <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 text-center">
    <Imagen src={logo} alt="Logotipo de la empresa" />
    <Title text={titulo} level={1} />
  </div>
);

export default Presentacion;