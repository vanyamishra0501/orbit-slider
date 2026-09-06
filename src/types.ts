import type {
  CSSProperties,
  ReactNode,
 MutableRefObject,
} from "react";

export type SliderOrientation =
  | "horizontal"
  | "vertical";

export type SliderEasing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";

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

  orientation?: SliderOrientation;

  speed?: number;

  easing?: SliderEasing;

  animate?: boolean;

  autoplay?: boolean;

  autoplayInterval?: number;

  pauseOnHover?: boolean;

  pauseOnInteraction?: boolean;

  resumeAfterInteraction?: boolean;

  keyboard?: boolean;

  draggable?: boolean;

  swipeThreshold?: number;

  showArrows?: boolean;

  showPagination?: boolean;

  showNumbers?: boolean;

  breakpoints?: SliderBreakpoint[];

  className?: string;

  style?: CSSProperties;
}

export interface SliderEvents {
  onSlideChange?: (
    index: number
  ) => void;

  onTransitionStart?: (
    index: number
  ) => void;

  onTransitionEnd?: (
    index: number
  ) => void;

  onNext?: (
    index: number
  ) => void;

  onPrevious?: (
    index: number
  ) => void;

  onAutoplayStart?: () => void;

  onAutoplayStop?: () => void;

  onReachStart?: () => void;

  onReachEnd?: () => void;
}

export interface SliderApi {
  next: () => void;

  prev: () => void;

  goTo: (
    index: number
  ) => void;

  startAutoplay: () => void;

  stopAutoplay: () => void;

  getCurrentIndex: () => number;
}

export interface SlideRenderProps<T> {
  slide: T;

  index: number;

  isActive: boolean;
}

export interface SliderProps<T>
  extends SliderOptions,
    SliderEvents {
  items: T[];

  renderSlide: (
    props: SlideRenderProps<T>
  ) => ReactNode;

  apiRef?: MutableRefObject<
    SliderApi | null
  >;
}