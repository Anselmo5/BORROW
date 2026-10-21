import { api } from "../api";
import type { LoginResponse, RegisterData } from "../../types/auth";

export async function loginService(data: { email: string; password: string }) {
  const response = await api.post<LoginResponse>("/auth/login", data);

  return response.data;
}

export async function registerService(data: RegisterData) {
  const response = await api.post("/auth/register", data);

  return response.data;
}