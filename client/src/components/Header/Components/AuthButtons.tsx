import { Link } from "react-router-dom";
import { useState } from "react";
import imglogin from "../../../../assets/login.png";

interface AuthButtonsProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const AuthButtons = ({ isMobile = false, onClose }: AuthButtonsProps) => {
  const [showLoginMenue, setShowLoginMenue] = useState(false);

  const desktopButton = (
    <div className="relative hidden lg:block">
      <button
        onClick={() => setShowLoginMenue(!showLoginMenue)}
        className="bg-[#194BF0] rounded-xl px-6 py-2 text-white font-medium hover:bg-[#1539c0] transition-colors"
      >
        ورود / ثبت‌نام
      </button>
      {showLoginMenue && (
        <div className="absolute top-full left-0 mt-2 z-50 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border-b-2 border-b-theme-color-dark overflow-hidden">
          <LoginMenuItems setShowLoginMenue={setShowLoginMenue} />
        </div>
      )}
    </div>
  );

  const mobileButton = (
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
          <LoginMenuItems setShowLoginMenue={setShowLoginMenue} onClose={onClose} isMobile />
        </div>
      )}
    </div>
  );

  return isMobile ? mobileButton : desktopButton;
};

const LoginMenuItems = ({ setShowLoginMenue, onClose, isMobile = false }: any) => {
  const handleClick = () => {
    setShowLoginMenue(false);
    onClose?.();
  };

  const itemClass = isMobile
    ? "flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    : "flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200";

  return (
    <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
      <li>
        <Link to="/login" onClick={handleClick} className={itemClass}>
          <img src={imglogin} alt="" className="w-5 h-5 opacity-70" />
          <span className="text-sm font-medium">ورود</span>
        </Link>
      </li>
      <li>
        <Link to="/register" onClick={handleClick} className={itemClass}>
          <img src={imglogin} alt="" className="w-5 h-5 opacity-70" />
          <span className="text-sm font-medium">ثبت‌نام</span>
        </Link>
      </li>
    </ul>
  );
};

export default AuthButtons;