import { StoreCard } from '../../components/StoreCard';

const nearbyStores = [
  { id: 1, name: 'متجر النور', image: '/assets/images/store_4.png', rating: 4.2, distance: '0.5 كم' },
  { id: 2, name: 'متجر الأمل', image: '/assets/images/store_5.png', rating: 4.7, distance: '0.8 كم' }
];

export const NearbyStores = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">المتاجر القريبة</h2>
        <button className="text-blue-600">عرض الكل</button>
      </div>
      
      <div className="flex overflow-x-auto pb-4 -mx-4 px-4">
        {nearbyStores.map((store) => (
          <StoreCard
            key={store.id}
            name={store.name}
            image={store.image}
            rating={store.rating}
            distance={store.distance}
            onPress={() => console.log(`Pressed store ${store.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
