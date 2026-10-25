import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton } from '../components/Atoms';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

export const CategoriasPage = () => {
  useTituloPagina('Categorías');
  const navigate = useNavigate();
  const { productos, categorias } = useProductos();

  return (
    <MainLayoutTemplate tituloHeader="Categorías">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
        {categorias.map((cat) => {
          const cantidad = productos.filter((p) => p.categoria === cat).length;
          return (
            <div className="col" key={cat}>
              <div className="card h-100 shadow-sm border-0 p-3 text-center">
                <Title level={2} className="fs-5 fw-bold">{cat}</Title>
                <p className="text-muted small">{cantidad} productos</p>
                <Boton variant="outline-danger" className="mt-auto" onClick={() => navigate(`/categoria/${encodeURIComponent(cat)}`)}>
                  Ver productos
                </Boton>
              </div>
            </div>
          );
        })}
      </div>
    </MainLayoutTemplate>
  );
};

export default CategoriasPage;
