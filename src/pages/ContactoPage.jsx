import React, { useState } from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { FormularioContacto } from '../components/Organisms/FormularioContacto';
import { useTituloPagina } from '../hooks/useTituloPagina';

export const ContactoPage = () => {
  useTituloPagina('Contacto');
  const [enviado, setEnviado] = useState('');

  return (
    <MainLayoutTemplate tituloHeader="Contacto">
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="bg-white border rounded shadow-sm p-4">
            {enviado && <div className="alert alert-success" role="status">{enviado}</div>}
            <FormularioContacto
              onEnviar={(datos) => setEnviado(`¡Gracias, ${datos.nombre}! Te responderemos a ${datos.email}.`)}
            />
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <div className="bg-white border rounded shadow-sm p-4 small">
            <p><strong>Teléfono:</strong> +56 42 222 0000</p>
            <p><strong>Correo:</strong> contacto@gasgotita.cl</p>
            <p className="mb-0"><strong>Dirección:</strong> Av. Libertad 123, Chillán</p>
          </div>
        </div>
      </div>
    </MainLayoutTemplate>
  );
};

export default ContactoPage;
