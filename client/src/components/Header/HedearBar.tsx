import { Link, useLocation } from "react-router-dom";
import Search from "../../../assets/search-outline.png";
import logoCircle from "../../../assets/default.png";
import imglogin from "../../../assets/login.png";
import { useState } from "react";

const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [showLoginMenue, setShowLoginMenue] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "صفحه اصلی";
      case "/about":
        return "درباره ما";
      case "/contact":
        return "تماس با ما";
      case "/roles":
        return " قوانین و مقررات";
      case "/questionPage":
        return " سوالات متدوال ";
      default:
        return "اتورنت";
    }
  };

  return (
    <>
      <div className="bg-[#194BF0] text-[#FFFFFF] text-[24px] md:text-[40px] lg:text-[56px] items-center text-center justify-center py-3">
        {getPageTitle()}
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}

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
              <li className="hover:text-[#194BF0] transition-colors">
                <Link
                  to="/"
                  className="block w-full h-full"
                  onClick={closeMenu}
                >
                  خانه
                </Link>
              </li>
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

          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowLoginMenue(!showLoginMenue)}
              className="bg-[#194BF0] rounded-xl px-6 py-2 text-white font-medium hover:bg-[#1539c0] transition-colors"
            >
              ورود / ثبت‌نام
            </button>

            {showLoginMenue && (
              <div className="absolute top-full left-0 mt-2 z-50 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border-b-2 border-b-theme-color-dark dark:border-b-theme-color-dark overflow-hidden">
                <ul className="flex flex-col text-gray-700 dark:text-gray-100">
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setShowLoginMenue(false)}
                    >
                      <img
                        src={imglogin}
                        alt=""
                        className="w-5 h-5 opacity-70"
                      />
                      <span className="text-sm font-medium">ورود</span>
                    </Link>
                  </li>
                  <li className="border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="/register"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setShowLoginMenue(false)}
                    >
                      <img
                        src={imglogin}
                        alt=""
                        className="w-5 h-5 opacity-70"
                      />
                      <span className="text-sm font-medium">ثبت‌نام</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

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
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="w-full block text-right text-[#353535] font-medium text-[18px] py-3 px-4 rounded-lg hover:bg-white/50 hover:text-[#194BF0] transition-all duration-200"
                  >
                    خانه
                  </Link>
                </li>
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

              <div className="relative mt-8">
                <button
                  onClick={() => setShowLoginMenue(!showLoginMenue)}
                  className="w-full bg-[#194BF0] rounded-xl py-3 text-[#FFFFFF] font-medium text-[18px] hover:bg-[#1539c0] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>ورود / ثبت‌نام</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${showLoginMenue ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showLoginMenue && (
                  <div className="mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-[#194BF0] overflow-hidden">
                    <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                      <li>
                        <Link
                          to="/login"
                          className="flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => {
                            setShowLoginMenue(false);
                            closeMenu();
                          }}
                        >
                          <img
                            src={imglogin}
                            alt=""
                            className="w-5 h-5 opacity-70"
                          />
                          <span className="text-base font-medium text-gray-700 dark:text-gray-200">ورود</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className="flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => {
                            setShowLoginMenue(false);
                            closeMenu();
                          }}
                        >
                          <img
                            src={imglogin}
                            alt=""
                            className="w-5 h-5 opacity-70"
                          />
                          <span className="text-base font-medium text-gray-700 dark:text-gray-200">ثبت‌نام</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

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