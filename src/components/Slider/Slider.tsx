import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import type {
  SliderProps,
  SliderRef,
} from "./Slider.types";

export const Slider = forwardRef<SliderRef, SliderProps>(
  ({ slides, loop = false }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!slides || slides.length === 0) {
      return <div>No slides available</div>;
    }

    const nextSlide = () => {
      setCurrentIndex((current) => {
        if (current === slides.length - 1) {
          return loop ? 0 : current;
        }

        return current + 1;
      });
    };

    const previousSlide = () => {
      setCurrentIndex((current) => {
        if (current === 0) {
          return loop ? slides.length - 1 : current;
        }

        return current - 1;
      });
    };

    const goToSlide = (index: number) => {
      setCurrentIndex(index);
    };

    useImperativeHandle(ref, () => ({
      next: nextSlide,
      prev: previousSlide,
      goTo: goToSlide,
    }));

    return (
      <div className="slider">

        {/* Main Image */}
        <div className="slider__main">
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title || "Slide"}
          />

          <button
            className="slider__arrow slider__arrow--left"
            onClick={previousSlide}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            ❮
          </button>

          <button
            className="slider__arrow slider__arrow--right"
            onClick={nextSlide}
            disabled={
              !loop &&
              currentIndex === slides.length - 1
            }
            aria-label="Next slide"
          >
            ❯
          </button>
        </div>

        {/* Small Images */}
        <div className="slider__thumbnails">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`slider__thumbnail ${
                index === currentIndex
                  ? "slider__thumbnail--active"
                  : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <img
                src={slide.image}
                alt={slide.title || `Thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>

        {/* Title */}
        {slides[currentIndex].title && (
          <h2 className="slider__title">
            {slides[currentIndex].title}
          </h2>
        )}

        {/* Description */}
        {slides[currentIndex].description && (
          <p className="slider__description">
            {slides[currentIndex].description}
          </p>
        )}

      </div>
    );
  }
);

Slider.displayName = "Slider";