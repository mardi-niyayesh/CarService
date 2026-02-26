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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardLayout from "./dashboard/Components/DashboardLayout";
import AddressPages from "./dashboard/Pages/AddressPages";
import CommentPages from "./dashboard/Pages/CommentPages";
import ReservePages from "./dashboard/Pages/ReservePages";
import WalletPages from "./dashboard/Pages/WalletPages";
import CardPages from "./dashboard/Pages/CardPages";
import LogoutPage from "./dashboard/Pages/LogoutPage";

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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/dashboard/address" element={<AddressPages />} />
        <Route path="/dashboard/comment" element={<CommentPages />} />
        <Route path="/dashboard/reserve" element={<ReservePages />} />
        <Route path="/dashboard/wallet" element={<WalletPages />} />
        <Route path="/dashboard/card" element={<CardPages />} />
        <Route path="/dashboard/logout" element={<LogoutPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
