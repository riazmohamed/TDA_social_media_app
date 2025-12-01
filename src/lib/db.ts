'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LS_KEYS } from '@/lib/constants';
import { User, Post, Like, CreateUserData, CreatePostData, PostWithUser } from '@/types';

export function useDatabase() {
  const [users, setUsers, usersHydrated] = useLocalStorage<User[]>(LS_KEYS.USERS, []);
  const [posts, setPosts, postsHydrated] = useLocalStorage<Post[]>(LS_KEYS.POSTS, []);
  const [likes, setLikes, likesHydrated] = useLocalStorage<Like[]>(LS_KEYS.LIKES, []);
  const [activeUser, setActiveUser, activeUserHydrated] = useLocalStorage<User | null>(LS_KEYS.ACTIVE_USER, null);

  // Check if all data is hydrated from localStorage
  const isHydrated = usersHydrated && postsHydrated && likesHydrated && activeUserHydrated;

  // User operations
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

  // Post operations
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

    // Remove associated likes
    const updatedLikes = likes.filter(like => like.postId !== postId);
    setLikes(updatedLikes);
  };

  // Like operations
  const toggleLike = (postId: string, userId: string) => {
    const existingLike = likes.find(l => l.postId === postId && l.userId === userId);

    if (existingLike) {
      // Remove like
      setLikes(likes.filter(l => l.id !== existingLike.id));
      setPosts(posts.map(p =>
        p.id === postId ? { ...p, likeCount: Math.max(0, p.likeCount - 1) } : p
      ));
      return false;
    } else {
      // Add like
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

  // Get posts with user data
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

  // Get single post with user data
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

  return {
    // State
    isHydrated,

    // Data
    users,
    posts,
    likes,
    activeUser,

    // User operations
    createUser,
    updateUser,
    setActiveUser,

    // Post operations
    createPost,
    deletePost,
    getPostsWithUsers,
    getPostWithUser,

    // Like operations
    toggleLike,
    isPostLiked
  };
}
