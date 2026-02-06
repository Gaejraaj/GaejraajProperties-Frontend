import axiosClient from "../axiosClient";
import { User } from "@/types";

class UserService {
  async getUser(id: string): Promise<User> {
    return axiosClient.get(`/users/${id}`);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return axiosClient.put(`/users/${id}`, data);
  }

  async getUserListings(userId: string): Promise<any> {
    return axiosClient.get(`/users/${userId}/listings`);
  }

  async getUserFavorites(userId: string): Promise<any> {
    return axiosClient.get(`/users/${userId}/favorites`);
  }
}

export const userService = new UserService();
