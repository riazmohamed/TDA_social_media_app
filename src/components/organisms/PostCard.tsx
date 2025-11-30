'use client';

import Link from 'next/link';
import Avatar from '../atoms/Avatar';
import LikeButton from '../molecules/LikeButton';
import { PostWithUser } from '@/types';

interface PostCardProps {
  post: PostWithUser;
  onLikeToggle: (postId: string) => void;
}

const PostCard = ({ post, onLikeToggle }: PostCardProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
  };
  
  return (
    <article className="bg-white border border-neutral-200 rounded-xl p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <Avatar 
          src={post.user.avatar} 
          username={post.user.username} 
          size="md" 
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-neutral-900">
              {post.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              ·
            </span>
            <span className="text-neutral-500 text-sm">
              {formatDate(post.timestamp)}
            </span>
          </div>
          
          <Link
            href={`/posts?id=${post.id}`}
            className="block text-neutral-900 mb-3 hover:text-neutral-700 transition-colors duration-200"
          >
            <p className="whitespace-pre-wrap break-words">
              {post.content}
            </p>
          </Link>
          
          <div className="flex items-center gap-4">
            <LikeButton
              isLiked={post.isLiked}
              likeCount={post.likeCount}
              onToggleLike={() => onLikeToggle(post.id)}
            />
            
            <Link
              href={`/posts?id=${post.id}`}
              className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;