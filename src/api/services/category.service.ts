import axiosClient from "../axiosClient";
import { Category } from "@/types";

class CategoryService {
  async getCategories(): Promise<Category[]> {
    return axiosClient.get("/categories");
  }

  async getCategory(slug: string): Promise<Category> {
    return axiosClient.get(`/categories/${slug}`);
  }

  async getCategoryListings(slug: string, filters?: any): Promise<any> {
    const params = new URLSearchParams(filters);
    return axiosClient.get(`/categories/${slug}/listings?${params.toString()}`);
  }
}

export const categoryService = new CategoryService();
