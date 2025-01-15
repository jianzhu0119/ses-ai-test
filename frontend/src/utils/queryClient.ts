import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const queryCache = new QueryCache({
  onError: (error) => {
    toast.error(error.response?.data.message);
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 1000,
    },
    mutations: {
      onError: (error) => {
        toast.error(error.response?.data.message);
      },
    },
  },
  queryCache,
});
