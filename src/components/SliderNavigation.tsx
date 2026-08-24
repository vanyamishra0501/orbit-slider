interface SliderNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
}

export function SliderNavigation({
  onNext,
  onPrev,
  canNext,
  canPrev,
}: SliderNavigationProps) {
  return (
    <div className="slider-navigation">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous slide"
      >
        ←
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
}