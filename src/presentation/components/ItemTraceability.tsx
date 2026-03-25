import { CheckCircle } from 'lucide-react';
import '../../styles/Tracking.css';

interface TraceStep {
  id: string;
  label: string;
  isCompleted: boolean;
  date?: string;
}

const steps: TraceStep[] = [
  { id: 'inbound', label: 'Inbound', isCompleted: true, date: '2026-03-24 10:00' },
  { id: 'reception', label: 'Recepción', isCompleted: true, date: '2026-03-24 10:30' },
  { id: 'storage', label: 'Almacenamiento', isCompleted: true, date: '2026-03-25 08:00' },
  { id: 'packing', label: 'Surtido', isCompleted: false },
  { id: 'transit', label: 'En Tránsito', isCompleted: false },
  { id: 'delivered', label: 'Entregado', isCompleted: false },
];

const ItemTraceability = () => {
  return (
    <div className="traceability-container card">
      <h3 className="trace-title">Trazabilidad del Artículo</h3>
      <div className="timeline-horizontal">
        {steps.map((step, index) => (
          <div key={step.id} className={`timeline-step ${step.isCompleted ? 'completed' : 'pending'}`}>
            <div className="step-indicator">
              <div className="step-icon">
                {step.isCompleted ? <CheckCircle size={18} strokeWidth={3} /> : <div className="step-dot" />}
              </div>
              {index < steps.length - 1 && <div className="step-line" />}
            </div>
            <div className="step-content">
              <span className="step-label">{step.label}</span>
              {step.date && <span className="step-date">{step.date}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemTraceability;
