import "../styles/Home.module.css";
import usePowers from "../hooks/usePowers";
import { Swiper, SwiperSlide } from "swiper/react";
import { PowerCard } from "../components/PowerCard";
import { powers } from "../components/powerJson";
import "swiper/css";
import useClasses from "../hooks/useClasses";
import useAncestries from "../hooks/useAncestries";
import useFeats from "../hooks/useFeats";

export default function Home() {
  const { data, isLoading } = useFeats();

  if (isLoading) {
    return <p>...Loading</p>;
  }
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map(({ html }) => (
        <SwiperSlide>
          <PowerCard htmlToRender={html} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
