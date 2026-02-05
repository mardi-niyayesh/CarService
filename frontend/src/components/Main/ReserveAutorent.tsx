//logo or img
import onenumber from "../../../assets/1 (2).png";
import twonumber from "../../../assets/3.png";
import reservCar from "../../../assets/reservCar.png";
import threenumber from '../../../assets/2.png'
import fornumber from '../../../assets/4.png'
const ReserveAutorent = () => {
  return (
    <div className="mt-8 container w-max-[1200px] mx-auto">
      <div className="mt-8">
        <p className="text-[#5E5E5E] text-[24px] font-medium text-center">
          چگونه در وبسایت
        </p>
        <div className="font-bold text-3xl text-center">
          <span className="text-[#D79C10]">اُتـــورِنت</span>
          <span> خودرو رزرو کنیم؟</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10">
        <div>
          <div className="mb-[350px]">
            <div className="flex items-center ">
              <img src={onenumber} alt="one number" />
            </div>

            <div className="font-bold text-3xl mb-2">
              <span className="text-[#D79C10]">خودروی </span>
              <span className="text-[#5E5E5E] text-[24px] font-medium">
                خود را انتخاب کنید
              </span>
            </div>
            <p className="text-[#5E5E5E] w-[250px] text-[16px]">
              خودروی مورد نظر خود را، متناسب با درخواست خود انتخاب کنید.
            </p>
          </div>

          <div className="">
            <div className="flex items-center ">
              <img src={twonumber} alt="two number" />
            </div>

            <div className="font-bold text-3xl mb-2">
              <span className="text-[#D79C10]">هزینه </span>
              <span className="text-[#5E5E5E] text-[24px] font-medium">
                اجاره را پرداخت کنید.
              </span>
            </div>
            <p className="text-[#5E5E5E] w-[250px] text-[16px]">
              می توانید از طریق کیف پول آنلاین یا کارت های عضو شبکه شتاب هزینه
              اجاره را پرداخت کنید.
            </p>
          </div>
        </div>

        <img src={reservCar} alt="reserve car" />

        <div>
          <div className="mb-[350px]">
            <div className="flex items-center ">
              <img src={threenumber} alt="three number" />
            </div>

            <div className="font-bold text-3xl mb-2">
              <span className="text-[#D79C10]">تاریخ </span>
              <span className="text-[#5E5E5E] text-[24px] font-medium">
              تحویل را تعیین کنید.
              </span>
            </div>
            <p className="text-[#5E5E5E] w-[250px] text-[16px]">
             تاریخ موردنظر خود را از تقویم، انتخاب و رزرو کنید
            </p>
          </div>

          <div className="">
            <div className="flex items-center ">
              <img src={fornumber} alt="for number" />
            </div>

            <div className="font-bold text-3xl mb-2">
              <span className="text-[#D79C10]">خودرو </span>
              <span className="text-[#5E5E5E] text-[24px] font-medium">
              را دریافت کنید.
              </span>
            </div>
            <p className="text-[#5E5E5E] w-[250px] text-[16px]">
            در زمان و مکان تعیین شده، خودروی خود را دریافت کنید.
            </p>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default ReserveAutorent;
