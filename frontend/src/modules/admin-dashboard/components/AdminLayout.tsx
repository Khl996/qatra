import { ReactNode } from 'react';
import { AdminHeader } from './Header';
import { AdminSidebar } from './Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="mr-64">
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
