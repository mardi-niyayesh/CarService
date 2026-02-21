import Search from "../../../../assets/search-outline.png";

interface SearchButtonProps {
  isMobile?: boolean;
}

const SearchButton = ({ isMobile = false }: SearchButtonProps) => {
  return (
    <img
      src={Search}
      alt="جستجو"
      className="w-6 h-6 cursor-pointer"
    />
  );
};

export default SearchButton;