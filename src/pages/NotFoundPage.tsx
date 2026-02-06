import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-bold text-primary opacity-10 mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-6 w-6 text-gray-400" />
            <h3 className="text-lg font-semibold">
              Can't find what you're looking for?
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Try searching for what you need, or browse our popular categories:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Electronics", "Vehicles", "Property", "Jobs", "Services"].map(
              (category) => (
                <Button key={category} variant="outline" size="sm" asChild>
                  <Link to={`/category/${category.toLowerCase()}`}>
                    {category}
                  </Link>
                </Button>
              ),
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-sm text-gray-500">
          Still need help?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
