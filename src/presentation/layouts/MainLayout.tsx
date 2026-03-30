
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

// Disposición principal para las rutas que requieren inicio de sesión
const MainLayout = () => {
  const { user, loading } = useAuth();

  // Muestra un estado de carga mientras se verifica la sesión si es necesario
  if (loading) {
    return <div className="loading-screen">Cargando sesión...</div>;
  }

  // Redirige al inicio si no hay un usuario activo
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="main-layout">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
