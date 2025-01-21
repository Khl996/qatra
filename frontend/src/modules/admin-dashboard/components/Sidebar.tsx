import { useRouter } from 'next/router';
import Image from 'next/image';

const menuItems = [
  { 
    id: 'dashboard', 
    title: 'لوحة التحكم', 
    icon: '/assets/icons/dashboard_icon.png',
    path: '/admin/dashboard'
  },
  { 
    id: 'stores', 
    title: 'المتاجر', 
    icon: '/assets/icons/shop_icon.png',
    path: '/admin/stores'
  },
  { 
    id: 'users', 
    title: 'المستخدمين', 
    icon: '/assets/icons/users_icon.png',
    path: '/admin/users'
  },
  { 
    id: 'employees', 
    title: 'الموظفين', 
    icon: '/assets/icons/employee_icon.png',
    path: '/admin/employees'
  },
  { 
    id: 'ads', 
    title: 'الإعلانات', 
    icon: '/assets/icons/ads_icon.png',
    path: '/admin/ads'
  }
];

export const AdminSidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-900 h-screen fixed right-0 top-0">
      <div className="p-6">
        <Image
          src="/assets/icons/logo.png"
          alt="قطرة"
          width={80}
          height={80}
          className="mx-auto brightness-0 invert"
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
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800'
              }
            `}
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={24}
              height={24}
              className="brightness-0 invert"
            />
            <span>{item.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
