import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/features/listings/PropertyCard";
import Alert from "@/components/shared/Alert";
import { useAuth } from "@/contexts/AuthContext";
import { Property, Rental, RentalFilters } from "@/types";
import { rentalData, sortProperties } from "@/store/property.store";

const RentalsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filters, setFilters] = useState<RentalFilters>({
    location: "",
    rentalType: "",
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
    { value: "pune", label: "Pune" },
  ];

  const rentalTypes = [
    { value: "", label: "All Types" },
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "villa", label: "Villa" },
    { value: "office", label: "Office" },
    { value: "shop", label: "Shop" },
  ];

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
  ];

  const handleFilterChange = (key: keyof RentalFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filtered = [...rentalData];

    if (filters.location) {
      filtered = filtered.filter((rental) => rental.city === filters.location);
    }

    if (filters.rentalType) {
      filtered = filtered.filter(
        (rental) => rental.rentalType === filters.rentalType,
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(
        (rental) => rental.bedrooms === parseInt(filters.bedrooms),
      );
    }

    if (filters.priceMin) {
      const min = parseInt(filters.priceMin.replace(/[^0-9]/g, "")) || 0;
      filtered = filtered.filter((rental) => rental.price >= min);
    }

    if (filters.priceMax) {
      const max = parseInt(filters.priceMax.replace(/[^0-9]/g, "")) || Infinity;
      filtered = filtered.filter((rental) => rental.price <= max);
    }

    return sortProperties(filtered, filters.sortBy);
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      rentalType: "",
      bedrooms: "",
      priceMin: "",
      priceMax: "",
      sortBy: "featured",
    });
  };

  const filteredRentals = applyFilters();

  const handleContact = (property: Property) => {
    if (!user) {
      showAlert(
        "Login Required",
        "Please login to contact the owner.",
        "warning",
      );
      navigate("/login");
      return;
    }
    showAlert(
      "Contact Information",
      `Contact: Owner\nPhone: Available on request`,
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
            Rental Properties
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto animate-slide-in-right">
            Find apartments, houses, and commercial spaces for rent
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
                  <option value="rent_low">Rent: Low to High</option>
                  <option value="rent_high">Rent: High to Low</option>
                  <option value="bedrooms">Bedrooms</option>
                  <option value="furnished">Furnished</option>
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
                  <i className="fas fa-building text-purple-600 mr-2"></i>
                  Property Type
                </label>
                <select
                  value={filters.rentalType}
                  onChange={(e) =>
                    handleFilterChange("rentalType", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500"
                >
                  {rentalTypes.map((type) => (
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
                  Rent Min
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
                  Rent Max
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
                    `Found ${filteredRentals.length} properties`,
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
          {filteredRentals.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">
                <i className="fas fa-search text-gray-300"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No rental properties found
              </h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRentals.map((rental) => (
                <PropertyCard
                  key={`${rental.propertyType}-${rental.id}`}
                  property={rental}
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

export default RentalsPage;
