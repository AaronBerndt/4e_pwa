import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Cards } from "../types";
import { DisplayCard } from "./DisplayCard";
import { chunk } from "lodash";

type Props = {
  cards: Cards;
};
export function PowerCards({ cards }: Props) {
  const atWills = cards.filter((card) => card.type.match(/At-Will/));
  const encounters = cards.filter((card) => card.type.match(/Enc/));
  const dailies = cards.filter((card) => card.type.match(/Daily/));
  console.log(atWills, encounters, dailies);
  return (
    <Swiper spaceBetween={50} slidesPerView={1}>
      {[atWills, encounters, dailies].map((group, i) => (
        <SwiperSlide key={i}>
          {group.map((card) => (
            <DisplayCard htmlToRender={card.html} key={card.name} />
          ))}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
