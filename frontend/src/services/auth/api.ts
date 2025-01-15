import { getAPIAxiosInstance } from "@/utils/axiosUtils";
import type {
  LoginRequestPayload,
  RegisterRequestPayload,
  LoginResponse,
} from "./types";

export const login = async (
  requestPayload: LoginRequestPayload
): Promise<LoginResponse> => {
  const axios = getAPIAxiosInstance();
  return axios.post("/api/auth/login", requestPayload).then(({ data }) => data);
};

export const register = async (
  requestPayload: RegisterRequestPayload
): Promise<void> => {
  const axios = getAPIAxiosInstance();
  return axios
    .post("/api/auth/register", requestPayload)
    .then(({ data }) => data);
};
