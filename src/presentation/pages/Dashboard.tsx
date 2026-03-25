import { Activity, CheckCircle, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../../styles/Dashboard.css';
import '../../styles/Pages.css';

// Vista principal del sistema, accesible después de iniciar sesión
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-wrapper animate-fade-in dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title leading-tight">Bienvenido, {user?.name || 'Operador'}</h1>
          <p className="text-light">Panel de Control General y Desempeño</p>
        </div>
      </div>

      {/* KPIs Principales con CSS Grid */}
      <div className="dashboard-kpis">
        <div className="card kpi-card">
          <div className="kpi-icon-wrapper bg-blue-light text-blue">
            <TrendingUp strokeWidth={2.5} />
          </div>
          <div className="kpi-content">
            <h3 className="kpi-title">Movimiento de Inventario</h3>
            <p className="kpi-value text-blue">Alto</p>
            <p className="kpi-desc">El almacén tiene gran rotación este mes</p>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon-wrapper bg-green-light text-green">
            <CheckCircle strokeWidth={2.5} />
          </div>
          <div className="kpi-content">
            <h3 className="kpi-title">Eficiencia del Equipo</h3>
            <p className="kpi-value text-green">85%</p>
            <p className="kpi-desc">Tareas completadas a tiempo</p>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon-wrapper bg-orange-light text-orange">
            <Star strokeWidth={2.5} />
          </div>
          <div className="kpi-content">
            <h3 className="kpi-title">Puntos de Productividad</h3>
            <p className="kpi-value text-orange">1,250 pts</p>
            <p className="kpi-desc">Última acción: +50 pts (Recepción a tiempo)</p>
          </div>
        </div>
      </div>

      {/* Panel de Desempeño Institucional */}
      <div className="dashboard-performance">
        <div className="card performance-card">
          <div className="performance-header">
            <div className="performance-title-group">
              <div className="performance-icon">
                <Activity size={24} />
              </div>
              <h2>Métricas de Operación</h2>
            </div>
            <div className="performance-status">
              <span className="status-label">Estado General:</span>
              <span className="status-value text-green">Óptimo</span>
            </div>
          </div>
          
          <div className="performance-body">
            <p className="performance-intro">Resumen del rendimiento logístico del operador actual:</p>
            <ul className="performance-list">
              <li>
                <div className="performance-item-info">
                  <CheckCircle size={18} className="text-blue" />
                  <span>Precisión en la recepción de inventario</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar fill-blue" style={{ width: '95%' }}></div>
                </div>
              </li>
              <li>
                <div className="performance-item-info">
                  <CheckCircle size={18} className="text-green" />
                  <span>Cumplimiento de tiempos de despacho</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar fill-green" style={{ width: '88%' }}></div>
                </div>
              </li>
              <li>
                <div className="performance-item-info">
                  <CheckCircle size={18} className="text-orange" />
                  <span>Mantenimiento y orden de zonas asignadas</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar fill-orange" style={{ width: '100%' }}></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
