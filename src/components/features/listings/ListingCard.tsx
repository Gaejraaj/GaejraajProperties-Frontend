import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Heart, Eye } from "lucide-react";
import { Listing } from "@/types";
import { formatPrice, formatDate } from "@/utils/formatters";

interface ListingCardProps {
  listing: Listing;
  onFavoriteToggle?: (listingId: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onFavoriteToggle,
}) => {
  const mainImage = listing.images[0] || "/placeholder.jpg";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(listing.id);
  };

  return (
    <Link to={`/listing/${listing.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={mainImage}
            alt={listing.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {listing.isFeatured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                listing.favoritesCount > 0 ? "text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded capitalize">
              {listing.listingType}
            </span>
            {listing.isNegotiable && (
              <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded ml-2">
                Negotiable
              </span>
            )}
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {listing.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {listing.description}
          </p>

          {/* Location */}
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">
              {listing.location.city}, {listing.location.state}
            </span>
          </div>

          {/* Price and Stats */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">
                  ₹{formatPrice(listing.price)}
                </div>
                {listing.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ₹{formatPrice(listing.originalPrice)}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {listing.views}
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {listing.favoritesCount}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-3 pt-3 border-t">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{formatDate(listing.createdAt)}</span>
                <span className="text-blue-600">{listing.user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
