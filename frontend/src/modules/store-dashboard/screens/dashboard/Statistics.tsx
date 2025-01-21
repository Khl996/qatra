import { Card } from '@/shared/components';
import Image from 'next/image';

const stats = [
  {
    id: 'total_points',
    title: 'إجمالي النقاط الممنوحة',
    value: '12,500',
    icon: '/assets/icons/star_icon.png',
    change: '+15%'
  },
  {
    id: 'total_customers',
    title: 'عدد العملاء',
    value: '350',
    icon: '/assets/icons/user_icon.png',
    change: '+8%'
  },
  {
    id: 'active_offers',
    title: 'العروض النشطة',
    value: '5',
    icon: '/assets/icons/tags_icon.png',
    change: '0'
  }
];

export const Statistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.id} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Image
              src={stat.icon}
              alt={stat.title}
              width={32}
              height={32}
            />
            <span className={`text-sm ${
              Number(stat.change) > 0 ? 'text-green-600' : 'text-gray-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-gray-600 mb-2">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
};
