import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import type {
  SliderProps,
  SliderRef,
} from "./Slider.types";

import "./Slider.css";

export const Slider = forwardRef<SliderRef, SliderProps>(
  (
    {
      slides,
      loop = false,
      autoplay = {},
      navigation = {},
      pagination = {},
      transitionDuration = 400,
      transitionEasing = "ease",
      height = "300px",
      width = "500px",
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const {
      enabled: autoplayEnabled = false,
      delay = 3000,
      pauseOnHover = true,
      pauseOnInteraction = true,
    } = autoplay;

    const {
      enabled: navigationEnabled = true,
      nextLabel = "Next slide",
      prevLabel = "Previous slide",
    } = navigation;

    const {
      enabled: paginationEnabled = true,
      clickable = true,
      type: paginationType = "dots",
    } = pagination;

    const hasSlides = slides.length > 0;

    const nextSlide = useCallback(() => {
      setCurrentIndex((current) => {
        if (!hasSlides) {
          return 0;
        }

        if (current >= slides.length - 1) {
          return loop ? 0 : current;
        }

        return current + 1;
      });
    }, [hasSlides, loop, slides.length]);

    const previousSlide = useCallback(() => {
      setCurrentIndex((current) => {
        if (!hasSlides) {
          return 0;
        }

        if (current <= 0) {
          return loop ? slides.length - 1 : current;
        }

        return current - 1;
      });
    }, [hasSlides, loop, slides.length]);

    const goToSlide = useCallback(
      (index: number) => {
        if (!hasSlides) {
          return;
        }

        const safeIndex = Math.max(
          0,
          Math.min(index, slides.length - 1)
        );

        setCurrentIndex(safeIndex);
      },
      [hasSlides, slides.length]
    );

    useImperativeHandle(
      ref,
      () => ({
        next: nextSlide,
        prev: previousSlide,
        goTo: goToSlide,
      }),
      [nextSlide, previousSlide, goToSlide]
    );

    useEffect(() => {
      if (!autoplayEnabled || slides.length <= 1) {
        return;
      }

      const timer = window.setInterval(() => {
        nextSlide();
      }, Math.max(delay, 500));

      return () => {
        window.clearInterval(timer);
      };
    }, [
      autoplayEnabled,
      delay,
      nextSlide,
      slides.length,
    ]);

    useEffect(() => {
      if (currentIndex >= slides.length && slides.length > 0) {
        setCurrentIndex(slides.length - 1);
      }
    }, [currentIndex, slides.length]);

    if (!hasSlides) {
      return (
        <div className="slider slider--empty">
          <p>No slides available.</p>
        </div>
      );
    }

    const currentSlide = slides[currentIndex];

    return (
      <section
        className="slider"
        style={{
          width,
        }}
        aria-roledescription="carousel"
        aria-label="Image slider"
        onMouseEnter={
          pauseOnHover ? undefined : undefined
        }
      >
        <div
          className="slider__main"
          style={{
            height,
          }}
        >
          <img
            key={currentSlide.id}
            className="slider__image"
            src={currentSlide.image}
            alt={
              currentSlide.title ??
              `Slide ${currentIndex + 1}`
            }
            style={{
              transitionDuration: `${transitionDuration}ms`,
              transitionTimingFunction: transitionEasing,
            }}
          />

          {currentSlide.title && (
            <div className="slider__overlay">
              <h2>{currentSlide.title}</h2>

              {currentSlide.description && (
                <p>{currentSlide.description}</p>
              )}

              {currentSlide.buttonText && (
                <button
                  type="button"
                  className="slider__button"
                  onClick={() => {
                    if (currentSlide.buttonLink) {
                      window.open(
                        currentSlide.buttonLink,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                >
                  {currentSlide.buttonText}
                </button>
              )}
            </div>
          )}

          {navigationEnabled && (
            <>
              <button
                type="button"
                className="slider__arrow slider__arrow--left"
                onClick={previousSlide}
                disabled={
                  !loop && currentIndex === 0
                }
                aria-label={prevLabel}
              >
                ❮
              </button>

              <button
                type="button"
                className="slider__arrow slider__arrow--right"
                onClick={nextSlide}
                disabled={
                  !loop &&
                  currentIndex === slides.length - 1
                }
                aria-label={nextLabel}
              >
                ❯
              </button>
            </>
          )}
        </div>

        {paginationEnabled && (
          <div
            className="slider__pagination"
            aria-label="Slide navigation"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`slider__pagination-button ${
                  index === currentIndex
                    ? "slider__pagination-button--active"
                    : ""
                }`}
                onClick={() => {
                  if (clickable) {
                    goToSlide(index);
                  }
                }}
                disabled={!clickable}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  index === currentIndex
                    ? "true"
                    : undefined
                }
              >
                {paginationType === "numbers"
                  ? index + 1
                  : ""}
              </button>
            ))}
          </div>
        )}

        <div className="slider__thumbnails">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
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
                alt=""
              />
            </button>
          ))}
        </div>

        {autoplayEnabled && pauseOnInteraction && (
          <p className="slider__status">
            Auto-playing
          </p>
        )}
      </section>
    );
  }
);

Slider.displayName = "Slider";