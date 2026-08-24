import type { SliderSlide } from "./Slider.types";

interface SlideProps {
  slide: SliderSlide;
  index: number;
  renderSlide?: (
    slide: SliderSlide,
    index: number
  ) => React.ReactNode;
}

export function Slide({
  slide,
  index,
  renderSlide
}: SlideProps) {
  if (renderSlide) {
    return (
      <div className="orbit-slider__slide">
        {renderSlide(slide, index)}
      </div>
    );
  }

  return (
    <div className="orbit-slider__slide">
      {slide.image && (
        <img
          src={slide.image}
          alt={slide.title || `Slide ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
        />
      )}

      {slide.title && (
        <h2>{slide.title}</h2>
      )}

      {slide.subtitle && (
        <h3>{slide.subtitle}</h3>
      )}

      {slide.description && (
        <p>{slide.description}</p>
      )}

      {slide.buttonText &&
        slide.buttonLink && (
          <a
            href={slide.buttonLink}
            className="orbit-slider__button"
          >
            {slide.buttonText}
          </a>
        )}
    </div>
  );
}