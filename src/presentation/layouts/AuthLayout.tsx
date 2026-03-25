
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Disposición para las rutas de autenticación
const AuthLayout = () => {
  const { user } = useAuth();

  // Redirige a almacenes si el usuario ya está conectado
  if (user) {
    return <Navigate to="/warehouses" replace />;
  }

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
