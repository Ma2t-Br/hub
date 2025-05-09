import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  error: null
});

// Hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=150'
};

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('hub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login function (mock)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in a real app, this would be a server call)
      if (email.trim() && password.trim()) {
        // Mock successful login
        setUser(mockUser);
        localStorage.setItem('hub_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('hub_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};