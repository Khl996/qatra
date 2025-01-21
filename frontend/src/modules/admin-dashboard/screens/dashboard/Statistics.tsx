import { Card } from '@/shared/components';

const statsItems = [
  {
    id: 'total_stores',
    title: 'عدد المتاجر',
    value: '150',
    change: '+12%',
    color: 'blue'
  },
  {
    id: 'total_users',
    title: 'عدد المستخدمين',
    value: '2,500',
    change: '+25%',
    color: 'green'
  },
  {
    id: 'active_offers',
    title: 'العروض النشطة',
    value: '45',
    change: '+8%',
    color: 'purple'
  },
  {
    id: 'total_revenue',
    title: 'إجمالي العمولات',
    value: '15,000 ريال',
    change: '+15%',
    color: 'yellow'
  }
];

export const Statistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsItems.map((stat) => (
        <Card key={stat.id} className={`p-6 border-t-4 border-${stat.color}-500`}>
          <h3 className="text-gray-600 mb-2">{stat.title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{stat.value}</p>
            <span className={`text-${stat.color}-600 text-sm font-medium`}>
              {stat.change}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
