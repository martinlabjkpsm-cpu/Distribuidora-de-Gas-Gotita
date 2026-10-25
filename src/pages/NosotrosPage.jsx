import React from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title } from '../components/Atoms';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { zonasDespacho } from '../data/contenido';

export const NosotrosPage = () => {
  useTituloPagina('Nosotros');

  return (
    <MainLayoutTemplate tituloHeader="Nosotros">
      <section className="bg-white border rounded shadow-sm p-4 mb-4">
        <p>
          Somos una distribuidora familiar de gas licuado de Chillán. Despachamos cilindros de 5, 11, 15 y 45 kg,
          reguladores, mangueras y accesorios a hogares y comercios de la Región de Ñuble.
        </p>
        <p className="mb-0">
          Con este sistema dejamos atrás los cuadernos: cada pedido queda registrado, la operadora lo asigna a un
          repartidor y el cliente puede ver en qué estado va.
        </p>
      </section>

      <Title level={2} className="fs-5 fw-bold mb-3">Zonas y horarios de despacho</Title>
      <div className="table-responsive bg-white border rounded shadow-sm">
        <table className="table table-striped align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Zona</th>
              <th>Comunas</th>
              <th>Días</th>
              <th>Horario</th>
              <th>Tiempo estimado</th>
            </tr>
          </thead>
          <tbody>
            {zonasDespacho.map((z) => (
              <tr key={z.zona}>
                <td className="fw-bold">{z.zona}</td>
                <td className="small">{z.comunas}</td>
                <td className="small">{z.dias}</td>
                <td className="small">{z.horario}</td>
                <td className="small">{z.tiempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayoutTemplate>
  );
};

export default NosotrosPage;
