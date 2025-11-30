export interface Like {
  id: string;
  userId: string;
  postId: string;
  timestamp: number;
}

export interface CreateLikeData {
  userId: string;
  postId: string;
}