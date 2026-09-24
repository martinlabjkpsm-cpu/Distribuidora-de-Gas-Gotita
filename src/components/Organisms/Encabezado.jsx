
import Presentacion from "../Molecules/Presentacion/Presentacion";

const Encabezado = ({logo, titulo}) => (
    <header >
      <Presentacion logo={logo} titulo={titulo} />
    </header>
  );
  export default Encabezado;