import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { listingService } from "@/api/services/listing.service";
import { toast } from "sonner";

// SIMPLE FIX: Don't use z.coerce.number() - define price as union type
const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  price: z
    .union([
      z
        .string()
        .min(1, "Price is required")
        .transform((val) => parseFloat(val)),
      z.number().min(1, "Price must be greater than 0"),
    ])
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price must be greater than 0",
    }),
  listingType: z.enum(["sell", "buy", "rent", "service"]),
  categoryId: z.string().min(1, "Category is required"),
  condition: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(1, "Country is required"),
  isNegotiable: z.boolean().default(false),
});

// Define the type explicitly without relying on Zod infer
interface ListingFormData {
  title: string;
  description: string;
  price: number; // This is what matters for React Hook Form
  listingType: "sell" | "buy" | "rent" | "service";
  categoryId: string;
  condition?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  isNegotiable: boolean;
}

const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = React.useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  // Type assertion to bypass TypeScript issues
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema as any), // Type assertion
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      listingType: "sell",
      categoryId: "",
      condition: "",
      address: "",
      city: "",
      state: "",
      country: "India",
      isNegotiable: false,
    },
  });

  // Type for API payload
  interface CreateListingPayload extends Omit<ListingFormData, "price"> {
    price: number;
    images: File[];
    location: {
      address: string;
      city: string;
      state: string;
      country: string;
    };
  }

  const createListingMutation = useMutation({
    mutationFn: async (data: CreateListingPayload) => {
      return listingService.createListing(data);
    },
    onSuccess: () => {
      toast.success("Listing created successfully!");
      navigate("/dashboard");
      reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create listing");
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Validate file size (max 5MB)
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

    if (validFiles.length !== files.length) {
      toast.error("Some files exceed 5MB limit");
    }

    setImages((prev) => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (formData: ListingFormData) => {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    // Ensure price is a number
    const price =
      typeof formData.price === "string"
        ? parseFloat(formData.price)
        : formData.price;

    const payload: CreateListingPayload = {
      ...formData,
      price: price || 0,
      images,
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
    };

    createListingMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-2">Create New Listing</h1>
            <p className="text-gray-600 mb-8">
              Fill in the details below to list your item for sale
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Info Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Listing Type *
                    </label>
                    <select
                      {...register("listingType")}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="sell">Sell</option>
                      <option value="buy">Want to Buy</option>
                      <option value="rent">Rent</option>
                      <option value="service">Service</option>
                    </select>
                    {errors.listingType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.listingType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category *
                    </label>
                    <select
                      {...register("categoryId")}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="vehicles">Vehicles</option>
                      <option value="property">Property</option>
                      <option value="jobs">Jobs</option>
                    </select>
                    {errors.categoryId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.categoryId.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      {...register("title")}
                      placeholder="Enter a descriptive title"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", {
                        valueAsNumber: true,
                        setValueAs: (value) => {
                          if (
                            value === "" ||
                            value === null ||
                            value === undefined
                          )
                            return 0;
                          return parseFloat(value);
                        },
                      })}
                      placeholder="Enter price"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {String(errors.price.message)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Images</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag & drop images or click to upload
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload up to 10 images (5MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="px-6 py-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary/90"
                  >
                    Choose Images
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">
                      Uploaded Images
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <textarea
                  {...register("description")}
                  rows={6}
                  placeholder="Describe your item in detail..."
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Location Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      {...register("address")}
                      placeholder="Street address"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      {...register("city")}
                      placeholder="City"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      {...register("state")}
                      placeholder="State"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      {...register("country")}
                      defaultValue="India"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Negotiable Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("isNegotiable")}
                  id="isNegotiable"
                  className="w-4 h-4 mr-2"
                />
                <label htmlFor="isNegotiable" className="text-sm">
                  Price is negotiable
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <button
                  type="submit"
                  disabled={createListingMutation.isPending || isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  {createListingMutation.isPending || isSubmitting
                    ? "Creating..."
                    : "Create Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
