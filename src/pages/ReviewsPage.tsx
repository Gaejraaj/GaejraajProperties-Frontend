import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Alert from "@/components/shared/Alert";
import { useAuth } from "@/contexts/AuthContext";
import { reviewsData } from "@/store/property.store";
import { cn } from "@/lib/utils";

const ReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
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

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    if (!user) {
      showAlert(
        "Login Required",
        "Please login to submit a review.",
        "warning",
      );
      return;
    }

    if (rating === 0) {
      showAlert("Rating Required", "Please select a rating", "error");
      return;
    }

    if (!reviewText.trim()) {
      showAlert(
        "Review Text Required",
        "Please enter your review text",
        "error",
      );
      return;
    }

    if (reviewText.length < 20) {
      showAlert(
        "Review Too Short",
        "Review must be at least 20 characters long",
        "error",
      );
      return;
    }

    showAlert(
      "Review Submitted",
      "Thank you for your review! It has been submitted successfully.",
      "success",
    );
    setRating(0);
    setReviewText("");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f1a2c] via-[#1a3a5f] to-[#0f1a2c]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-in-left">
            Customer Reviews
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto animate-slide-in-right">
            What our clients say about their experience with Gaejraaj Properties
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0f1a2c]">
                        {review.name}
                      </h4>
                      <p className="text-gray-500 text-sm">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={cn(
                          "fas fa-star text-lg",
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                        )}
                      ></i>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <i className="fas fa-home text-purple-600"></i>
                  <span>{review.property}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#0f1a2c] mb-6">
              Share Your Experience
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    <i
                      className={cn(
                        "fas fa-star",
                        star <= rating ? "text-yellow-400" : "text-gray-200",
                      )}
                    ></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with Gaejraaj Properties..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 min-h-[120px] resize-y"
              />
            </div>

            <button
              onClick={handleSubmitReview}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2"
            >
              <i className="fas fa-paper-plane"></i>
              Submit Review
            </button>
          </div>
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

export default ReviewsPage;
