# Distribuidora-de-Gas-Gotita
Proyecto Distribuidora de Gas Gotita
# Plic...Plic

## Integrantes
- Rocio Saez(correo@duocuc.cl)
- Martin Escobar (mart.escobarc@duocuc.cl)


## Caso
Distribuidora de Gas El Volcan

## Descripción del caso
La empresa opera actualmente con cuadernos y hojas sueltas, lo que genera falta de trazabilidad, descuadres de caja, saturación de la operadora telefónica y pedidos duplicados o extraviados. El sistema busca centralizar la información y dar autonomía tanto a clientes como a repartidores.

## Estructura del proyecto
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
└── pages/
└── data/
└── services/
└── context/
└── utils/

## Tecnologías
- React + Vite
- React Bootstrap
- React router down

## Cómo ejecutar el proyecto
npm install
npm run dev

## Como ejecutar las pruebas 
npm run test:run

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):
https://drive.google.com/drive/folders/XXXXXXXXXX


## Vitacora de cambios 

Rocio Saez
1- Arregle el errores de las imagenes en la pagina cliente que no se veian todas , hice el cambio en data/calalogoGasElVolcan.js
2- viendo las pruebas que podemos probar y dejando una mala para saber como se puede solucionar 
Pruebas en Componentes (TarjetaProducto.test.jsx)
PRUEBA 1: Renderizado básico de textos – Verifica que el componente despliegue adecuadamente el nombre del producto y su valor en dinero con el formato oficial en CLP.
PRUEBA 2: Atributos de la imagen – Comprueba que el componente de imagen reciba y renderice correctamente las propiedades src (ruta) y alt (texto alternativo).
PRUEBA 3: Condicional del precio (cuando no hay precio) – Evalúa el comportamiento cuando la propiedad de precio no está definida o es nula, asegurando que retorne "$0 CLP".

Pruebas en Datos de Catálogo (catalogoGasElVolcan.test.js)
PRUEBA 4: Categorías principales del catálogo – Confirma que el arreglo exportado contenga exactamente las 4 categorías principales requeridas por la aplicación.
PRUEBA 5: Estructura del objeto catálogo – Revisa que la estructura general exportada incluya las propiedades esenciales productosYTarifas y zonasDeDespacho.
PRUEBA 6: Campos obligatorios en productos – Valida que los objetos dentro de la lista de productos incluyan los atributos indispensables (codigo, producto y stockActual).
PRUEBA 7: Verificación de precio de catálogo (Falla a propósito) – Contrasta el precio residencial del cilindro de 5 kg contra un valor esperado de $5.000 (falla intencionalmente al recibir $6.500 para evidenciar la detección automática de discrepancias en el reporte de testing).   
JPG

Pruebas en Funciones de Validación (validaciones.test.js)
PRUEBA 8: Algoritmo de validación de RUT – Comprueba la estructura y el dígito verificador (DV) de un RUT chileno mediante el algoritmo Módulo 11, aprobando combinaciones válidas y rechazando DVs incorrectos.
PRUEBA 9: Formato de correo electrónico – Evalúa las cadenas de texto mediante expresión regular para confirmar que cumplan con la sintaxis estándar de email (usuario@dominio.ext).
PRUEBA 10: Longitud mínima en dirección de despacho – Verifica que las direcciones ingresadas cumplan con el límite mínimo de 5 caracteres requeridos para garantizar un registro válido.

3-corregi el main ya que se estaba importando  el index.css antes que Bootstrap y no se estaba importando el bootstrap/dist/js/bootstrap.bundle.min.js, pero ya esta resuelto 

4-revise que los componetns cumplan con el atom desing

5-Creación del Custom Hook (src/hooks/useTituloPagina.js):
Se construyó un hook propio que utiliza useEffect para actualizar dinámicamente el document.title de la pestaña del navegador.
Cumple estrictamente con las Reglas de los Hooks (declarado al nivel superior de las páginas y antes de cualquier condición o return).
Implementación de Funciones Puras de Validación (src/utils/validaciones.js):
Se crearon las funciones validarRutOEmailFormulario y validarPasswordFormulario.
Son funciones puras que retornan un string con el mensaje de error o '' (string vacío) cuando la entrada es válida.
Refactorización de Formularios e Inputs Controlados (src/pages/LoginPage.jsx):
Se migraron los campos a estado local de React (useState).
Se implementó un estado de errores unificado (errores) que muestra mensajes descriptivos inline utilizando las clases de Bootstrap (is-invalid y invalid-feedback).
Se integró el hook useTituloPagina('Iniciar Sesión') y la navegación programática con useNavigate.
Actualización y Extensión de Rutas (src/App.jsx):
Se añadieron rutas parametrizadas (/categoria/:nombre y /producto/:id) dentro de BrowserRouter para dar soporte al hook useParams.
Se mantuvo la protección de rutas por roles mediante RutaProtegida.

Martin Escobar 
 remasterizar la pantalla de cliente  agregando un carrito, crear un archivo data para usuarios, crear los archivos de context y services, crear el organismo carrito, crear la molécula ruta protegida, el archivo formato en útiles


1. 🛒 Gestión Completa del Carrito de Compras (CartContext y ClientePage)
Controles de cantidad: Se añadieron las funciones para incrementar (+) y decrementar (-) la cantidad de unidades de cada producto en el carrito.
Eliminación directa: Se integró un botón de eliminación (×) para quitar productos del carrito de forma inmediata.
Cálculo dinámico: Actualización en tiempo real de los subtotales por ítem y del total general según la tarifa seleccionada (Residencial o Comercial).
2. 🔐 Resolución del Error de Autenticación (reading 'rol')
Diagnóstico: Se identificó la causa del error Cannot read properties of null/undefined (reading 'rol'), el cual ocurría cuando las credenciales ingresadas no encontraban coincidencia en data o cuando el estado inicial de sesión era nulo.
Manejo defensivo: Se ajustaron LoginPage.jsx y AuthContext.jsx para verificar que el objeto de usuario exista antes de leer la propiedad .rol.
Compatibilidad de credenciales: Se aseguró que el proceso de login soporte la búsqueda tanto por RUT como por Correo Electrónico y valide correctamente los campos de contraseña.
3. 🚦 Navegación y Persistencia de Sesión
Botón de retorno: Se reincorporó el botón ← Volver al Inicio en las pantallas de LoginPage y ClientePage.
Cierre y persistencia de sesión: Se configuró el AuthContext con localStorage para mantener la sesión activa al recargar o navegar, y se integró el botón "Cerrar Sesión" en el encabezado principal (EncabezadoPrincipal).
Protección de rutas: Se aseguró la correcta separación entre las páginas públicas (/, /login, /registro) y los portales privados (/cliente, /operador, /repartidor, /admin).