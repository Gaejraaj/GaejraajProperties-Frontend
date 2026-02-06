import React from "react";
import { Property, Land, Home, Rental } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  onContact?: (property: Property) => void;
  onDetails?: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onContact,
  onDetails,
}) => {
  const isLand = (p: Property): p is Land => p.propertyType === "land";
  const isHome = (p: Property): p is Home => p.propertyType === "home";
  const isRental = (p: Property): p is Rental => p.propertyType === "rental";

  const renderFeatures = () => {
    if (isLand(property)) {
      return (
        <>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-expand w-5 text-center text-blue-600"></i>
            <span>{property.size}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-tag w-5 text-center text-blue-600"></i>
            <span>{property.type}</span>
          </div>
        </>
      );
    }

    if (isHome(property)) {
      return (
        <>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-bed w-5 text-center text-blue-600"></i>
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-bath w-5 text-center text-blue-600"></i>
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-ruler-combined w-5 text-center text-blue-600"></i>
            <span>{property.area}</span>
          </div>
        </>
      );
    }

    if (isRental(property)) {
      return (
        <>
          {property.bedrooms && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-bed w-5 text-center text-blue-600"></i>
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-bath w-5 text-center text-blue-600"></i>
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-ruler-combined w-5 text-center text-blue-600"></i>
            <span>{property.area}</span>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer",
        "animate-in fade-in slide-in-from-bottom-4",
      )}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}

        {/* Property Image */}
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Location badge on image */}
        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2 text-sm">
            <i className="fas fa-map-marker-alt"></i>
            <span>{property.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5">
        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-bold text-[#0f1a2c]">
            {property.priceFormatted || `₹${property.price.toLocaleString()}`}
          </span>
          {property.priceUnit && (
            <span className="text-sm text-gray-500">{property.priceUnit}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#0f1a2c] mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <i className="fas fa-map-marker-alt text-blue-600"></i>
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 py-4 border-t border-gray-100">
          {renderFeatures()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            className="flex-1 bg-gradient-to-r from-[#0f1a2c] to-[#1a3a5f] hover:from-[#1a3a5f] hover:to-[#2a5a8f] transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onContact?.(property);
            }}
          >
            <i className="fas fa-phone mr-2"></i>
            Contact
          </Button>
          <Button
            variant="outline"
            className="flex-1 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              onDetails?.(property);
            }}
          >
            <i className="fas fa-info-circle mr-2"></i>
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
