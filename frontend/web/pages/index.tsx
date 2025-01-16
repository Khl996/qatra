import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <Head>
        <title>قطرة | الرئيسية</title>
        <meta name="description" content="نظام إدارة نقاط الولاء للمتاجر" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">مرحباً بك في قطرة</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">للمتاجر</h2>
              <a href="/auth/store/login" className="btn-primary">تسجيل الدخول</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">للعملاء</h2>
              <a href="/auth/login" className="btn-primary">تسجيل الدخول</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
