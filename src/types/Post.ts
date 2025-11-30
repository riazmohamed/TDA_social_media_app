export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  likeCount: number;
}

export interface CreatePostData {
  userId: string;
  content: string;
}

export interface PostWithUser extends Post {
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  isLiked: boolean;
}