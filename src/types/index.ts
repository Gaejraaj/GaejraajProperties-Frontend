// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  avatarUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  bio?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

// Real Estate Property Types
export type PropertyType = "land" | "home" | "rental";
export type PropertyStatus = "active" | "sold" | "rented" | "expired";
export type LandType =
  | "residential"
  | "commercial"
  | "agricultural"
  | "industrial";
export type HomeType = "apartment" | "villa" | "house" | "penthouse";
export type RentalType = "apartment" | "house" | "villa" | "office" | "shop";

export interface BaseProperty extends BaseEntity {
  title: string;
  description: string;
  price: number;
  priceFormatted?: string;
  priceUnit?: string;
  location: string;
  city: string;
  image: string;
  images?: string[];
  type: string;
  status: PropertyStatus;
  isFeatured?: boolean;
  featured?: boolean;
}

// Land Property
export interface Land extends BaseProperty {
  propertyType: "land";
  landType: LandType;
  size: string;
  sizeValue: number;
  landStatus?: string;
}

// Home Property
export interface Home extends BaseProperty {
  propertyType: "home";
  homeType: HomeType;
  bedrooms: number;
  bathrooms: number;
  area: string;
  furnished?: boolean;
}

// Rental Property
export interface Rental extends BaseProperty {
  propertyType: "rental";
  rentalType: RentalType;
  bedrooms?: number;
  bathrooms: number;
  area: string;
  furnished?: boolean;
  monthlyRent?: number;
}

// Union type for all properties
export type Property = Land | Home | Rental;

// Stats Types
export interface PropertyStats {
  totalProperties: number;
  happyClients: number;
  cities: number;
  yearsExperience: number;
}

// Review Types
export interface Review extends BaseEntity {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
  property: string;
}

// Alert Types
export type AlertType = "success" | "error" | "warning" | "info";

export interface Alert {
  show: boolean;
  title: string;
  message: string;
  type: AlertType;
}

// Filter Types
export interface LandFilters {
  location: string;
  landType: string;
  size: string;
  priceMin: string;
  priceMax: string;
  sortBy: string;
}

export interface HomeFilters {
  location: string;
  homeType: string;
  bedrooms: string;
  priceMin: string;
  priceMax: string;
  sortBy: string;
}

export interface RentalFilters {
  location: string;
  rentalType: string;
  bedrooms: string;
  priceMin: string;
  priceMax: string;
  sortBy: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
}

// Chat types
export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  isRead: boolean;
  createdAt: string;
  sender: User;
  receiver: User;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  listing?: Property;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// Listing types (legacy)
export type ListingType = "buy" | "sell" | "rent" | "service";
export type ListingStatus = "active" | "sold" | "rented" | "expired";

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface Listing extends BaseEntity {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  listingType: ListingType;
  status: ListingStatus;
  condition?: string;
  categoryId: string;
  userId: string;
  user: User;
  images: string[];
  location: Location;
  isNegotiable: boolean;
  isFeatured: boolean;
  views: number;
  favoritesCount: number;
  properties: Record<string, any>;
}
