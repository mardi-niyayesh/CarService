//img or logo
import call from "../../../assets/call-calling.png";
import email from "../../../assets/sms.png";
import map from "../../../assets/map.png";
import logocar from "../../../assets/logoo.png";
const Footer = () => {
  return (
    <div className="bg-[#1E1E1EE5] mt-[300px] rounded-2xl  px-8 py-8 container w-max-[1200px] mx-auto mt-4">
      <div className="flex justify-between items-center border-[#868686] border-2 p-4 rounded-2xl">
        <div className="flex justify-start items-center gap-5 px-13 border-l-2 border-[#868686]">
          <img
            src={call}
            alt="call"
            className="border rounded-2xl p-2 border-[#FFFBFB]"
          />
          <div className="text-[#9A9A9A] text-[16px] ">
            <h2>ارتباط با ما</h2>
            <p>0994-5812125</p>
          </div>
        </div>

        <div className="flex justify-between px-13 border-l-2 border-[#868686] items-center gap-5">
          <img
            src={email}
            alt="email"
            className="border rounded-2xl p-2 border-[#FFFBFB]"
          />
          <div className="text-[#9A9A9A] text-[16px] ">
            <h2>ایمیل</h2>
            <p>niyayeshammardii@gmail.com</p>
          </div>
        </div>

        <div className="flex justify-between  items-center gap-5">
          <img
            src={map}
            alt="map"
            className="border rounded-2xl p-2 border-[#9A9A9A]"
          />
          <div className="text-[#9A9A9A] text-[16px] ">
            <h2>آدرس</h2>
            <p>تهران- خ شادمان</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around gap-2 pb-6 mt-3 border-b-2 border-[#9A9A9A]">
        <div className="">
          <div className="flex items-center gap-2">
            <img src={logocar} alt="logocar" />
            <div className="font-bold text-[24px] ">
              <span className="text-[#FFFFFF]">اُتــو</span>
              <span className="text-[#FDB713]">رِنت</span>
            </div>
          </div>

          <p className="text-[14px] text-[#9A9A9A] w-[450px] mt-2">
            اتورنت با رویکرد اعتماد به مشتری، با در اختیار داشتن بزرگترین ناوگان
            خودرویی متشکل از انواع خودروهای صفر کیلومتر، اقتصادی تا تجاری در
            سراسر کشور ایران آماده خدمت‌رسانی به مشتریان است.
          </p>

          <p></p>
        </div>
        <ul className="text-[14px] text-[#9A9A9A]">
          <li className="mb-4">دسترسی آسان</li>
          <li>سوالات متداول</li>
          <li>تماس با ما</li>
          <li>درباره ما</li>
        </ul>
        <div>
          <h3 className="font-medium text-[16px] text-[#FFFFFF]">خبرنامه</h3>
          <input
            type="text"
            placeholder="ایمیل خود را وارد کنید"
            className="text-[#FFFFFF] text-[14px] pl-5 py-2 relative"
          />
          <button className="bg-[#FDB713] absolute p-1 left-[245px] text-[14px]">ارسال</button>
        </div>
      </div>
      <div className="text-[14px] text-[#9A9A9A] text-center p-2">تمامی حقوق این وبسایت متعلق به اتورنت می‌باشد</div>
    </div>
  );
};

export default Footer;
