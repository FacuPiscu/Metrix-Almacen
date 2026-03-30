import { Warehouse } from '../../core/domain/types';
import api from '../config/api';

class ApiWarehouseRepository {
  // Obtiene todos los almacenes registrados desde la API real
  async getAll(): Promise<Warehouse[]> {
    try {
      const response = await api.get('/almacenes');
      
      // Verificamos si la respuesta es HTML en lugar de JSON
      if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE')) {
        console.error('El servidor devolvió una página HTML en lugar de JSON. ¿Falta autenticación?');
        return [];
      }

      // La API puede devolver [...] o { data: [...] }
      const data = response.data;
      
      // Mapeo flexible para campos en inglés o español
      const mapWarehouse = (item: any): Warehouse => ({
        id: item.id?.toString(),
        name: item.name || item.nombre || 'Sin nombre',
        description: item.description || item.descripcion || '',
        location: item.location || item.ubicacion || ''
      });

      const items = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : []);
      return items.map(mapWarehouse);

    } catch (error: any) {
      console.error('Error fetching warehouses:', error.response?.data || error.message);
      return []; 
    }
  }
  
  // Obtiene un almacén específico por su identificador
  async getById(id: string): Promise<Warehouse | undefined> {
    try {
      const response = await api.get(`/almacenes/${id}`);
      
      if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE')) {
        return undefined;
      }

      const data = response.data?.data || response.data;
      
      if (!data) return undefined;

      return {
        id: data.id?.toString(),
        name: data.name || data.nombre || 'Sin nombre',
        description: data.description || data.descripcion || '',
        location: data.location || data.ubicacion || ''
      };
    } catch (error) {
      console.error(`Error fetching warehouse with id ${id}:`, error);
      return undefined;
    }
  }
}

export const warehouseRepository = new ApiWarehouseRepository();
