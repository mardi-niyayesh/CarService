import arrow from "../../../assets/arrow.png";
import calendar from "../../../assets/calendar.png";
import clock from "../../../assets/clock.png";

const HeroBaner = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <button className="px-3 py-2 rounded-2xl border-2 hover:bg-[#194BF0] hover:text-[#FFFFFF] transition duration-200 text-sm sm:text-base">
            اجاره خودرو با راننده
          </button>
          <button className="px-3 py-2 rounded-2xl border-2 hover:bg-[#194BF0] hover:text-[#FFFFFF] transition duration-200 text-sm sm:text-base">
            اجاره خودرو بی راننده
          </button>
          <button className="px-3 py-2 rounded-2xl border-2 hover:bg-[#194BF0] hover:text-[#FFFFFF] transition duration-200 text-sm sm:text-base">
            اجاره ماشین عروس
          </button>
        </div>

        <a href="#" className="self-center lg:self-auto">
          <p className="text-[#194BF0] text-sm sm:text-base whitespace-nowrap">
            اطلاعات بیشتر در مورد رزرو خودرو
          </p>
        </a>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-4">
        <div className="flex items-center gap-2">
          <img src={arrow} alt="arrow" className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="text-sm sm:text-base">محل تحویل خودرو</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row gap-3 sm:gap-5 w-full lg:w-auto mt-4 lg:mt-0">
          <div className="flex items-center gap-2">
            <img src={arrow} alt="arrow" className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="text-xs sm:text-sm">تاریخ تحویل</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={arrow} alt="arrow" className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="text-xs sm:text-sm">ساعت تحویل</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={arrow} alt="arrow" className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="text-xs sm:text-sm">تاریخ بازگشت</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={arrow} alt="arrow" className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="text-xs sm:text-sm">ساعت بازگشت</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 gap-4">
        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl w-full lg:w-auto">
          <p className="text-sm sm:text-base font-medium">
            تهران-فرودگاه امام خمینی
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:flex lg:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <img
              src={calendar}
              alt="calendar"
              className="w-5 h-5 sm:w-6 sm:h-6 border-r-2 border-[#b8b4b4] pr-2"
            />
            <p className="text-sm sm:text-base">1403.02.10</p>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <img src={clock} alt="clock" className="w-5 h-5 sm:w-6 sm:h-6" />
            <p className="text-sm sm:text-base">07:00</p>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <img
              src={calendar}
              alt="calendar"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <p className="text-sm sm:text-base">1403.02.10</p>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <img src={clock} alt="clock" className="w-5 h-5 sm:w-6 sm:h-6" />
            <p className="text-sm sm:text-base">07:00</p>
          </div>

          <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroBaner;
