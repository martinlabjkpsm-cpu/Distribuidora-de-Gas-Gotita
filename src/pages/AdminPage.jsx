import React from 'react';
import { DashboardLayoutTemplate } from '../Templates/DashboardLayoutTemplate';
import { FormularioUsuarioAdmin } from '../Organisms/FormularioUsuarioAdmin';
import { TablaUsuariosAdmin } from '../Organisms/TablaUsuariosAdmin';
import { SeccionReporteCaja } from '../Organisms/SeccionReporteCaja';

export const AdminPage = ({
  formData,
  onChange,
  onSubmit,
  esEdicion,
  usuarios,
  onEditar,
  onDesactivar,
  reporte
}) => {
  return (
    <DashboardLayoutTemplate tituloHeader="Panel de Administración">
      <div className="row mb-4">
        <div className="col-lg-5">
          <FormularioUsuarioAdmin
            formData={formData}
            onChange={onChange}
            onSubmit={onSubmit}
            esEdicion={esEdicion}
          />
        </div>

        <div className="col-lg-7">
          <TablaUsuariosAdmin
            usuarios={usuarios}
            onEditar={onEditar}
            onDesactivar={onDesactivar}
          />
        </div>
      </div>

      <hr />

      <SeccionReporteCaja reporte={reporte} />
    </DashboardLayoutTemplate>
  );
};


