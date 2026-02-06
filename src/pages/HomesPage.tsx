import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/features/listings/PropertyCard";
import Alert from "@/components/shared/Alert";
import { useAuth } from "@/contexts/AuthContext";
import { Property, Home, HomeFilters } from "@/types";
import { homesData, sortProperties } from "@/store/property.store";

const HomesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filters, setFilters] = useState<HomeFilters>({
    location: "",
    homeType: "",
    bedrooms: "",
    priceMin: "",
    priceMax: "",
    sortBy: "featured",
  });

  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info",
  ) => {
    setAlert({ show: true, title, message, type });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const locations = [
    { value: "", label: "All Locations" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" },
  ];

  const homeTypes = [
    { value: "", label: "All Types" },
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "house", label: "Independent House" },
    { value: "penthouse", label: "Penthouse" },
  ];

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
    { value: "4+", label: "4+ BHK" },
  ];

  const handleFilterChange = (key: keyof HomeFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filtered = [...homesData];

    if (filters.location) {
      filtered = filtered.filter((home) => home.city === filters.location);
    }

    if (filters.homeType) {
      filtered = filtered.filter((home) => home.homeType === filters.homeType);
    }

    if (filters.bedrooms) {
      if (filters.bedrooms.endsWith("+")) {
        const min = parseInt(filters.bedrooms);
        filtered = filtered.filter((home) => home.bedrooms >= min);
      } else {
        filtered = filtered.filter(
          (home) => home.bedrooms === parseInt(filters.bedrooms),
        );
      }
    }

    if (filters.priceMin) {
      const min = parseInt(filters.priceMin.replace(/[^0-9]/g, "")) || 0;
      filtered = filtered.filter((home) => home.price >= min);
    }

    if (filters.priceMax) {
      const max = parseInt(filters.priceMax.replace(/[^0-9]/g, "")) || Infinity;
      filtered = filtered.filter((home) => home.price <= max);
    }

    return sortProperties(filtered, filters.sortBy);
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      homeType: "",
      bedrooms: "",
      priceMin: "",
      priceMax: "",
      sortBy: "featured",
    });
  };

  const filteredHomes = applyFilters();

  const handleContact = (property: Property) => {
    if (!user) {
      showAlert(
        "Login Required",
        "Please login to contact the seller.",
        "warning",
      );
      navigate("/login");
      return;
    }
    showAlert(
      "Contact Information",
      `Contact: Seller\nPhone: Available on request`,
      "info",
    );
  };

  const handleDetails = (property: Property) => {
    navigate(`/listing/${property.id}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f1a2c] via-[#1a3a5f] to-[#0f1a2c]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-in-left">
            Homes & Flats
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto animate-slide-in-right">
            Browse apartments, villas, and independent houses for sale
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#0f1a2c] flex items-center gap-2">
                <i className="fas fa-filter text-purple-600"></i>
                Advanced Filter
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="bedrooms">Bedrooms</option>
                  <option value="size">Size</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-map-marker-alt text-purple-600 mr-2"></i>
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500"
                >
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-home text-purple-600 mr-2"></i>
                  Property Type
                </label>
                <select
                  value={filters.homeType}
                  onChange={(e) =>
                    handleFilterChange("homeType", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500"
                >
                  {homeTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-bed text-purple-600 mr-2"></i>
                  Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) =>
                    handleFilterChange("bedrooms", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500"
                >
                  {bedroomOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-rupee-sign text-purple-600 mr-2"></i>
                  Price Min
                </label>
                <input
                  type="text"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) =>
                    handleFilterChange("priceMin", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-rupee-sign text-purple-600 mr-2"></i>
                  Price Max
                </label>
                <input
                  type="text"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) =>
                    handleFilterChange("priceMax", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-redo"></i>
                Reset All
              </button>
              <button
                onClick={() => {
                  applyFilters();
                  showAlert(
                    "Filters Applied",
                    `Found ${filteredHomes.length} properties`,
                    "success",
                  );
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#0f1a2c] to-[#1a3a5f] text-white rounded-lg hover:from-[#1a3a5f] hover:to-[#2a5a8f] transition-all flex items-center gap-2"
              >
                <i className="fas fa-check"></i>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredHomes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">
                <i className="fas fa-search text-gray-300"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No homes found
              </h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHomes.map((home) => (
                <PropertyCard
                  key={`${home.propertyType}-${home.id}`}
                  property={home}
                  onContact={handleContact}
                  onDetails={handleDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Alert
        show={alert.show}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </Layout>
  );
};

export default HomesPage;
