import type { ReactNode } from "react";

export interface SliderSlide {
  id: string | number;
  image?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  content?: ReactNode;
}

export interface ResponsiveValue<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
}

export interface AutoplayOptions {
  enabled?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  pauseOnInteraction?: boolean;
}

export interface NavigationOptions {
  enabled?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
}

export interface PaginationOptions {
  enabled?: boolean;
  type?: "dots" | "numbers";
}

export interface SliderRef {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  startAutoplay: () => void;
  stopAutoplay: () => void;
  getCurrentIndex: () => number;
}

export interface SliderProps {
  slides: SliderSlide[];

  slidesPerView?:
    | number
    | ResponsiveValue<number>;

  gap?:
    | number
    | ResponsiveValue<number>;

  loop?: boolean;

  orientation?: "horizontal" | "vertical";

  autoplay?: AutoplayOptions;

  navigation?: NavigationOptions;

  pagination?: PaginationOptions;

  transitionDuration?: number;

  transitionEasing?: string;

  animation?: boolean;

  renderSlide?: (slide: SliderSlide, index: number) => ReactNode;

  onSlideChange?: (index: number) => void;

  onNext?: (index: number) => void;

  onPrevious?: (index: number) => void;

  onTransitionStart?: (index: number) => void;

  onTransitionEnd?: (index: number) => void;

  onAutoplayStart?: () => void;

  onAutoplayStop?: () => void;

  className?: string;
}
