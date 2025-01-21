import { Card } from '@/shared/components';
import Image from 'next/image';

interface PointsCardProps {
  points: number;
}

export const PointsCard = ({ points }: PointsCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg opacity-90 mb-2">رصيد النقاط الحالي</p>
          <h1 className="text-4xl font-bold">{points}</h1>
        </div>
        <Image
          src="/assets/icons/star_icon.png"
          alt="النقاط"
          width={48}
          height={48}
          className="opacity-90"
        />
      </div>
      <p className="text-sm mt-4 opacity-80">
        يمكنك استبدال نقاطك بعروض حصرية من متاجرنا المميزة
      </p>
    </Card>
  );
};
