interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
  showPrevious: boolean;
  showNext: boolean;
}

export function Navigation({
  onPrevious,
  onNext,
  canPrevious,
  canNext,
  showPrevious,
  showNext
}: NavigationProps) {
  return (
    <>
      {showPrevious && (
        <button
          type="button"
          className="orbit-slider__prev"
          onClick={onPrevious}
          disabled={!canPrevious}
          aria-label="Previous slide"
        >
          ←
        </button>
      )}

      {showNext && (
        <button
          type="button"
          className="orbit-slider__next"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next slide"
        >
          →
        </button>
      )}
    </>
  );
}