import { useState } from 'react';
import { Layout, Input, Button } from '@/shared/components';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: implement password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
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
          <h1 className="text-2xl font-bold">استعادة كلمة المرور</h1>
          <p className="text-gray-600 mt-2">
            أدخل بريدك الإلكتروني لاستعادة كلمة المرور
          </p>
        </div>

        {emailSent ? (
          <div className="text-center">
            <div className="mb-6 text-green-600">
              <Image
                src="/assets/icons/success.png"
                alt="نجاح"
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <p>تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني</p>
            </div>
            <Button
              variant="primary"
              onClick={() => router.push('/auth/login')}
            >
              العودة لتسجيل الدخول
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
            <Button
              type="submit"
              className="w-full mt-6"
              isLoading={isLoading}
            >
              إرسال رابط الاستعادة
            </Button>
            <button
              type="button"
              onClick={() => router.push('/auth/login')}
              className="w-full mt-4 text-blue-600"
            >
              العودة لتسجيل الدخول
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};
