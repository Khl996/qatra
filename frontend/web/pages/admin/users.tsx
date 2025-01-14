import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Navbar from '../../../shared/components/Navbar';
import api from '../../../shared/api/config';
import { User } from '../../../shared/types';

const UserManagement: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserStatus = async (userId: string, action: 'block' | 'activate') => {
    try {
      await api.put(`/admin/users/${userId}/${action}`);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.includes(searchTerm) || 
    user.phone.includes(searchTerm) ||
    user.email.includes(searchTerm)
  );

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
        <h1 className="text-3xl font-bold mb-8 text-right">إدارة المستخدمين</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="بحث عن مستخدم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded text-right"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">الاسم</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">رقم الجوال</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">البريد الإلكتروني</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">النقاط</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-right">{user.name}</td>
                  <td className="px-6 py-4 text-right">{user.phone}</td>
                  <td className="px-6 py-4 text-right">{user.email}</td>
                  <td className="px-6 py-4 text-right">{user.points}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleUserStatus(user.id, 'block')}
                      className="text-red-600 hover:text-red-800 mx-2"
                    >
                      حظر
                    </button>
                    <button
                      onClick={() => handleUserStatus(user.id, 'activate')}
                      className="text-green-600 hover:text-green-800 mx-2"
                    >
                      تفعيل
                    </button>
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

export default UserManagement;
