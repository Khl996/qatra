import { useState } from 'react';
import { api } from '../config/api-config';
import { useAppDispatch } from './useAppDispatch';
import { setError, showNotification } from '../store/slices/uiSlice';

export const useAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleRequest = async <T>(
        request: () => Promise<T>,
        successMessage?: string
    ): Promise<T | null> => {
        try {
            setIsLoading(true);
            const response = await request();
            
            if (successMessage) {
                dispatch(showNotification({
                    message: successMessage,
                    type: 'success'
                }));
            }
            
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'حدث خطأ غير متوقع';
            dispatch(setError(errorMessage));
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleRequest
    };
};
