import logoCircle from "../../../../assets/default.png";

const Logo = () => {
  return (
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
  );
};

export default Logo;