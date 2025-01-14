import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Navbar from '../../../shared/components/Navbar';
import api from '../../../shared/api/config';

interface AdminStats {
  totalUsers: number;
  totalStores: number;
  totalPoints: number;
  monthlyRevenue: number;
  activeOffers: number;
}

const AdminDashboard: NextPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };
    fetchStats();
  }, []);

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
        <h1 className="text-3xl font-bold mb-8 text-right">لوحة تحكم الإدارة</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-right">إجمالي المستخدمين</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalUsers || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-right">إجمالي المتاجر</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.totalStores || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-right">العروض النشطة</h3>
            <p className="text-3xl font-bold text-purple-600">{stats?.activeOffers || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow col-span-full">
            <h3 className="text-lg font-semibold mb-2 text-right">الإيرادات الشهرية</h3>
            <p className="text-3xl font-bold text-orange-600">
              {stats?.monthlyRevenue?.toLocaleString() || 0} ريال
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
