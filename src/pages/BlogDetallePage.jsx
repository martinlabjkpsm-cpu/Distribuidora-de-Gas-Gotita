import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Boton } from '../components/Atoms';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { entradasBlog } from '../data/contenido';

export const BlogDetallePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  // Los parámetros llegan como texto: Number() lo convierte para comparar con el id.
  const entrada = entradasBlog.find((e) => e.id === Number(params.id));
  useTituloPagina(entrada ? entrada.titulo : 'Entrada no encontrada');

  if (!entrada) {
    return (
      <MainLayoutTemplate tituloHeader="Entrada no encontrada">
        <Boton texto="Volver al blog" variante="danger" onClick={() => navigate('/blog')} />
      </MainLayoutTemplate>
    );
  }

  return (
    <MainLayoutTemplate tituloHeader={entrada.titulo}>
      <article className="bg-white border rounded shadow-sm p-4 mb-3">
        <small className="text-muted d-block mb-3">Publicado el {entrada.fecha}</small>
        {entrada.contenido.map((parrafo) => (
          <p key={parrafo}>{parrafo}</p>
        ))}
      </article>
      <Boton texto="← Volver al blog" variante="outline-secondary" onClick={() => navigate('/blog')} />
    </MainLayoutTemplate>
  );
};

export default BlogDetallePage;
