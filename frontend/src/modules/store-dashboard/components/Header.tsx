import Image from 'next/image';
import { useState } from 'react';

export const Header = () => {
  const [notifications, setNotifications] = useState(0);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/shop_icon.png"
            alt="متجر"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="font-bold">متجر البركة</h2>
            <p className="text-sm text-gray-500">لوحة التحكم</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative">
            <Image
              src="/assets/icons/bell_icon.png"
              alt="الإشعارات"
              width={24}
              height={24}
            />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <button className="text-gray-600 hover:text-red-600">
            تسجيل الخروج
          </button>
        </div>
      </div>
    </header>
  );
};
