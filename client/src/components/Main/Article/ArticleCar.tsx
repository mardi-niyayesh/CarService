import ComponentArticleCar from "./ComponentArticleCar";

const ArticleCar = () => {
  return (
    <>
      <div className="mt-8 mb-8">
        <div className="text-[1.5rem] font-bold text-center ">مقالات ما</div>
        <div className="text-center">
          <span className="text-[1.5rem] font-bold ">مجله </span>
          <span className="text-[1.5rem] font-bold text-[#D79C10]">خودرو </span>
          <p className="text-blue-700 cursor-pointer">مشاهده همه</p>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <ComponentArticleCar />
        <ComponentArticleCar />
        <ComponentArticleCar />
      </div>
    </>
  );
};

export default ArticleCar;
