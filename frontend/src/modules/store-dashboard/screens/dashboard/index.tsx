import { StoreLayout } from '../../components/StoreLayout';
import { Statistics } from './Statistics';
import { Reports } from './Reports';

export const DashboardScreen = () => {
  return (
    <StoreLayout>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
      <Statistics />
      <div className="mt-8">
        <Reports />
      </div>
    </StoreLayout>
  );
};
