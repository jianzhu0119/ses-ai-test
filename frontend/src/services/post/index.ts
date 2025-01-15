import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "./api";
import { GetAllPostsQuery, Post } from "./types";
import { queryClient } from "@/utils/queryClient";

export const useGetAllPosts = (query: GetAllPostsQuery) =>
  useQuery({ queryKey: ["posts", query], queryFn: () => getAllPosts(query) });

export const useGetPostById = (id: string) =>
  useQuery({ queryKey: ["post", id], queryFn: () => getPostById(id) });

export const useCreatePost = () =>
  useMutation({
    mutationKey: ["creaetPost"],
    mutationFn: (post: Post) => createPost(post),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

export const useUpdatePost = () =>
  useMutation({
    mutationKey: ["updatePost"],
    mutationFn: (post: Post) => updatePost(post),
    onSuccess: async (post: Post) => {
      await queryClient.refetchQueries({ queryKey: ["post", post._id] });
      await queryClient.refetchQueries({ queryKey: ["posts"] });
    },
  });

export const useDeletePost = () =>
  useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id: string) => deletePost(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["posts"] });
    },
  });
