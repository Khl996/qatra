import { useRouter } from 'next/router';
import Image from 'next/image';

const menuItems = [
  { 
    id: 'dashboard', 
    title: 'لوحة التحكم', 
    icon: '/assets/icons/dashboard_icon.png',
    path: '/store/dashboard'
  },
  { 
    id: 'points', 
    title: 'إضافة نقاط', 
    icon: '/assets/icons/star_icon.png',
    path: '/store/points'
  },
  { 
    id: 'offers', 
    title: 'العروض', 
    icon: '/assets/icons/tags_icon.png',
    path: '/store/offers'
  },
  { 
    id: 'reports', 
    title: 'التقارير', 
    icon: '/assets/icons/report_icon.png',
    path: '/store/reports'
  }
];

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-white h-screen fixed right-0 top-0 shadow-lg">
      <div className="p-6">
        <Image
          src="/assets/icons/logo.png"
          alt="قطرة"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={`
              w-full flex items-center gap-3 px-6 py-3 text-right
              ${router.pathname === item.path 
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
              }
            `}
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
      </nav>
    </aside>
  );
};
