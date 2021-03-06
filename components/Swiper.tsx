import { Swiper, SwiperProps } from "swiper/react";

interface SwiperRef {
  ref: any;
}

const CustomSwiper = (props: SwiperProps & SwiperRef) => {
  console.log(props.ref);
  return <Swiper {...props}>{props.children}</Swiper>;
};

export default CustomSwiper;
