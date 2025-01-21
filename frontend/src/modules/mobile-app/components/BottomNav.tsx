import Image from 'next/image';
import { useRouter } from 'next/router';

const navItems = [
  { icon: '/assets/icons/home_icon.png', label: 'الرئيسية', path: '/' },
  { icon: '/assets/icons/star_icon.png', label: 'النقاط', path: '/points' },
  { icon: '/assets/icons/tags_icon.png', label: 'العروض', path: '/offers' },
  { icon: '/assets/icons/user_icon.png', label: 'حسابي', path: '/profile' },
];

export const BottomNav = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center p-2 ${
              router.pathname === item.path ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Image src={item.icon} alt={item.label} width={24} height={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
