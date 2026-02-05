//imag or logo
import box from "../../../assets/box.png";
import support from "../../../assets/24-support.png";
import wallet from "../../../assets/wallet-minus.png";
const WhyAutoRent = () => {
  return (
    <div>
      <div className="bg-[url('/assets/imagecar.png')] relative h-[292px] rounded-2xl mt-10 bg-center bg-cover container w-max-[1200px] mx-auto mt-4">
        <div>
          <h3 className="text-[#FDB713] font-bold text-[24px] pt-5 mb-5 text-center">
            چــــــرا اُتو رِنت؟
          </h3>
          <p className="text-[#FFFFFF]  w-[845px] px-12 mx-auto text-[18px] text-center">
            اجاره خودرو از یک شرکت اجاره خودرو با سابقه به شما کمک می‌کند تا در
            مسافرت ها، قرار ملاقات‌ های مهم، مجالس و مراسم‌های خانوادگی ماشین
            مناسب خود را در اختیار داشته باشید. اگر شما اصلا خودرویی در اختیار
            ندارید یا خودروی شما مطمئن نیست، می‌توانید از سوییچ، خودروی مناسب
            خود را کرایه کرده و با آسودگی به سفر بروید.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-[#FFFFFF] border-[#D7D7D7] absolute top-[1400px] right-[300px] p-6 w-[320px] h-[170px] rounded-2xl border-2">
          <img
            src={box}
            alt="box"
            className="rounded-2xl border-2 border-[#414141] p-2 mx-auto"
          />
          <h3 className="font-bold text-[16px] text-[#414141] text-center">
            تحویل در محل
          </h3>
          <p className="text-[#757575] text-[12px]">
            تحویل خودرو در زمان و مکان تعیین شده توسط شما خواهد بود.
          </p>
        </div>
        <div className="bg-[#FFFFFF] border-[#D7D7D7] absolute top-[1400px] right-[700px] p-6 w-[320px] h-[170px] rounded-2xl border-2">
          <img
            src={support}
            alt="support"
            className="rounded-2xl border-2 border-[#414141] p-2 mx-auto"
          />
          <h3 className="font-bold text-[16px] text-[#414141] text-center">
            پشتیبانی 24 ساعته
          </h3>
          <p className="text-[#757575] text-[12px]">
            کارشناسان ما در هر زمان و مکان، پاسخگوی سوالات شما خواهند بود.
          </p>
        </div>
        <div className="bg-[#FFFFFF] border-[#D7D7D7] absolute top-[1400px] right-[1100px] p-6 w-[320px] h-[170px] rounded-2xl border-2">
          <img
            src={wallet}
            alt="wallet"
            className="rounded-2xl border-2 border-[#414141] p-2 mx-auto"
          />
          <h3 className="font-bold text-[16px] text-[#414141] text-center">
            قیمت مناسب
          </h3>
          <p className="text-[#757575] text-[12px]">
            هدف ما، ارائه بهترین خدمات با مناسب ترین قیمت ممکن است.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyAutoRent;
