import { Truck, Navigation, User, MapPin, Clock } from 'lucide-react';
import '../../styles/Tracking.css';

const LiveTracking = () => {
  return (
    <div className="live-tracking-container card">
      <h3 className="trace-title mb-4">Rastreo en Tiempo Real</h3>
      
      <div className="map-simulation">
        <div className="map-grid-pattern"></div>
        
        {/* Animated truck marker in the center */}
        <div className="truck-marker">
          <Truck size={40} className="text-blue truck-icon-sim" />
          <div className="pulse-ring"></div>
        </div>

        {/* Floating Info Card */}
        <div className="floating-info-card shadow-lg animate-fade-in">
          <div className="info-header">
            <span className="badge bg-blue-light text-blue flex-center" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
              <Navigation size={14} className="mr-2" /> En ruta a destino
            </span>
          </div>
          
          <div className="info-body">
            <div className="info-row">
              <User size={18} className="text-light" />
              <div>
                <p className="info-label">Conductor Asignado</p>
                <p className="info-value">Carlos Ramírez</p>
              </div>
            </div>
            <div className="info-row">
              <Truck size={18} className="text-light" />
              <div>
                <p className="info-label">Vehículo / Flotilla</p>
                <p className="info-value">Camión Volvo MX-901</p>
              </div>
            </div>
            <div className="info-row">
              <Clock size={18} className="text-light" />
              <div>
                <p className="info-label">Tiempo Estimado (ETA)</p>
                <p className="info-value">45 min (14:30 hrs)</p>
              </div>
            </div>
            <div className="info-row">
              <MapPin size={18} className="text-light" />
              <div>
                <p className="info-label">Destino Final</p>
                <p className="info-value">Centro de Distribución Norte</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
