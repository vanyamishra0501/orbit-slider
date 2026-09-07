import type React from "react";

import type { SliderEffect } from "../../types/effect.types";
import type { EffectOptions } from "../../types/effect-options.types";

/**
 * Individual slide data.
 */
export interface SliderSlide {
  id?: string | number;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
}

/**
 * Autoplay configuration.
 */
export interface AutoplayOptions {
  enabled?: boolean;
  delay?: number;
  pauseOnHover?: boolean;
  pauseOnInteraction?: boolean;
}

/**
 * Navigation configuration.
 */
export interface NavigationOptions {
  enabled?: boolean;
  nextLabel?: string;
  prevLabel?: string;
}

/**
 * Pagination configuration.
 */
export interface PaginationOptions {
  enabled?: boolean;
  clickable?: boolean;
  type?: "dots" | "numbers";
}

/**
 * Responsive values.
 */
export type ResponsiveValue<T> =
  | T
  | {
      mobile?: T;
      tablet?: T;
      desktop?: T;
    };

/**
 * Methods exposed through Slider ref.
 */
export interface SliderRef {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

/**
 * Main Slider properties.
 */
export interface SliderProps {
  /**
   * Slides displayed by the slider.
   */
  slides: SliderSlide[];

  /**
   * Number of slides visible at once.
   */
  slidesPerView?: ResponsiveValue<number>;

  /**
   * Gap between slides in pixels.
   */
  gap?: ResponsiveValue<number>;

  /**
   * Enable infinite looping.
   */
  loop?: boolean;

  /**
   * Slider orientation.
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Autoplay configuration.
   */
  autoplay?: AutoplayOptions;

  /**
   * Navigation configuration.
   */
  navigation?: NavigationOptions;

  /**
   * Pagination configuration.
   */
  pagination?: PaginationOptions;

  /**
   * Animation duration in milliseconds.
   */
  transitionDuration?: number;

  /**
   * CSS transition easing.
   */
  transitionEasing?: string;

  /**
   * Enable/disable slider animation.
   */
  animation?: boolean;

  /**
   * Visual effect used by the slider.
   *
   * Available effects:
   * - slide
   * - fade
   * - zoom
   * - coverflow
   * - cube
   * - orbit
   */
  effect?: SliderEffect;

  /**
   * Configuration for the selected effect.
   */
  effectOptions?: EffectOptions;

  /**
   * Slider height.
   */
  height?: string;

  /**
   * Slider width.
   */
  width?: string;

  /**
   * Custom CSS class.
   */
  className?: string;

  /**
   * Custom slide renderer.
   */
  renderSlide?: (
    slide: SliderSlide,
    index: number
  ) => React.ReactNode;

  /**
   * Called when the active slide changes.
   */
  onSlideChange?: (index: number) => void;

  /**
   * Called when Next is triggered.
   */
  onNext?: () => void;

  /**
   * Called when Previous is triggered.
   */
  onPrevious?: () => void;

  /**
   * Called when a transition starts.
   */
  onTransitionStart?: () => void;

  /**
   * Called when a transition ends.
   */
  onTransitionEnd?: () => void;

  /**
   * Called when autoplay starts.
   */
  onAutoplayStart?: () => void;

  /**
   * Called when autoplay stops.
   */
  onAutoplayStop?: () => void;
}