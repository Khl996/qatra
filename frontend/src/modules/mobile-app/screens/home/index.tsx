import { Layout } from '@/shared/components';
import { SearchBar } from '../../components/SearchBar';
import { Carousel } from './Carousel';
import { FeaturedStores } from './FeaturedStores';
import { NearbyStores } from './NearbyStores';
import Image from 'next/image';

export const HomeScreen = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/icons/avatar_icon.png"
            alt="الصورة الشخصية"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">مرحباً أحمد</h1>
            <p className="text-gray-500 text-sm">#12345678</p>
          </div>
        </div>
        <Image
          src="/assets/icons/bell_icon.png"
          alt="الإشعارات"
          width={24}
          height={24}
        />
      </div>

      <SearchBar onSearch={(term) => console.log(term)} />
      
      <div className="mt-6">
        <Carousel />
      </div>

      <div className="mt-8">
        <FeaturedStores />
      </div>

      <div className="mt-8 mb-20">
        <NearbyStores />
      </div>
    </Layout>
  );
};
