import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Atoms/Title';
import { Imagen } from '../components/Atoms/Imagen';
import { EncabezadoPrincipal } from '../components/Organisms/EncabezadoPrincipal';
import { Footer } from '../components/Organisms/Footer';

export const Inicio = () => {
  const navigate = useNavigate();

  const cilindrosDestacados = [
    {
      id: '5kg',
      nombre: 'Cilindro 5 KG',
      imagenSrc: 'img/gas5kg.jpeg',
      descripcion: 'Excelente para camping, laboratorios, estufas portátiles o consumos individuales ligeros.',
    },
    {
      id: '11kg',
      nombre: 'Cilindro 11 KG',
      imagenSrc: 'img/gas11kg.jpeg',
      descripcion: 'El formato preferido por las familias de Chillán para la cocina del día a día y el agua caliente.',
    },
    {
      id: '15kg',
      nombre: 'Cilindro 15 KG',
      imagenSrc: 'img/gas15kg.jpeg',
      descripcion: 'Ideal para sistemas de calefacción, hogares de alto consumo o locales comerciales de comida.',
    },
    {
      id: '45kg',
      nombre: 'Cilindro 45 KG',
      imagenSrc: 'img/gasgotita45.jpeg',
      descripcion: 'Ideal para un reabastecimiento menos frecuente en comercios e industrias.',
    },
  ];

  const pasosCompra = [
    {
      numero: '1',
      titulo: 'Crea tu cuenta o Inicia Sesión',
      descripcion: 'Para proteger la privacidad de tus datos de despacho, el primer paso es registrarte como cliente o ingresar con tus credenciales seguras.',
    },
    {
      numero: '2',
      titulo: 'Configura tu pedido en segundos',
      descripcion: 'Ingresa tu dirección de entrega en Chillán y selecciona el formato de cilindro que necesitas (5 kg, 11 kg, 15 kg o 45 kg).',
    },
    {
      numero: '3',
      titulo: 'Sigue tu despacho en tiempo real',
      descripcion: 'A través de nuestro mapa interactivo integrado, podrás ver la ubicación exacta del repartidor en ruta y verificar el estado de tu entrega.',
    },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <EncabezadoPrincipal />

      <main className="container flex-grow-1 py-4">
        <section className="text-center py-4 bg-white rounded shadow-sm p-4 mb-4 border">
          <Title level={1} className="display-6 fw-bold mb-3 text-danger">
            Distribuidora de Gas Gotita
          </Title>
          <p className="lead text-muted max-w-2xl mx-auto">
            Empresa familiar fundada en 1998 en Chillán, Región de Ñuble. Ofrecemos distribución de gas licuado a domicilio con la rapidez y confianza de siempre.
          </p>
        </section>

        <section className="mb-5">
          <Title level={2} className="fs-4 mb-3 text-dark fw-bold">
            Nuestros Cilindros Destacados
          </Title>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            {cilindrosDestacados.map((item) => (
              <div key={item.id} className="col">
                <div className="card h-100 shadow-sm border bg-white text-center p-3">
                  <Imagen
                    src={item.imagenSrc}
                    alt={item.nombre}
                    className="card-img-top img-fluid mb-2 mx-auto"
                    style={{ maxHeight: '140px', objectFit: 'contain' }}
                  />
                  <div className="card-body p-2">
                    <Title level={3} className="fs-6 fw-bold mb-2">
                      {item.nombre}
                    </Title>
                    <p className="small text-muted mb-0">{item.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5 bg-white p-4 rounded border shadow-sm">
          <Title level={2} className="fs-4 mb-4 text-center fw-bold">
            ¿Cómo pedir nuestro Gas?
          </Title>
          <div className="row g-4">
            {pasosCompra.map((paso) => (
              <div key={paso.numero} className="col-md-4">
                <div className="text-center p-3 border rounded bg-light h-100">
                  <div className="badge bg-danger fs-5 mb-2 rounded-circle p-2 px-3">
                    {paso.numero}
                  </div>
                  <Title level={3} className="fs-6 fw-bold mb-2">
                    {paso.titulo}
                  </Title>
                  <p className="small text-muted mb-0">{paso.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Inicio;