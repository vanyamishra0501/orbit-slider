import type { SliderSlide } from "./Slider.types";

interface SlideProps {
  slide: SliderSlide;
  index: number;
}

export function Slide({ slide, index }: SlideProps) {
  return (
    <div className="orbit-slide">
      {slide.image && (
        <img
          className="orbit-slide-image"
          src={slide.image}
          alt={slide.title || `Slide ${index + 1}`}
        />
      )}

      {slide.title && (
        <h2 className="orbit-slide-title">
          {slide.title}
        </h2>
      )}

      {slide.description && (
        <p className="orbit-slide-description">
          {slide.description}
        </p>
      )}
    </div>
  );
}