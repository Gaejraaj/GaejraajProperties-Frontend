import { Land, Home, Rental, Review, PropertyStats } from "@/types";

// Dummy lands data
export const landsData: Land[] = [
  {
    id: "1",
    title: "Premium Plot in Gated Community",
    description:
      "Prime residential plot in a premium gated community with 24/7 security, clubhouse, and landscaped gardens. All approvals are in place.",
    price: 8500000,
    priceFormatted: "₹85 L",
    location: "Whitefield, Bangalore",
    city: "bangalore",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Residential",
    status: "active",
    propertyType: "land",
    landType: "residential",
    size: "2400 sq.yd.",
    sizeValue: 2400,
    landStatus: "Freehold",
    isFeatured: true,
    featured: true,
    createdAt: "2023-10-15",
    updatedAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Commercial Land Near Highway",
    description:
      "Commercial land located near the national highway with excellent connectivity. Ideal for shopping complex or office building.",
    price: 25000000,
    priceFormatted: "₹2.5 Cr",
    location: "Gurugram, Delhi",
    city: "delhi",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Commercial",
    status: "active",
    propertyType: "land",
    landType: "commercial",
    size: "5000 sq.yd.",
    sizeValue: 5000,
    landStatus: "Freehold",
    isFeatured: false,
    featured: false,
    createdAt: "2023-09-22",
    updatedAt: "2023-09-22",
  },
  {
    id: "3",
    title: "Agricultural Farm Land",
    description:
      "Fertile agricultural land with water source and good road connectivity. Suitable for farming or agro-tourism.",
    price: 4500000,
    priceFormatted: "₹45 L",
    location: "Pune Rural",
    city: "pune",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Agricultural",
    status: "active",
    propertyType: "land",
    landType: "agricultural",
    size: "2 Acres",
    sizeValue: 9680,
    landStatus: "Freehold",
    isFeatured: true,
    featured: true,
    createdAt: "2023-11-05",
    updatedAt: "2023-11-05",
  },
  {
    id: "4",
    title: "Lakefront Residential Plot",
    description:
      "Beautiful lakefront plot with stunning views. Located in a developing residential area with good infrastructure.",
    price: 12000000,
    priceFormatted: "₹1.2 Cr",
    location: "Hinjewadi, Pune",
    city: "pune",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Residential",
    status: "active",
    propertyType: "land",
    landType: "residential",
    size: "1800 sq.yd.",
    sizeValue: 1800,
    landStatus: "Leasehold",
    isFeatured: true,
    featured: true,
    createdAt: "2023-08-30",
    updatedAt: "2023-08-30",
  },
  {
    id: "5",
    title: "Industrial Plot in SEZ",
    description:
      "Industrial plot in Special Economic Zone with all necessary approvals and infrastructure including power, water, and drainage.",
    price: 38000000,
    priceFormatted: "₹3.8 Cr",
    location: "Manesar, Haryana",
    city: "delhi",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Industrial",
    status: "active",
    propertyType: "land",
    landType: "industrial",
    size: "7500 sq.yd.",
    sizeValue: 7500,
    landStatus: "Freehold",
    isFeatured: false,
    featured: false,
    createdAt: "2023-10-10",
    updatedAt: "2023-10-10",
  },
  {
    id: "6",
    title: "Hill View Plot",
    description:
      "Scenic hill view plot perfect for vacation home or resort. Located in a peaceful environment with cool climate.",
    price: 6500000,
    priceFormatted: "₹65 L",
    location: "Lonavala, Maharashtra",
    city: "mumbai",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Residential",
    status: "active",
    propertyType: "land",
    landType: "residential",
    size: "1500 sq.yd.",
    sizeValue: 1500,
    landStatus: "Freehold",
    isFeatured: true,
    featured: true,
    createdAt: "2023-11-20",
    updatedAt: "2023-11-20",
  },
];

// Dummy homes data
export const homesData: Home[] = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment with City View",
    description:
      "Spacious 3BHK apartment with panoramic city views, modern amenities, and premium finishes. Located in a high-rise with swimming pool, gym, and 24/7 security.",
    price: 25000000,
    priceFormatted: "₹2.5 Cr",
    location: "Bandra West, Mumbai",
    city: "mumbai",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Apartment",
    status: "active",
    propertyType: "home",
    homeType: "apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: "1800 sq.ft.",
    furnished: true,
    isFeatured: true,
    featured: true,
    createdAt: "2023-10-15",
    updatedAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Modern Villa with Private Pool",
    description:
      "Contemporary villa with private swimming pool, landscaped garden, and modern interiors. Includes servant quarters and covered parking for 3 cars.",
    price: 42000000,
    priceFormatted: "₹4.2 Cr",
    location: "Jubilee Hills, Hyderabad",
    city: "hyderabad",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Villa",
    status: "active",
    propertyType: "home",
    homeType: "villa",
    bedrooms: 4,
    bathrooms: 4,
    area: "3500 sq.ft.",
    furnished: true,
    isFeatured: true,
    featured: true,
    createdAt: "2023-09-22",
    updatedAt: "2023-09-22",
  },
  {
    id: "3",
    title: "Cozy 2BHK in Gated Society",
    description:
      "Well-maintained 2BHK apartment in a secure gated society with children's play area, clubhouse, and round-the-clock security.",
    price: 7500000,
    priceFormatted: "₹75 L",
    location: "Noida, Delhi",
    city: "delhi",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Apartment",
    status: "active",
    propertyType: "home",
    homeType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq.ft.",
    furnished: false,
    isFeatured: false,
    featured: false,
    createdAt: "2023-11-05",
    updatedAt: "2023-11-05",
  },
  {
    id: "4",
    title: "Penthouse with Terrace Garden",
    description:
      "Luxurious penthouse with private terrace garden, panoramic sea views, and premium amenities. Includes private elevator access.",
    price: 58000000,
    priceFormatted: "₹5.8 Cr",
    location: "Worli, Mumbai",
    city: "mumbai",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Penthouse",
    status: "active",
    propertyType: "home",
    homeType: "penthouse",
    bedrooms: 4,
    bathrooms: 4,
    area: "4200 sq.ft.",
    furnished: true,
    isFeatured: true,
    featured: true,
    createdAt: "2023-08-30",
    updatedAt: "2023-08-30",
  },
  {
    id: "5",
    title: "Independent House with Garden",
    description:
      "Beautiful independent house with front and back garden, modern kitchen, and spacious living areas. Located in a prime residential area.",
    price: 35000000,
    priceFormatted: "₹3.5 Cr",
    location: "Indiranagar, Bangalore",
    city: "bangalore",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "House",
    status: "active",
    propertyType: "home",
    homeType: "house",
    bedrooms: 3,
    bathrooms: 3,
    area: "2800 sq.ft.",
    furnished: true,
    isFeatured: true,
    featured: true,
    createdAt: "2023-10-10",
    updatedAt: "2023-10-10",
  },
  {
    id: "6",
    title: "1BHK Starter Apartment",
    description:
      "Compact and well-designed 1BHK apartment perfect for first-time home buyers or as an investment property.",
    price: 4500000,
    priceFormatted: "₹45 L",
    location: "Kolkata",
    city: "kolkata",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Apartment",
    status: "active",
    propertyType: "home",
    homeType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq.ft.",
    furnished: false,
    isFeatured: false,
    featured: false,
    createdAt: "2023-11-20",
    updatedAt: "2023-11-20",
  },
];

// Dummy rental properties data
export const rentalData: Rental[] = [
  {
    id: "1",
    title: "Furnished 2BHK for Rent",
    description:
      "Fully furnished 2BHK apartment available for rent in a prime South Delhi location. Includes modular kitchen, AC, and furniture.",
    price: 45000,
    priceFormatted: "₹45,000",
    priceUnit: "/month",
    location: "South Delhi, Delhi",
    city: "delhi",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Apartment",
    status: "active",
    propertyType: "rental",
    rentalType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq.ft.",
    furnished: true,
    monthlyRent: 45000,
    isFeatured: true,
    featured: true,
    createdAt: "2023-10-15",
    updatedAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Office Space in Business District",
    description:
      "Premium office space in Bandra Kurla Complex, Mumbai's premier business district. Includes reception, conference room, and pantry.",
    price: 120000,
    priceFormatted: "₹1,20,000",
    priceUnit: "/month",
    location: "BKC, Mumbai",
    city: "mumbai",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Office",
    status: "active",
    propertyType: "rental",
    rentalType: "office",
    bedrooms: 0,
    bathrooms: 2,
    area: "1800 sq.ft.",
    furnished: true,
    monthlyRent: 120000,
    isFeatured: true,
    featured: true,
    createdAt: "2023-09-22",
    updatedAt: "2023-09-22",
  },
  {
    id: "3",
    title: "3BHK Independent House",
    description:
      "Spacious independent house with garden and parking for 2 cars. Available for family on long-term lease.",
    price: 65000,
    priceFormatted: "₹65,000",
    priceUnit: "/month",
    location: "HSR Layout, Bangalore",
    city: "bangalore",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "House",
    status: "active",
    propertyType: "rental",
    rentalType: "house",
    bedrooms: 3,
    bathrooms: 3,
    area: "2000 sq.ft.",
    furnished: false,
    monthlyRent: 65000,
    isFeatured: false,
    featured: false,
    createdAt: "2023-11-05",
    updatedAt: "2023-11-05",
  },
  {
    id: "4",
    title: "Retail Shop in Mall",
    description:
      "Prime retail space in one of Chennai's busiest malls. High footfall and excellent visibility.",
    price: 85000,
    priceFormatted: "₹85,000",
    priceUnit: "/month",
    location: "Phoenix Marketcity, Chennai",
    city: "chennai",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Shop",
    status: "active",
    propertyType: "rental",
    rentalType: "shop",
    bedrooms: 0,
    bathrooms: 1,
    area: "800 sq.ft.",
    furnished: false,
    monthlyRent: 85000,
    isFeatured: true,
    featured: true,
    createdAt: "2023-08-30",
    updatedAt: "2023-08-30",
  },
  {
    id: "5",
    title: "Luxury Villa for Rent",
    description:
      "Luxury beachfront villa available for rent. Includes private pool, staff quarters, and stunning sea views.",
    price: 250000,
    priceFormatted: "₹2,50,000",
    priceUnit: "/month",
    location: "Goa",
    city: "goa",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Villa",
    status: "active",
    propertyType: "rental",
    rentalType: "villa",
    bedrooms: 4,
    bathrooms: 4,
    area: "3500 sq.ft.",
    furnished: true,
    monthlyRent: 250000,
    isFeatured: true,
    featured: true,
    createdAt: "2023-10-10",
    updatedAt: "2023-10-10",
  },
  {
    id: "6",
    title: "1BHK Service Apartment",
    description:
      "Fully serviced apartment with housekeeping, maintenance, and utilities included. Ideal for working professionals.",
    price: 28000,
    priceFormatted: "₹28,000",
    priceUnit: "/month",
    location: "Pune",
    city: "pune",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Apartment",
    status: "active",
    propertyType: "rental",
    rentalType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "700 sq.ft.",
    furnished: true,
    monthlyRent: 28000,
    isFeatured: false,
    featured: false,
    createdAt: "2023-11-20",
    updatedAt: "2023-11-20",
  },
];

// Dummy reviews data
export const reviewsData: Review[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "Property Buyer",
    rating: 5,
    text: "Gaejraaj Properties made my home buying experience seamless. Their team was professional, transparent, and helped me find the perfect apartment within my budget.",
    avatar: "RS",
    date: "2023-10-15",
    property: "3BHK Apartment in Mumbai",
    createdAt: "2023-10-15",
    updatedAt: "2023-10-15",
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "NRI Investor",
    rating: 5,
    text: "As an NRI, I was worried about property investment in India. Gaejraaj Properties provided end-to-end support and legal assistance. Highly recommended!",
    avatar: "PP",
    date: "2023-09-22",
    property: "Commercial Plot in Delhi",
    createdAt: "2023-09-22",
    updatedAt: "2023-09-22",
  },
  {
    id: "3",
    name: "Arun Mehta",
    role: "Commercial Tenant",
    rating: 4,
    text: "Found a great office space through Gaejraaj Properties. The process was efficient and the team addressed all our requirements promptly.",
    avatar: "AM",
    date: "2023-11-05",
    property: "Office Space in Bangalore",
    createdAt: "2023-11-05",
    updatedAt: "2023-11-05",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    role: "First-time Home Buyer",
    rating: 5,
    text: "Being a first-time buyer, I needed guidance at every step. The team was patient, knowledgeable, and helped me navigate the entire process smoothly.",
    avatar: "SR",
    date: "2023-08-30",
    property: "2BHK in Hyderabad",
    createdAt: "2023-08-30",
    updatedAt: "2023-08-30",
  },
];

// Stats data
export const statsData: PropertyStats = {
  totalProperties: 1250,
  happyClients: 850,
  cities: 25,
  yearsExperience: 15,
};

// Helper functions
export const sortProperties = <
  T extends {
    price: number;
    sizeValue?: number;
    featured?: boolean;
    dateAdded?: string;
    createdAt?: string;
  },
>(
  data: T[],
  sortBy: string,
): T[] => {
  const sorted = [...data];

  switch (sortBy) {
    case "price_low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_high":
      return sorted.sort((a, b) => b.price - a.price);
    case "size_large":
      return sorted.sort((a, b) => (b.sizeValue || 0) - (a.sizeValue || 0));
    case "size_small":
      return sorted.sort((a, b) => (a.sizeValue || 0) - (b.sizeValue || 0));
    case "bedrooms":
      return sorted.sort((a, b) => (b as any).bedrooms - (a as any).bedrooms);
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime(),
      );
    case "featured":
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
};

export const filterByLocation = <T extends { city: string }>(
  data: T[],
  location: string,
): T[] => {
  if (!location) return data;
  return data.filter((item) => item.city === location);
};
