import { useState } from 'react';
import { Layout, Input, Button } from '@/shared/components';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const LoginScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: implement login logic
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1500);
  };

  return (
    <Layout showHeader={false}>
      <div className="h-screen flex flex-col justify-center px-6">
        <div className="mb-10 text-center">
          <Image
            src="/assets/icons/logo.png"
            alt="قطرة"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold">مرحباً بك في قطرة</h1>
          <p className="text-gray-600 mt-2">سجل دخولك للمتابعة</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
            <Input
              label="كلمة المرور"
              type="password"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <button 
            type="button"
            onClick={() => router.push('/auth/forgot-password')}
            className="text-blue-600 text-sm mt-2"
          >
            نسيت كلمة المرور؟
          </button>

          <Button
            type="submit"
            className="w-full mt-6"
            isLoading={isLoading}
          >
            تسجيل الدخول
          </Button>

          <p className="text-center mt-6">
            ليس لديك حساب؟{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/register')}
              className="text-blue-600"
            >
              إنشاء حساب جديد
            </button>
          </p>
        </form>
      </div>
    </Layout>
  );
};
