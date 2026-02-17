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
import RegisterForm from "./Auth/RegisterForm";
import LoginForm from "./Auth/LoginForm";

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
         <Route path="/register" element={<RegisterForm />} />
         <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
