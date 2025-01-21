import Image from 'next/image';
import { Card } from '@/shared/components';

interface StoreCardProps {
  name: string;
  image: string;
  rating: number;
  distance?: string;
  onPress?: () => void;
}

export const StoreCard = ({
  name,
  image,
  rating,
  distance,
  onPress
}: StoreCardProps) => {
  return (
    <Card 
      className="w-36 mr-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onPress}
    >
      <div className="relative h-24 mb-2 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-medium text-gray-800">{name}</h3>
      <div className="flex items-center mt-1">
        <span className="text-yellow-400 mr-1">⭐</span>
        <span className="text-sm text-gray-600">{rating}</span>
        {distance && (
          <span className="text-sm text-gray-500 mr-2">{distance}</span>
        )}
      </div>
    </Card>
  );
};
