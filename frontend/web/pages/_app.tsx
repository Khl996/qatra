import type { AppProps } from 'next/app';
import { useAuth } from '../../shared/hooks/useAuth';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import type { NextComponentType } from 'next';

interface CustomAppProps extends AppProps {
  Component: NextComponentType & {
    requiresAuth?: boolean;
  };
}

import '../styles/globals.css';

function MyApp({ Component, pageProps }: CustomAppProps) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  // التحقق من الصفحات التي تتطلب تسجيل دخول
  const requiresAuth = Component.requiresAuth ?? true;
  if (requiresAuth && !isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <div dir="rtl">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
