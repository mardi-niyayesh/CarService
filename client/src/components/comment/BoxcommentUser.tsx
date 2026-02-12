import { useState } from "react";

type BoxcommentUserType = {
  img: string;
  name: string;
  id?: number;
  text?: string;
};

const BoxcommentUser = (props: BoxcommentUserType) => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div
      className={`
        bg-white border hover:bg-[#FDB713] border-[#D7D7D7] rounded-2xl shadow-lg 
        mx-auto p-4 transition-all duration-300
        w-[90%] max-w-[20rem]
        sm:w-[22rem]
        md:w-[24rem]
        lg:w-[26rem]
        ${showFullText ? "h-auto" : "h-[5.5rem] sm:h-[6rem] md:h-[6.5rem] lg:h-[7rem]"}
      `}
    >
      <div className="flex items-center">
        <img
          src={props.img}
          alt="imgprofile"
          className="w-14 h-14 object-cover rounded-full ml-3 flex-shrink-0"
        />
        <p
          className="text-base font-medium truncate flex-1 text-right
                    sm:text-lg
                    md:text-xl"
        >
          {props.name}
        </p>

        {props.text && (
          <p
            onClick={() => setShowFullText(!showFullText)}
            className="cursor-pointer text-sm text-black px-3 py-1"
          >
            {showFullText ? "بستن نظر" : "خواندن نظر"}
          </p>
        )}
      </div>

      {showFullText && props.text && (
        <div className="mt-4 text-right border-t pt-4">
          <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
            {props.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default BoxcommentUser;
