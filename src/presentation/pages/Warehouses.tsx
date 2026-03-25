import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Warehouse } from '../../core/domain/types';
import { warehouseRepository } from '../../infrastructure/repositories/MockWarehouseRepository';
import '../../styles/Pages.css';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    warehouseRepository.getAll().then((data) => {
      setWarehouses(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Almacenes</h1>
        <button className="btn btn-primary">Nuevo Almacén</button>
      </div>

      {loading ? (
        <div className="loading-state">Cargando almacenes...</div>
      ) : (
        <div className="grid-container">
          {warehouses.map(warehouse => (
            <div key={warehouse.id} className="card item-card" onClick={() => navigate(`/warehouses/${warehouse.id}`)}>
              <h3 className="item-title">{warehouse.name}</h3>
              <p className="item-desc">{warehouse.description}</p>
              <div className="item-meta">
                <span className="badge">{warehouse.location}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Warehouses;
