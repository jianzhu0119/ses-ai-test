import { User } from "@/types";

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequestPayload {
  email: string;
  password: string;
  username: string;
}
