import axiosClient from "../axiosClient";
import { Listing, PaginatedResponse } from "@/types";

interface CreateListingData {
  title: string;
  description: string;
  price: number;
  listingType: string;
  categoryId: string;
  condition?: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  images: File[];
  isNegotiable: boolean;
  properties?: Record<string, any>;
}

interface ListingFilters {
  categoryId?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  state?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

class ListingService {
  async getListings(
    filters: ListingFilters = {},
  ): Promise<PaginatedResponse<Listing>> {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    return axiosClient.get(`/listings?${params.toString()}`);
  }

  async getListing(id: string): Promise<Listing> {
    return axiosClient.get(`/listings/${id}`);
  }

  async createListing(data: CreateListingData): Promise<Listing> {
    const formData = new FormData();

    // Append all fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      } else if (key === "location") {
        formData.append("location", JSON.stringify(value));
      } else if (key === "properties") {
        formData.append("properties", JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    return axiosClient.post("/listings", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async updateListing(
    id: string,
    data: Partial<CreateListingData>,
  ): Promise<Listing> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file, index) => {
          if (file instanceof File) {
            formData.append(`images[${index}]`, file);
          }
        });
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    return axiosClient.put(`/listings/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async deleteListing(id: string): Promise<void> {
    return axiosClient.delete(`/listings/${id}`);
  }

  async toggleFavorite(listingId: string): Promise<{ isFavorite: boolean }> {
    return axiosClient.post(`/listings/${listingId}/favorite`);
  }

  async getUserListings(userId: string): Promise<Listing[]> {
    return axiosClient.get(`/users/${userId}/listings`);
  }

  async getSimilarListings(listingId: string): Promise<Listing[]> {
    return axiosClient.get(`/listings/${listingId}/similar`);
  }

  async incrementViews(listingId: string): Promise<void> {
    return axiosClient.post(`/listings/${listingId}/view`);
  }
}

export const listingService = new ListingService();
