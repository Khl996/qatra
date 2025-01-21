import { Card, Input, Button } from '@/shared/components';
import { useState } from 'react';

const users = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0501234567',
    points: 750,
    status: 'active',
    joinedAt: '2024-01-01'
  }
  // More users...
];

export const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">قائمة المستخدمين</h2>
        <div className="w-64">
          <Input
            placeholder="بحث عن مستخدم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-right py-3">المستخدم</th>
              <th className="text-right py-3">رقم الجوال</th>
              <th className="text-right py-3">النقاط</th>
              <th className="text-right py-3">الحالة</th>
              <th className="text-right py-3">تاريخ الانضمام</th>
              <th className="text-right py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-4">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="py-4">{user.phone}</td>
                <td className="py-4 font-medium">{user.points}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {user.status === 'active' ? 'نشط' : 'محظور'}
                  </span>
                </td>
                <td className="py-4 text-gray-500">
                  {new Date(user.joinedAt).toLocaleDateString('ar-SA')}
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log(`View user ${user.id}`)}
                    >
                      عرض
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => console.log(`Block user ${user.id}`)}
                    >
                      حظر
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
