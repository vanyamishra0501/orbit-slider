import {
  useCallback,
  useEffect,
  useRef
} from "react";

interface UseAutoplayOptions {
  enabled: boolean;
  interval: number;
  next: () => void;
  pauseOnHover: boolean;
  pauseOnInteraction: boolean;
  onStart?: () => void;
  onStop?: () => void;
}

export function useAutoplay({
  enabled,
  interval,
  next,
  pauseOnHover,
  pauseOnInteraction,
  onStart,
  onStop
}: UseAutoplayOptions) {
  const timerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    onStop?.();
  }, [onStop]);

  const start = useCallback(() => {
    stop();

    if (!enabled || pausedRef.current) {
      return;
    }

    timerRef.current = window.setInterval(() => {
      next();
    }, interval);

    onStart?.();
  }, [
    enabled,
    interval,
    next,
    stop,
    onStart
  ]);

  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, [start, stop]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [start, stop]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      pausedRef.current = true;
      stop();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      pausedRef.current = false;
      start();
    }
  };

  const handleInteraction = () => {
    if (pauseOnInteraction) {
      pausedRef.current = true;
      stop();
    }
  };

  return {
    start,
    stop,
    handleMouseEnter,
    handleMouseLeave,
    handleInteraction
  };
}
