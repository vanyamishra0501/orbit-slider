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

  // 1. Make sure slidesPerView is at least 1
  const safeSlidesPerView = Math.max(
    1,
    slidesPerView
  );

  // 2. Find the last valid position
  const maxIndex = Math.max(
    0,
    totalSlides - safeSlidesPerView
  );

  // 3. Store current slide position
  const [currentIndex, setCurrentIndex] =
    useState(0);


  // 4. NEXT FUNCTION ← ADD IT HERE
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


  // 5. PREVIOUS FUNCTION
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


  // 6. GO TO FUNCTION
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


  // 7. Handle dynamic slide changes
  useEffect(() => {

    if (totalSlides === 0) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex((index) =>
      Math.min(index, maxIndex)
    );

  }, [totalSlides, maxIndex]);


  // 8. Return everything to Slider.tsx
  return {
    currentIndex,
    maxIndex,
    next,
    prev,
    goTo,
  };
}