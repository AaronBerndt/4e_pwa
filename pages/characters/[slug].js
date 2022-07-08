import Head from "next/head";
import Image from "next/image";
import { PowerCard } from "../components/PowerCard";
import styles from "../styles/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { powers } from "../components/powerJson";

export default function CharacterPage() {
  const powerArray = Object.keys(powers);
  return (
    <Swiper
      spaceBetween={50}
      ver
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {powerArray.map((power) => (
        <SwiperSlide>
          <PowerCard id={power} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
