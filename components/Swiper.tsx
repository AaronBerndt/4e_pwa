import { Swiper, SwiperProps } from "swiper/react";

interface SwiperRef {
  ref: any;
}

const CustomSwiper = <C extends React.ElementType>(
  props: SwiperProps & SwiperRef
) => {
  return <Swiper {...props}>{props.children}</Swiper>;
};

export default CustomSwiper;
