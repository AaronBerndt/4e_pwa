import Head from "next/head";
import Image from "next/image";
import { PowerCard } from "../components/PowerCard";
import styles from "../styles/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const powers = ["power7431", "power7432"];
  return (
    <Swiper
      spaceBetween={50}
      ver
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {powers.map((power) => (
        <SwiperSlide>
          <PowerCard src={power} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
