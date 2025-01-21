import { Card } from '@/shared/components';
import Image from 'next/image';

const history = [
  {
    id: 1,
    storeName: 'متجر البركة',
    points: 100,
    type: 'earned',
    date: '2024-01-15'
  },
  {
    id: 2,
    storeName: 'متجر النور',
    points: -50,
    type: 'spent',
    date: '2024-01-14'
  }
];

export const PointsHistory = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">سجل النقاط</h2>
      <div className="space-y-3">
        {history.map((item) => (
          <Card key={item.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/shop_icon.png"
                alt={item.storeName}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-medium">{item.storeName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
            <span className={`font-bold ${
              item.type === 'earned' ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.type === 'earned' ? '+' : '-'}{item.points}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};
