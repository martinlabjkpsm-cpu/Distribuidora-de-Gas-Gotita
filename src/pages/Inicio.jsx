import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Atoms/Title';
import { Imagen } from '../components/Atoms/Imagen';
import { Boton } from '../components/Atoms/Boton';
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
    <div className="pagina-inicio">
      <EncabezadoPrincipal
        titulo="Distribuidora de Gas Gotita"
        showNav={true}
        linkTexto="Inicio de Sesión"
        rutaDestino="/login"
      />

      <main className="contenido-principal container py-4">
        
        <section className="nosotros mb-5">
          <Title level={2}>¿Quiénes somos?</Title>
          <p>
            <strong>Distribuidora de Gotita</strong> es una empresa familiar fundada en el año{' '}
            <strong>1998</strong> en la comuna de <strong>Chillán, Región de Ñuble</strong>.
            Desde hace más de dos décadas, nos dedicamos con orgullo y compromiso a la
            distribución de gas licuado a domicilio.
          </p>
        </section>

        
        <section className="productos mb-5">
          <Title level={2}>Nuestros cilindros</Title>
          <div className="cilindros-grid d-flex flex-wrap gap-3 mt-3">
            {cilindrosDestacados['map']((item) => (
              <div key={item['id']} className="cilindro-card card p-3" style={{ width: '250px' }}>
                <Imagen src={item.imagenSrc} alt={item.nombre} className="card-img-top img-cilindro" />
                <Title level={3}>{item.nombre}</Title>
                <p>{item.descripcion}</p>
              </div>
            ))}
          </div>

          <div className="otros-productos mt-3">
            <p>
              <strong>Otros productos:</strong> Contamos con una variedad de{' '}
              <strong>Accesorios</strong>, <strong>Mangueras</strong> y{' '}
              <strong>Reguladores</strong> ideales para renovar tu sistema de gas con total
              seguridad.
            </p>
          </div>
        </section>

        
        <section className="pasos-pedido mb-5">
          <Title level={2}>¿Cómo pedir nuestro Gas?</Title>
          <div className="pasos-contenedor d-flex flex-wrap gap-3 mt-3">
            {pasosCompra['map']((paso) => (
              <div key={paso.numero} className="paso-card border p-3 rounded flex-grow-1">
                <Title level={3}>
                  {paso.numero}. {paso.titulo}
                </Title>
                <p>{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="acciones-inicio d-flex gap-3 justify-content-center">
          <Boton variant="primary" onClick={() => navigate('/login')}>
            Inicia Sesión Aquí
          </Boton>
          <Boton variant="secondary" onClick={() => navigate('/registro')}>
            Regístrate Aquí
          </Boton>
        </section>
      </main>

      
      <Footer />
    </div>
  );
};

export default Inicio;