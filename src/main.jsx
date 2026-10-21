import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1. CSS de Bootstrap (base del framework)
import 'bootstrap/dist/css/bootstrap.min.css'

// 2. JavaScript de Bootstrap (interactividad)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 3. Estilos personalizados (al final para tener prioridad)
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)