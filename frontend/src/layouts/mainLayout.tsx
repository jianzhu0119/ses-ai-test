import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/use-auth";
import { paths } from "@/router/paths";

export const MainLayout = () => {
  const navigate = useNavigate();
  const { state } = useAuth();

  const isLoggedIn = useCallback(() => state.isAuthenticated, [state]);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(paths.auth.login, {
        state: {
          redirectURI: location.pathname,
        },
      });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn()) return null;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
