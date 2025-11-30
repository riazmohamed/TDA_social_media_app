import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  username?: string;
}

const Avatar = ({ src, alt = 'User avatar', size = 'md', username }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-lg'
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };
  
  if (src) {
    return (
      <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }
  
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-neutral-300 flex items-center justify-center text-neutral-600 font-medium`}>
      {username ? getInitials(username) : '?'}
    </div>
  );
};

export default Avatar;