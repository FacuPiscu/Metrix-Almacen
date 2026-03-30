import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Pencil, Trash, Building2, PackagePlus, ArrowRightLeft,
  Camera, QrCode, ClipboardCheck, CalendarClock, FileText, CheckCircle,
  PackageMinus, Truck, CheckCheck, PenTool, Eye
} from 'lucide-react';
import { Warehouse, Zone } from '../../core/domain/types';
import { useAuth } from '../hooks/useAuth';
import { warehouseRepository } from '../../infrastructure/repositories/ApiWarehouseRepository';
import ItemTraceability from '../components/ItemTraceability';
import LiveTracking from '../components/LiveTracking';
import '../../styles/Pages.css';
import '../../styles/WarehouseDetail.css';

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
  const { user } = useAuth();

  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'zones' | 'items' | 'inbound' | 'outbound'>('zones');

  const [isInboundModalOpen, setIsInboundModalOpen] = useState(false);
  const [inboundStep, setInboundStep] = useState<'form' | 'success'>('form');
  const [inboundForm, setInboundForm] = useState({ contract: '', date: '', provider: '' });

  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);
  const [receptionStep, setReceptionStep] = useState<'form' | 'success'>('form');
  const [receptionForm, setReceptionForm] = useState({ inboundId: '', quantity: '', condition: '' });

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [storeStep, setStoreStep] = useState<'form' | 'success'>('form');
  const [storeForm, setStoreForm] = useState({ itemId: '', zoneId: '' });

  const [isPackModalOpen, setIsPackModalOpen] = useState(false);
  const [packStep, setPackStep] = useState<'form' | 'success'>('form');
  const [packForm, setPackForm] = useState({ projectId: '', boxId: '' });

  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchStep, setDispatchStep] = useState<'form' | 'success'>('form');
  const [dispatchForm, setDispatchForm] = useState({ vehicle: '' });

  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [deliveryStep, setDeliveryStep] = useState<'form' | 'success'>('form');

  const [isProcessing, setIsProcessing] = useState(false);

  const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);
  const [selectedItemForTrace, setSelectedItemForTrace] = useState<Item | null>(null);

  useEffect(() => {
    if (id) {
      warehouseRepository.getById(id).then((data) => {
        setWarehouse(data || null);
        setZones(MOCK_ZONES);
        setItems(MOCK_ITEMS);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSimulateAction = (setStep: React.Dispatch<React.SetStateAction<'form' | 'success'>>) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  const closeModals = () => {
    if (isProcessing) return;
    setIsInboundModalOpen(false); setInboundStep('form');
    setIsReceptionModalOpen(false); setReceptionStep('form');
    setIsStoreModalOpen(false); setStoreStep('form');
    setIsPackModalOpen(false); setPackStep('form');
    setIsDispatchModalOpen(false); setDispatchStep('form');
    setIsDeliveryModalOpen(false); setDeliveryStep('form');
    setIsTraceModalOpen(false); setSelectedItemForTrace(null);
  };

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
          <div className="hero-icon"><Building2 size={40} style={{ color: '#047857' }} /></div>
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
        <button onClick={() => setActiveTab('zones')} className={`tab-btn ${activeTab === 'zones' ? 'active' : ''}`}>
          Infraestructura (Zonas)
        </button>
        <button onClick={() => setActiveTab('items')} className={`tab-btn ${activeTab === 'items' ? 'active' : ''}`}>
          Stock de Artículos
        </button>

        <button onClick={() => setActiveTab('inbound')} className={`tab-btn ${activeTab === 'inbound' ? 'active' : ''}`}>
          Operaciones (Ingreso)
        </button>
        <button onClick={() => setActiveTab('outbound')} className={`tab-btn ${activeTab === 'outbound' ? 'active' : ''}`}>
          Operaciones (Salida)
        </button>
      </div>

      <div className="tab-content">

        {activeTab === 'outbound' && (
          <div className="operations-section animate-fade-in">
            <div className="section-header">
              <h2>Flujos de Salida Logística</h2>
            </div>

            <div className="operations-grid">
              <div className="card operation-card">
                <div className="op-icon bg-orange-light text-orange">
                  <PackageMinus size={32} />
                </div>
                <div className="op-info">
                  <h3>Surtido & Empaque</h3>
                  <p>Asigna artículos del almacén a empacado para una orden de venta o proyecto.</p>
                </div>
                <button
                  className="btn btn-large btn-outline"
                  onClick={() => setIsPackModalOpen(true)}
                  disabled={user?.role === 'operador'}
                  title={user?.role === 'operador' ? 'Solo administradores pueden iniciar el empaque' : undefined}
                >
                  {user?.role === 'operador' ? 'Acceso Restringido' : 'Iniciar Empaque'}
                </button>
              </div>

              <div className="card operation-card">
                <div className="op-icon bg-blue-light text-blue">
                  <Truck size={32} />
                </div>
                <div className="op-info">
                  <h3>Salida del Envío</h3>
                  <p>Registra el despacho físico de cajas mediante vehículos o fletes.</p>
                </div>
                <button
                  className="btn btn-large btn-blue"
                  onClick={() => setIsDispatchModalOpen(true)}
                >
                  Registrar Despacho
                </button>
              </div>

              <div className="card operation-card">
                <div className="op-icon bg-green-light text-green">
                  <CheckCheck size={32} />
                </div>
                <div className="op-info">
                  <h3>Entrega Final</h3>
                  <p>Confirma el arribo del envío al cliente final cerrando todo el orden logístico.</p>
                </div>
                <button
                  className="btn btn-large btn-green"
                  onClick={() => setIsDeliveryModalOpen(true)}
                >
                  Confirmar Entrega
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inbound' && (
          <div className="operations-section animate-fade-in">
            <div className="section-header">
              <h2>Flujos de Ingreso Logístico</h2>
            </div>

            <div className="operations-grid">
              <div className="card operation-card">
                <div className="op-icon bg-orange-light text-orange">
                  <CalendarClock size={32} />
                </div>
                <div className="op-info">
                  <h3>Pre-Aviso (Inbound)</h3>
                  <p>Adelanta los datos de un arribo planificado capturando el contrato y proveedor.</p>
                </div>
                <button
                  className="btn btn-large btn-outline"
                  onClick={() => setIsInboundModalOpen(true)}
                >
                  Registrar Pre-Aviso
                </button>
              </div>

              <div className="card operation-card">
                <div className="op-icon bg-blue-light text-blue">
                  <PackagePlus size={32} />
                </div>
                <div className="op-info">
                  <h3>Nueva Recepción</h3>
                  <p>Registra la llegada de nuevos bultos o embarques al almacén general.</p>
                </div>
                <button
                  className="btn btn-large btn-blue"
                  onClick={() => setIsReceptionModalOpen(true)}
                >
                  Iniciar Recepción
                </button>
              </div>

              <div className="card operation-card">
                <div className="op-icon bg-green-light text-green">
                  <ArrowRightLeft size={32} />
                </div>
                <div className="op-info">
                  <h3>Almacenar Artículo</h3>
                  <p>Asigna un artículo previamente recibido a una zona específica del almacén.</p>
                </div>
                <button
                  className="btn btn-large btn-green"
                  onClick={() => setIsStoreModalOpen(true)}
                >
                  Asignar a Zona
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'zones' && (
          <div className="zones-section animate-fade-in">
            <div className="section-header">
              <h2>Zonas y Ubicaciones</h2>
              <button className="btn btn-primary">+ Nueva Zona</button>
            </div>
            <div className="grid-container">
              {Array.isArray(zones) && zones.length > 0 ? zones.map((zone) => (
                <div key={zone.id} className="card zone-card">
                  <div className="zone-header">
                    <div className="zone-icon-wrapper"><MapPin className="icon-map-pin" /></div>
                    <div className="zone-actions">
                      <button className="icon-btn edit-btn"><Pencil className="icon-sm" /></button>
                      <button className="icon-btn delete-btn"><Trash className="icon-sm text-danger" /></button>
                    </div>
                  </div>
                  <h3 className="zone-title">{zone.name}</h3>
                  <p className="zone-desc">Capacidad: {zone.capacity}</p>
                </div>
              )) : <div className="empty-state">No hay zonas</div>}
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
                  <tr><th>Código / SKU</th><th>Nombre del Artículo</th><th>Categoría</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                  {Array.isArray(items) && items.length > 0 ? items.map((item) => (
                    <tr key={item.id}>
                      <td className="tracking-code">{item.trackingCode}</td>
                      <td className="item-name">{item.name}</td>
                      <td><span className="badge category-badge">{item.categoryName}</span></td>
                      <td className="actions-cell">
                        <button
                          className="icon-btn"
                          style={{ color: '#0ea5e9', marginRight: '0.25rem' }}
                          onClick={() => { setSelectedItemForTrace(item); setIsTraceModalOpen(true); }}
                          title="Ver Trazabilidad"
                        >
                          <Eye className="icon-sm" />
                        </button>
                        <button className="icon-btn edit-btn"><Pencil className="icon-sm" /></button>
                        <button className="icon-btn delete-btn"><Trash className="icon-sm text-danger" /></button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={4} className="empty-state">No hay artículos</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}


      </div>

      {/* MODALES */}

      {/* Modal: Surtido & Empaque */}
      {isPackModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3>Surtido y Empaque (Picking)</h3>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {packStep === 'form' ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Proyecto / Orden Vinculada</label>
                    <select className="form-control" disabled={isProcessing} value={packForm.projectId} onChange={(e) => setPackForm({ ...packForm, projectId: e.target.value })}>
                      <option value="">Seleccionar proyecto de salida...</option>
                      <option value="ORD-2026-902">ORD-2026-902 - Redes Norte</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Caja o Paquete Asignado</label>
                    <input type="text" className="form-control" placeholder="Ej: CAJA-#52" disabled={isProcessing} value={packForm.boxId} onChange={(e) => setPackForm({ ...packForm, boxId: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Empacador (Operador Actual)</label>
                    <input type="text" className="form-control" readOnly value={user?.name || 'Operador'} />
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle size={64} style={{ color: '#059669', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>Empacado de Orden Exitoso</h3>
                  <p className="text-light">Los artículos han sido agrupados en la caja ingresada.</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {packStep === 'form' ? (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals} disabled={isProcessing}>Cancelar</button>
                  <button className="btn btn-primary bg-blue flex-center" onClick={() => { console.log('Pack Form:', packForm); handleSimulateAction(setPackStep); }} disabled={isProcessing}>
                    {isProcessing ? 'Procesando...' : <><PackageMinus size={18} className="mr-2" /> Confirmar Cajas</>}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals}>Cerrar</button>
                  <button className="btn btn-primary bg-green flex-center">
                    <FileText size={18} className="mr-2" /> Descargar Guía (PDF)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Salida del Envío (Despacho) */}
      {isDispatchModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3>Salida de Envío (Despacho)</h3>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {dispatchStep === 'form' ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Vehículo / Flotilla</label>
                    <input type="text" className="form-control" placeholder="Ej: Camión Volvo Placa MX-901" disabled={isProcessing} value={dispatchForm.vehicle} onChange={(e) => setDispatchForm({ ...dispatchForm, vehicle: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Firma de Aceptación del Conductor</label>
                    <div className="camera-placeholder" style={{ padding: '2rem 1rem' }}>
                      <PenTool size={36} className="text-light mb-2" />
                      <span>Firme dentro de este recuadro</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fotografía de Entrega a Flotilla</label>
                    <button className="btn btn-outline" disabled={isProcessing}>
                      <Camera size={20} className="mr-2" /> Adjuntar Imagen
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ padding: '0' }}>
                  <LiveTracking />
                </div>
              )}
            </div>
            <div className="modal-footer">
              {dispatchStep === 'form' ? (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals} disabled={isProcessing}>Cancelar</button>
                  <button className="btn btn-primary bg-blue flex-center" onClick={() => { console.log('Dispatch Form:', dispatchForm); handleSimulateAction(setDispatchStep); }} disabled={isProcessing}>
                    {isProcessing ? 'Procesando...' : <><Truck size={18} className="mr-2" /> Confirmar Salida</>}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals}>Cerrar</button>
                  <button className="btn btn-primary bg-green flex-center">
                    <FileText size={18} className="mr-2" /> Descargar Manifiesto (PDF)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Entrega Final */}
      {isDeliveryModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3>Confirmar Entrega Final</h3>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {deliveryStep === 'form' ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCheck size={48} className="text-blue mx-auto mb-2" style={{ margin: '0 auto' }} />
                  <p className="text-light mb-4">¿Confirmas que la orden vinculada ha sido entregada al cliente final y todo está en regla?</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle size={64} style={{ color: '#059669', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>Flujo Terminado</h3>
                  <p className="text-light">La orden está 100% completada y archivada.</p>
                </div>
              )}
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              {deliveryStep === 'form' ? (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals} disabled={isProcessing}>Conservar Pendiente</button>
                  <button className="btn btn-primary bg-green flex-center" style={{ padding: '0.75rem 2rem' }} onClick={() => handleSimulateAction(setDeliveryStep)} disabled={isProcessing}>
                    {isProcessing ? 'Verificando...' : 'Cerrar Flujo de Orden'}
                  </button>
                </>
              ) : (
                <button className="btn btn-primary bg-blue flex-center" onClick={closeModals}>
                  Cerrar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODALES INBOUND --- */}

      {/* Modal: Pre-Aviso (Inbound) */}
      {isInboundModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3>Registrar Pre-Aviso (Inbound)</h3>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {inboundStep === 'form' ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Contrato Vinculado</label>
                    <input type="text" className="form-control" placeholder="Ej: CT-2026-049" disabled={isProcessing} value={inboundForm.contract} onChange={(e) => setInboundForm({ ...inboundForm, contract: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fecha Tentativa de Arribo</label>
                    <input type="date" className="form-control" disabled={isProcessing} value={inboundForm.date} onChange={(e) => setInboundForm({ ...inboundForm, date: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Razón Social del Proveedor</label>
                    <input type="text" className="form-control" placeholder="Ej: Logística Internacional S.A." disabled={isProcessing} value={inboundForm.provider} onChange={(e) => setInboundForm({ ...inboundForm, provider: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Domicilio de Entrega (Almacén Actual)</label>
                    <input type="text" className="form-control" readOnly value={warehouse.name + ' - ' + warehouse.location} />
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle size={64} style={{ color: '#059669', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>Pre-aviso Registrado</h3>
                  <p className="text-light">El sistema está preparado para la recepción futura.</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {inboundStep === 'form' ? (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals} disabled={isProcessing}>Cancelar</button>
                  <button className="btn btn-primary bg-blue flex-center" onClick={() => { console.log('Inbound Form:', inboundForm); handleSimulateAction(setInboundStep); }} disabled={isProcessing}>
                    {isProcessing ? 'Procesando...' : <><ClipboardCheck size={18} className="mr-2" /> Guardar Aviso</>}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals}>Cerrar</button>
                  <button className="btn btn-primary bg-green flex-center">
                    <FileText size={18} className="mr-2" /> Descargar Acta (PDF)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Nueva Recepción */}
      {isReceptionModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3>Registrar Nueva Recepción</h3>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {receptionStep === 'form' ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Inbound Vinculado (Opcional)</label>
                    <select className="form-control" disabled={isProcessing} value={receptionForm.inboundId} onChange={(e) => setReceptionForm({ ...receptionForm, inboundId: e.target.value })}>
                      <option value="">Seleccionar un pre-aviso pendiente...</option>
                      <option value="CT-2026-049">CT-2026-049 - Logística Internacional S.A.</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cantidad Recibida (Unidades/Bultos)</label>
                    <input type="number" className="form-control" placeholder="Ej: 15" disabled={isProcessing} value={receptionForm.quantity} onChange={(e) => setReceptionForm({ ...receptionForm, quantity: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estado Físico del Embarque</label>
                    <select className="form-control" disabled={isProcessing} value={receptionForm.condition} onChange={(e) => setReceptionForm({ ...receptionForm, condition: e.target.value })}>
                      <option value="">Seleccione estado...</option>
                      <option value="Optimo">Óptimo (Sin daños visibles)</option>
                      <option value="Regular">Regular (Empaque defectuoso pero contenido intacto)</option>
                      <option value="Deficiente">Deficiente (Daños reportados)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fotografía del Embarque</label>
                    <div className="camera-placeholder">
                      <Camera size={48} className="text-light mb-2" />
                      <span>Tocar para usar la cámara</span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle size={64} style={{ color: '#059669', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>Recepción Exitosa</h3>
                  <p className="text-light">La carga ahora figura como "En Tránsito Interno".</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {receptionStep === 'form' ? (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals} disabled={isProcessing}>Cancelar</button>
                  <button className="btn btn-primary bg-blue flex-center" onClick={() => { console.log('Reception Form:', receptionForm); handleSimulateAction(setReceptionStep); }} disabled={isProcessing}>
                    {isProcessing ? 'Procesando...' : <><ClipboardCheck size={18} className="mr-2" /> Confirmar Recepción</>}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals}>Cerrar</button>
                  <button className="btn btn-primary bg-green flex-center">
                    <FileText size={18} className="mr-2" /> Descargar Acta (PDF)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Almacenar Artículo */}
      {isStoreModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3>Almacenar Artículo en Zona</h3>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {storeStep === 'form' ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Seleccionar Lote/Artículo Recibido</label>
                    <select className="form-control" disabled={isProcessing} value={storeForm.itemId} onChange={(e) => setStoreForm({ ...storeForm, itemId: e.target.value })}>
                      <option value="">Seleccione un artículo en espera...</option>
                      <option value="LOTE-001">Lote-001 - Tornillo Mariposa (15x)</option>
                      <option value="LOTE-002">Lote-002 - Cable HDMI (50x)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Asignar a Zona Destino</label>
                    <select className="form-control" disabled={isProcessing} value={storeForm.zoneId} onChange={(e) => setStoreForm({ ...storeForm, zoneId: e.target.value })}>
                      <option value="">Seleccione una zona de este almacén...</option>
                      {zones.map((z) => (
                        <option key={z.id} value={z.id}>{z.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sku-generator">
                    <button className="btn btn-outline" disabled={isProcessing}>
                      <QrCode size={20} className="mr-2" /> Generar Etiqueta / SKU
                    </button>
                    <p className="text-light text-small mt-2 text-center">
                      Al hacer clic se generará un código único para impresión rápida.
                    </p>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle size={64} style={{ color: '#059669', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>Ubicación Asignada</h3>
                  <p className="text-light">Los artículos forman parte del stock oficial de la Zona.</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {storeStep === 'form' ? (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals} disabled={isProcessing}>Cancelar</button>
                  <button className="btn btn-primary bg-green flex-center" onClick={() => { console.log('Store Form:', storeForm); handleSimulateAction(setStoreStep); }} disabled={isProcessing}>
                    {isProcessing ? 'Procesando...' : <><ArrowRightLeft size={18} className="mr-2" /> Almacenar</>}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary mr-2" onClick={closeModals}>Cerrar</button>
                  <button className="btn btn-primary bg-green flex-center">
                    <FileText size={18} className="mr-2" /> Descargar Acta (PDF)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver Trazabilidad */}
      {isTraceModalOpen && selectedItemForTrace && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <h3>Historial de Movimientos: {selectedItemForTrace.trackingCode}</h3>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body" style={{ padding: '1.5rem' }}>
              <ItemTraceability />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModals}>Cerrar Historial</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WarehouseDetail;
