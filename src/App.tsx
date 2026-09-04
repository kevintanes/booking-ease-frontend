import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import NotfoundPage from "./pages/not-found";
import LoginPage from "./pages/login";
import ServicesPage from "./pages/services";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "./components/ui/toast";
import ServiceDetailPage from "./pages/service-detail";
import ScrollToTop from "./components/ScrollToTop";
import BookPage from "./pages/book";
import BookingDetailPage from "./pages/booking-detail";
import DashboardPage from "./pages/dashboard";
import GuestRoute from "./helper/GuestRoute";
import ProtectedRoute from "./helper/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminDashboardPage from "./pages/admin";

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
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/services/:id/book" element={<BookPage />} />
            <Route path="/booking/:id" element={<BookingDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoute isAdminOnly={true} />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
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
