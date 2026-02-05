
import Logohoure from "../../../assets/arrow-left.png";

const BanerHeader = () => {
  return (
    <div className=" bg-[url('/assets/backgronCar.png')] left-0 h-[683px] bg-center bg-cover">
      <div className="container w-max-[1200px] mx-auto mt-4">

        <h2 className="text-[#FDB713] font-bold text-[44px] w-[300px]">
          اُتـــو رِنت؛ سریع، آسان و به صرفه
        </h2>

        <p className="text-[#F9F9F9] font-medium text-[15px]">
          سرویس دهنده رزرو خودرو در ایران در کمترین زمان ممکن!{" "}
        </p>

        <div className="flex gap-3 mt-8">
          <div className="flex items-center justify-center w-fit px-4 py-1.5 gap-2 border-2  text-[#F9F9F9]">
            <button>تماس با ما</button>
            <img src={Logohoure} alt="logohoure" />
          </div>
          <div className="flex items-center justify-center w-fit px-4 py-1.5 gap-2 bg-[#FDB713] text-[#000000]  ">
            <button>رزو آسان خودرو</button>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default BanerHeader;
