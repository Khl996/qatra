import { StoreCard } from '../../components/StoreCard';

const featuredStores = [
  { id: 1, name: 'متجر البركة', image: '/assets/images/store_1.png', rating: 4.5 },
  { id: 2, name: 'متجر الرحمة', image: '/assets/images/store_2.png', rating: 4.8 },
  { id: 3, name: 'متجر السعادة', image: '/assets/images/store_3.png', rating: 4.3 }
];

export const FeaturedStores = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">المتاجر المميزة</h2>
        <button className="text-blue-600">عرض الكل</button>
      </div>
      
      <div className="flex overflow-x-auto pb-4 -mx-4 px-4">
        {featuredStores.map((store) => (
          <StoreCard
            key={store.id}
            name={store.name}
            image={store.image}
            rating={store.rating}
            onPress={() => console.log(`Pressed store ${store.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
