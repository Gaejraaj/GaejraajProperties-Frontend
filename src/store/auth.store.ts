import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/api/services/auth.service";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(email, password);

          localStorage.setItem("access_token", response.tokens.access_token);
          localStorage.setItem("refresh_token", response.tokens.refresh_token);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (
        name: string,
        email: string,
        password: string,
        phone?: string,
      ) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(
            name,
            email,
            password,
            phone,
          );

          localStorage.setItem("access_token", response.tokens.access_token);
          localStorage.setItem("refresh_token", response.tokens.refresh_token);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
          });
          localStorage.clear();
        }
      },

      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      updateProfile: async (data: Partial<User>) => {
        try {
          const updatedUser = await authService.updateProfile(data);
          set({ user: updatedUser });
        } catch (error: any) {
          set({ error: error.message || "Update failed" });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
