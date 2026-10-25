import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton } from '../components/Atoms';
import { CatalogoDestacado } from '../components/Organisms/CatalogoDestacado';
import { PasosCompra } from '../components/Organisms/PasosCompra';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { pasosCompra } from '../data/contenido';

export const Inicio = () => {
  useTituloPagina('Inicio');
  const navigate = useNavigate();
  const { productos, categorias } = useProductos();

  const cilindros = productos.filter((p) => p.categoria === 'Cilindros de Gas');

  return (
    <MainLayoutTemplate>
      <section className="text-center bg-white rounded shadow-sm p-4 mb-4 border">
        <Title level={1} className="display-6 fw-bold mb-3 text-danger">
          Distribuidora de Gas Gotita
        </Title>
        <p className="lead text-muted mx-auto max-w-2xl">
          Empresa familiar de Chillán, Región de Ñuble. Gas licuado a domicilio con la rapidez y confianza de siempre.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Boton variant="danger" className="btn-lg" onClick={() => navigate('/catalogo')}>
            Ver catálogo
          </Boton>
          <Boton variant="outline-danger" className="btn-lg" onClick={() => navigate('/ofertas')}>
            Ver ofertas
          </Boton>
        </div>
      </section>

      <section className="mb-4">
        <Title level={2} className="fs-5 fw-bold mb-2">Categorías</Title>
        <div className="d-flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <Boton
              key={cat}
              variant="outline-dark"
              className="btn-sm"
              onClick={() => navigate(`/categoria/${encodeURIComponent(cat)}`)}
            >
              {cat}
            </Boton>
          ))}
        </div>
      </section>

      <CatalogoDestacado productos={cilindros} onVerProducto={(p) => navigate(`/producto/${p.codigo}`)} />

      <PasosCompra pasos={pasosCompra} />
    </MainLayoutTemplate>
  );
};

export default Inicio;
