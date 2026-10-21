import React from 'react'; 
import { Imagen, Title } from '../Atoms'; 

export const Presentacion = ({ logo, titulo }) => ( 
  <div className="presentacion text-center mb-4"> 
    <Imagen src={logo} alt="Logotipo de la empresa" className="img-fluid mb-2" /> 
    <Title level={1} className="fs-3 fw-bold">{titulo}</Title> 
  </div> 
); 

export default Presentacion;

