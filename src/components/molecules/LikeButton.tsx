'use client';

import { useState } from 'react';
import Button from '../atoms/Button';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onToggleLike: () => void;
}

const LikeButton = ({ isLiked, likeCount, onToggleLike }: LikeButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    setIsAnimating(true);
    onToggleLike();
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={`flex items-center gap-1 ${isAnimating ? 'animate-pulse' : ''}`}
    >
      <svg
        className={`w-5 h-5 transition-colors duration-200 ${
          isLiked ? 'text-red-500 fill-current' : 'text-neutral-600'
        }`}
        fill={isLiked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="text-sm text-neutral-600">
        {likeCount}
      </span>
    </Button>
  );
};

export default LikeButton;