import { useRef } from "react";

interface SwipeOptions {
  onNext: () => void;
  onPrevious: () => void;
  threshold?: number;
}

export function useSwipe({
  onNext,
  onPrevious,
  threshold = 50
}: SwipeOptions) {
  const startX = useRef<number | null>(
    null
  );

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    startX.current =
      event.touches[0].clientX;
  };

  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (startX.current === null) {
      return;
    }

    const endX =
      event.changedTouches[0].clientX;

    const difference =
      startX.current - endX;

    if (Math.abs(difference) >= threshold) {
      if (difference > 0) {
        onNext();
      } else {
        onPrevious();
      }
    }

    startX.current = null;
  };

  return {
    handleTouchStart,
    handleTouchEnd
  };
}