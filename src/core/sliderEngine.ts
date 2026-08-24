export interface SliderEngineOptions {
  totalSlides: number;
  slidesPerView: number;
  loop: boolean;
}

export function getNextIndex(
  currentIndex: number,
  options: SliderEngineOptions
) {
  const { totalSlides, slidesPerView, loop } = options;

  const maxIndex = Math.max(0, totalSlides - slidesPerView);

  if (loop) {
    return currentIndex >= maxIndex ? 0 : currentIndex + 1;
  }

  return Math.min(currentIndex + 1, maxIndex);
}

export function getPreviousIndex(
  currentIndex: number,
  options: SliderEngineOptions
) {
  const { totalSlides, slidesPerView, loop } = options;

  const maxIndex = Math.max(0, totalSlides - slidesPerView);

  if (loop) {
    return currentIndex <= 0 ? maxIndex : currentIndex - 1;
  }

  return Math.max(currentIndex - 1, 0);
}

export function getMaxIndex(
  totalSlides: number,
  slidesPerView: number
) {
  return Math.max(0, totalSlides - slidesPerView);
}