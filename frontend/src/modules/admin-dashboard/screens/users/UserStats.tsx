import { Card } from '@/shared/components';

const stats = [
  {
    title: 'إجمالي المستخدمين',
    value: '2,500',
    change: '+25%',
    period: 'من الشهر الماضي'
  },
  {
    title: 'المستخدمين النشطين',
    value: '1,800',
    change: '+10%',
    period: 'من الشهر الماضي'
  },
  {
    title: 'متوسط النقاط لكل مستخدم',
    value: '450',
    change: '+5%',
    period: 'من الشهر الماضي'
  }
];

export const UserStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-gray-600">{stat.title}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className="text-sm text-green-600">{stat.change}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{stat.period}</p>
        </Card>
      ))}
    </div>
  );
};
