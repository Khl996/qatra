import { useState } from 'react';
import { Layout, Input, Button } from '@/shared/components';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const RegisterScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: implement register logic
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1500);
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex flex-col justify-center px-6 py-12">
        <div className="mb-10 text-center">
          <Image
            src="/assets/icons/logo.png"
            alt="قطرة"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-gray-600 mt-2">انضم إلينا واستمتع بالمزايا</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="space-y-4">
            <Input
              label="الاسم الكامل"
              placeholder="أدخل اسمك الكامل"
              required
            />
            <Input
              label="رقم الجوال"
              type="tel"
              placeholder="أدخل رقم جوالك"
              required
            />
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

          <Button
            type="submit"
            className="w-full mt-6"
            isLoading={isLoading}
          >
            إنشاء حساب
          </Button>

          <p className="text-center mt-6">
            لديك حساب بالفعل؟{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/login')}
              className="text-blue-600"
            >
              تسجيل الدخول
            </button>
          </p>
        </form>
      </div>
    </Layout>
  );
};
