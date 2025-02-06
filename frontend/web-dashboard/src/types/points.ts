export interface PointTransaction {
    id?: string;
    customerId: string;
    amount: number;
    points: number;
    type: 'add' | 'subtract';
    date: Date;
}

export interface PointsState {
    transactions: PointTransaction[];
    isLoading: boolean;
    error: string | null;
}
