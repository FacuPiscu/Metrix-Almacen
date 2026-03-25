import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

// Vista principal de inicio de sesión
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  // Función que maneja el envío del formulario de autenticación
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await login({ email, password });
      navigate('/warehouses', { replace: true });
    } catch (err) {
      setError('Credenciales inválidas. Por favor, verifica tus datos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper animate-fade-in">
      <div className="login-overlay"></div>
      
      <div className="login-container card">
        <div className="login-header">
          <img src="/images/logo.png" alt="Logotipo Metrix" className="login-logo" />
          <div className="login-brand-divider"></div>
          <div className="login-brand">
            <h1 className="login-title">
              Metrix <span className="text-secondary">Almacén</span>
            </h1>
            <p className="login-subtitle">Inventario Municipal</p>
          </div>
        </div>

        <h2 className="login-heading">Acceso al Sistema</h2>

        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Usuario o Correo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary login-submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar al Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
