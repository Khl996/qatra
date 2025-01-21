import { Card, Button } from '@/shared/components';
import Image from 'next/image';

const ads = [
  {
    id: 1,
    title: 'خصم 50% على جميع المنتجات',
    description: 'عروض حصرية لمدة محدودة',
    image: '/assets/images/offer_1.png',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: 'active'
  }
  // More ads...
];

export const AdsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <Card key={ad.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={ad.image}
              alt={ad.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-2">{ad.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{ad.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                من: {new Date(ad.startDate).toLocaleDateString('ar-SA')}
              </span>
              <span>
                إلى: {new Date(ad.endDate).toLocaleDateString('ar-SA')}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-sm ${
                ad.status === 'active' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {ad.status === 'active' ? 'نشط' : 'منتهي'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log(`Delete ad ${ad.id}`)}
              >
                حذف
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
