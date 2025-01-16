import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '../services/auth';
import type { User } from '../types';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                router.push('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    return { isAuthenticated, isLoading };
};
