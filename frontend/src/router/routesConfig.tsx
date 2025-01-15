import { RouteObject } from "react-router-dom";
import { paths } from "./paths";
import { AuthLayout } from "@/layouts/authLayout";
import { LoginPage } from "@/pages/auth/login";
import { RegisterPage } from "@/pages/auth/register";
import { HomePage } from "@/pages/home";
import { PostPage } from "@/pages/post";
import { MainLayout } from "@/layouts/mainLayout";
import { DashboardPage } from "@/pages/dashboard";
import { PostViewPage } from "@/pages/post/view";

const routesConfig: RouteObject[] = [
  {
    children: [
      {
        children: [
          {
            element: <LoginPage />,
            path: paths.auth.login,
          },
          {
            element: <RegisterPage />,
            path: paths.auth.register,
          },
        ],
        element: <AuthLayout />,
        path: paths.root,
      },
      {
        children: [
          {
            element: <DashboardPage />,
            path: paths.dashboard,
          },
          {
            element: <PostPage />,
            path: paths.post.index,
          },
          {
            element: <PostViewPage />,
            path: paths.post.view,
          },
        ],
        element: <MainLayout />,
        path: paths.root,
      },
    ],
    element: <HomePage />,
    path: paths.root,
  },
];

export default routesConfig;
