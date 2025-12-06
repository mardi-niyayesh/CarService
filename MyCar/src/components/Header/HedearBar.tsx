//Logo
import Search from "../../../assets/search-outline.png";
import logoCircle from "../../../assets/default.png";
const HedearBar = () => {
  return (
    <>
     <div className="bg-[#194BF0] text-[#FFFFFF] text-[56px] items-center text-center justify-center py-3">صفحه اصلی</div>
    <div className="container w-max-[1200px] mx-auto ">
      
      <div className="flex items-center justify-between bg-[#FFFFFF] ">
        <div>
          <div className="flex items-center justify-around gap-2">
            <img src={logoCircle} alt="logo" />
            <span className=" text-[24px] font-bold text-[#194BF0]">
              اُتــو
            </span>
            <span className=" text-[24px] font-bold text-[#FDB713]">رِنت</span>
          </div>
        </div>

        <div className="flex items-center justify-around gap-6">
          <ul className="flex items-center justify-around gap-6 text-[#353535] font-medium text-[16px] ">
            <li>رزرو خودرو</li>
            <li>خدمات ما</li>
            <li>بلاگ</li>
            <li>درباره ما</li>
            <li>تماس با ما</li>
          </ul>
          <img src={Search} alt="logoSearch" />
        </div>

        <button className="bg-[#194BF0] rounded-1xl p-1.5 text-[#FFFFFF] w-[122px] ">
          ورود / ثبت‌نام
        </button>
      </div>
    </div>
    </>
   
  );
};

export default HedearBar;
