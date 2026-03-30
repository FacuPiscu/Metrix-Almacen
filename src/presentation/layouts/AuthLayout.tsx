
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Disposición para las rutas de autenticación
const AuthLayout = () => {
  const { user, loading } = useAuth();

  // Muestra un estado de carga mientras se verifica la sesión
  if (loading) {
    return <div className="loading-screen">Verificando sesión...</div>;
  }

  // Redirige a dashboard si el usuario ya está conectado
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
