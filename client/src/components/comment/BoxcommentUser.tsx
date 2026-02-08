type BoxcommentUserType = {
  img: string;
  name: string;
};

const BoxcommentUser = (props: BoxcommentUserType) => {
  return (
    <div
      className="bg-white border hover:bg-[#FDB713] border-[#D7D7D7] rounded-2xl shadow-lg flex items-center
                 mx-auto
                 /* نسبت عرض به ارتفاع حدود ۳ به ۱ */
                 w-[90%] max-w-[20rem] h-[5.5rem] p-4
                 sm:w-[22rem] sm:h-[6rem]
                 md:w-[24rem] md:h-[6.5rem]
                 lg:w-[26rem] lg:h-[7rem]"
    >
      <img
        src={props.img}
        alt="imgprofile"
        className="w-14 h-14 object-cover rounded-full ml-3 flex-shrink-0"
      />
      <p className="text-base font-medium truncate flex-1 text-right
                    sm:text-lg
                    md:text-xl">
        {props.name}
      </p>
    </div>
  );
};