export interface NotificationData {
    id?: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

export interface UIState {
    isLoading: boolean;
    error: string | null;
    notification: NotificationData | null;
    isSidebarOpen: boolean;
}
