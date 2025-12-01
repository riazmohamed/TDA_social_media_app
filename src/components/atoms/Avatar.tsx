import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  username?: string;
}

const Avatar = ({ src, alt = 'User avatar', size = 'md', username }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-32 h-32 text-3xl',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  // Generate a consistent color based on username
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-orange-500',
      'bg-green-500',
      'bg-teal-500',
      'bg-indigo-500',
      'bg-rose-500',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  if (src) {
    return (
      <div className={`relative rounded-full overflow-hidden flex-shrink-0 ${sizeClasses[size]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  const bgColor = username ? getBackgroundColor(username) : 'bg-text-secondary';

  return (
    <div className={`${sizeClasses[size]} rounded-full ${bgColor} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {username ? getInitials(username) : '?'}
    </div>
  );
};

export default Avatar;
