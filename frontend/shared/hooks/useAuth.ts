import { useState, useEffect } from 'react';
import auth from '../services/auth';
import type { User } from '../types';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isValid = await auth.isAuthenticated();
      setIsAuthenticated(isValid);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    isAuthenticated,
    user,
    checkAuth
  };
}
