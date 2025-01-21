import { Card } from '@/shared/components';
import Image from 'next/image';

const settingsItems = [
  {
    id: 'edit',
    title: 'تعديل البيانات الشخصية',
    icon: '/assets/icons/user_icon.png'
  },
  {
    id: 'support',
    title: 'الدعم الفني',
    icon: '/assets/icons/support_icon.png'
  },
  {
    id: 'logout',
    title: 'تسجيل الخروج',
    icon: '/assets/icons/logout_icon.png',
    danger: true
  }
];

export const Settings = () => {
  const handleItemClick = (id: string) => {
    switch (id) {
      case 'edit':
        console.log('Navigate to edit profile');
        break;
      case 'support':
        window.open('https://wa.me/1234567890', '_blank');
        break;
      case 'logout':
        console.log('Handle logout');
        break;
    }
  };

  return (
    <Card className="divide-y divide-gray-100">
      {settingsItems.map((item) => (
        <button
          key={item.id}
          className={`flex items-center gap-4 w-full p-4 text-right ${
            item.danger ? 'text-red-600' : 'text-gray-700'
          }`}
          onClick={() => handleItemClick(item.id)}
        >
          <Image
            src={item.icon}
            alt={item.title}
            width={24}
            height={24}
          />
          <span>{item.title}</span>
        </button>
      ))}
    </Card>
  );
};
