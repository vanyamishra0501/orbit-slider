import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import type React from "react";

import type {
  SliderProps,
  SliderRef,
} from "./Slider.types";

import { useSwipe } from "../../hooks/useSwipe";

import "./Slider.css";

export const Slider = forwardRef<SliderRef, SliderProps>(
  (
    {
      slides,
      loop = false,
      autoplay = {},
      navigation = {},
      pagination = {},
      transitionDuration = 600,
      transitionEasing = "cubic-bezier(.2,.8,.2,1)",
      height = "500px",
      width = "900px",

      effect = "slide",
      effectOptions = {},

      className = "",
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

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

    /*
     * Orbit settings
     */
    const {
      radius = 280,
      depth = 180,
      perspective = 1200,
      rotate = 30,
      scale = 0.72,
    } = effectOptions;

    /*
     * Next slide
     */
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

    /*
     * Previous slide
     */
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

    /*
     * Go to specific slide
     */
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

        if (pauseOnInteraction) {
          setIsPaused(true);
        }
      },
      [
        hasSlides,
        slides.length,
        pauseOnInteraction,
      ]
    );

    /*
     * Swipe
     */
    const swipeHandlers = useSwipe({
      onSwipeLeft: () => {
        nextSlide();

        if (pauseOnInteraction) {
          setIsPaused(true);
        }
      },

      onSwipeRight: () => {
        previousSlide();

        if (pauseOnInteraction) {
          setIsPaused(true);
        }
      },
    });

    /*
     * Public API
     */
    useImperativeHandle(
      ref,
      () => ({
        next: nextSlide,
        prev: previousSlide,
        goTo: goToSlide,
      }),
      [
        nextSlide,
        previousSlide,
        goToSlide,
      ]
    );
    /*
 * Keyboard controls
 */
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      previousSlide();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [nextSlide, previousSlide]);

    /*
     * Autoplay
     */
    useEffect(() => {
      if (
        !autoplayEnabled ||
        isPaused ||
        slides.length <= 1
      ) {
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
      isPaused,
      nextSlide,
      slides.length,
    ]);

    /*
     * Keep index valid
     */
    useEffect(() => {
      if (
        currentIndex >= slides.length &&
        slides.length > 0
      ) {
        setCurrentIndex(slides.length - 1);
      }
    }, [
      currentIndex,
      slides.length,
    ]);

    /*
     * No slides
     */
    if (!hasSlides) {
      return (
        <div className="slider slider--empty">
          <p>No slides available.</p>
        </div>
      );
    }

    /*
     * Calculate position relative
     * to active slide.
     */
    const getSlideOffset = (index: number) => {
      let offset = index - currentIndex;

      if (loop && slides.length > 2) {
        const total = slides.length;

        if (offset > total / 2) {
          offset -= total;
        }

        if (offset < -total / 2) {
          offset += total;
        }
      }

      return offset;
    };

    /*
     * Effect styles
     */
    const getEffectStyle = (
      offset: number
    ): React.CSSProperties => {
      /*
       * Normal slide
       */
      if (effect === "slide") {
        return {
          transform: `translateX(${offset * 100}%)`,
          transition: `
            transform ${transitionDuration}ms ${transitionEasing}
          `,
        };
      }

      /*
       * Fade
       */
      if (effect === "fade") {
        return {
          transform: "translateX(-50%)",
          opacity: offset === 0 ? 1 : 0,
          pointerEvents:
            offset === 0 ? "auto" : "none",
          transition: `
            opacity ${transitionDuration}ms ${transitionEasing}
          `,
        };
      }

      /*
       * Zoom
       */
      if (effect === "zoom") {
        return {
          transform:
            offset === 0
              ? "translateX(-50%) scale(1)"
              : "translateX(-50%) scale(0.85)",

          opacity: offset === 0 ? 1 : 0,

          pointerEvents:
            offset === 0 ? "auto" : "none",

          transition: `
            transform ${transitionDuration}ms ${transitionEasing},
            opacity ${transitionDuration}ms ${transitionEasing}
          `,
        };
      }

      /*
       * Coverflow
       */
      if (effect === "coverflow") {
        const rotation = offset * rotate;
        const z =
          -Math.abs(offset) * depth;

        const currentScale =
          offset === 0 ? 1 : scale;

        return {
          position: "absolute",

          left: "50%",
          top: "50%",

          width: "68%",
          height: "88%",

          transform: `
            translate(-50%, -50%)
            translateX(${offset * 48}%)
            translateZ(${z}px)
            rotateY(${rotation}deg)
            scale(${currentScale})
          `,

          opacity:
            offset === 0
              ? 1
              : Math.max(
                  0.35,
                  1 -
                    Math.abs(offset) * 0.2
                ),

          zIndex:
            100 - Math.abs(offset),

          pointerEvents:
            offset === 0
              ? "auto"
              : "none",

          transition: `
            transform ${transitionDuration}ms ${transitionEasing},
            opacity ${transitionDuration}ms ${transitionEasing}
          `,

          transformStyle:
            "preserve-3d",
        };
      }

      /*
       * Cube
       */
      if (effect === "cube") {
        const rotation = offset * -90;

        return {
          position: "absolute",

          left: "50%",
          top: "50%",

          width: "100%",
          height: "100%",

          transform: `
            translate(-50%, -50%)
            rotateY(${rotation}deg)
            translateZ(${radius / 2}px)
          `,

          opacity:
            Math.abs(offset) <= 1 ? 1 : 0,

          zIndex:
            100 - Math.abs(offset),

          transition: `
            transform ${transitionDuration}ms ${transitionEasing},
            opacity ${transitionDuration}ms ${transitionEasing}
          `,

          transformStyle:
            "preserve-3d",
        };
      }

      /*
       * =========================
       * ORBIT EFFECT
       * =========================
       */
      if (effect === "orbit") {
        const angle = offset * 38;

        const radians =
          (angle * Math.PI) / 180;

        /*
         * Horizontal orbit position
         */
        const x =
          Math.sin(radians) * radius;

        /*
         * Depth position
         */
        const z =
          Math.cos(radians) * depth -
          depth;

        /*
         * Center = 1
         * Side slides become smaller
         */
        const normalizedDepth =
          (z + depth) /
          (depth * 2);

        const orbitScale =
          offset === 0
            ? 1
            : 0.62 +
              normalizedDepth * 0.18;

        /*
         * Side slide opacity
         */
        const opacity =
          offset === 0
            ? 1
            : Math.max(
                0.35,
                0.7 -
                  Math.abs(offset) * 0.08
              );

        /*
         * Rotate side slides toward center
         */
        const rotation =
          -Math.sin(radians) * rotate;

        return {
          position: "absolute",

          left: "50%",
          top: "50%",

          /*
           * IMPORTANT:
           * Slides are smaller than
           * the complete slider.
           */
          width: "68%",
          height: "88%",

          transform: `
            translate(-50%, -50%)
            translate3d(${x}px, 0, ${z}px)
            rotateY(${rotation}deg)
            scale(${orbitScale})
          `,

          opacity,

          zIndex:
            offset === 0
              ? 1000
              : Math.max(
                  1,
                  500 -
                    Math.abs(offset) * 50
                ),

          pointerEvents:
            offset === 0
              ? "auto"
              : "none",

          transition: `
            transform ${transitionDuration}ms ${transitionEasing},
            opacity ${transitionDuration}ms ${transitionEasing}
          `,

          transformStyle:
            "preserve-3d",
        };
      }

      return {};
    };

    return (
      <section
        className={`slider ${
          effect === "orbit"
            ? "slider--orbit"
            : ""
        } ${className}`}
        style={{
          width,
          perspective:
            effect === "orbit"
              ? `${perspective}px`
              : undefined,
        }}
        aria-roledescription="carousel"
        aria-label="Image slider"

        onMouseEnter={() => {
          if (pauseOnHover) {
            setIsPaused(true);
          }
        }}

        onMouseLeave={() => {
          if (pauseOnHover) {
            setIsPaused(false);
          }
        }}
      >
        <div
          className="slider__main"
          style={{
            height,
          }}
          {...swipeHandlers}
        >
          <div className="slider__stage">
            {slides.map(
              (slide, index) => {
                const offset =
                  getSlideOffset(index);

                return (
                  <div
                    key={
                      slide.id ?? index
                    }
                    className={`slider__slide ${
                      offset === 0
                        ? "is-active"
                        : ""
                    }`}
                    style={getEffectStyle(
                      offset
                    )}
                    aria-hidden={
                      offset !== 0
                    }
                  >
                    {slide.image && (
                      <img
                        className="slider__image"
                        src={slide.image}
                        alt={
                          slide.title ||
                          "Slider image"
                        }
                        draggable={false}
                      />
                    )}

                    {(slide.title ||
                      slide.subtitle ||
                      slide.description) && (
                      <div className="slider__caption">
                        {slide.title && (
                          <h2>
                            {slide.title}
                          </h2>
                        )}

                        {slide.subtitle && (
                          <h3>
                            {slide.subtitle}
                          </h3>
                        )}

                        {slide.description && (
                          <p>
                            {slide.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}

            {navigationEnabled && (
              <>
                <button
                  type="button"
                  className="slider__button slider__button--prev"
                  onClick={() => {
                    previousSlide();

                    if (
                      pauseOnInteraction
                    ) {
                      setIsPaused(true);
                    }
                  }}
                  aria-label={prevLabel}
                >
                  ❮
                </button>

                <button
                  type="button"
                  className="slider__button slider__button--next"
                  onClick={() => {
                    nextSlide();

                    if (
                      pauseOnInteraction
                    ) {
                      setIsPaused(true);
                    }
                  }}
                  aria-label={nextLabel}
                >
                  ❯
                </button>
              </>
            )}
          </div>
        </div>

        {paginationEnabled && (
          <div
            className={`slider__pagination slider__pagination--${paginationType}`}
          >
            {slides.map(
              (slide, index) => (
                <button
                  key={
                    slide.id ?? index
                  }
                  type="button"
                  className={
                    index === currentIndex
                      ? "active"
                      : ""
                  }
                  disabled={!clickable}
                  onClick={() =>
                    goToSlide(index)
                  }
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                  aria-current={
                    index === currentIndex
                      ? "true"
                      : undefined
                  }
                >
                  {paginationType ===
                  "numbers"
                    ? index + 1
                    : ""}
                </button>
              )
            )}
          </div>
        )}

        {autoplayEnabled && (
  <div className="slider__controls">
    <button
      type="button"
      className="slider__play-button"
      onClick={() => {
        setIsPaused((paused) => !paused);
      }}
      aria-label={
        isPaused
          ? "Play autoplay"
          : "Pause autoplay"
      }
    >
      {isPaused ? "▶ Play" : "⏸ Pause"}
    </button>

    <span className="slider__status">
      {isPaused
        ? "Autoplay paused"
        : "Autoplay playing"}
    </span>
  </div>
)}
      
      </section>
    );
  }
);

Slider.displayName = "Slider";
