import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Navbar from '../../../shared/components/Navbar';
import api from '../../../shared/api/config';
import { Store } from '../../../shared/types';

const StoreManagement: NextPage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [pendingStores, setPendingStores] = useState<Store[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const [activeRes, pendingRes] = await Promise.all([
        api.get('/admin/stores/active'),
        api.get('/admin/stores/pending')
      ]);
      setStores(activeRes.data);
      setPendingStores(pendingRes.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleStoreAction = async (storeId: string, action: 'approve' | 'reject' | 'block') => {
    try {
      await api.put(`/admin/stores/${storeId}/${action}`);
      fetchStores();
    } catch (error) {
      console.error('Error updating store status:', error);
    }
  };

  return (
    <div>
      <Navbar 
        items={[
          { label: 'الرئيسية', href: '/admin/dashboard' },
          { label: 'إدارة المستخدمين', href: '/admin/users' },
          { label: 'إدارة المتاجر', href: '/admin/stores' },
        ]}
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-right">إدارة المتاجر</h1>
        
        <div className="mb-6 flex justify-end space-x-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded ${
              activeTab === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            المتاجر النشطة
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded ${
              activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            طلبات الانضمام
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">اسم المتجر</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">التقييم</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">عدد العروض</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(activeTab === 'active' ? stores : pendingStores).map((store) => (
                <tr key={store.id}>
                  <td className="px-6 py-4 text-right">{store.name}</td>
                  <td className="px-6 py-4 text-right">{store.rating}/5</td>
                  <td className="px-6 py-4 text-right">{store.activeOffers || 0}</td>
                  <td className="px-6 py-4 text-center">
                    {activeTab === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleStoreAction(store.id, 'approve')}
                          className="px-4 py-2 bg-green-600 text-white rounded mr-2"
                        >
                          موافقة
                        </button>
                        <button
                          onClick={() => handleStoreAction(store.id, 'reject')}
                          className="px-4 py-2 bg-red-600 text-white rounded"
                        >
                          رفض
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleStoreAction(store.id, 'block')}
                        className="px-4 py-2 bg-yellow-600 text-white rounded"
                      >
                        حظر
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;
