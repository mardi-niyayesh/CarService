import BoxcommentUser from "./BoxcommentUser";

const feacherComment = [
  {
    img: "../../../assets/img.png",
    name: "سارا حسینی",
  },
  {
    img: "../../../assets/img.png",
    name: "زینب امینی",
  },
  {
    img: "../../../assets/img.png",
    name: "فرزانه حیدری",
  },
  {
    img: "../../../assets/img.png",
    name: "فاطمه ابراهیر",
  },
];

const FeacherBoxcommentUser = () => {
  return (
    <div className="px-4">
      <div
        className="grid grid-cols-1 gap-4
                      sm:grid-cols-2 sm:gap-4
                      md:grid-cols-3 md:gap-6
                      lg:grid-cols-4 lg:gap-8
                      xl:grid-cols-5 xl:gap-8"
      >
        {feacherComment.map((item) => {
          return <BoxcommentUser img={item.img} name={item.name} />;
        })}
      </div>
    </div>
  );
};

export default FeacherBoxcommentUser;
