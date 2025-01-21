import { AdminLayout } from '../../components/AdminLayout';
import { CreateAd } from './CreateAd';
import { AdsList } from './AdsList';
import { useState } from 'react';
import { Button } from '@/shared/components';

export const AdsManagementScreen = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الإعلانات</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          إضافة إعلان جديد
        </Button>
      </div>
      
      <AdsList />
      
      {showCreateModal && (
        <CreateAd onClose={() => setShowCreateModal(false)} />
      )}
    </AdminLayout>
  );
};
