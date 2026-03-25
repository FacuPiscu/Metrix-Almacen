
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

// Componente de navegación superior
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar shadow-md">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          Metrix Almacén
        </Link>
        <div className="navbar-links">
          <Link to="/warehouses" className="nav-link">Almacenes</Link>
          
          {user ? (
            <button onClick={logout} className="btn btn-danger navbar-btn">Salir</button>
          ) : (
            <Link to="/login" className="btn btn-primary navbar-btn">Entrar</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
