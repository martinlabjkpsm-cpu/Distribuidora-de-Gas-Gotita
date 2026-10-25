import React from 'react';
import { Title, Imagen, Boton } from '../Atoms';
import { formatearMoneda } from '../../utils/formato';

// Molécula: tarjeta de un producto del catálogo.
// Recibe todo por props y avisa al padre con onAgregar / onVerDetalle.
export const TarjetaProducto = ({
  producto,
  nombre = producto?.nombre ?? producto?.producto,
  descripcion = producto?.descripcion,
  categoria = producto?.categoria,
  imagenSrc = producto?.imagenSrc,
  precio = producto?.precioResidencial ?? producto?.precio,
  stock = producto?.stockActual,
  etiquetaTarifa = 'RESIDENCIAL',
  onAgregar,
  onVerDetalle,
}) => {
  const sinStock = stock === 0;

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
          <span className="badge bg-secondary mb-2 align-self-start">{categoria}</span>
        )}

        <Title level={3} className="fs-5 fw-bold mb-1 text-dark">
          {nombre}
        </Title>

        <p className="small text-muted mb-3 flex-grow-1">{descripcion || ''}</p>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top">
          <div>
            <small className="text-muted d-block">Precio ({etiquetaTarifa}):</small>
            <strong className="fs-5 text-success">{formatearMoneda(precio || 0)}</strong>
          </div>

          <div className="d-flex gap-2">
            {onVerDetalle && (
              <Boton variant="outline-secondary" className="btn-sm" onClick={onVerDetalle}>
                Ver detalle
              </Boton>
            )}
            <Boton
              variant="primary"
              className="btn-sm fw-bold px-3"
              onClick={onAgregar}
              disabled={sinStock}
            >
              + Agregar
            </Boton>
          </div>
        </div>

        {sinStock && (
          <p role="alert" className="text-danger small mt-2 mb-0">
            Sin stock por ahora
          </p>
        )}
      </div>
    </div>
  );
};

export default TarjetaProducto;
