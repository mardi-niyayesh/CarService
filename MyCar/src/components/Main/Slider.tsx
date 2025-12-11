//swiper
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";

const images = [
  "/assets/carr.png",
  "/assets/Frame.png",
  "/assets/Framee.png",
  "/assets/Group.png",
  "/assets/Frameee.png",
  "/assets/carr.png",
  "/assets/Frame.png",
  "/assets/Framee.png",
];

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={24}
      slidesPerView={5}
      loop
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="px-4 py-6 mt-[150px]  container w-max-[1200px] mx-auto"
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="overflow-hidden shadow-xl flex items-center justify-center">
            <img
              src={src}
              alt=""
              className="w-full h-auto object-cover  duration-300 hover:scale-105"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
