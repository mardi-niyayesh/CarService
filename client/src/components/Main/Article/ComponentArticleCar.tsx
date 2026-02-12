import imgcar from "../../../../assets/pic.png";

const ComponentArticleCar = () => {
  return (
    <>
      <div className="w-full sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[400px] bg-white border border-[#D7D7D7] p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-auto">
        
        {/* تصویر */}
        <img 
          src={imgcar} 
          alt="اجاره خودرو" 
          className="w-full h-auto rounded-lg mb-4"
        />
        
        {/* عنوان */}
        <p className="text-[#414141] font-medium text-base md:text-lg mb-2 line-clamp-2">
          روش‌های مختلف برای اجاره خودرو
        </p>
        
        {/* توضیحات */}
        <p className="text-[#757575] text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
          امروزه با تغییراتی که در سبک زندگی مردم و شرایط اقتصادی جوامع به
          وجود آمده است، نیازهای افراد و نحوه دسترسی به آنها نیز دچار تحولاتی
          شده است.
        </p>
        
      </div>
    </>
  );
};

export default ComponentArticleCar;