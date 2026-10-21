import React from 'react';
import { Title, Imagen, Boton } from '../Atoms';
import { formatearMoneda } from '../../utils/formato';

export const TarjetaProducto = ({
  producto,
  nombre = producto?.nombre,
  descripcion = producto?.descripcion,
  categoria = producto?.categoria,
  imagenSrc = producto?.imagenSrc,
  precio = producto?.precioResidencial ?? producto?.precio,
  etiquetaTarifa = 'RESIDENCIAL',
  onAgregar
}) => {
  return (
    <div className="card h-100 shadow-sm border-0 bg-white">
      <div className="p-3 text-center bg-light rounded-top">
        <Imagen
          src={imagenSrc || '/img/gas5kg.jpeg'}
          alt={nombre || 'Producto'}
          className="img-fluid img-cilindro-cat"
        />
      </div>

      <div className="card-body d-flex flex-column p-3">
        {categoria && (
          <span className="badge bg-secondary mb-2 align-self-start">
            {categoria}
          </span>
        )}

        <Title level={3} className="fs-5 fw-bold mb-1 text-dark">
          {nombre}
        </Title>

        <p className="small text-muted mb-3 flex-grow-1">
          {descripcion || ''}
        </p>

        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
            <small className="text-muted d-block">Precio ({etiquetaTarifa}):</small>
            <strong className="fs-5 text-success">
              {formatearMoneda(precio || 0)}
            </strong>
          </div>

          <Boton
            variant="primary"
            className="btn-sm fw-bold px-3"
            onClick={onAgregar}
          >
            + Agregar
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;