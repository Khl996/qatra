import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            قطرة
          </Link>
          <div className="space-x-4 rtl">
            {!isAuthenticated ? (
              <Link href="/auth/login" className="btn-primary">
                تسجيل الدخول
              </Link>
            ) : (
              <Link href="/dashboard" className="btn-secondary">
                لوحة التحكم
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
