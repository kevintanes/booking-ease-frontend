import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/services/:id/book" element={<BookPage />} />
            <Route path="/booking/:id" element={<BookingDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotfoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
