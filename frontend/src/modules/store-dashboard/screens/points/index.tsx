import { StoreLayout } from '../../components/StoreLayout';
import { AddPoints } from './AddPoints';
import { PointsHistory } from './PointsHistory';

export const PointsManagementScreen = () => {
  return (
    <StoreLayout>
      <h1 className="text-2xl font-bold mb-6">إدارة النقاط</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AddPoints />
        <PointsHistory />
      </div>
    </StoreLayout>
  );
};
