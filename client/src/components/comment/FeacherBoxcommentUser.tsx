import BoxcommentUser from "./BoxcommentUser";

const feacherComment = [
  {
    img: "../../../assets/imggg.png",
    name: "سارا حسینی",
    id: 1,
    text: "عالی بود! ماشین رو دقیق سر ساعت تحویل دادن و خیلی تمیز بود. فرآیند اجاره هم خیلی راحت و سریع انجام شد. حتماً دوباره از این سایت استفاده می‌کنم.",
  },
  {
    img: "../../../assets/imggg.png",
    name: "زینب امینی",
    id: 2,
    text: "متاسفانه ماشینی که رزرو کرده بودم موقع تحویل نبود و یه ماشین دیگه دادن بهم. کلی معطل شدم و برنامه سفرم به هم ریخت. واقعاً ناراضی‌ام از این برخورد.",
  },
  {
    img: "../../../assets/imggg.png",
    name: "فرزانه حیدری",
    id: 3,
    text: "عالی بود! ماشین رو دقیق سر ساعت تحویل دادن و خیلی تمیز بود. فرآیند اجاره هم خیلی راحت و سریع انجام شد. حتماً دوباره از این سایت استفاده می‌کنم.",
  },
  {
    img: "../../../assets/imggg.png",
    name: "فاطمه ابراهیر",
    id: 4,
    text: "ما به عنوان یه شرکت حمل و نقل، ماهیانه حداقل ۵ دستگاه ون از این سایت اجاره می‌کنیم. تخفیف ویژه‌ای که به شرکت‌ها میدن واقعاً به‌صرفه‌ست. فقط کاش تنوع ماشین‌های باری بیشتر بود.",
  },
];

const FeacherBoxcommentUser = () => {
  return (
    <div className="px-4">
      <div className="container mx-auto flex items-center m-8 justify-center">
        <span className="text-[1.5rem] font-bold ">نظرات </span>
        <span className="text-[1.5rem] font-bold text-[#D79C10]">مشتریان</span>
      </div>

      <div
        className="grid grid-cols-1 gap-2
                      sm:grid-cols-2 sm:gap-2
                      md:grid-cols-3 md:gap-4
                      lg:grid-cols-3 lg:gap-2
                    "
      >
        {feacherComment.map((item) => {
          return (
            <BoxcommentUser
              img={item.img}
              name={item.name}
              key={item.id}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeacherBoxcommentUser;
