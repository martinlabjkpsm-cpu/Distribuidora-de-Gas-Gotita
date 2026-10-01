import { Title } from '../Atoms/Title';
import { Boton } from '../Atoms/Boton';
import { LinkNav } from '../Atoms/LinkNav';
import { CampoFormulario } from '../Molecules/CampoFormulario';

export const FormularioRegistro = ({ formData = {}, onChange, onSubmit }) => {
    return (
        <section className="contenedor-registro">
            <Title level={2}>Registro de Nuevo Cliente</Title>
            <form onSubmit={onSubmit} className="form-registro">
                <CampoFormulario
                    id="rut"
                    name="rut"
                    label="RUT"
                    placeholder="12345678-9"
                    value={formData.rut || ''}
                    onChange={onChange}
                    required
                />
                <CampoFormulario
                    id="nombre"
                    name="nombre"
                    label="Nombre Completo"
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre || ''}
                    onChange={onChange}
                    required
                />
                <CampoFormulario
                    id="email"
                    name="email"
                    type="email"
                    label="Correo Electrónico"
                    placeholder="juan@ejemplo.com"
                    value={formData.email || ''}
                    onChange={onChange}
                    required
                />
                <CampoFormulario
                    id="password"
                    name="password"
                    type="password"
                    label="Contraseña"
                    placeholder="••••••••"
                    value={formData.password || ''}
                    onChange={onChange}
                    required
                />
                <Boton type="submit" variant="primary" fullWidth>
                    Crear Cuenta
                </Boton>
            </form>
            <nav className="links-auxiliares">
                <LinkNav href="Login.html">¿Ya tienes cuenta? Inicia sesión</LinkNav>
            </nav>
        </section>
    );
};
