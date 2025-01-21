import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <div className="relative w-32 h-32 mb-8">
        <Image
          src="/assets/animations/splash.gif"
          alt="قطرة"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-4xl font-bold text-blue-600 animate-fade-in">
        قطرة
      </h1>
    </div>
  );
};
