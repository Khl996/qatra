export interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    points: number;
    uniqueCode: string;  // إضافة uniqueCode
    avatar?: string;     // إضافة avatar كحقل اختياري
    role: string;
    status: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
}

// إضافة التعريفات الجديدة
export interface LoginCredentials {
    identifier: string; // يمكن أن يكون البريد الإلكتروني أو رقم الهاتف أو الرقم المميز
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    message: string;
}

export interface AuthError {
    message: string;
    code?: string;
}
