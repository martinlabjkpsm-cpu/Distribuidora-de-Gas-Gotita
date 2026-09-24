import imagen from '../../atoms/Imagenes/Imagenes';
import title from '../../atoms/Title/Title';

const Presentacion = ({logo, titulo}) => (

    <div className="presentacion">
      <imagen src={logo} alt="Logotipo" className ="logo" />
      <title text={titulo} level={1} />
    </div>
  );
  export default Presentacion;