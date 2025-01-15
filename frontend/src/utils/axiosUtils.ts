import axios, { AxiosInstance } from "axios";

const apiUrl = import.meta.env.REACT_APP_API_URL!;
axios.defaults.baseURL = apiUrl;

let authInterceptor: number;
let apiAxiosInstance: AxiosInstance | null = null;

export function getAPIAxiosInstance(): AxiosInstance {
  if (!apiAxiosInstance) {
    throw new Error("API Axios Instance not initialized");
  }

  return apiAxiosInstance;
}

export function axiosInit({ apiUrl }: { apiUrl: string }) {
  apiAxiosInstance = axios.create({
    baseURL: apiUrl,
  });
}

export function setAuthHeader(authToken: string): void {
  const axiosInstance = getAPIAxiosInstance();
  authInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      if (config.url && config.url.substring(0, 5) === "/api/") {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${authToken}`,
          },
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export function removeAuthHeader(): void {
  axios.interceptors.request.eject(authInterceptor);
}
