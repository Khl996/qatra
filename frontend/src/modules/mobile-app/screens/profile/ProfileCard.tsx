import { Card } from '@/shared/components';
import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  email: string;
  userId: string;
  avatar: string;
}

export const ProfileCard = ({ name, email, userId, avatar }: ProfileCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt="الصورة الشخصية"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-500">{email}</p>
          <p className="text-sm text-gray-400 mt-1">#{userId}</p>
        </div>
      </div>
    </Card>
  );
};
