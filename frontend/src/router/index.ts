import { createBrowserRouter } from "react-router-dom";

import { appConfig } from "@/config/appConfig";

import routesConfig from "./routesConfig";

const router = createBrowserRouter(routesConfig, {
  basename: appConfig.basePath,
});

export default router;
