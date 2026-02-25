import { Routes, Route } from "react-router-dom";
import HeaderSite from "./components/Header/HeaderSite";
import Footer from "./components/Footer/Footer";

//pages
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import RolsPage from "./pages/RolsPage";
import QuestionPage from "./pages/QuestionPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./dashboard/Components/DashboardLayout";
import AddressPages from "./dashboard/Pages/AddressPages";
import CommentPages from "./dashboard/Pages/CommentPages";
import ReservePages from "./dashboard/Pages/ReservePages";
import WalletPages from "./dashboard/Pages/WalletPages";
import CardPages from "./dashboard/Pages/CardPages";

function App() {
  return (
    <>
      <HeaderSite />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/roles" element={<RolsPage />} />
        <Route path="/questionPage" element={<QuestionPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/dashboard/address" element={<AddressPages />} />
        <Route path="/dashboard/comment" element={<CommentPages />} />
        <Route path="/dashboard/reserve" element={<ReservePages />} />
        <Route path="/dashboard/wallet" element={<WalletPages />} />
        <Route path="/dashboard/card" element={<CardPages />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
