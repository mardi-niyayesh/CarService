import { Link } from "react-router-dom";
import Search from "../../../assets/search-outline.png";
import logoCircle from "../../../assets/default.png";
import { useState } from "react";

const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}

      <div className="bg-[#194BF0] text-[#FFFFFF] text-[24px] md:text-[40px] lg:text-[56px] items-center text-center justify-center py-3">
        صفحه اصلی
      </div>

      <div className="container w-full max-w-[1200px] mx-auto px-4 relative">
        <div className="flex items-center justify-between bg-[#FFFFFF] py-4">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <img
                src={logoCircle}
                alt="logo"
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
              <div className="flex">
                <span className="text-[18px] md:text-[22px] lg:text-[24px] font-bold text-[#194BF0]">
                  اُتــو
                </span>
                <span className="text-[18px] md:text-[22px] lg:text-[24px] font-bold text-[#FDB713]">
                  رِنت
                </span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-around gap-6">
            <ul className="flex items-center justify-around gap-6 text-[#353535] font-medium text-[16px]">
              <li className="hover:text-[#194BF0] cursor-pointer transition-colors">
                رزرو خودرو
              </li>
              <li className="hover:text-[#194BF0] cursor-pointer transition-colors">
                خدمات ما
              </li>
              <li className="hover:text-[#194BF0] cursor-pointer transition-colors">
                بلاگ
              </li>

              <li className="hover:text-[#194BF0] transition-colors">
                <Link
                  to="/about"
                  className="block w-full h-full"
                  onClick={closeMenu}
                >
                  درباره ما
                </Link>
              </li>

              <li className="hover:text-[#194BF0] transition-colors">
                <Link
                  to="/contact"
                  className="block w-full h-full"
                  onClick={closeMenu}
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
            <img
              src={Search}
              alt="logoSearch"
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <button className="hidden lg:block bg-[#194BF0] rounded-xl px-6 py-2 text-[#FFFFFF] font-medium hover:bg-[#1539c0] transition-colors">
            ورود / ثبت‌نام
          </button>

          <div className="flex lg:hidden items-center gap-4">
            <img
              src={Search}
              alt="logoSearch"
              className="w-6 h-6 cursor-pointer"
            />

            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="منو"
            >
              <span
                className={`bg-[#194BF0] h-1 w-6 rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`bg-[#194BF0] h-1 w-6 rounded-full my-1 transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`bg-[#194BF0] h-1 w-6 rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </button>
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-full w-1/2 max-w-sm transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full bg-white/80 backdrop-blur-lg border-l border-white/20 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/30">
              <h2 className="text-xl font-bold text-[#194BF0]">منو</h2>
              <button
                onClick={closeMenu}
                className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors"
                aria-label="بستن منو"
              >
                <span className="text-4xl text-[#194BF0] text-center">×</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={closeMenu}
                    className="w-full text-right text-[#353535] font-medium text-[18px] py-3 px-4 rounded-lg hover:bg-white/50 hover:text-[#194BF0] transition-all duration-200"
                  >
                    رزرو خودرو
                  </button>
                </li>
                <li>
                  <button
                    onClick={closeMenu}
                    className="w-full text-right text-[#353535] font-medium text-[18px] py-3 px-4 rounded-lg hover:bg-white/50 hover:text-[#194BF0] transition-all duration-200"
                  >
                    خدمات ما
                  </button>
                </li>
                <li>
                  <button
                    onClick={closeMenu}
                    className="w-full text-right text-[#353535] font-medium text-[18px] py-3 px-4 rounded-lg hover:bg-white/50 hover:text-[#194BF0] transition-all duration-200"
                  >
                    بلاگ
                  </button>
                </li>

                <li>
                  <Link
                    to="/about"
                    onClick={closeMenu}
                    className="w-full block text-right text-[#353535] font-medium text-[18px] py-3 px-4 rounded-lg hover:bg-white/50 hover:text-[#194BF0] transition-all duration-200"
                  >
                    درباره ما
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="w-full block text-right text-[#353535] font-medium text-[18px] py-3 px-4 rounded-lg hover:bg-white/50 hover:text-[#194BF0] transition-all duration-200"
                  >
                    تماس با ما
                  </Link>
                </li>
              </ul>

              <button
                onClick={closeMenu}
                className="mt-8 w-full bg-[#194BF0] rounded-xl py-3 text-[#FFFFFF] font-medium text-[18px] hover:bg-[#1539c0] transition-colors shadow-lg"
              >
                ورود / ثبت‌نام
              </button>

              <div className="mt-12 pt-6 border-t border-white/30">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex">
                    <span className="text-[20px] font-bold text-[#194BF0]">
                      اُتــو
                    </span>
                    <span className="text-[20px] font-bold text-[#FDB713]">
                      رِنت
                    </span>
                  </div>
                </div>
                <p className="text-center text-gray-600 text-sm mt-2">
                  بهترین خدمات اجاره خودرو
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
