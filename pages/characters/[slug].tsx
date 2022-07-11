import styles from "../styles/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import powers from "../api/powers";
import { PowerCard } from "../../components/PowerCard";

export default function CharacterPage() {
  const powerArray = Object.keys(powers);
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {powerArray.map((power, i) => (
        <SwiperSlide key={i}>
          <PowerCard htmlToRender={power} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
