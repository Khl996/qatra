import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface StoreLayoutProps {
  children: ReactNode;
}

export const StoreLayout = ({ children }: StoreLayoutProps) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="mr-64">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
