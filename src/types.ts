import type { ReactNode } from "react";

export interface SliderBreakpoint {
  minWidth: number;
  slidesPerView?: number;
  gap?: number;
  showArrows?: boolean;
  showPagination?: boolean;
}

export interface SliderOptions {
  slidesPerView?: number;
  gap?: number;
  loop?: boolean;
  speed?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  keyboard?: boolean;
  draggable?: boolean;
  showArrows?: boolean;
  showPagination?: boolean;
  breakpoints?: SliderBreakpoint[];
}

export interface SliderApi {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  startAutoplay: () => void;
  stopAutoplay: () => void;
  getCurrentIndex: () => number;
}

export interface SliderProps<T>
  extends SliderOptions {
  items: T[];

  renderSlide: (props: {
    slide: T;
    index: number;
    isActive: boolean;
  }) => ReactNode;

  apiRef?: React.MutableRefObject<
    SliderApi | null
  >;
}