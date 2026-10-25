// Textos y datos fijos de las vistas informativas.
// Viven aquí (y no dentro de los componentes) para que las páginas solo los muestren.

export const enlacesMenu = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/catalogo', texto: 'Catálogo' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/ofertas', texto: 'Ofertas' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blog', texto: 'Blog' },
  { ruta: '/contacto', texto: 'Contacto' },
];

// Códigos de los productos destacados que se muestran en "Ofertas".
export const codigosDestacados = ['CL002', 'CL003', 'MG004', 'AC003'];

export const pasosCompra = [
  {
    numero: '1',
    titulo: 'Crea tu cuenta o inicia sesión',
    descripcion: 'Regístrate como cliente para guardar tus datos de despacho de forma segura.',
  },
  {
    numero: '2',
    titulo: 'Arma tu pedido',
    descripcion: 'Elige tus cilindros o accesorios, tu tarifa (residencial o comercial) y tu dirección.',
  },
  {
    numero: '3',
    titulo: 'Sigue el estado de tu pedido',
    descripcion: 'La operadora asigna un repartidor y ves cuando tu pedido va en camino y cuando se entrega.',
  },
];

// Zonas de despacho (hoja "Zonas de Despacho" del Excel del caso).
export const zonasDespacho = [
  { zona: 'Zona Centro', comunas: 'Chillán (sectores centro, norte y sur)', dias: 'Lunes a Sábado', horario: '08:00 – 20:00', tiempo: '1 – 3 horas' },
  { zona: 'Zona Oriente', comunas: 'Chillán (sector oriente), Chillán Viejo', dias: 'Lunes a Viernes', horario: '08:00 – 18:00', tiempo: '2 – 4 horas' },
  { zona: 'Zona Rural', comunas: 'El Carmen, Pinto, San Ignacio', dias: 'Martes y Jueves', horario: '08:00 – 16:00', tiempo: '3 – 6 horas' },
  { zona: 'Zona Sur', comunas: 'Bulnes, Quillón', dias: 'Miércoles', horario: '08:00 – 16:00', tiempo: '4 – 6 horas' },
  { zona: 'Zona Comercial', comunas: 'Parques industriales y locales comerciales', dias: 'Lunes a Viernes', horario: '07:00 – 17:00', tiempo: 'Según agenda' },
];

export const entradasBlog = [
  {
    id: 1,
    titulo: '5 consejos para usar tu cilindro de gas con seguridad',
    fecha: '2026-10-05',
    resumen: 'Revisa la manguera, ventila el lugar y otras recomendaciones simples para tu hogar.',
    contenido: [
      'Mantén el cilindro siempre de pie y en un lugar ventilado, nunca en un subterráneo.',
      'Revisa que la manguera no esté vencida ni agrietada. Una manguera homologada dura cerca de 5 años.',
      'Para detectar fugas usa agua con jabón en las conexiones: si salen burbujas, cierra la válvula.',
      'No uses llamas ni interruptores eléctricos si sientes olor a gas. Abre puertas y ventanas.',
      'Instala un detector de gas a batería cerca de la cocina para tener una alerta temprana.',
    ],
  },
  {
    id: 2,
    titulo: '¿Qué cilindro me conviene: 5, 11, 15 o 45 kg?',
    fecha: '2026-10-15',
    resumen: 'Una guía rápida para elegir el formato según tu consumo y tu tipo de cliente.',
    contenido: [
      'El cilindro de 5 kg sirve para consumos chicos: camping, estufas portátiles o una persona sola.',
      'El de 11 kg es el más usado en los hogares de Chillán para cocinar y calentar agua.',
      'El de 15 kg conviene para calefacción o familias grandes, porque se recambia menos seguido.',
      'El de 45 kg es para restaurantes, talleres y locales: con tarifa comercial el precio por kilo baja.',
    ],
  },
];
