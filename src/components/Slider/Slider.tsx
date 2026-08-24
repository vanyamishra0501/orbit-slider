import {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
const [currentIndex, setCurrentIndex] = useState(0);

import type { SliderProps, SliderRef } from "./Slider.types";

import { Slide } from "./Slide";
import { Navigation } from "./Navigation";
import { Pagination } from "./Pagination";

import { useSlider } from "../../hooks/useSlider";
import { useAutoplay } from "../../hooks/useAutoplay";
import { useResponsive } from "../../hooks/useResponsive";

import "./Slider.css";

export const Slider = forwardRef<SliderRef, SliderProps>(
  function Slider(
    {
      slides,
      slidesPerView = 1,
      gap = 20,
      loop = false,
      orientation = "horizontal",
      autoplay = {},
      navigation = {},
      pagination = {},
      transitionDuration = 400,
      transitionEasing = "ease",
      animation = true,
      renderSlide,
      onSlideChange,
      onNext,
      onPrevious,
      onTransitionStart,
      onTransitionEnd,
      onAutoplayStart,
      onAutoplayStop,
      className = "",
    },
    ref
  ) {
    const screenSize = useResponsive();

    const getResponsiveValue = <T,>(
      value: T | { mobile?: T; tablet?: T; desktop?: T }
    ): T => {
      if (typeof value !== "object" || value === null) {
        return value as T;
      }

      return (
        value[screenSize] ??
        value.desktop ??
        value.tablet ??
        value.mobile ??
        (1 as T)
      );
    };

    const visibleSlides = getResponsiveValue(slidesPerView);
    const slideGap = getResponsiveValue(gap);

    const validSlides = useMemo(
      () => (Array.isArray(slides) ? slides.filter(Boolean) : []),
      [slides]
    );

    const { currentIndex, maxIndex, next, prev, goTo } = useSlider({
      totalSlides: validSlides.length,
      slidesPerView: visibleSlides,
      loop,
      onSlideChange,
      onNext,
      onPrevious,
    });

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") next();
        if (event.key === "ArrowLeft") prev();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [next, prev]);

    const {
      start,
      stop,
      handleMouseEnter,
      handleMouseLeave,
      handleInteraction,
    } = useAutoplay({
      enabled: autoplay.enabled ?? false,
      interval: autoplay.interval ?? 3000,
      next,
      pauseOnHover: autoplay.pauseOnHover ?? true,
      pauseOnInteraction: autoplay.pauseOnInteraction ?? false,
      onStart: onAutoplayStart,
      onStop: onAutoplayStop,
    });

    useImperativeHandle(ref, () => ({
      next,
      prev,
      goTo,
      startAutoplay: start,
      stopAutoplay: stop,
      getCurrentIndex: () => currentIndex,
    }));

    // Empty state
    if (validSlides.length === 0) {
      return (
        <div className="orbit-slider__empty">
          <p>No slides available.</p>
        </div>
      );
    }

    const slidePercentage = 100 / visibleSlides;
    const transformOffset =
      currentIndex * (slidePercentage + slideGap / visibleSlides);

    const transform =
      orientation === "horizontal"
        ? `translateX(-${transformOffset}%)`
        : `translateY(-${transformOffset}%)`;

    const canPrevious = loop || currentIndex > 0;
    const canNext = loop || currentIndex < maxIndex;
    const paginationCount = Math.max(1, maxIndex + 1);

    return (
      <section
        className={`orbit-slider ${className}`}
        aria-roledescription="carousel"
        aria-label="Content carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleInteraction}
      >
        <div className="orbit-slider__viewport">
          <div
            className={`orbit-slider__track orbit-slider__track--${orientation}`}
            style={{
              transform,
              gap: `${slideGap}px`,
              transition: animation
                ? `transform ${transitionDuration}ms ${transitionEasing}`
                : "none",
            }}
            onTransitionStart={() => onTransitionStart?.(currentIndex)}
            onTransitionEnd={() => onTransitionEnd?.(currentIndex)}
          >
            {validSlides.map((slide, index) => (
              <div
                key={slide.id}
                className="orbit-slider__slide"
                style={{
                  flex: `0 0 calc((100% - ${
                    (visibleSlides - 1) * slideGap
                  }px) / ${visibleSlides})`,
                }}
              >
                <Slide
                  slide={slide}
                  index={index}
                  renderSlide={renderSlide}
                />
              </div>
            ))}
          </div>
        </div>

        {navigation.enabled !== false && (
          <Navigation
            onPrevious={prev}
            onNext={next}
            canPrevious={canPrevious}
            canNext={canNext}
            showPrevious={navigation.showPrevious !== false}
            showNext={navigation.showNext !== false}
          />
        )}

        {pagination.enabled !== false && (
          <Pagination
            count={paginationCount}
            currentIndex={currentIndex}
            type={pagination.type ?? "dots"}
            onChange={goTo}
          />
        )}
      </section>
    );
  }
);
   