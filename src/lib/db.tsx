'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LS_KEYS } from '@/lib/constants';
import { User, Post, Like, CreateUserData, CreatePostData, PostWithUser } from '@/types';

interface DatabaseContextType {
  // State
  isHydrated: boolean;

  // Data
  users: User[];
  posts: Post[];
  likes: Like[];
  activeUser: User | null;

  // User operations
  createUser: (userData: CreateUserData) => User;
  updateUser: (userId: string, userData: Partial<User>) => User | undefined;
  setActiveUser: (user: User | null) => void;

  // Post operations
  createPost: (postData: CreatePostData) => Post;
  deletePost: (postId: string) => void;
  getPostsWithUsers: (currentUserId?: string) => PostWithUser[];
  getPostWithUser: (postId: string, currentUserId?: string) => PostWithUser | null;

  // Like operations
  toggleLike: (postId: string, userId: string) => boolean;
  isPostLiked: (postId: string, userId: string) => boolean;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [users, setUsers, usersHydrated] = useLocalStorage<User[]>(LS_KEYS.USERS, []);
  const [posts, setPosts, postsHydrated] = useLocalStorage<Post[]>(LS_KEYS.POSTS, []);
  const [likes, setLikes, likesHydrated] = useLocalStorage<Like[]>(LS_KEYS.LIKES, []);
  const [activeUser, setActiveUser, activeUserHydrated] = useLocalStorage<User | null>(LS_KEYS.ACTIVE_USER, null);

  const isHydrated = usersHydrated && postsHydrated && likesHydrated && activeUserHydrated;

  const createUser = (userData: CreateUserData) => {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: Date.now()
    };
    setUsers([...users, newUser]);
    setActiveUser(newUser);
    return newUser;
  };

  const updateUser = (userId: string, userData: Partial<User>) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, ...userData } : user
    );
    setUsers(updatedUsers);

    if (activeUser?.id === userId) {
      setActiveUser({ ...activeUser, ...userData });
    }

    return updatedUsers.find(user => user.id === userId);
  };

  const createPost = (postData: CreatePostData) => {
    const newPost: Post = {
      ...postData,
      id: `post_${Date.now()}`,
      timestamp: Date.now(),
      likeCount: 0
    };
    setPosts([...posts, newPost]);
    return newPost;
  };

  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);

    const updatedLikes = likes.filter(like => like.postId !== postId);
    setLikes(updatedLikes);
  };

  const toggleLike = (postId: string, userId: string) => {
    const existingLike = likes.find(l => l.postId === postId && l.userId === userId);

    if (existingLike) {
      setLikes(likes.filter(l => l.id !== existingLike.id));
      setPosts(posts.map(p =>
        p.id === postId ? { ...p, likeCount: Math.max(0, p.likeCount - 1) } : p
      ));
      return false;
    } else {
      const newLike: Like = {
        id: `like_${Date.now()}`,
        postId,
        userId,
        timestamp: Date.now()
      };
      setLikes([...likes, newLike]);
      setPosts(posts.map(p =>
        p.id === postId ? { ...p, likeCount: p.likeCount + 1 } : p
      ));
      return true;
    }
  };

  const isPostLiked = (postId: string, userId: string) => {
    return likes.some(l => l.postId === postId && l.userId === userId);
  };

  const getPostsWithUsers = (currentUserId?: string): PostWithUser[] => {
    return posts
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(post => {
        const user = users.find(u => u.id === post.userId);
        const isLiked = currentUserId ? isPostLiked(post.id, currentUserId) : false;

        return {
          ...post,
          user: {
            id: user?.id || '',
            username: user?.username || 'Unknown User',
            avatar: user?.avatar
          },
          isLiked
        };
      });
  };

  const getPostWithUser = (postId: string, currentUserId?: string): PostWithUser | null => {
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    const user = users.find(u => u.id === post.userId);
    const isLiked = currentUserId ? isPostLiked(post.id, currentUserId) : false;

    return {
      ...post,
      user: {
        id: user?.id || '',
        username: user?.username || 'Unknown User',
        avatar: user?.avatar
      },
      isLiked
    };
  };

  const value: DatabaseContextType = {
    isHydrated,
    users,
    posts,
    likes,
    activeUser,
    createUser,
    updateUser,
    setActiveUser,
    createPost,
    deletePost,
    getPostsWithUsers,
    getPostWithUser,
    toggleLike,
    isPostLiked
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
