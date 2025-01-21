import { Card, Button } from '@/shared/components';
import Image from 'next/image';

const offers = [
  {
    id: 1,
    title: 'خصم 50% على القهوة',
    description: 'احصل على خصم 50% على جميع أنواع القهوة',
    points: 500,
    image: '/assets/images/offer_1.png',
    store: 'كافيه السعادة'
  },
  {
    id: 2,
    title: 'اشتري واحد واحصل على الثاني مجاناً',
    description: 'على جميع المشروبات الباردة',
    points: 750,
    image: '/assets/images/offer_2.png',
    store: 'كافيه النور'
  }
];

export const OffersList = () => {
  const handleRedeemOffer = (offerId: number) => {
    console.log(`Redeeming offer ${offerId}`);
  };

  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <Card key={offer.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
            <p className="text-gray-600 mb-2">{offer.description}</p>
            <p className="text-sm text-gray-500 mb-4">{offer.store}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/star_icon.png"
                  alt="نقاط"
                  width={20}
                  height={20}
                />
                <span className="font-bold text-blue-600">{offer.points} نقطة</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleRedeemOffer(offer.id)}
              >
                استبدال النقاط
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
