import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Cards } from "../types";
import { DisplayCard } from "./DisplayCard";
import { chunk } from "lodash";

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
      {chunk(cards, 3).map((chunk, i) => (
        <SwiperSlide key={i}>
          {chunk.map(({ html, name }) => (
            <DisplayCard htmlToRender={html} key={name} />
          ))}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
