//Logo



import Search from "../../../assets/search-outline.png";
import logoCircle from "../../../assets/default.png";
import { useState } from "react"; // اضافه کردن useState برای مدیریت وضعیت منو

const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-[#194BF0] text-[#FFFFFF] text-[24px] md:text-[40px] lg:text-[56px] items-center text-center justify-center py-3">
        صفحه اصلی
      </div>
      
      <div className="container w-full max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between bg-[#FFFFFF] py-4">
          
          {/* لوگو و نام برند */}
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

          {/* منوی اصلی - فقط در دسکتاپ نمایش داده می‌شود */}
          <div className="hidden lg:flex items-center justify-around gap-6">
            <ul className="flex items-center justify-around gap-6 text-[#353535] font-medium text-[16px]">
              <li className="hover:text-[#194BF0] cursor-pointer transition-colors">رزرو خودرو</li>
              <li className="hover:text-[#194BF0] cursor-pointer transition-colors">خدمات ما</li>
              <li className="hover:text-[#194BF0] cursor-pointer transition-colors">بلاگ</li>
              <li className="hover:text-[#194BF0] cursor-pointer transition-colors">درباره ما</li>
              <li className="hover:text-[#194BF0] cursor-pointer transition-colors">تماس با ما</li>
            </ul>
            <img 
              src={Search} 
              alt="logoSearch" 
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          {/* دکمه ورود/ثبت‌نام - در دسکتاپ */}
          <button className="hidden lg:block bg-[#194BF0] rounded-xl px-6 py-2 text-[#FFFFFF] font-medium hover:bg-[#1539c0] transition-colors">
            ورود / ثبت‌نام
          </button>

          {/* بخش موبایل و تبلت */}
          <div className="flex lg:hidden items-center gap-4">
            
            {/* آیکون جستجو در موبایل */}
            <img 
              src={Search} 
              alt="logoSearch" 
              className="w-6 h-6 cursor-pointer"
            />
            
            {/* دکمه همبرگر */}
            <button 
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-8 h-8"
            >
              <span className={`bg-[#194BF0] h-1 w-6 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`bg-[#194BF0] h-1 w-6 rounded-full my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-[#194BF0] h-1 w-6 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* منوی همبرگری برای موبایل و تبلت */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-b-xl border-t border-gray-100">
            <div className="flex flex-col py-4">
              <ul className="flex flex-col space-y-4 px-4">
                <li className="text-[#353535] font-medium text-[18px] py-2 border-b border-gray-100 hover:text-[#194BF0] cursor-pointer transition-colors">
                  رزرو خودرو
                </li>
                <li className="text-[#353535] font-medium text-[18px] py-2 border-b border-gray-100 hover:text-[#194BF0] cursor-pointer transition-colors">
                  خدمات ما
                </li>
                <li className="text-[#353535] font-medium text-[18px] py-2 border-b border-gray-100 hover:text-[#194BF0] cursor-pointer transition-colors">
                  بلاگ
                </li>
                <li className="text-[#353535] font-medium text-[18px] py-2 border-b border-gray-100 hover:text-[#194BF0] cursor-pointer transition-colors">
                  درباره ما
                </li>
                <li className="text-[#353535] font-medium text-[18px] py-2 border-b border-gray-100 hover:text-[#194BF0] cursor-pointer transition-colors">
                  تماس با ما
                </li>
              </ul>
              
              {/* دکمه ورود/ثبت‌نام در موبایل */}
              <button className="mt-6 mx-4 bg-[#194BF0] rounded-xl py-3 text-[#FFFFFF] font-medium text-[18px] hover:bg-[#1539c0] transition-colors">
                ورود / ثبت‌نام
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderBar;
// import Search from "../../../assets/search-outline.png";
// import logoCircle from "../../../assets/default.png";
// const HedearBar = () => {
//   return (
//     <>
//      <div className="bg-[#194BF0] text-[#FFFFFF] text-[56px] items-center text-center justify-center py-3">صفحه اصلی</div>
//     <div className="container w-max-[1200px] mx-auto ">
      
//       <div className="flex items-center justify-between bg-[#FFFFFF] ">
//         <div>
//           <div className="flex items-center justify-around gap-2">
//             <img src={logoCircle} alt="logo" />
//             <span className=" text-[24px] font-bold text-[#194BF0]">
//               اُتــو
//             </span>
//             <span className=" text-[24px] font-bold text-[#FDB713]">رِنت</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-around gap-6">
//           <ul className="flex items-center justify-around gap-6 text-[#353535] font-medium text-[16px] ">
//             <li>رزرو خودرو</li>
//             <li>خدمات ما</li>
//             <li>بلاگ</li>
//             <li>درباره ما</li>
//             <li>تماس با ما</li>
//           </ul>
//           <img src={Search} alt="logoSearch" />
//         </div>
      

//         <button className="bg-[#194BF0] rounded-1xl p-1.5 text-[#FFFFFF] w-[122px] ">
//           ورود / ثبت‌نام
//         </button>
//       </div>
//     </div>
//     </>
   
//   );
// };

// export default HedearBar;
