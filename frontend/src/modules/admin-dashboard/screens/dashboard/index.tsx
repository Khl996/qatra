import { AdminLayout } from '../../components/AdminLayout';
import { Overview } from './Overview';
import { Statistics } from './Statistics';

export const AdminDashboardScreen = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم الرئيسية</h1>
      <Statistics />
      <div className="mt-8">
        <Overview />
      </div>
    </AdminLayout>
  );
};
