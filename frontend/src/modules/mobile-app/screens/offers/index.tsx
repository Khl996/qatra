import { Layout } from '@/shared/components';
import { OffersList } from './OffersList';

export const OffersScreen = () => {
  return (
    <Layout title="العروض المتاحة">
      <div className="mb-20">
        <OffersList />
      </div>
    </Layout>
  );
};
