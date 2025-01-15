const environment = import.meta.env.VITE_APP_ENV;

export const appConfig = {
  basePath: "",
  environment,
  isDev: environment === "develop",
};
