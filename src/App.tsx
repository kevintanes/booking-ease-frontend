import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import NotfoundPage from "./pages/not-found";
import LoginPage from "./pages/login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
