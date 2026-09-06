import {
  useCallback,
  useEffect,
  useState,
} from "react";

interface UseSliderOptions {
  totalSlides: number;
  slidesPerView: number;
  loop: boolean;

  onSlideChange?: (index: number) => void;
  onNext?: (index: number) => void;
  onPrevious?: (index: number) => void;
}

export function useSlider({
  totalSlides,
  slidesPerView,
  loop,
  onSlideChange,
  onNext,
  onPrevious,
}: UseSliderOptions) {
  const safeSlidesPerView = Math.max(
    1,
    slidesPerView
  );

  const maxIndex = Math.max(
    0,
    totalSlides - safeSlidesPerView
  );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const next = useCallback(() => {
    setCurrentIndex((previousIndex) => {
      let nextIndex = previousIndex;

      if (loop) {
        if (previousIndex >= maxIndex) {
          nextIndex = 0;
        } else {
          nextIndex = previousIndex + 1;
        }
      } else {
        if (previousIndex < maxIndex) {
          nextIndex = previousIndex + 1;
        }
      }

      if (nextIndex !== previousIndex) {
        onNext?.(nextIndex);
        onSlideChange?.(nextIndex);
      }

      return nextIndex;
    });
  }, [
    loop,
    maxIndex,
    onNext,
    onSlideChange,
  ]);

  const prev = useCallback(() => {
    setCurrentIndex((previousIndex) => {
      let previousSlide = previousIndex;

      if (loop) {
        if (previousIndex <= 0) {
          previousSlide = maxIndex;
        } else {
          previousSlide = previousIndex - 1;
        }
      } else {
        if (previousIndex > 0) {
          previousSlide = previousIndex - 1;
        }
      }

      if (previousSlide !== previousIndex) {
        onPrevious?.(previousSlide);
        onSlideChange?.(previousSlide);
      }

      return previousSlide;
    });
  }, [
    loop,
    maxIndex,
    onPrevious,
    onSlideChange,
  ]);

  const goTo = useCallback(
    (index: number) => {
      if (totalSlides === 0) {
        return;
      }

      let targetIndex = index;

      if (loop) {
        if (targetIndex < 0) {
          targetIndex = maxIndex;
        }

        if (targetIndex > maxIndex) {
          targetIndex = 0;
        }
      } else {
        targetIndex = Math.max(
          0,
          Math.min(targetIndex, maxIndex)
        );
      }

      setCurrentIndex(targetIndex);

      onSlideChange?.(targetIndex);
    },
    [
      totalSlides,
      maxIndex,
      loop,
      onSlideChange,
    ]
  );

  useEffect(() => {
    if (totalSlides === 0) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex((index) =>
      Math.min(index, maxIndex)
    );
  }, [totalSlides, maxIndex]);

  return {
    currentIndex,
    maxIndex,
    next,
    prev,
    goTo,
  };
}