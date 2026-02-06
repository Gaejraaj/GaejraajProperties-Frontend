import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { toast } from "sonner";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 404) return false;
        if (error?.response?.status === 401) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      onError: (error: any) => {
        toast.error(error.message || "Something went wrong");
      },
    },
  },
});

// Generic fetch function for React Query
export const fetchData: QueryFunction = async ({ queryKey }) => {
  const [url, params] = queryKey as [string, any?];
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${url}${params ? `?${new URLSearchParams(params)}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
