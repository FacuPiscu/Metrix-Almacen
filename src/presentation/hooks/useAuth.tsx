import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../../core/domain/types';
import { authRepository } from '../../infrastructure/repositories/ApiAuthRepository';

// Define la estructura para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del estado global de la sesión
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Intenta recuperar el usuario persistido al cargar el proveedor
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authRepository.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Intenta autenticar al usuario usando el repositorio real
  const login = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    try {
      const authenticatedUser = await authRepository.login(email, password);
      setUser(authenticatedUser);
    } catch (err: any) {
      throw new Error(err.message || 'Error durante el inicio de sesión');
    } finally {
      setLoading(false);
    }
  };

  // Cierra la sesión activa del usuario eliminando los datos de persistencia
  const logout = async () => {
    setLoading(true);
    await authRepository.logout();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// consumo del contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser empleado dentro de un AuthProvider');
  }
  return context;
};
