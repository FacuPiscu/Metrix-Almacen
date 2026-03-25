import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../../styles/Navbar.css';

// Componente de navegación superior
const Navbar = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="navbar shadow-md">
      <div className="navbar-container container">
        {/* Left: Brand / Links */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            Metrix Almacén
          </Link>
          <div className="navbar-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/warehouses" className="nav-link">Almacenes</Link>
          </div>
        </div>

        {/* Center: Search */}
        <div className="navbar-search">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar folios, artículos, actas..." 
              className="search-input"
            />
          </div>
        </div>

        {/* Right: User / Notifications */}
        <div className="navbar-right">
          {user ? (
            <>
              <div className="navbar-notifications">
                <button 
                  className="notification-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={20} />
                  <span className="notification-badge">2</span>
                </button>
                
                {showNotifications && (
                  <div className="notification-dropdown animate-fade-in">
                    <div className="dropdown-header">Notificaciones</div>
                    <ul className="dropdown-list">
                      <li className="dropdown-item">
                        <p className="notif-text">Nueva orden de salida creada</p>
                        <span className="notif-time">Hace 5 min</span>
                      </li>
                      <li className="dropdown-item">
                        <p className="notif-text">Stock bajo en zona A</p>
                        <span className="notif-time">Hace 1 hora</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button onClick={logout} className="btn btn-danger navbar-btn">Salir</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary navbar-btn">Entrar</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
