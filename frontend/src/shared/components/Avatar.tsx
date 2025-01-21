import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({
  src = '/assets/icons/avatar_icon.png',
  alt = 'صورة المستخدم',
  size = 'md',
  className = ''
}: AvatarProps) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`relative rounded-full overflow-hidden ${sizes[size]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
};
