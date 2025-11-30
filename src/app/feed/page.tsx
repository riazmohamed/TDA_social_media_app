'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/organisms/Layout';
import PostCard from '@/components/organisms/PostCard';
import CreatePostForm from './components/CreatePostForm';
import { useDatabase } from '@/lib/db';

export default function FeedPage() {
  const router = useRouter();
  const { activeUser, getPostsWithUsers, toggleLike } = useDatabase();
  const posts = getPostsWithUsers(activeUser?.id);
  
  useEffect(() => {
    // Redirect to profile if no active user
    if (!activeUser) {
      router.push('/profile');
    }
  }, [activeUser, router]);
  
  const handleLikeToggle = (postId: string) => {
    if (activeUser) {
      toggleLike(postId, activeUser.id);
    }
  };
  
  if (!activeUser) {
    return (
      <Layout activeUser={null}>
        <div className="flex justify-center items-center min-h-96">
          <div className="text-neutral-500">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout activeUser={activeUser}>
      <CreatePostForm />
      
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-neutral-500 text-lg mb-4">
              No posts yet
            </div>
            <p className="text-neutral-400">
              Create your first post to get started!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLikeToggle={handleLikeToggle}
            />
          ))
        )}
      </div>
    </Layout>
  );
}