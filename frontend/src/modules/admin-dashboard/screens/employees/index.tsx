import { AdminLayout } from '../../components/AdminLayout';
import { EmployeesList } from './EmployeesList';
import { CreateEmployee } from './CreateEmployee';
import { useState } from 'react';

export const EmployeesManagementScreen = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الموظفين</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          إضافة موظف جديد
        </Button>
      </div>
      
      <EmployeesList />
      
      {showCreateModal && (
        <CreateEmployee onClose={() => setShowCreateModal(false)} />
      )}
    </AdminLayout>
  );
};
