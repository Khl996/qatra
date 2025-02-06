import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { createOffer, getOffers } from '../../../store/slices/offersSlice';
import DataTable from '../../../shared/components/ui/tables/DataTable';
import type { OfferData } from '../../../types';

const OffersManagementPage = () => {
    const dispatch = useAppDispatch();
    const { offers, isLoading } = useAppSelector(state => state.offers);
    const [localOffers, setLocalOffers] = useState<OfferData[]>([]);

    useEffect(() => {
        dispatch(getOffers());
    }, [dispatch]);

    useEffect(() => {
        setLocalOffers(offers);
    }, [offers]);

    const handleCreateOffer = async (data: OfferData) => {
        try {
            await dispatch(createOffer({
                ...data,
                status: 'active',
                startDate: new Date(),
                endDate: data.expiryDate || new Date(),
                discountType: 'percentage',
                discountValue: 0
            })).unwrap();
        } catch (err) {
            console.error('Failed to create offer:', err);
        }
    };

    return (
        <div>
            <DataTable 
                data={localOffers}
                isLoading={isLoading}
                columns={[
                    { header: 'العنوان', accessor: 'title' },
                    { header: 'الوصف', accessor: 'description' },
                    { 
                        header: 'الحالة', 
                        accessor: 'status',
                        render: (offer: OfferData) => (
                            <span>{offer.status === 'active' ? 'نشط' : 'غير نشط'}</span>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default OffersManagementPage;
