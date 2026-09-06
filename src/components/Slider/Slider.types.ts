export interface SliderSlide {
  id: string | number;
  image?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface AutoplayOptions {
  enabled?: boolean;
  delay?: number;
  pauseOnHover?: boolean;
  pauseOnInteraction?: boolean;
}

export interface NavigationOptions {
  enabled?: boolean;
  nextLabel?: string;
  prevLabel?: string;
}

export interface PaginationOptions {
  enabled?: boolean;
  clickable?: boolean;
  type?: "dots" | "numbers";
}

export type ResponsiveValue<T> = {
  mobile?: T;
  tablet?: T;
  desktop?: T;
};

export interface SliderProps {
  slides: SliderSlide[];

  slidesPerView?: number | ResponsiveValue<number>;
  gap?: number | ResponsiveValue<number>;

  loop?: boolean;

  autoplay?: AutoplayOptions;

  navigation?: NavigationOptions;

  pagination?: PaginationOptions;

  width?: string;
  height?: string;

  transitionDuration?: number;
  transitionEasing?: string;
}

export interface SliderRef {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}