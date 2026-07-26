import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import NotfoundPage from "./pages/not-found";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotfoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
