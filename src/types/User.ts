export interface User {
  id: string;
  username: string;
  bio: string;
  avatar?: string;
  createdAt: number;
}

export interface CreateUserData {
  username: string;
  bio: string;
  avatar?: string;
}