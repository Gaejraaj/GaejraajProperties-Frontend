import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MapPin,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  User,
  Shield,
  ArrowLeft,
  Eye,
  Calendar,
  Check,
  Flag,
} from "lucide-react";
import { listingService } from "@/api/services/listing.service";
import { chatService } from "@/api/services/chat.service";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ListingGallery from "@/components/features/listings/ListingGallery";

const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("description");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Fetch listing details
  const {
    data: listing,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => listingService.getListing(id!),
    enabled: !!id,
  });

  // Increment views
  useEffect(() => {
    if (id) {
      listingService.incrementViews(id).catch(console.error);
    }
  }, [id]);

  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: () => listingService.toggleFavorite(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing", id] });
    },
  });

  // Handle contact seller
  const handleContactSeller = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/listing/${id}` } });
      return;
    }

    if (!listing) return;

    try {
      // Create or get chat with seller
      const chat = await chatService.getOrCreateChat(id!, listing.user.id);
      navigate(`/chat/${chat.id}`);
    } catch (error) {
      toast.error("Failed to start chat");
    }
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share && listing) {
      try {
        await navigator.share({
          title: listing.title,
          text: listing.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // Handle report
  const handleReport = () => {
    toast.info("Report feature coming soon!");
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !listing) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
        <p className="text-gray-600 mb-6">
          The listing you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const isOwner = user?.id === listing.user.id;
  const isFavorite = listing.favoritesCount > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ListingGallery images={listing.images} title={listing.title} />
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="capitalize">
                      {listing.listingType}
                    </Badge>
                    {listing.isFeatured && (
                      <Badge className="bg-yellow-500">Featured</Badge>
                    )}
                    {listing.isNegotiable && (
                      <Badge variant="outline" className="text-green-600">
                        Negotiable
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {listing.location.address}, {listing.location.city},{" "}
                      {listing.location.state}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavoriteMutation.mutate()}
                    disabled={toggleFavoriteMutation.isPending}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleReport}>
                    <Flag className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-1">
                  ₹{listing.price.toLocaleString()}
                </div>
                {listing.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">
                    ₹{listing.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-gray-600 border-t border-b py-4">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  <span>{listing.views} views</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  <span>{listing.favoritesCount} favorites</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    Listed {new Date(listing.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full rounded-t-xl p-0">
                  <TabsTrigger value="description" className="flex-1 py-4">
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="flex-1 py-4">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="location" className="flex-1 py-4">
                    Location
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">
                      {listing.description}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Condition</div>
                      <div className="font-medium">
                        {listing.condition || "N/A"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-medium">{listing.categoryId}</div>
                    </div>
                    {listing.properties &&
                      Object.entries(listing.properties).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="text-sm text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                          </div>
                          <div className="font-medium">{String(value)}</div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="location" className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="font-medium mb-2">Location Details</div>
                      <div className="space-y-1 text-gray-700">
                        <div>{listing.location.address}</div>
                        <div>
                          {listing.location.city}, {listing.location.state}
                        </div>
                        <div>{listing.location.country}</div>
                      </div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        Map will be displayed here
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Seller Info & Actions */}
          <div className="space-y-6">
            {/* Seller Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                    {listing.user.avatar ? (
                      <img
                        src={listing.user.avatar}
                        alt={listing.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 m-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{listing.user.name}</div>
                    <div className="text-gray-600 text-sm">
                      Member since{" "}
                      {new Date(listing.user.createdAt).getFullYear()}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">
                        Verified Seller
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-bold text-lg">4.8</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-bold text-lg">42</div>
                    <div className="text-sm text-gray-600">Listings</div>
                  </div>
                </div>

                {!isOwner && (
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Show Phone Number
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      onClick={handleContactSeller}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chat with Seller
                    </Button>
                  </div>
                )}

                {isOwner && (
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => navigate(`/listing/${id}/edit`)}
                    >
                      Edit Listing
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      onClick={() => navigate("/dashboard/listings")}
                    >
                      View in Dashboard
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Safety Tips</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Meet in a public place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Inspect the item before buying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Don't send payments in advance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Check seller's rating and reviews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Similar Listings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Similar Listings</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-sm">
                          Similar item {item}
                        </div>
                        <div className="text-primary font-bold">
                          ₹{item * 1000}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-3">
                  View more similar items
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Contact Seller</h3>
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-2xl font-bold text-primary mb-2">
                  {listing.user.phone || "9876543210"}
                </div>
                <p className="text-gray-600">
                  Call {listing.user.name} to discuss this listing
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsContactModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" asChild>
                  <a href={`tel:${listing.user.phone || "9876543210"}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetailPage;
