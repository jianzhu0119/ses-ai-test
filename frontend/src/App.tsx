import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/App.css";
import router from "@/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/queryClient";
import { useEffect } from "react";
import { axiosInit } from "./utils/axiosUtils";

const App = () => {
  useEffect(() => {
    axiosInit({ apiUrl: import.meta.env.VITE_API_URL! });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
