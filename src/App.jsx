import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import logoGotita from './assets/logoGotita.png'; 

import Encabezado from './components/Organisms/Encabezado'; 

function App() {
  return (
    <div>
      <Encabezado 
        logo={logoGotita} 
        titulo="Distribuidora de Gas Gotita" 
      />
    </div>
  );
}

export default App;