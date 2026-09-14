import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/toast";
import AuthProvider from "./context/AuthProvider";
import GuestRoute from "./helper/GuestRoute";
import ProtectedRoute from "./helper/ProtectedRoute";
import AdminDashboardPage from "./pages/admin";
import AdminBookingsPage from "./pages/admin/pages/bookings";
import AdminServicesPage from "./pages/admin/pages/services";
import BookPage from "./pages/book";
import BookingDetailPage from "./pages/booking-detail";
import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import NotfoundPage from "./pages/not-found";
import RegisterPage from "./pages/register";
import ServiceDetailPage from "./pages/service-detail";
import ServicesPage from "./pages/services";
import AdminUsersPage from "./pages/admin/pages/users";
import AuthCallbackPage from "./pages/auth-callback";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <Toaster />
        {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />

          <Route element={<GuestRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/services/:id/book" element={<BookPage />} />
            <Route path="/booking/:id" element={<BookingDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoute isAdminOnly={true} />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
