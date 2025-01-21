import Image from 'next/image';
import { useState } from 'react';

export const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/admin_icon.png"
            alt="المسؤول"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="font-bold">لوحة المسؤول</h2>
            <p className="text-sm text-gray-500">مدير النظام</p>
          </div>
        </div>
        
        <button className="text-gray-600 hover:text-red-600">
          تسجيل الخروج
        </button>
      </div>
    </header>
  );
};
