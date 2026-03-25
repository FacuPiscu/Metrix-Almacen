import { Warehouse } from '../../core/domain/types';

// Datos estáticos simulados para la vista
const MOCK_WAREHOUSES: Warehouse[] = [
  { id: '1', name: 'Almacén Central', description: 'Principal depósito municipal', location: 'Centro' },
  { id: '2', name: 'Almacén Norte', description: 'Depósito zona norte', location: 'Norte' },
];

class MockWarehouseRepository {
  // Obtiene todos los almacenes registrados
  async getAll(): Promise<Warehouse[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...MOCK_WAREHOUSES]), 500));
  }
  
  // Obtiene un almacén específico por su identificador
  async getById(id: string): Promise<Warehouse | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_WAREHOUSES.find(warehouse => warehouse.id === id));
      }, 500);
    });
  }
}

export const warehouseRepository = new MockWarehouseRepository();
