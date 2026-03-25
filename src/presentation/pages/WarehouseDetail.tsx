import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Pencil, Trash } from 'lucide-react';
import { Warehouse, Zone } from '../../core/domain/types';
import { warehouseRepository } from '../../infrastructure/repositories/MockWarehouseRepository';
import './Pages.css';
import './WarehouseDetail.css';

interface Item {
  id: string;
  categoryName: string;
  name: string;
  description: string;
  trackingCode: string;
}

const MOCK_ZONES: Zone[] = [
  { id: '1', warehouseId: '1', name: 'Pasillo A', capacity: 100 },
  { id: '2', warehouseId: '1', name: 'Estante B', capacity: 50 },
];

const MOCK_ITEMS: Item[] = [
  { id: '1', categoryName: 'Ferretería', name: 'Tornillo Mariposa', description: 'Tornillos de 5mm', trackingCode: 'TRN-001' },
  { id: '2', categoryName: 'Electrónica', name: 'Cable HDMI', description: 'Cable de 2 metros', trackingCode: 'CBL-022' },
];

const WarehouseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'zones' | 'items' | 'categories'>('zones');

  useEffect(() => {
    if (id) {
      warehouseRepository.getById(id).then((data) => {
        setWarehouse(data || null);
        // Load mock data for the specific warehouse
        setZones(MOCK_ZONES);
        setItems(MOCK_ITEMS);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="page-wrapper"><div className="loading-state">Cargando detalles del almacén...</div></div>;
  if (!warehouse) return <div className="page-wrapper"><div className="error-state">Almacén no encontrado</div></div>;

  return (
    <div className="page-wrapper animate-fade-in warehouse-detail">
      <div className="detail-header-nav">
        <button className="btn-link" onClick={() => navigate('/warehouses')}>
          &larr; Volver a Almacenes
        </button>
        <span className="separator">/</span>
        <span className="current-warehouse">{warehouse.name}</span>
      </div>

      <div className="card warehouse-hero">
        <div className="hero-info">
          <div className="hero-icon">🏢</div>
          <div>
            <h1 className="hero-title">{warehouse.name}</h1>
            <div className="hero-meta">
              <span className="badge badge-primary">{warehouse.location}</span>
              <span className="text-light">{warehouse.description}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          onClick={() => setActiveTab('zones')}
          className={`tab-btn ${activeTab === 'zones' ? 'active' : ''}`}
        >
          Infraestructura (Zonas)
        </button>
        <button
          onClick={() => setActiveTab('items')}
          className={`tab-btn ${activeTab === 'items' ? 'active' : ''}`}
        >
          Stock de Artículos
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
        >
          Categorías
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'zones' && (
          <div className="zones-section animate-fade-in">
            <div className="section-header">
              <h2>Zonas y Ubicaciones</h2>
              <button className="btn btn-primary">+ Nueva Zona</button>
            </div>
            
            <div className="grid-container">
              {zones.length > 0 ? (
                zones.map((zone) => (
                  <div key={zone.id} className="card zone-card">
                    <div className="zone-header">
                      <div className="zone-icon-wrapper">
                        <MapPin className="icon-map-pin" />
                      </div>
                      <div className="zone-actions">
                        <button className="icon-btn edit-btn"><Pencil className="icon-sm" /></button>
                        <button className="icon-btn delete-btn"><Trash className="icon-sm text-danger" /></button>
                      </div>
                    </div>
                    <h3 className="zone-title">{zone.name}</h3>
                    <p className="zone-desc">Capacidad: {zone.capacity}</p>
                  </div>
                ))
              ) : (
                <div className="empty-state">No hay zonas configuradas en este almacén</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="items-section animate-fade-in">
            <div className="section-header">
              <h2>Inventario / Artículos</h2>
              <button className="btn btn-primary">+ Nuevo Artículo</button>
            </div>
            
            <div className="card table-container">
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Código / SKU</th>
                    <th>Nombre del Artículo</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item) => (
                      <tr key={item.id}>
                        <td className="tracking-code">{item.trackingCode}</td>
                        <td className="item-name">{item.name}</td>
                        <td><span className="badge category-badge">{item.categoryName}</span></td>
                        <td className="actions-cell">
                          <button className="icon-btn edit-btn"><Pencil className="icon-sm" /></button>
                          <button className="icon-btn delete-btn"><Trash className="icon-sm text-danger" /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="empty-state">No hay artículos registrados en este almacén</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="categories-section animate-fade-in">
            <div className="section-header">
              <h2>Categorías de Artículos</h2>
              <button className="btn btn-primary">+ Nueva Categoría</button>
            </div>
            
            <div className="card">
              <div className="empty-state">Las categorías específicas de este almacén se mostrarán aquí.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarehouseDetail;
