'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Layout from '@/components/organisms/Layout';
import { Avatar, Button } from '@/components';
import LikeButton from '@/components/molecules/LikeButton';
import { useDatabase } from '@/lib/db';

function PostDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const postId = searchParams.get('id');
  const { activeUser, getPostWithUser, toggleLike } = useDatabase();
  const [post, setPost] = useState<ReturnType<typeof getPostWithUser>>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (postId && activeUser) {
      const postData = getPostWithUser(postId, activeUser.id);
      setPost(postData);
      setIsLoading(false);
    } else if (!activeUser) {
      setIsLoading(false);
    }
  }, [postId, activeUser, getPostWithUser]);
  
  const handleLikeToggle = () => {
    if (post && activeUser) {
      const isLiked = toggleLike(post.id, activeUser.id);
      setPost({
        ...post,
        isLiked: isLiked,
        likeCount: isLiked ? post.likeCount + 1 : post.likeCount - 1
      });
    }
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  if (!postId) {
    return (
      <Layout activeUser={activeUser}>
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              No Post Selected
            </h2>
            <p className="text-neutral-600 mb-6">
              Please select a post from the feed to view details.
            </p>
            <Button onClick={() => router.push('/feed')}>
              Go to Feed
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (isLoading) {
    return (
      <Layout activeUser={activeUser}>
        <div className="flex justify-center items-center min-h-96">
          <div className="text-neutral-500">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout activeUser={activeUser}>
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Post not found
            </h2>
            <p className="text-neutral-600 mb-6">
              The post you are looking for does not exist or has been deleted.
            </p>
            <Button onClick={() => router.push('/feed')}>
              Go back to feed
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout activeUser={activeUser}>
      <div className="max-w-2xl mx-auto">
        <article className="bg-white border border-neutral-200 rounded-xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <Avatar 
              src={post.user.avatar} 
              username={post.user.username} 
              size="lg" 
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl font-bold text-neutral-900">
                  {post.user.username}
                </h1>
                <span className="text-neutral-500">
                  · {formatDate(post.timestamp)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="whitespace-pre-wrap break-words text-neutral-900 mb-6 text-lg leading-relaxed">
            {post.content}
          </div>
          
          <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
            <LikeButton
              isLiked={post.isLiked}
              likeCount={post.likeCount}
              onToggleLike={handleLikeToggle}
            />
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push('/feed')}
            >
              Back to Feed
            </Button>
          </div>
        </article>
      </div>
    </Layout>
  );
}

export default function PostsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="text-neutral-500">Loading...</div>
      </div>
    }>
      <PostDetailContent />
    </Suspense>
  );
}