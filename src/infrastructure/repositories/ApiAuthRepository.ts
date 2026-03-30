import { User } from '../../core/domain/types';
import api from '../config/api';

class ApiAuthRepository {
  // Implementación real del inicio de sesión contra el backend especificado en .env
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post('/login', { email, password });
      
      // Suponemos que la API devuelve { user: User, token: string }
      const { user, token } = response.data;
      
      if (token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return user;
    } catch (error: any) {
      console.error('Error in login:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Credenciales inválidas');
    }
  }

  // Cierra la sesión activa eliminando los tokens locales
  async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  // Método para recuperar la sesión persistida si existe
  async getCurrentUser(): Promise<User | null> {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }
}

export const authRepository = new ApiAuthRepository();
