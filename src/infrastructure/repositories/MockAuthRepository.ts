import { User } from '../../core/domain/types';

class MockAuthRepository {
  // Simula el inicio de sesión contra una API, devolviendo un usuario válido
  async login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ id: '1', email, name: 'Admin User' });
        } else {
          // Rechaza si los datos no están completos según las reglas del negocio
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  }

  // Simula el cierre de la sesión eliminando el estado local
  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  }
}

export const authRepository = new MockAuthRepository();
