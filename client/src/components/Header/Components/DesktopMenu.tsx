import MenuItems from "./MenuItems";
import SearchButton from "./SearchButton";
import AuthButtons from "./AuthButtons";

interface DesktopMenuProps {
  closeMenu: () => void;
}

const DesktopMenu = ({ closeMenu }: DesktopMenuProps) => {
  return (
    <div className="hidden lg:flex items-center justify-around gap-6">
      <ul className="flex items-center justify-around gap-6 text-[#353535] font-medium text-[16px]">
        <MenuItems onClick={closeMenu} />
      </ul>
      <SearchButton />
      <AuthButtons />
    </div>
  );
};

export default DesktopMenu;

