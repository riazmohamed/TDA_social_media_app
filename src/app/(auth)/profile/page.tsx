'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/organisms/Layout';
import Avatar from '@/components/atoms/Avatar';
import { useDatabase } from '@/lib/db';

export default function ProfilePage() {
  const router = useRouter();
  const { activeUser, createUser, updateUser, getPostsWithUsers } = useDatabase();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userPosts = activeUser ? getPostsWithUsers(activeUser.id).filter(p => p.userId === activeUser.id) : [];

  useEffect(() => {
    if (activeUser) {
      setUsername(activeUser.username);
      setBio(activeUser.bio || '');
      setIsEditing(true);
    }
  }, [activeUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeUser) {
        updateUser(activeUser.id, { username, bio });
      } else {
        createUser({ username, bio });
      }

      router.push('/feed');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If user exists, show profile view
  if (activeUser && isEditing) {
    return (
      <Layout activeUser={activeUser}>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-6 px-4 py-1">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-background-tertiary transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-text">
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-text">{activeUser.username}</h1>
              <p className="text-[13px] text-text-secondary">{userPosts.length} posts</p>
            </div>
          </div>
        </header>

        {/* Banner */}
        <div className="h-32 sm:h-48 bg-gradient-to-r from-brand to-blue-400" />

        {/* Profile Info */}
        <div className="px-4 pb-4 border-b border-border">
          <div className="flex justify-between items-start -mt-12 sm:-mt-16 mb-4">
            <div className="border-4 border-background rounded-full">
              <Avatar
                username={activeUser.username}
                size="xl"
              />
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="mt-14 sm:mt-20 px-4 py-1.5 border border-border-dark rounded-full font-bold text-[15px] hover:bg-background-tertiary transition-colors"
            >
              Edit profile
            </button>
          </div>

          <div className="mb-3">
            <h2 className="text-xl font-extrabold text-text">{activeUser.username}</h2>
            <p className="text-text-secondary text-[15px]">@{activeUser.username.toLowerCase()}</p>
          </div>

          {activeUser.bio && (
            <p className="text-[15px] text-text mb-3">{activeUser.bio}</p>
          )}

          <div className="flex items-center gap-1 text-text-secondary text-[15px] mb-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z" />
            </svg>
            <span>Joined {new Date(activeUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>

          <div className="flex gap-4 text-[15px]">
            <span><strong className="text-text">0</strong> <span className="text-text-secondary">Following</span></span>
            <span><strong className="text-text">0</strong> <span className="text-text-secondary">Followers</span></span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button className="flex-1 py-4 hover:bg-background-hover transition-colors relative">
            <span className="font-bold text-text">Posts</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-brand rounded-full" />
          </button>
          <button className="flex-1 py-4 hover:bg-background-hover transition-colors">
            <span className="text-text-secondary">Replies</span>
          </button>
          <button className="flex-1 py-4 hover:bg-background-hover transition-colors">
            <span className="text-text-secondary">Likes</span>
          </button>
        </div>

        {/* User's Posts */}
        {userPosts.length === 0 ? (
          <div className="px-8 py-10 text-center">
            <h3 className="text-[31px] font-extrabold text-text mb-2">No posts yet</h3>
            <p className="text-text-secondary text-[15px]">When you post, it will show up here.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {userPosts.map((post) => (
              <div key={post.id} className="px-4 py-3">
                <p className="text-[15px] text-text">{post.content}</p>
                <p className="text-[13px] text-text-secondary mt-2">
                  {new Date(post.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Layout>
    );
  }

  // Create/Edit Profile Form
  return (
    <Layout activeUser={activeUser}>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-text">
            {activeUser ? 'Edit Profile' : 'Create your account'}
          </h1>
        </div>
      </header>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Avatar Preview */}
          <div className="flex justify-center py-8">
            <div className="relative">
              <Avatar
                username={username || 'User'}
                size="xl"
              />
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                  <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Username Input */}
          <div className="mb-6">
            <div className="relative border border-border-dark rounded-md focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                required
                minLength={2}
                maxLength={30}
                className="peer w-full px-3 pt-6 pb-2 bg-transparent text-[17px] text-text outline-none"
              />
              <label
                htmlFor="username"
                className="absolute left-3 top-2 text-[13px] text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[17px] peer-focus:top-2 peer-focus:text-[13px] peer-focus:text-brand"
              >
                Name
              </label>
            </div>
            <p className="text-[13px] text-text-secondary mt-1 text-right">{username.length}/30</p>
          </div>

          {/* Bio Input */}
          <div className="mb-6">
            <div className="relative border border-border-dark rounded-md focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder=" "
                rows={4}
                maxLength={160}
                className="peer w-full px-3 pt-6 pb-2 bg-transparent text-[17px] text-text outline-none resize-none"
              />
              <label
                htmlFor="bio"
                className="absolute left-3 top-2 text-[13px] text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[17px] peer-focus:top-2 peer-focus:text-[13px] peer-focus:text-brand"
              >
                Bio
              </label>
            </div>
            <p className="text-[13px] text-text-secondary mt-1 text-right">{bio.length}/160</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-text hover:bg-text/90 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-3 rounded-full text-[17px] transition-colors"
          >
            {isLoading ? 'Saving...' : activeUser ? 'Save' : 'Next'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
