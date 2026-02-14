const RolsPage = () => {
  return (
    <>
      <div className="bg-[url('../../assets/pagerole.png')] bg-cover bg-center bg-no-repeat w-full min-h-[250px] md:min-h-[400px] lg:min-h-[550px] xl:h-[683px] relative"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
      
        <div className="bg-[#EDEDED] rounded-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8 lg:mb-10 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <p className="text-[#353535] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] border-b-2 border-gray-300 pb-2 mb-4">
            مدارک لازم
          </p>
          <div className="text-[#353535] text-sm sm:text-base md:text-[14px] lg:text-base leading-relaxed text-justify">
            <p>ارائه گواهینامه رانندگی با اعتبار حداقل 6 ماه</p>
            <p>ارائه کارت ملی</p>
            <p>مدارک شغلی هرگونه مدرکی که نشان دهنده شغل یا محل کار شما باشد</p>
            <p>
              ارائه سفته (به ارزش خودرو برای ماشین‌های ایرانی و ارائه چک به ارزش
              خودرو برای ماشین‌های خارجی)
            </p>
            <p>پرداخت ضمانت نقدی که بسته به مدل خودرو متفاوت است.</p>
          </div>
        </div>

        <div className="bg-[#EDEDED] rounded-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8 lg:mb-10 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <p className="text-[#353535] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] border-b-2 border-gray-300 pb-2 mb-4">
            مدارک لازم برای اجاره خودرو افراد خارجی{" "}
          </p>
          <div className="text-[#353535] text-sm sm:text-base md:text-[14px] lg:text-base leading-relaxed text-justify">
            <p>
              {" "}
              کپی از گواهینامه رانندگی کشور محل سکونت و یا گواهینامه بین‌المللی
              فرد
            </p>
            <p>
              {" "}
              کپی از پاسپورت برای خودروهای اقتصادی و اصل پاسپورت برای خودروهای
              لوکس
            </p>
            <p>ارائه بلیط برای تحویل خودرو در فرودگاه امام </p>
            <p>پرداخت ضمانت نقدی که بسته به مدل خودرو متفاوت است.</p>
          </div>
        </div>

        <div className="bg-[#EDEDED] rounded-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8 lg:mb-10 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <p className="text-[#353535] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] border-b-2 border-gray-300 pb-2 mb-4">
            مدارک اجاره خودرو برای شرکت‌ها
          </p>
          <div className="text-[#353535] text-sm sm:text-base md:text-[14px] lg:text-base leading-relaxed text-justify">
            <p> مدرک شناسایی مدیر شرکت</p>
            <p>ارائه اساسنامه شرکت</p>
            <p> دریافت چک شرکت </p>
            <p>پرداخت ضمانت نقدی که بسته به مدل خودرو متفاوت است.</p>
          </div>
        </div>

        <div className="bg-[#EDEDED] rounded-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8 lg:mb-10 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <p className="text-[#353535] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] border-b-2 border-gray-300 pb-2 mb-4">
            انواع بیمه برای انواع خودرو{" "}
          </p>
          <div className="text-[#353535] text-sm sm:text-base md:text-[14px] lg:text-base leading-relaxed text-justify">
            شرکت اتورنت برای منطبق شدن با نیازهای مختلف مشتریان دو نوع بیمه
            پایه و بیمه کامل را برای اجاره خودرو ارائه می‌دهد. هر کدام از این
            بیمه‌ها باتوجه‌به بوجه و نیاز مشتری، هزینه خسارات را پوشش
            می‌دهند. بیمه پایه اجاره خودرو در این نوع بیمه که بصورت پیش فرض بر
            روی تمامی خودروهای اجاره شده دراتورنت وجود دارد، در این نوع بیمه
            مسئولیت تمامی خسارات و زیان‌ها بر عهده اجاره کننده است.
          </div>
        </div>

     
        <div className="flex flex-col md:flex-row gap-10">
          <div className="bg-[#EDEDED] rounded-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8 lg:mb-10 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex-1">
            <p className="text-[#353535] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] border-b-2 border-gray-300 pb-2 mb-4">
              بیمه پایه
            </p>
            <div className="text-[#353535] text-sm sm:text-base md:text-[14px] lg:text-base leading-relaxed text-justify">
              <p>امداد جاده‌ای بصورت گسترده (ERA)</p>
              <p> ایمنی خودرو (SSP)</p>
              <p>پوشش کامل در برابر سرقت</p>
              <p>
                بیمه شخص ثالث (ALI) مبلغ بیمه پایه بصورت رایگان و روزانه است.
              </p>
            </div>
          </div>

          <div className="bg-[#EDEDED] rounded-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8 lg:mb-10 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex-1">
            <p className="text-[#353535] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] border-b-2 border-gray-300 pb-2 mb-4">
              بیمه کامل{" "}
            </p>
            <div className="text-[#353535] text-sm sm:text-base md:text-[14px] lg:text-base leading-relaxed text-justify">
              <p>امداد جاده‌ای گسترده (ERA)</p>
              <p>بیمه شخص ثالث (ALI)</p>
              <p>تعهد ایمنی خودرو (SSP)</p>
              <p>پوشش کامل ناشی از سرقت</p>
              <p>پرداخت خسارات جزئی (شیشه، لاستیک، بدنه)</p>
              <p>بیمه بدنه با حداقل مسئولیت (LDW)</p>
              <p>
                حداقل معافیت جهت افت قیمت مبلغ بیمه کامل بصورت روزانه حدود 35%
                کرایه خودرو است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolsPage;