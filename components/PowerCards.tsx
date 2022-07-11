import { Swiper, SwiperSlide } from "swiper/react";
import { PowerCard } from "../components/PowerCard";

import "swiper/css";
import { Cards } from "../types";

type Props = {
  cards: Cards;
};
export function PowerCards({ cards }: Props) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {cards.map(({ html }, i) => (
        <SwiperSlide key={i}>
          <PowerCard htmlToRender={html} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
