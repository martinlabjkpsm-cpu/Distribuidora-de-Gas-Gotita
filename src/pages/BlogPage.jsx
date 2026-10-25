import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton } from '../components/Atoms';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { entradasBlog } from '../data/contenido';

export const BlogPage = () => {
  useTituloPagina('Blog');
  const navigate = useNavigate();

  return (
    <MainLayoutTemplate tituloHeader="Blog">
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {entradasBlog.map((entrada) => (
          <div className="col" key={entrada.id}>
            <article className="card h-100 shadow-sm border-0 p-3">
              <small className="text-muted">{entrada.fecha}</small>
              <Title level={2} className="fs-5 fw-bold">{entrada.titulo}</Title>
              <p className="text-muted flex-grow-1">{entrada.resumen}</p>
              <Boton variant="outline-danger" className="align-self-start" onClick={() => navigate(`/blog/${entrada.id}`)}>
                Leer más
              </Boton>
            </article>
          </div>
        ))}
      </div>
    </MainLayoutTemplate>
  );
};

export default BlogPage;
