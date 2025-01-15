import { getAPIAxiosInstance } from '@/utils/axiosUtils';
import { GetAllPostsQuery, GetAllPostsResponse, Post } from './types';

export const getAllPosts = (
  query: GetAllPostsQuery,
): Promise<GetAllPostsResponse> => {
  const axios = getAPIAxiosInstance();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams = new URLSearchParams(query as any).toString();
  return axios.get(`/api/posts?${queryParams}`).then(({ data }) => data);
};

export const getPostById = (id: string): Promise<Post> => {
  const axios = getAPIAxiosInstance();
  return axios.get(`/api/posts/${id}`).then(({ data }) => data);
};

export const createPost = (post: Post): Promise<Post> => {
  const axios = getAPIAxiosInstance();
  return axios.post('/api/posts', post).then(({ data }) => data);
};

export const updatePost = (post: Post): Promise<Post> => {
  const axios = getAPIAxiosInstance();
  return axios.put(`/api/posts/${post._id}`, post).then(({ data }) => data);
};

export const deletePost = (id: string): Promise<void> => {
  const axios = getAPIAxiosInstance();
  return axios.delete(`/api/posts/${id}`).then(({ data }) => data);
};
