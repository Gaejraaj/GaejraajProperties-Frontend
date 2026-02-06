import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface ListingFiltersProps {
  filters: {
    categoryId: string;
    listingType: string;
    minPrice: string;
    maxPrice: string;
    city: string;
    state: string;
    search: string;
  };
  onChange: (key: string, value: string) => void;
  onReset: () => void;
  onClose?: () => void;
}
const ListingFilters: React.FC<ListingFiltersProps> = ({
  filters,
  onChange,
  onReset,
  onClose,
}) => {
  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "vehicles", name: "Vehicles" },
    { id: "property", name: "Property" },
    { id: "jobs", name: "Jobs" },
    { id: "services", name: "Services" },
    { id: "fashion", name: "Fashion" },
    { id: "home", name: "Home & Garden" },
    { id: "sports", name: "Sports & Hobbies" },
  ];

  const listingTypes = [
    { value: "sell", label: "Sell" },
    { value: "buy", label: "Buy" },
    { value: "rent", label: "Rent" },
    { value: "service", label: "Service" },
  ];

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Lucknow",
  ];

  const states = [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Telangana",
    "Gujarat",
    "Tamil Nadu",
    "West Bengal",
    "Rajasthan",
    "Uttar Pradesh",
  ];

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            Clear All
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            value={filters.categoryId}
            onChange={(e) => onChange("categoryId", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Listing Type */}
        <div>
          <Label htmlFor="listingType">Type</Label>
          <Select
            id="listingType"
            value={filters.listingType}
            onChange={(e) => onChange("listingType", e.target.value)}
          >
            <option value="">All Types</option>
            {listingTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onChange("minPrice", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">City</Label>
          <Select
            id="city"
            value={filters.city}
            onChange={(e) => onChange("city", e.target.value)}
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </div>

        {/* State */}
        <div>
          <Label htmlFor="state">State</Label>
          <Select
            id="state"
            value={filters.state}
            onChange={(e) => onChange("state", e.target.value)}
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <Label htmlFor="sortBy">Sort By</Label>
          <Select
            id="sortBy"
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;
