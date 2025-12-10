//image for slider
import car from "../../../assets/carr.png";
import Frame from "../../../assets/Frame.png";
import Framee from "../../../assets/Framee.png";
import Group from "../../../assets/Group.png";
import Frameee from "../../../assets/Frameee.png";

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
];

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={24}
      slidesPerView={4}
      loop
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="px-4 py-6"
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl flex items-center justify-center">
            <img
              src={src}
              alt=""
              className="w-full h-40 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
