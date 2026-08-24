interface PaginationProps {
  count: number;
  currentIndex: number;
  type: "dots" | "numbers";
  onChange: (index: number) => void;
}

export function Pagination({
  count,
  currentIndex,
  type,
  onChange
}: PaginationProps) {
  return (
    <div
      className="orbit-slider__pagination"
      aria-label="Slider pagination"
    >
      {Array.from({ length: count }).map(
        (_, index) => (
          <button
            key={index}
            type="button"
            className={
              index === currentIndex
                ? "active"
                : ""
            }
            onClick={() => onChange(index)}
            aria-label={`Go to slide ${
              index + 1
            }`}
            aria-current={
              index === currentIndex
                ? "true"
                : undefined
            }
          >
            {type === "numbers"
              ? index + 1
              : ""}
          </button>
        )
      )}
    </div>
  );
}