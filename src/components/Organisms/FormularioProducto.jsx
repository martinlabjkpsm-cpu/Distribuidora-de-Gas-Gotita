import React, { useState } from 'react';
import { Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';
import {
  validarCampoObligatorio,
  validarNombreFormulario,
  validarNumeroFormulario,
  sinErrores,
} from '../../utils/validaciones';

const productoVacio = {
  codigo: '',
  categoria: '',
  producto: '',
  descripcion: '',
  precioResidencial: '',
  precioComercial: '',
  stockActual: '',
  imagenSrc: '',
};

// Organismo: formulario para crear o editar un producto (CRUD del administrador).
// Si recibe "productoEditar", parte con sus datos y el código no se puede cambiar.
// La página le pone key={codigo} para que se reinicie al elegir otro producto.
export const FormularioProducto = ({ productoEditar = null, categorias = [], errorGeneral = '', onEnviar, onCancelar }) => {
  const esEdicion = Boolean(productoEditar);
  const [datos, setDatos] = useState(productoEditar ? { ...productoVacio, ...productoEditar } : productoVacio);
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: '' });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {
      codigo: validarCampoObligatorio(datos.codigo, 'El código'),
      categoria: validarCampoObligatorio(datos.categoria, 'La categoría'),
      producto: validarNombreFormulario(datos.producto, 'El nombre del producto'),
      precioResidencial: validarNumeroFormulario(datos.precioResidencial, 1, 'El precio residencial'),
      precioComercial: validarNumeroFormulario(datos.precioComercial, 1, 'El precio comercial'),
      stockActual: validarNumeroFormulario(datos.stockActual, 0, 'El stock'),
    };
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) return;

    onEnviar({
      ...datos,
      precioResidencial: Number(datos.precioResidencial),
      precioComercial: Number(datos.precioComercial),
      stockActual: Number(datos.stockActual),
      imagenSrc: datos.imagenSrc || '/img/gasGotita.png',
    });
    if (!esEdicion) setDatos(productoVacio);
  };

  const opcionesCategoria = [
    { value: '', label: '-- Selecciona --' },
    ...categorias.map((c) => ({ value: c, label: c })),
  ];

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <h3 className="fs-5 fw-bold mb-3">{esEdicion ? `Editar ${datos.codigo}` : 'Nuevo producto'}</h3>
      {errorGeneral && <div className="alert alert-danger py-2 small">{errorGeneral}</div>}

      <div className="row g-2">
        <div className="col-12 col-sm-4">
          <CampoFormulario id="prod-codigo" name="codigo" label="Código" placeholder="Ej: AC004"
            value={datos.codigo} onChange={manejarCambio} error={errores.codigo} disabled={esEdicion} />
        </div>
        <div className="col-12 col-sm-8">
          <CampoFormulario id="prod-categoria" name="categoria" label="Categoría" value={datos.categoria}
            onChange={manejarCambio} options={opcionesCategoria} error={errores.categoria} />
        </div>
      </div>

      <CampoFormulario id="prod-nombre" name="producto" label="Nombre del producto" value={datos.producto}
        onChange={manejarCambio} error={errores.producto} />

      <CampoFormulario id="prod-descripcion" name="descripcion" label="Descripción" rows={2}
        value={datos.descripcion} onChange={manejarCambio} />

      <div className="row g-2">
        <div className="col-12 col-sm-4">
          <CampoFormulario id="prod-precio-res" name="precioResidencial" type="number" label="Precio residencial"
            value={datos.precioResidencial} onChange={manejarCambio} error={errores.precioResidencial} />
        </div>
        <div className="col-12 col-sm-4">
          <CampoFormulario id="prod-precio-com" name="precioComercial" type="number" label="Precio comercial"
            value={datos.precioComercial} onChange={manejarCambio} error={errores.precioComercial} />
        </div>
        <div className="col-12 col-sm-4">
          <CampoFormulario id="prod-stock" name="stockActual" type="number" label="Stock"
            value={datos.stockActual} onChange={manejarCambio} error={errores.stockActual} />
        </div>
      </div>

      <CampoFormulario id="prod-imagen" name="imagenSrc" label="Ruta de la imagen (opcional)"
        placeholder="/img/gas11kg.jpeg" value={datos.imagenSrc} onChange={manejarCambio} />

      <div className="d-flex flex-wrap gap-2">
        <Boton type="submit" variant="primary">{esEdicion ? 'Guardar cambios' : 'Crear producto'}</Boton>
        {esEdicion && (
          <Boton variant="outline-secondary" onClick={onCancelar}>Cancelar</Boton>
        )}
      </div>
    </form>
  );
};

export default FormularioProducto;
