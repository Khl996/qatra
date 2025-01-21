import { Card, Button } from '@/shared/components';

const offers = [
  {
    id: 1,
    title: 'خصم 50% على القهوة',
    points: 500,
    available: 98,
    total: 100,
    expires: '2024-02-01',
    active: true
  },
  // More offers...
];

export const OffersList = () => {
  const handleToggleActive = (offerId: number) => {
    // TODO: Implement toggle logic
    console.log(`Toggle offer ${offerId}`);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-4">العروض الحالية</h2>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{offer.title}</h3>
                <p className="text-sm text-gray-500">
                  {offer.points} نقطة | متبقي {offer.available} من {offer.total}
                </p>
              </div>
              <Button
                variant={offer.active ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleToggleActive(offer.id)}
              >
                {offer.active ? 'نشط' : 'متوقف'}
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              ينتهي في: {new Date(offer.expires).toLocaleDateString('ar-SA')}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
