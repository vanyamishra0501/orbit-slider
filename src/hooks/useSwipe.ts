import { useRef, type TouchEvent } from "react";

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
}: SwipeHandlers) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const onTouchStart = (event: TouchEvent) => {
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (
      startX.current === null ||
      startY.current === null
    ) {
      return;
    }

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const differenceX = endX - startX.current;
    const differenceY = endY - startY.current;

    const minimumSwipeDistance = 50;

    const isHorizontalSwipe =
      Math.abs(differenceX) > Math.abs(differenceY);

    if (
      isHorizontalSwipe &&
      Math.abs(differenceX) > minimumSwipeDistance
    ) {
      if (differenceX < 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }

    startX.current = null;
    startY.current = null;
  };

  return {
    onTouchStart,
    onTouchEnd,
  };
}