import { Routes, Route } from "react-router-dom";
import HeaderSite from "./components/Header/HeaderSite";
import Footer from "./components/Footer/Footer";

//pages
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <HeaderSite />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
