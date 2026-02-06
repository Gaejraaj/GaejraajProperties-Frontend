import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/features/listings/PropertyCard";
import Alert from "@/components/shared/Alert";
import { useAuth } from "@/contexts/AuthContext";
import { Property } from "@/types";
import {
  statsData,
  landsData,
  homesData,
  rentalData,
} from "@/store/property.store";
import { cn } from "@/lib/utils";

type SearchTab = "buy" | "rent" | "commercial" | "projects";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SearchTab>("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");

  // Alert state
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

  const tabs: { id: SearchTab; label: string }[] = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "commercial", label: "Commercial" },
    { id: "projects", label: "Projects" },
  ];

  const cities = [
    { value: "", label: "Select City" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "pune", label: "Pune" },
  ];

  const propertyTypes = [
    { value: "", label: "Property Type" },
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "plot", label: "Plot/Land" },
    { value: "office", label: "Office Space" },
  ];

  const featuredProperties = [
    ...landsData.filter((p) => p.featured).slice(0, 3),
    ...homesData.filter((p) => p.featured).slice(0, 3),
  ];

  const handleContact = (property: Property) => {
    if (!user) {
      showAlert(
        "Login Required",
        "Please login to contact the seller/owner.",
        "warning",
      );
      navigate("/login");
      return;
    }

    const contactName = Math.random() > 0.5 ? "Rajesh Kumar" : "Priya Sharma";
    const contactNumber = Math.random() > 0.5 ? "9876543210" : "9123456780";

    showAlert(
      "Contact Information",
      `Contact: ${contactName}\nPhone: ${contactNumber}\n\nProperty: ${property.title}\nPrice: ${property.priceFormatted || `₹${property.price.toLocaleString()}`}\n\nPlease mention that you found this property on Gaejraaj Properties.`,
      "info",
    );
  };

  const handleDetails = (property: Property) => {
    navigate(`/listing/${property.id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery && !city && !propertyType) {
      showAlert("Search Empty", "Please enter search criteria", "warning");
      return;
    }

    showAlert(
      "Search Results",
      `Searching for properties${searchQuery ? ` matching "${searchQuery}"` : ""}${city ? ` in ${city}` : ""}${propertyType ? ` of type ${propertyType}` : ""}. In a real application, this would show actual search results.`,
      "info",
    );
  };

  const stats = [
    {
      icon: "fa-building",
      number: `${statsData.totalProperties}+`,
      label: "Properties Listed",
    },
    {
      icon: "fa-users",
      number: `${statsData.happyClients}+`,
      label: "Happy Clients",
    },
    {
      icon: "fa-city",
      number: `${statsData.cities}+`,
      label: "Cities Covered",
    },
    {
      icon: "fa-award",
      number: `${statsData.yearsExperience}+`,
      label: "Years Experience",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1a2c] via-[#1a3a5f] to-[#0f1a2c]">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        {/* Interactive Special Offer Badge */}
        <button
          onClick={() =>
            showAlert(
              "Special Offer!",
              "Get 1% discount on all property bookings made this week. Limited time offer!",
              "success",
            )
          }
          className="absolute top-24 right-8 z-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-semibold text-sm animate-bounce-custom cursor-pointer hover:scale-110 transition-transform"
        >
          <i className="fas fa-gift mr-2"></i>
          Special Offer Today!
        </button>

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Hero Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-text-reveal">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dream Property
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto animate-slide-up">
              Discover premium residential, commercial, and rental properties
              with Gaejraaj Properties. Your journey to the perfect home starts
              here.
            </p>

            {/* Search Container */}
            <div className="max-w-4xl mx-auto animate-slide-up">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                {/* Search Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "px-6 py-2 rounded-full font-medium transition-all duration-300",
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10",
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search Form */}
                <form
                  onSubmit={handleSearch}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <div className="relative">
                    <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50"></i>
                    <input
                      type="text"
                      placeholder="Search by location, project, or landmark"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <i className="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50"></i>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                    >
                      {cities.map((city) => (
                        <option
                          key={city.value}
                          value={city.value}
                          className="bg-[#0f1a2c]"
                        >
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <i className="fas fa-home absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50"></i>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                    >
                      {propertyTypes.map((type) => (
                        <option
                          key={type.value}
                          value={type.value}
                          className="bg-[#0f1a2c]"
                        >
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                  >
                    <i className="fas fa-search"></i>
                    Search
                  </button>
                </form>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-4xl mb-3">
                    <i className={`fas ${stat.icon} text-purple-400`}></i>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1a2c] mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties that offer
              exceptional value and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={`${property.propertyType}-${property.id}`}
                property={property}
                onContact={handleContact}
                onDetails={handleDetails}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/homes")}
              className="bg-gradient-to-r from-[#0f1a2c] to-[#1a3a5f] text-white font-semibold py-4 px-10 rounded-xl hover:from-[#1a3a5f] hover:to-[#2a5a8f] transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105"
            >
              View All Properties
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1a2c] mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore properties across different categories to find exactly
              what you're looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lands */}
            <div
              onClick={() => navigate("/lands")}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Lands"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2c] via-[#0f1a2c]/50 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4">
                <div className="text-5xl mb-4 text-purple-400">
                  <i className="fas fa-mountain"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Lands & Plots
                </h3>
                <p className="text-white/70 text-center mb-4">
                  {landsData.length} properties available
                </p>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Now
                </span>
              </div>
            </div>

            {/* Homes */}
            <div
              onClick={() => navigate("/homes")}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Homes"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2c] via-[#0f1a2c]/50 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4">
                <div className="text-5xl mb-4 text-blue-400">
                  <i className="fas fa-home"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Homes & Flats
                </h3>
                <p className="text-white/70 text-center mb-4">
                  {homesData.length} properties available
                </p>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Now
                </span>
              </div>
            </div>

            {/* Rental */}
            <div
              onClick={() => navigate("/rental")}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Rental"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2c] via-[#0f1a2c]/50 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4">
                <div className="text-5xl mb-4 text-green-400">
                  <i className="fas fa-key"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Rental Properties
                </h3>
                <p className="text-white/70 text-center mb-4">
                  {rentalData.length} properties available
                </p>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[#0f1a2c] to-[#1a3a5f]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Gaejraaj Properties?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We provide end-to-end real estate solutions with transparency,
              trust, and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "fa-shield-alt",
                title: "Trusted Experts",
                description:
                  "Over 15 years of experience in the real estate industry with a proven track record.",
              },
              {
                icon: "fa-file-contract",
                title: "Legal Assistance",
                description:
                  "Complete legal support and documentation services for hassle-free transactions.",
              },
              {
                icon: "fa-percent",
                title: "Best Prices",
                description:
                  "Competitive pricing and negotiation services to get you the best deals.",
              },
              {
                icon: "fa-headset",
                title: "24/7 Support",
                description:
                  "Dedicated customer support team to assist you at every step of your journey.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <i className={`fas ${feature.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] opacity-10 bg-cover bg-center"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Start your property search today and let our experts help you
                find the perfect home or investment opportunity.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("/homes")}
                  className="bg-white text-purple-600 font-semibold py-4 px-10 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                >
                  <i className="fas fa-search"></i>
                  Browse Properties
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-transparent border-2 border-white text-white font-semibold py-4 px-10 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  <i className="fas fa-phone"></i>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Component */}
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

export default HomePage;
