export interface OfferData {
    id?: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    status: 'active' | 'inactive';
}

export interface OffersState {
    offers: OfferData[];
    isLoading: boolean;
    error: string | null;
}
