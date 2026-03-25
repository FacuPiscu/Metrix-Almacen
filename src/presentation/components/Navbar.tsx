import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../../styles/Navbar.css';

const mockNotifications = [
  { id: 1, text: 'Nueva orden de salida creada', time: 'Hace 5 min' },
  { id: 2, text: 'Stock bajo en zona A', time: 'Hace 1 hora' },
  { id: 3, text: 'Pre-aviso recibido (Logística Internacional)', time: 'Hace 2 horas' }
];

// Componente de navegación superior
const Navbar = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Buscando en sistema:', searchQuery);
    }
  };

  return (
    <nav className="navbar shadow-md">
      <div className="navbar-container container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            Metrix Almacén
          </Link>
          <div className="navbar-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/warehouses" className="nav-link">Almacenes</Link>
          </div>
        </div>

        <div className="navbar-search">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar folios, artículos, actas..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        <div className="navbar-right">
          {user ? (
            <>
              <div className="navbar-notifications">
                <button
                  className="notification-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={20} />
                  <span className="notification-badge">{mockNotifications.length}</span>
                </button>

                {showNotifications && (
                  <div className="notification-dropdown animate-fade-in">
                    <div className="dropdown-header">Notificaciones</div>
                    <ul className="dropdown-list">
                      {mockNotifications.map((notif) => (
                        <li key={notif.id} className="dropdown-item">
                          <p className="notif-text">{notif.text}</p>
                          <span className="notif-time">{notif.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ marginLeft: '1rem', marginRight: '1rem', display: 'flex', alignItems: 'center' }}>
                <span className="badge bg-blue-light text-blue" style={{ textTransform: 'capitalize' }}>
                  {user.role}
                </span>
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
