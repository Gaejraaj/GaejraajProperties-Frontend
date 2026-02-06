import React, { useCallback } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  images: File[];
  previews: string[];
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
  maxImages?: number;
  maxSize?: number; // in MB
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  previews,
  onUpload,
  onRemove,
  maxImages = 10,
  maxSize = 5,
}) => {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      // Check max images limit
      if (images.length + files.length > maxImages) {
        alert(`You can only upload up to ${maxImages} images`);
        return;
      }

      // Check file size
      const oversizedFiles = files.filter(
        (file) => file.size > maxSize * 1024 * 1024,
      );

      if (oversizedFiles.length > 0) {
        alert(`Some files exceed ${maxSize}MB limit`);
        return;
      }

      onUpload(files);
    },
    [images.length, maxImages, maxSize, onUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);

      // Filter only image files
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      if (imageFiles.length > 0) {
        onUpload(imageFiles);
      }
    },
    [onUpload],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          "hover:border-primary hover:bg-primary/5 cursor-pointer",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium mb-2">
          Drop images here or click to upload
        </p>
        <p className="text-sm text-gray-500">
          Upload up to {maxImages} images ({maxSize}MB each)
        </p>
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">
            Uploaded Images ({images.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {images[index]?.name.substring(0, 10)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
