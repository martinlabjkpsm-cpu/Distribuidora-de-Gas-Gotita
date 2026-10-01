import { Title } from '../Atoms/Title';
import { Imagen } from '../Atoms/Imagen'; 
import { LinkNav } from '../Atoms/LinkNav';

export const EncabezadoPrincipal = ({
  titulo,
  showNav = true,
  linkHref = 'Login.html',
  linkTexto = 'Cerrar Sesión'
}) => {
  return (
    <header className="encabezado-principal">
      <div className="logo-contenedor">
        <Imagen src="img/logoGotita.png" alt="Distribuidora Gas El Volcán" className="logo-img" />
        <Title level={1}>{titulo}</Title>
      </div>
      {showNav && (
        <nav className="nav-encabezado">
          <LinkNav href={linkHref}>{linkTexto}</LinkNav>
        </nav>
      )}
    </header>
  );
};

export default EncabezadoPrincipal;