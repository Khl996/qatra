import { Layout } from '@/shared/components';
import { PointsCard } from './PointsCard';
import { PointsHistory } from './PointsHistory';

export const PointsScreen = () => {
  return (
    <Layout title="نقاطي">
      <div className="mb-6">
        <PointsCard points={1250} />
      </div>

      <div className="mb-20">
        <PointsHistory />
      </div>
    </Layout>
  );
};
