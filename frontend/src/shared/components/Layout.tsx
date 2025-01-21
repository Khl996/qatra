import { ReactNode } from 'react';
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  onBack?: () => void;
}

export const Layout = ({ 
  children, 
  showHeader = true, 
  title,
  onBack 
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button onClick={onBack} className="p-2">
                  <Image
                    src="/assets/icons/arrow_left.png"
                    alt="رجوع"
                    width={24}
                    height={24}
                  />
                </button>
              )}
              {title && <h1 className="text-xl font-bold">{title}</h1>}
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/icons/bell_icon.png"
                alt="الإشعارات"
                width={24}
                height={24}
              />
            </div>
          </div>
        </header>
      )}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
