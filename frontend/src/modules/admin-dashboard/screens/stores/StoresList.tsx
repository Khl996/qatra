import { Card, Button } from '@/shared/components';
import { useState } from 'react';

const stores = [
  {
    id: 1,
    name: 'متجر البركة',
    totalSales: 15000,
    totalPoints: 5000,
    status: 'active'
  }
];

export const StoresList = () => {
  const [filter, setFilter] = useState('all');

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">قائمة المتاجر</h2>
        <div className="flex gap-2">
          {['all', 'active', 'suspended'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {status === 'all' ? 'الكل' : status === 'active' ? 'نشط' : 'معلق'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-right py-3">اسم المتجر</th>
              <th className="text-right py-3">إجمالي المبيعات</th>
              <th className="text-right py-3">النقاط الممنوحة</th>
              <th className="text-right py-3">الحالة</th>
              <th className="text-right py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="border-b">
                <td className="py-3">{store.name}</td>
                <td className="py-3">{store.totalSales} ريال</td>
                <td className="py-3">{store.totalPoints}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    store.status === 'active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {store.status === 'active' ? 'نشط' : 'معلق'}
                  </span>
                </td>
                <td className="py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log(`View store ${store.id}`)}
                  >
                    عرض التفاصيل
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
