import { StoreLayout } from '../../components/StoreLayout';
import { CreateOffer } from './CreateOffer';
import { OffersList } from './OffersList';

export const OffersManagementScreen = () => {
  return (
    <StoreLayout>
      <h1 className="text-2xl font-bold mb-6">إدارة العروض</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CreateOffer />
        <OffersList />
      </div>
    </StoreLayout>
  );
};
