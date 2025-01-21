import { AdminLayout } from '../../components/AdminLayout';
import { UsersList } from './UsersList';
import { UserStats } from './UserStats';

export const UsersManagementScreen = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">إدارة المستخدمين</h1>
      <UserStats />
      <div className="mt-6">
        <UsersList />
      </div>
    </AdminLayout>
  );
};
