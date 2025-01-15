import { User } from "@/types";

export interface GetAllPostsQuery {
  page: number;
  limit: number;
  searchQuery?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface GetAllPostsResponse {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}
