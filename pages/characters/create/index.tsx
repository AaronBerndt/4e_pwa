import usePowers from "../../../hooks/usePowers";
import { Paper, Button, Grid } from "../../../node_modules/@mui/material/index";
import Link from "../../../node_modules/next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CreateCharacterPage() {
  const { data: powers } = usePowers();
  const slides = [""];
  return (
    <Grid>
      <Swiper spaceBetween={50} ver slidesPerView={1}>
        {slides.map((power) => (
          <SwiperSlide></SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
}
