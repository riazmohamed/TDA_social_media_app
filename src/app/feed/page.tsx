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
          <div className="animate-spin w-8 h-8 border-4 border-brand border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeUser={activeUser}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-text">Home</h1>
        </div>
        {/* Tab Navigation */}
        <div className="flex">
          <button className="flex-1 py-4 hover:bg-background-hover transition-colors relative">
            <span className="font-bold text-text">For you</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-brand rounded-full" />
          </button>
          <button className="flex-1 py-4 hover:bg-background-hover transition-colors">
            <span className="text-text-secondary">Following</span>
          </button>
        </div>
      </header>

      {/* Composer */}
      <CreatePostForm />

      {/* Feed */}
      <div>
        {posts.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <div className="max-w-sm mx-auto">
              <h2 className="text-[31px] font-extrabold text-text mb-2">
                Welcome to Social!
              </h2>
              <p className="text-text-secondary text-[15px] mb-6">
                This is the best place to see what&apos;s happening in your world. Share your first post!
              </p>
              <svg viewBox="0 0 24 24" className="w-40 h-40 mx-auto fill-background-tertiary">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
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
