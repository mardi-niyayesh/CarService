import MenuItems from "./MenuItems";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/2 max-w-sm transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full bg-white/80 backdrop-blur-lg border-l border-white/20 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/30">
          <h2 className="text-xl font-bold text-[#194BF0]">منو</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors"
            aria-label="بستن منو"
          >
            <span className="text-4xl text-[#194BF0] text-center">×</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
          <ul className="space-y-4">
            <MenuItems onClick={onClose} isMobile />
          </ul>

          <AuthButtons isMobile onClose={onClose} />

          <div className="mt-12 pt-6 border-t border-white/30">
            <div className="flex items-center justify-center gap-2">
              <Logo />
            </div>
            <p className="text-center text-gray-600 text-sm mt-2">
              بهترین خدمات اجاره خودرو
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;