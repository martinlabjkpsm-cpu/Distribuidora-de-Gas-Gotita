# Distribuidora de Gas Gotita

Aplicación web en React para la distribuidora de gas licuado (caso **Distribuidora de Gas El Volcán**, Forma C, DSY1104 – Desarrollo Fullstack II). Parcial 2: frontend con datos simulados en `localStorage`, Atomic Design, Bootstrap y pruebas unitarias con Vitest.

## Integrantes
- Rocío Sáez (roc.saez@duocuc.cl)
- Martín Escobar (mart.escobarc@duocuc.cl)

## Descripción del caso
La empresa opera con cuadernos y hojas sueltas, lo que genera falta de trazabilidad, descuadres de caja, saturación de la operadora telefónica y pedidos duplicados o extraviados. El sistema centraliza los pedidos: el cliente pide su gas, la operadora lo asigna a un repartidor y el repartidor actualiza el estado hasta "entregado".

## Tecnologías
- React 19 + Vite
- React Router (`react-router-dom`)
- Bootstrap 5 (diseño responsivo)
- Vitest + Testing Library + jsdom (pruebas unitarias y cobertura)

## Cómo instalar y ejecutar
```bash
npm install
npm run dev
```

## Cómo probar
```bash
npm run test:run   # ejecuta todas las pruebas una vez
npm run test:cov   # pruebas + reporte de cobertura (carpeta coverage/, no se sube a GitHub)
npm run build      # compila el proyecto para producción
```
La prueba "el precio residencial del cilindro de 5kg debe ser 5000" (`src/data/catalogoGasGotita.test.js`) falla a propósito, por indicación del docente, para mostrar en la presentación cómo se detecta y se corrige un error. Por eso `vite.config.js` tiene `reportOnFailure: true`: el reporte de cobertura se genera igual.

## Usuarios de prueba
| Rol | RUT | Contraseña |
|---|---|---|
| Administrador | 11111111-1 | admin123Password |
| Operadora | 22222222-2 | operador123Password |
| Repartidor | 33333333-3 | repartidor123Password |
| Cliente | 44444444-4 | cliente123Password |

## Estructura del proyecto
```
src/
├── components/          la interfaz (Atomic Design)
│   ├── Atoms/           piezas mínimas: Boton, Input, Select, Etiqueta, LinkNav...
│   ├── Molecules/       CampoFormulario, TarjetaProducto, ItemCarrito, Buscador...
│   ├── Organisms/       EncabezadoPrincipal, Footer, CatalogoGas, CarritoCompras, formularios, tablas...
│   └── Templates/       MainLayoutTemplate (plantilla pública) y AuthLayoutTemplate
├── pages/               una página por ruta
├── routes/              RutaProtegida (acceso por rol)
├── context/             AuthContext, CartContext, ProductosContext (estado compartido)
├── hooks/               useTituloPagina (hook propio)
├── services/            CRUD en localStorage: productoService, pedidoService, usuarioService
├── data/                datos de partida (catálogo del Excel, usuarios, textos)
└── utils/               funciones puras: validaciones, precios, formato
```

## Rutas
| Ruta | Página | Acceso |
|---|---|---|
| `/` | Inicio | Público |
| `/catalogo`, `/categoria/:nombre`, `/buscar/:texto` | Catálogo con filtros y buscador | Público |
| `/categorias` | Categorías | Público |
| `/producto/:id` | Detalle de producto | Público |
| `/ofertas` | Ofertas y destacados | Público |
| `/nosotros`, `/contacto`, `/blog`, `/blog/:id` | Vistas informativas | Público |
| `/login`, `/registro` | Inicio de sesión y registro | Público |
| `/cliente` | Catálogo + carrito + confirmación del pedido | Cliente |
| `/pedido/:id` | Resultado del pedido (éxito o error) | Cliente |
| `/mis-pedidos` | Seguimiento de mis pedidos | Cliente |
| `/operador` | Asignación de pedidos a repartidores | Operadora |
| `/repartidor` | Mis entregas (en camino / entregado) | Repartidor |
| `/admin` | Panel: resumen, pedidos, productos (CRUD), stock crítico, categorías, usuarios, reportes, perfil | Administrador |

## Material complementario
ERS V2 y documento de cobertura del testing: se entregan en AVA.
