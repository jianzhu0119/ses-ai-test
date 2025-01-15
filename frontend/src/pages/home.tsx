import { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

import { paths } from '@/router/paths';

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(paths.auth.login)
  }, [])

  return <Outlet />;
};
