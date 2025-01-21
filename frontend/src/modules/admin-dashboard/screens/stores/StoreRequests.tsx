import { Card, Button } from '@/shared/components';
import Image from 'next/image';

const requests = [
  {
    id: 1,
    name: 'متجر السعادة',
    ownerName: 'محمد أحمد',
    email: 'store@example.com',
    phone: '0501234567',
    date: new Date().toISOString()
  }
];

export const StoreRequests = () => {
  const handleAction = (id: number, action: 'approve' | 'reject') => {
    console.log(`${action} store ${id}`);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-4">طلبات الانضمام الجديدة</h2>
      <div className="space-y-4">
        {requests.map((store) => (
          <div key={store.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{store.name}</h3>
                <p className="text-gray-600">{store.ownerName}</p>
                <div className="text-sm text-gray-500 mt-1">
                  <p>{store.email}</p>
                  <p>{store.phone}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(store.date).toLocaleDateString('ar-SA')}
              </span>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction(store.id, 'reject')}
              >
                رفض
              </Button>
              <Button
                size="sm"
                onClick={() => handleAction(store.id, 'approve')}
              >
                قبول
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
