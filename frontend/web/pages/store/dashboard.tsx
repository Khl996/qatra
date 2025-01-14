import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Navbar from '../../../shared/components/Navbar';
import api from '../../../shared/api/config';

interface DashboardStats {
  dailySales: number;
  monthlyCustomers: number;
  totalPoints: number;
  activeOffers: number;
}

const StoreDashboard: NextPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/store/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <Navbar 
        items={[
          { label: 'الرئيسية', href: '/store/dashboard' },
          { label: 'إضافة نقاط', href: '/store/add-points' },
          { label: 'إدارة العروض', href: '/store/offers' },
        ]}
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-right">لوحة التحكم</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-right">المبيعات اليومية</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.dailySales || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-right">العملاء الشهريين</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.monthlyCustomers || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-right">مجموع النقاط</h3>
            <p className="text-3xl font-bold text-purple-600">{stats?.totalPoints || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-right">العروض النشطة</h3>
            <p className="text-3xl font-bold text-orange-600">{stats?.activeOffers || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
