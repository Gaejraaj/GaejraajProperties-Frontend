import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

// Lazy load pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ListingDetailPage = lazy(() => import("@/pages/ListingDetailPage"));
const CreateListingPage = lazy(() => import("@/pages/CreateListingPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const LandsPage = lazy(() => import("@/pages/LandsPage"));
const HomesPage = lazy(() => import("@/pages/HomesPage"));
const RentalsPage = lazy(() => import("@/pages/RentalsPage"));
const ReviewsPage = lazy(() => import("@/pages/ReviewsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/category/:slug" element={<HomePage />} />

        {/* Property listing pages */}
        <Route path="/lands" element={<LandsPage />} />
        <Route path="/homes" element={<HomesPage />} />
        <Route path="/rental" element={<RentalsPage />} />

        {/* Reviews page */}
        <Route path="/reviews" element={<ReviewsPage />} />

        {/* Profile page */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Protected routes */}
        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <CreateListingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
