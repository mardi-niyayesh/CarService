import arrow from "../../../assets/arrow.png";
import calendar from "../../../assets/calendar.png";
import clock from "../../../assets/clock.png";
import search from "../../../assets/search-outline.png";
const HeroBaner = () => {
  return (
    <div className="container w-max-[1200px] mx-auto mt-4">
      <div className="flex justify-between items-center  ">
        <div className="text-[#0C0C0C]">
          <button className=" ml-2 px-3 py-2 rounded-2xl border-2 hover:bg-[#194BF0] hover:text-[#FFFFFF]">
            اجاره خودرو با راننده
          </button>
          <button className="ml-2 px-3 py-2 rounded-2xl border-2 hover:bg-[#194BF0] hover:text-[#FFFFFF]">
            اجاره خودرو بی راننده
          </button>
          <button className="ml-2 px-3 py-2 rounded-2xl border-2 hover:bg-[#194BF0] hover:text-[#FFFFFF]">
            اجاره ماشین عروس
          </button>
        </div>
        <a href="#">
          <p className="text-[#194BF0]">اطلاعات بیشتر در مورد رزرو خودرو</p>
        </a>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-2">
          <img src={arrow} alt="arrow" />
          <p>محل تحویل خودرو</p>
        </div>
        <div className="flex justify-between items-center gap-5 mt-5">
          <div className=" flex gap-2">
            <img src={arrow} alt="arrow" />
            <p>تاریخ تحویل</p>
          </div>
          <div className="flex gap-2">
            <img src={arrow} alt="arrow" />
            <p>ساعت تحویل</p>
          </div>
          <div className="flex gap-2">
            <img src={arrow} alt="arrow" />
            <p>تاریخ بازگشت</p>
          </div>
          <div className="flex gap-2">
            <img src={arrow} alt="arrow" />
            <p>ساعت بازگشت</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center ">
        <div className="flex gap-2">
          <p>تهران-فرودگاه امام خمینی</p>
        </div>
        <div className="flex justify-between items-center gap-5 mt-5">
          <div className=" flex gap-2 ">
            <img
              src={calendar}
              alt="calendar"
              className="border-r-2 border-[#b8b4b4]"
            />
            <p>1403٫02٫10</p>
          </div>
          <div className="flex gap-2 border-r-2 border-[#b8b4b4]">
            <img src={clock} alt="clock" />
            <p>07:00</p>
          </div>
          <div className="flex gap-2 border-r-2 border-[#b8b4b4]">
            <img src={calendar} alt="calendar" />
            <p>1403٫02٫10</p>
          </div>
          <div className="flex gap-2 border-r-2 border-[#b8b4b4]">
            <img src={clock} alt="clock" />
            <p>07:00</p>
          </div>
          <img
            src={search}
            alt="search"
            className="bg-[#FDB713] p-3 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBaner;
