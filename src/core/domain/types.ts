export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'operador';
}

export interface Warehouse {
  id: string;
  name: string;
  description: string;
  location: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Zone {
  id: string;
  warehouseId: string;
  name: string;
  capacity: number;
}
