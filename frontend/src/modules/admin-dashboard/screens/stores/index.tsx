import { AdminLayout } from '../../components/AdminLayout';
import { StoreRequests } from './StoreRequests';
import { StoresList } from './StoresList';

export const StoresManagementScreen = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">إدارة المتاجر</h1>
      <div className="grid grid-cols-1 gap-6">
        <StoreRequests />
        <StoresList />
      </div>
    </AdminLayout>
  );
};
