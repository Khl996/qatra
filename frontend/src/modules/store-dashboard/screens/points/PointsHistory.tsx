import { Card } from '@/shared/components';

const history = [
  {
    id: 1,
    customerName: 'أحمد محمد',
    points: 100,
    amount: 500,
    date: new Date().toISOString(),
  },
  // More history items...
];

export const PointsHistory = () => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-4">سجل النقاط</h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{item.customerName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('ar-SA')}
                </p>
              </div>
              <div className="text-left">
                <p className="font-bold text-green-600">+{item.points} نقطة</p>
                <p className="text-sm text-gray-500">{item.amount} ريال</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
