import axiosClient from "../axiosClient";
import type { User, AuthResponse } from "@/types";

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response: AuthResponse = await axiosClient.post("/auth/login", {
      email,
      password,
    });
    this.setAuthData(response);
    return response;
  }

  async register(
    name: string,
    email: string,
    password: string,
    phone?: string,
  ): Promise<AuthResponse> {
    const response: AuthResponse = await axiosClient.post("/auth/register", {
      name,
      email,
      password,
      phone,
    });
    this.setAuthData(response);
    return response;
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem("refresh_token");
    await axiosClient.post("/auth/logout", { refreshToken });
    this.clearAuthData();
  }

  async getProfile(): Promise<User> {
    return axiosClient.get("/auth/profile");
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return axiosClient.put("/auth/profile", data);
  }

  async forgotPassword(email: string): Promise<void> {
    return axiosClient.post("/auth/forgot-password", { email });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    return axiosClient.post("/auth/reset-password", { token, password });
  }

  async uploadAvatar(file: File): Promise<{ avatar: string }> {
    const formData = new FormData();
    formData.append("avatar", file);
    return axiosClient.post("/auth/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  private setAuthData(response: AuthResponse): void {
    localStorage.setItem("access_token", response.tokens.access_token);
    localStorage.setItem("refresh_token", response.tokens.refresh_token);
    localStorage.setItem("user", JSON.stringify(response.user));
  }

  private clearAuthData(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  }
}

export const authService = new AuthService();
